/*---------------------------------------------------------------------------------------------
 *  Copyright (c) https://awesomeyou.io and contributors. All rights reserved.
 *  Licensed under the GNU Affero General Public License v3.0. See https://github.com/wellwelwel/awesomeyou/blob/main/LICENSE for license information.
 *--------------------------------------------------------------------------------------------*/

import type { MaintainerInfo } from '@site/src/@types/maintainers';
import type {
  ProcessedProject,
  ProjectOptions,
  ProjectStats,
  RawProject,
} from '@site/src/@types/projects';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { listFiles, sleep } from 'poku';
import {
  getCurrentDate,
  shouldUpdateFile,
} from '@site/tools/helpers/dates.mjs';

const require = createRequire(import.meta.url);
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
      results: ProjectStats;
    }) => unknown
  ) => Promise<void>;
};

const files = await listFiles('./content/maintainers/', {
  filter: /projects\.json/,
});

const maintainers: { infos: MaintainerInfo; raw: RawProject }[] =
  await Promise.all(
    files.map(async (file) => ({
      infos: JSON.parse(
        await readFile(
          `content/assets/json/maintainers/${file.split('/')[2]}/infos.json`,
          'utf8'
        )
      ),
      raw: JSON.parse(await readFile(file, 'utf8')),
    }))
  );

const mappedProjects = new Map();

for (const maintainer of maintainers) {
  const { raw, infos } = maintainer;

  for (const project of raw.projects) {
    const { organization, repository } = extractRepository(project.repository);
    const key = `${organization}/${repository}`;
    const currentDate = getCurrentDate();
    const file = `content/assets/json/projects/${organization}/${repository}.json`;

    if (!(await shouldUpdateFile(file, 1))) continue;

    const processedInfos = {
      bio: infos.bio?.trim() || undefined,
      blog: infos.blog?.trim() || undefined,
      location: infos.location?.trim() || undefined,
      name: infos.name.trim(),
      username: infos.username,
    };

    if (mappedProjects.has(key)) {
      const currentProject = mappedProjects.get(key)!;

      mappedProjects.set(key, {
        ...currentProject,
        maintainers: [...currentProject.maintainers, processedInfos],
      });

      continue;
    }

    await processProject(project, async ({ results }) => {
      console.log('Creating stats for', key);

      const processedProject: ProcessedProject = {
        organization,
        repository,
        categories: project.categories,
        description: project.description,
        languages: project.languages,
        madeInBrazil: project.madeInBrazil,
        message: project.message,
        name: project.name,
        url: project.repository,
        chocolatey: project.chocolatey,
        homebrew: project.homebrew,
        npm: project.npm,
        pypi: project.pypi,
        vscode: project.vscode,
        stats: results,
        maintainers: [processedInfos],
        updatedAt: currentDate,
      };

      mappedProjects.set(key, processedProject);
    });

    await sleep(100);
  }
}

const projects = [...mappedProjects.values()];

for (const project of projects) {
  const base = `content/assets/json/projects/${project.organization}`;

  mkdir(base, { recursive: true }).then(() => {
    writeFile(
      `${base}/${project.repository}.json`,
      JSON.stringify(project, null, 0)
    );
  });
}
