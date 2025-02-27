import { readFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { listFiles, strict, test } from 'poku';
import { ProjectStats } from '@site/src/@types/projects';

const require = createRequire(import.meta.url);
const { getScore } = require('@site/src/helpers/get-score');

test('Ensure projects score', async () => {
  const files = await listFiles('./content/assets/json/projects', {
    filter: /stats\.json/,
  });

  const filesContent = await Promise.all(
    files.map(async (file) => ({ file, stats: await readFile(file, 'utf8') }))
  );

  const contents = filesContent.map((fileContent) => ({
    file: fileContent.file,
    stats: JSON.parse(fileContent.stats),
  }));

  for (const content of contents) {
    const {
      commits,
      contributors,
      forks,
      homebrew,
      npm,
      pypi,
      stars,
      closedIssues,
      issues,
    } = content.stats as ProjectStats;

    const score = getScore({
      stars: stars?.value,
      forks: forks?.value,
      npm: npm?.value,
      homebrew: homebrew?.value,
      pypi: pypi?.value,
      contributors: contributors?.value,
      commits: commits,
      issues: issues?.value,
      closedIssues: closedIssues?.value,
    });

    strict(score >= 250, `Ensure score for './${content.file}' — ${score}/250`);
  }
});
