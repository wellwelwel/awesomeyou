import type { MergedProjects, RawProject } from '@site/src/@types/projects';
import { categories } from '../configs/categories';
import { mergeRepositories } from './merge-projects';

type Options = {
  include?: (keyof typeof categories)[];
  exclude?: (keyof typeof categories)[];
};

export const projects = ({
  include = [],
  exclude = [],
}: Options = {}): MergedProjects[] => {
  const context = require.context(
    '@site/content/maintainers',
    true,
    /projects\.json$/
  );

  const allProjects = context.keys().flatMap((key) => {
    const maintainer = key.split('/')[1];
    const projectsData: RawProject = context(key);

    return projectsData.projects.map((project) => ({ ...project, maintainer }));
  });

  const mergedProjects = mergeRepositories(allProjects);

  return mergedProjects.filter((project) => {
    if (!project.categories || project.categories.length === 0)
      return include.length === 0;

    const toInclude =
      include.length === 0 ||
      project.categories.some((category) => include.includes(category));

    const toExclude =
      exclude.length === 0 ||
      !project.categories.some((category) => exclude.includes(category));

    return toInclude && toExclude;
  });
};
