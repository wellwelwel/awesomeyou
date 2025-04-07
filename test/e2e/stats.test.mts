/*---------------------------------------------------------------------------------------------
 *  Copyright (c) https://awesomeyou.io and contributors. All rights reserved.
 *  Licensed under the GNU Affero General Public License v3.0. See https://github.com/wellwelwel/awesomeyou/blob/main/LICENSE for license information.
 *--------------------------------------------------------------------------------------------*/

import { readFile } from 'node:fs/promises';
import { listFiles, strict, test } from 'poku';
import { ProjectStats } from '@site/src/@types/projects';

test('Ensure projects are the same length', async () => {
  const files = await listFiles('./static/assets/json/projects', {
    filter: /\.json/,
  });

  const filesContent = await Promise.all(
    files.map(async (file) => ({ file, project: await readFile(file, 'utf8') }))
  );

  const contents = filesContent.map((fileContent) => ({
    file: fileContent.file,
    stats: JSON.parse(fileContent.project).stats,
  }));

  for (const content of contents) {
    const stats = content.stats as ProjectStats;

    strict(
      !/not specified/.test(stats.license),
      `Ensure license file for ${content.file}`
    );

    strict(
      typeof stats.commits === 'string',
      `Ensure commits for ${content.file}`
    );

    strict(
      typeof stats.contributors.value === 'number',
      `Ensure contributors for ${content.file}`
    );

    strict(
      typeof stats.issues.value === 'number',
      `Ensure issues for ${content.file}`
    );

    strict(
      typeof stats.closedIssues.value === 'number',
      `Ensure pull requests for ${content.file}`
    );

    strict(
      typeof stats.stars.value === 'number',
      `Ensure pull requests for ${content.file}`
    );

    strict(
      typeof stats.npm === 'undefined' || typeof stats.npm.value === 'number',
      `Ensure npm for ${content.file}`
    );

    strict(
      typeof stats.homebrew === 'undefined' ||
        typeof stats.homebrew.value === 'number',
      `Ensure Homebrew for ${content.file}`
    );

    strict(
      typeof stats.pypi === 'undefined' || typeof stats.pypi.value === 'number',
      `Ensure PyPi for ${content.file}`
    );

    strict(
      stats.score >= 250,
      `Ensure score for './${content.file}' — ${stats.score}/250`
    );
  }
});
