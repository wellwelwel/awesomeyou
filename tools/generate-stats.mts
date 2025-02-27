import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { listFiles } from 'poku';
import { ProjectOptions } from '@site/src/@types/projects';
import { shouldUpdateFile } from './helpers/dates.mjs';

const require = createRequire(import.meta.url);
const { mergeRepositories } = require('@site/src/helpers/merge-projects');
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
    processProject(project, async ({ organization, repository, results }) => {
      const key = `${organization}/${repository}`;
      const base = `./content/assets/json/projects/${key}`;
      const filePath = `${base}/stats.json`;

      if (!(await shouldUpdateFile(filePath))) return;

      console.log('Creating stats for', key);

      await mkdir(base, { recursive: true });
      await writeFile(`${base}/stats.json`, JSON.stringify(results, null, 0));
    });
  }
}
