/*---------------------------------------------------------------------------------------------
 *  Copyright (c) https://awesomeyou.io and contributors. All rights reserved.
 *  Licensed under the GNU Affero General Public License v3.0. See https://github.com/wellwelwel/awesomeyou/blob/main/LICENSE for license information.
 *--------------------------------------------------------------------------------------------*/

/**
 * Futuramente será necessário dividir esse arquivo por múltiplos arquivos.
 * Possívelmente por categorias ou por linguagens de programação.
 *
 * Limitação: Número de Tokens.
 */

import type { MaintainerInfo } from '@site/src/@types/maintainers';
import type { ProjectOptions, RawProject } from '@site/src/@types/projects';
import { readFile, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { dirname } from 'node:path';
import commentMark from 'comment-mark';
import { listFiles } from 'poku';

const require = createRequire(import.meta.url);
const { extractRepository } = require('@site/src/helpers/extract-repository');
const { format } = require('@site/src/helpers/formatter');
const { categories } = require('@site/src/configs/categories');
const { languages } = require('@site/src/configs/languages');
const { normalizeChars } = require('@site/src/helpers/normalize-chars');

const files = await listFiles('./static/maintainers/', {
  filter: /projects\.json/,
});

const maintainers: {
  name: string;
  username: string;
  projects: (ProjectOptions & {})[];
}[] = [];
const sentencesByProject = new Map<string, string[]>();
const maintainersByUsername = new Set<string>();

for (const file of files) {
  const rawProject: RawProject = JSON.parse(await readFile(file, 'utf8'));
  const username = dirname(file).split('/').pop()!;
  const base = `./static/assets/json/maintainers/${username}`;
  const filePath = await readFile(`${base}/infos.json`, 'utf8');
  const maintainer: MaintainerInfo = JSON.parse(filePath);

  maintainers.push({
    name: maintainer.name.trim().split(' ').slice(0, 2).join(' '),
    username,
    projects: rawProject.projects,
  });
}

maintainers.sort((a, b) =>
  normalizeChars(a.name).localeCompare(normalizeChars(b.name))
);

for (const { name, username, projects } of maintainers) {
  maintainersByUsername.add(username);

  for (const project of projects) {
    const { organization, repository } = extractRepository(project.repository);
    const projectName = project.name || repository;
    const key = projectName;
    const exists = sentencesByProject.has(key);
    const projectMaintainers = maintainers
      .filter((maintainer) =>
        maintainer.projects.some(
          (project) =>
            (project.name ||
              extractRepository(project.repository).repository) === projectName
        )
      )
      .sort()
      .map(
        (maintainer) =>
          `${maintainer.name.slice(0, 30).trim()}${maintainer.name.length > 30 ? '...' : ''}`
      );

    if (!exists) {
      sentencesByProject.set(key, []);

      sentencesByProject
        .get(key)!
        .push(
          `---\n🆔 ${projectName.trim()}\n🐙 ${organization}/${repository}`
        );

      sentencesByProject
        .get(key)!
        .push(`🇧🇷 ${project.madeInBrazil ? '✅' : '❌'}`);

      if (!project.madeInBrazil || projectMaintainers.length > 1)
        sentencesByProject
          .get(key)!
          .push(`👤 ${format.list(projectMaintainers)}`);

      if (project.categories && project.categories.length > 0)
        sentencesByProject.get(key)!.push(
          `🔖 ${format.list(
            project.categories.slice(0, 2).map((c) => {
              const isTestRunner =
                c === 'test' &&
                !project.categories?.includes('tool') &&
                !project.categories?.includes('plugin');

              return isTestRunner ? 'Test Runner' : categories[c];
            })
          )}`
        );

      if (
        !project?.categories?.includes('language') &&
        project.languages &&
        project.languages.length > 0
      )
        sentencesByProject
          .get(key)!
          .push(`💻 ${languages[project.languages[0]]}`);
    }

    if (project.isAuthor) sentencesByProject.get(key)!.push(`✍️ ${name}`);
  }
}

const base = await readFile('tools/resources/llms.md', 'utf8');

const readme = commentMark(base, {
  projects: Array.from(sentencesByProject.entries())
    .sort(([a], [b]) => normalizeChars(a).localeCompare(normalizeChars(b)))
    .map(([, sentences]) => sentences.join('\n'))
    .join('\n'),
}).replace(/<!-- (projects):(start|end) -->(\n)?/g, '');

await writeFile('./build/llms.txt', readme, 'utf8');
