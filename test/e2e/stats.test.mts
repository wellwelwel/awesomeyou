/*---------------------------------------------------------------------------------------------
 *  Copyright (c) https://awesomeyou.io and contributors. All rights reserved.
 *  Licensed under the GNU Affero General Public License v3.0. See https://github.com/wellwelwel/awesomeyou/blob/main/LICENSE for license information.
 *--------------------------------------------------------------------------------------------*/

import { readFile } from 'node:fs/promises';
import { describe, it, listFiles, strict } from 'poku';
import { ProjectStats } from '@site/src/@types/projects';

describe('Ensure projects are the same length', async () => {
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

    it(() => {
      strict(
        stats.score >= 200,
        `Ensure score for './${content.file}' — ${stats.score}/200`
      );
    });

    it(() => {
      strict(
        typeof stats.commits === 'string',
        `Ensure commits for ${content.file}`
      );
    });

    it(() => {
      strict(
        typeof stats.contributors.value === 'number',
        `Ensure contributors for ${content.file}`
      );
    });

    it(() => {
      strict(
        typeof stats.issues.value === 'number',
        `Ensure issues for ${content.file}`
      );
    });

    it(() => {
      strict(
        typeof stats.closedIssues.value === 'number',
        `Ensure closed issues for ${content.file}`
      );
    });

    it(() => {
      strict(
        typeof stats.stars.value === 'number',
        `Ensure stars for ${content.file}`
      );
    });

    it(() => {
      strict(
        typeof stats.npm === 'undefined' || typeof stats.npm.value === 'number',
        `Ensure npm for ${content.file}`
      );
    });

    it(() => {
      strict(
        typeof stats.homebrew === 'undefined' ||
          typeof stats.homebrew.value === 'number',
        `Ensure Homebrew for ${content.file}`
      );
    });

    it(() => {
      strict(
        typeof stats.pypi === 'undefined' ||
          typeof stats.pypi.value === 'number',
        `Ensure PyPi for ${content.file}`
      );
    });

    it(() => {
      strict(
        typeof stats.chocolatey === 'undefined' ||
          typeof stats.chocolatey.value === 'number',
        `Ensure Chocolatey for ${content.file}`
      );
    });

    it(() => {
      strict(
        typeof stats.vscode === 'undefined' ||
          typeof stats.vscode.value === 'number',
        `Ensure Visual Studio Marketplace for ${content.file}`
      );
    });

    it(() => {
      strict(
        !/not specified/.test(stats.license),
        `Ensure license file for ${content.file}`
      );
    });
  }
});
