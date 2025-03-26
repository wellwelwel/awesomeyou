import type { MaintainerInfo } from '@site/src/@types/maintainers';
import type {
  ProjectOptions,
  ProjectStats,
  RawProject,
} from '@site/src/@types/projects';
import { readdir, readFile } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { Plugin } from '@docusaurus/types';
import { extractRepository } from '../src/helpers/extract-repository.js';
import { commitsByMaintainer } from '../src/helpers/services/stats/commits-by-maintainer.js';

export type ProcessedMaintainer = MaintainerInfo & {
  username: string;
  projects: (ProjectOptions & { commits: number; stats: ProjectStats })[];
};

const getMaintainers = async (): Promise<ProcessedMaintainer[]> => {
  const maintainersDir = resolve('./content/maintainers');
  const dirents = await readdir(maintainersDir, { withFileTypes: true });
  const maintainerDirs = dirents
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

  const maintainers: ProcessedMaintainer[] = [];

  for (const username of maintainerDirs) {
    const projectsFile = join(maintainersDir, username, 'projects.json');
    const fileContents = await readFile(projectsFile, 'utf8');
    const projectsData: RawProject = JSON.parse(fileContents);
    const maintainerInfos = JSON.parse(
      await readFile(
        `./content/assets/json/maintainers/${username}/infos.json`,
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
            `./content/assets/json/projects/${organization}/${repository}/stats.json`,
            'utf8'
          );
          const stats: ProjectStats = JSON.parse(statsContents);

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

export default function pluginDynamicMaintainers(
  _context: unknown,
  _options: unknown
): Plugin<ProcessedMaintainer[]> {
  return {
    name: 'docusaurus-plugin-dynamic-maintainers',

    loadContent() {
      return getMaintainers();
    },

    async contentLoaded({ content, actions }) {
      const { addRoute, createData } = actions;

      for (const maintainer of content) {
        const dataPath = await createData(
          `${maintainer.username}.json`,
          JSON.stringify(maintainer, null, 2)
        );

        addRoute({
          path: `/maintainers/${maintainer.username}`,
          component: '@site/src/components/Maintainer.tsx',
          exact: true,
          modules: { data: dataPath },
        });
      }
    },

    getPathsToWatch() {
      return [resolve('./content/maintainers')];
    },
  };
}
