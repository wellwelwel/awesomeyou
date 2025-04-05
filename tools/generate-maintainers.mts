import type { ProcessedMaintainer } from '@site/src/@types/maintainers';
import type { ProjectStats, RawProject } from '@site/src/@types/projects';
import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { dirname, join, resolve } from 'node:path';
import { env } from 'node:process';
import { listFiles, sleep } from 'poku';
import { getCurrentDate, shouldUpdateFile } from './helpers/dates.mjs';

const require = createRequire(import.meta.url);
const {
  commitsByMaintainer,
} = require('@site/src/helpers/services/stats/commits-by-maintainer.js');
const {
  extractRepository,
} = require('@site/src/helpers/extract-repository.js');

const token = String(env.GITHUB_TOKEN);
const base = `./content/assets/json/maintainers/_cache`;
const filePath = `${base}/infos.json`;
const currentDate = getCurrentDate();
const files = await listFiles('./content/maintainers/', {
  filter: /projects\.json/,
});

const checkRateLimit = async () => {
  const response = await fetch('https://api.github.com/rate_limit', {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  });

  const data = await response.json();
  const { remaining, reset } = data.rate;
  const now = Math.floor(Date.now() / 1000);
  const timeUntilReset = reset - now;

  return { remaining, timeUntilReset };
};

const getGitHubUserName = async (username: string) => {
  const response = await fetch(`https://api.github.com/users/${username}`, {
    headers: typeof token ? { Authorization: `Bearer ${token}` } : undefined,
  });

  const { name, bio, location, blog } = await response.json();

  return { name, bio, location, blog };
};

const processMaintainers = async (): Promise<
  ProcessedMaintainer[] | undefined
> => {
  // if (!(await shouldUpdateFile(filePath, 1))) return;

  console.log('Caching maintainer infos');

  const maintainersDir = resolve('./content/maintainers');
  const dirents = await readdir(maintainersDir, { withFileTypes: true });
  const maintainerDirs = dirents
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

  const maintainers: ProcessedMaintainer[] = [];

  for (const username of maintainerDirs) {
    const projectsFile = join(maintainersDir, username, 'projects.json');
    const fileContents = await readFile(projectsFile, 'utf8');
    const projectsData: RawProject = JSON.parse(fileContents);
    const maintainerInfos = JSON.parse(
      await readFile(
        `./content/assets/json/maintainers/${username}/infos.json`,
        'utf8'
      )
    );

    if (projectsData && Array.isArray(projectsData.projects)) {
      const resolvedProjects = await Promise.all(
        projectsData.projects.map(async (project) => {
          const { organization, repository } = extractRepository(
            project.repository
          );

          const statsContents = await readFile(
            `./content/assets/json/projects/${organization}/${repository}.json`,
            'utf8'
          );
          const stats: ProjectStats = JSON.parse(statsContents).stats;

          return {
            ...project,
            commits: (
              await commitsByMaintainer(organization, repository, username)
            ).value,
            stats,
          };
        })
      );

      resolvedProjects.sort((a, b) => b.commits - a.commits);

      maintainers.push({
        ...maintainerInfos,
        username,
        projects: resolvedProjects,
      });
    }
  }

  return maintainers;
};

for (const file of files) {
  const username = dirname(file).split('/').pop()!;
  const base = `./content/assets/json/maintainers/${username}`;
  const filePath = `${base}/infos.json`;

  if (!(await shouldUpdateFile(filePath, 7))) continue;

  console.log('Creating infos for', username);

  const { remaining, timeUntilReset } = await checkRateLimit();
  const currentDate = getCurrentDate();

  if (remaining <= 1) {
    const waitTimeMs = timeUntilReset * 1000;
    console.log(`⏳ Waiting for ${Math.ceil(timeUntilReset / 60)} minutes...`);
    await sleep(waitTimeMs);
  }

  const { name, bio, location, blog } = await getGitHubUserName(username);

  await mkdir(base, { recursive: true });
  await writeFile(
    filePath,
    JSON.stringify(
      { username, name, bio, location, blog, updatedAt: currentDate },
      null,
      0
    )
  );
}

const processedMaintainers = await processMaintainers();
const cache = {
  maintainers: processedMaintainers,
  updatedAt: currentDate,
};

await mkdir(base, { recursive: true });
await writeFile(filePath, JSON.stringify(cache, null, 0));
