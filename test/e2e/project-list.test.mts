import { readFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { listFiles, strict, test } from 'poku';

const require = createRequire(import.meta.url);
const { mergeRepositories } = require('@site/src/helpers/merge-projects');

test('Ensure projects are the same length', async () => {
  const html = await readFile('./build/projects/index.html', 'utf8');
  const files = await listFiles('./content/maintainers/', {
    filter: /projects\.json/,
  });

  const uniqueRepositories = new Set<string>();

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

    for (const project of projects) uniqueRepositories.add(project.repository);
  }

  strict(
    html.includes(`<span class="length">${uniqueRepositories.size}</span>`)
  );
});
