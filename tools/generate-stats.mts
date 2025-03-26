import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { listFiles, sleep } from 'poku';
import { ProjectOptions } from '@site/src/@types/projects';
import {
  getCurrentDate,
  shouldUpdateFile,
} from '@site/tools/helpers/dates.mjs';

const require = createRequire(import.meta.url);
const { mergeRepositories } = require('@site/src/helpers/merge-projects');
const { extractRepository } =
  require('@site/src/helpers/extract-repository') as {
    extractRepository: (url: string) => {
      organization: string;
      repository: string;
    };
  };
const { processProject } = require('@site/src/helpers/generate-stats') as {
  processProject: (
    options: ProjectOptions,
    cb: (data: {
      repository: string;
      organization: string;
      results: ProjectOptions;
    }) => unknown
  ) => Promise<void>;
};

const files = await listFiles('./content/maintainers/', {
  filter: /projects\.json/,
});

const filesContent = await Promise.all(
  files.map((file) => readFile(file, 'utf8'))
);

const parsedContents = filesContent.map((fileContent) =>
  JSON.parse(fileContent)
);

for (const parsedContent of parsedContents) {
  const { projects: projectsByMaintainers } = parsedContent;

  const projects: ProjectOptions[] = mergeRepositories(
    projectsByMaintainers.flatMap((projects: ProjectOptions[][]) => projects)
  );

  for (const project of projects) {
    const { organization, repository } = extractRepository(project.repository);
    const currentDate = getCurrentDate();
    const key = `${organization}/${repository}`;
    const base = `./content/assets/json/projects/${key}`;
    const filePath = `${base}/stats.json`;

    if (!(await shouldUpdateFile(filePath, -1))) continue;

    processProject(project, async ({ results }) => {
      console.log('Creating stats for', key);

      const content = { ...results, updatedAt: currentDate };

      await mkdir(base, { recursive: true });
      await writeFile(`${base}/stats.json`, JSON.stringify(content, null, 0));
    });

    await sleep(100);
  }
}
