import { readFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { listFiles, strict, test } from 'poku';

const require = createRequire(import.meta.url);
const { mergeRepositories } = require('@site/src/helpers/merge-projects');

test('Ensure projects are the same length', async () => {
  const projects = await readFile('./build/projects/index.html', 'utf8');
  const lists = await readFile('./build/lists/index.html', 'utf8');
  const learn = await readFile('./build/learn/index.html', 'utf8');
  const files = await listFiles('./content/maintainers/', {
    filter: /projects\.json/,
  });

  const uniqueProjects = new Set<string>();
  const uniqueLists = new Set<string>();
  const uniqueLearn = new Set<string>();

  const filesContent = await Promise.all(
    files.map((file) => readFile(file, 'utf8'))
  );

  const parsedContents = filesContent.map((fileContent) =>
    JSON.parse(fileContent)
  );

  for (const parsedContent of parsedContents) {
    const { projects: projectsByMaintainers } = parsedContent;

    const projects = mergeRepositories(
      projectsByMaintainers.flatMap((projects: any) => projects)
    );

    for (const project of projects) {
      if (project?.categories.includes('list')) {
        uniqueLists.add(project.repository);
        continue;
      }

      if (project?.categories.includes('educational')) {
        uniqueLearn.add(project.repository);
        continue;
      }

      uniqueProjects.add(project.repository);
    }
  }

  strict(
    projects.includes(`<span class="length">${uniqueProjects.size}</span>`)
  );

  strict(learn.includes(`<span class="length">${uniqueLearn.size}</span>`));

  strict(lists.includes(`<span class="length">${uniqueLists.size}</span>`));
});
