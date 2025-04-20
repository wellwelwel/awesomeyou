import type { ProjectOptions, ProjectStats } from '@site/src/@types/projects';
import { categories } from '@site/src/configs/categories';
import { languages } from '@site/src/configs/languages';

type Props = {
  name: string;
  username: string;
  projects: (ProjectOptions & {
    commits: number;
    stats: ProjectStats;
  })[];
};

export const ldSoftwares = (options: Props) => {
  const { name, username, projects } = options;

  return {
    '@context': 'https://schema.org',
    '@graph': projects.map((project) => ({
      '@type': 'SoftwareSourceCode',
      name: project.name,
      codeRepository: project.repository,
      programmingLanguage: project.languages?.[0]
        ? languages[project.languages[0]]
        : undefined,
      ...(project.isAuthor
        ? {
            author: {
              '@type': 'Person',
              name,
              url: `https://github.com/${username}`,
            },
          }
        : {}),
      applicationCategory: project.categories?.[0]
        ? categories[project.categories[0]]
        : undefined,
      keywords: [
        ...(project.languages?.map((language) => languages[language]) ?? []),
        ...(project.categories?.map((category) => categories[category]) ?? []),
      ],
      isAccessibleForFree: true,
    })),
  };
};
