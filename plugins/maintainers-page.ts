import { readdir, readFile } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { Plugin } from '@docusaurus/types';
import { ProjectOptions } from '@site/src/@types/projects';

export interface ProcessedMaintainer {
  username: string;
  name: string;
  projects: ProjectOptions[];
}

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
    const projectsData = JSON.parse(fileContents);
    const maintainerInfos = JSON.parse(
      await readFile(
        `./content/assets/json/maintainers/${username}/infos.json`,
        'utf8'
      )
    );

    if (projectsData && Array.isArray(projectsData.projects))
      maintainers.push({
        name: maintainerInfos.name,
        username,
        projects: projectsData.projects,
      });
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
