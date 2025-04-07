/*---------------------------------------------------------------------------------------------
 *  Copyright (c) https://awesomeyou.io and contributors. All rights reserved.
 *  Licensed under the GNU Affero General Public License v3.0. See https://github.com/wellwelwel/awesomeyou/blob/main/LICENSE for license information.
 *--------------------------------------------------------------------------------------------*/

import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { dirname } from 'node:path';
import { listFiles } from 'poku';
import {
  MaintainerInfo,
  ResumedMaintaners,
} from '@site/src/@types/maintainers';
import { RawProject, ResumedProject } from '@site/src/@types/projects';

const require = createRequire(import.meta.url);
const { extractRepository } = require('@site/src/helpers/extract-repository');

const base = `./content/assets/json/resume`;
const projectsPath = `${base}/projects.json`;
const maintainersPath = `${base}/maintainers.json`;

const maintaners: ResumedMaintaners[] = [];
const projects: ResumedProject[] = [];

const files = await listFiles('./content/maintainers', {
  filter: /projects\.json/,
});

const filesContent: { file: string; projects: string }[] = await Promise.all(
  files.map(async (file) => ({
    file,
    projects: await readFile(file, 'utf8'),
  }))
);

const parsedContents = filesContent.map(({ file, projects }) => ({
  maintainer: dirname(file).split('/').pop()!,
  projects: JSON.parse(projects) as RawProject,
}));

for (const { maintainer, projects: rawProjects } of parsedContents) {
  const maintanerInfos: MaintainerInfo = JSON.parse(
    await readFile(
      `content/assets/json/maintainers/${maintainer}/infos.json`,
      'utf8'
    )
  );

  if (maintanerInfos.name && maintanerInfos.bio) {
    maintaners.push({
      name: maintanerInfos.name,
      bio: maintanerInfos.bio,
      username: maintainer,
    });
  }

  for (const project of rawProjects.projects) {
    if (!project.madeInBrazil) continue;

    const repositoryData = extractRepository(project.repository);
    const { organization, repository } = repositoryData;

    if (
      projects.find(
        (project) =>
          project.organization === organization &&
          project.repository === repository
      )
    )
      continue;

    projects.push({
      description: project.description,
      repository,
      organization,
      language: project.languages?.[0],
      category: project.categories?.[0],
      name: project.name,
    });
  }
}

await mkdir(base, { recursive: true });
await writeFile(maintainersPath, JSON.stringify(maintaners), 'utf8');
await writeFile(projectsPath, JSON.stringify(projects), 'utf8');
