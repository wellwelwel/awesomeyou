import type { ProcessedProjects, RawProject } from '@site/src/@types/projects';

export const projects = (): ProcessedProjects[][] => {
  const context = require.context(
    '@site/content/maintainers',
    true,
    /projects\.json$/
  );

  return context.keys().map((key) => {
    const maintainer = key.split('/')[1];
    const projectsData: RawProject = context(key);

    return projectsData.projects.map((project) => ({ ...project, maintainer }));
  });
};
