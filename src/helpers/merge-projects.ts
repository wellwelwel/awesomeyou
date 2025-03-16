import type {
  MergedProjects,
  ProcessedProjects,
} from '@site/src/@types/projects';

export const mergeRepositories = (
  projects: ProcessedProjects[]
): MergedProjects[] => {
  const mergedProjects = new Map<string, MergedProjects>();

  for (const project of projects) {
    const existingProject = mergedProjects.get(project.repository);

    if (existingProject) {
      if (!existingProject.maintainer.includes(project.maintainer))
        existingProject.maintainers.push(project.maintainer);

      continue;
    }

    mergedProjects.set(project.repository, {
      ...project,
      maintainers: [project.maintainer],
    });
  }

  return Array.from(mergedProjects.values());
};
