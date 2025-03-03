import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { listFiles } from 'poku';
import { ProjectStats } from '@site/src/@types/projects';

const require = createRequire(import.meta.url);
const { getScore } = require('@site/src/helpers/get-score');

const base = `./content/assets/json`;
const filePath = `${base}/scores.json`;
const results: Record<string, number> = Object.create(null);

const files = await listFiles('./content/assets/json/projects', {
  filter: /stats\.json/,
});

const filesContent: { file: string; stats: string }[] = await Promise.all(
  files.map(async (file) => ({
    file,
    stats: await readFile(file, 'utf8'),
  }))
);

const parsedContents = filesContent.map(({ file, stats }) => ({
  file,
  stats: JSON.parse(stats),
}));

for (const content of parsedContents) {
  const { file } = content;
  const stats: ProjectStats = content.stats;

  const key = file
    .replace(/^content\/assets\/json\/projects\//, '')
    .replace(/\/stats\.json$/, '');

  const score = getScore({
    contributors: stats?.contributors?.value,
    forks: stats?.forks?.value,
    homebrew: stats?.homebrew?.value,
    npm: stats?.npm?.value,
    pypi: stats?.pypi?.value,
    vscode: stats?.vscode?.value,
    chocolatey: stats?.chocolatey?.value,
    stars: stats?.stars?.value,
    issues: stats?.issues?.value,
    closedIssues: stats?.closedIssues?.value,
    commits: stats?.commits,
    repositoryDependents: stats.repositoryDependents?.value,
  });

  results[key] = score;
}

await mkdir(base, { recursive: true });
await writeFile(
  filePath,
  JSON.stringify(
    Object.fromEntries(Object.entries(results).sort(([, a], [, b]) => b - a)),
    null,
    0
  )
);
