/*---------------------------------------------------------------------------------------------
 *  Copyright (c) https://awesomeyou.io and contributors. All rights reserved.
 *  Licensed under the GNU Affero General Public License v3.0. See https://github.com/wellwelwel/awesomeyou/blob/main/LICENSE for license information.
 *--------------------------------------------------------------------------------------------*/

import type { ProcessedMaintainer } from '@site/src/@types/maintainers';
import type { ProjectStats, RawProject } from '@site/src/@types/projects';
import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { join, resolve } from 'node:path';
import { env } from 'node:process';
import { getCurrentDate, shouldUpdateFile } from './helpers/dates.mjs';

const require = createRequire(import.meta.url);
const {
  commitsByMaintainer,
} = require('@site/src/helpers/services/stats/commits-by-maintainer.js');
const {
  extractRepository,
} = require('@site/src/helpers/extract-repository.js');

const base = './static/assets/json/maintainers/_cache';
const filePath = `${base}/infos.json`;
const currentDate = getCurrentDate();

const processMaintainers = async (): Promise<
  ProcessedMaintainer[] | undefined
> => {
  const needsRecreating = await shouldUpdateFile(filePath, 1);
  const maintainersDir = resolve('./static/maintainers');
  const dirents = await readdir(maintainersDir, { withFileTypes: true });
  const maintainersCached: { maintainers: ProcessedMaintainer[] } =
    await (async () => {
      try {
        return JSON.parse(await readFile(filePath, 'utf8'));
      } catch (error) {
        return { maintainer: [] };
      }
    })();
  const maintainerDirs = dirents
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);
  const missingMaintainers: string[] = await (async () => {
    if (needsRecreating) return [];

    const mapped: string[] = maintainersCached.maintainers.map(
      (maintainer) => maintainer.username
    );

    return maintainerDirs.filter((maintainer) => !mapped.includes(maintainer));
  })();
  const needsUpdating = missingMaintainers.length > 0;

  if (env.RESET_CACHE !== '1' && !needsRecreating && !needsUpdating) return;

  console.log('Caching maintainer infos');

  const maintainers: ProcessedMaintainer[] = [];
  const toRecreate = needsUpdating ? missingMaintainers : maintainerDirs;

  if (needsUpdating) maintainers.push(...maintainersCached.maintainers);

  for (const username of toRecreate) {
    const projectsFile = join(maintainersDir, username, 'projects.json');
    const fileContents = await readFile(projectsFile, 'utf8');
    const projectsData: RawProject = JSON.parse(fileContents);
    const maintainerInfos = JSON.parse(
      await readFile(
        `./static/assets/json/maintainers/${username}/infos.json`,
        'utf8'
      )
    );

    if (projectsData && Array.isArray(projectsData.projects)) {
      const resolvedProjects = await Promise.all(
        projectsData.projects.map(async (project) => {
          const { organization, repository } = extractRepository(
            project.repository
          );

          const statsContents = await readFile(
            `./static/assets/json/projects/${organization}/${repository}.json`,
            'utf8'
          );
          const stats: ProjectStats = JSON.parse(statsContents).stats;

          return {
            ...project,
            commits: (
              await commitsByMaintainer(organization, repository, username)
            ).value,
            stats,
          };
        })
      );

      resolvedProjects.sort((a, b) => b.commits - a.commits);

      maintainers.push({
        ...maintainerInfos,
        username,
        projects: resolvedProjects,
      });
    }
  }

  return maintainers;
};

const processedMaintainers = await processMaintainers();

if (processedMaintainers) {
  const cache = {
    maintainers: processedMaintainers,
    updatedAt: currentDate,
  };

  await mkdir(base, { recursive: true });
  await writeFile(filePath, JSON.stringify(cache, null, 0));
}
