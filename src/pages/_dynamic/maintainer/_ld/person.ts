import type { ProjectOptions, ProjectStats } from '@site/src/@types/projects';

type Props = {
  name: string;
  username: string;
  projects: (ProjectOptions & {
    commits: number;
    stats: ProjectStats;
  })[];
};

export const ldPerson = (options: Props) => {
  const { name, projects, username } = options;

  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name,
    url: `https://awesomeyou.io/maintainers/${username}/`,
    sameAs: [`https://github.com/${username}`],
    alternateName: username,
    knowsAbout: 'Open Source',
    jobTitle: 'Mantenedor',
    affiliation: projects.map((project) => ({
      '@type': 'Organization',
      name: project.name,
      description: project.description,
      url: project.repository,
    })),
    nationality: 'Brazilian',
    memberOf: {
      '@type': 'Organization',
      name: 'Open Source Community',
    },
    knowsLanguage: [
      {
        '@type': 'Language',
        name: 'Portuguese',
        alternateName: 'pt-BR',
      },
      {
        '@type': 'Language',
        name: 'English',
        alternateName: 'en',
      },
    ],
  };
};
