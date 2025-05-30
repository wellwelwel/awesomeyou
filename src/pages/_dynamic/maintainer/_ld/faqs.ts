/*---------------------------------------------------------------------------------------------
 *  Copyright (c) https://awesomeyou.io and contributors. All rights reserved.
 *  Licensed under the GNU Affero General Public License v3.0. See https://github.com/wellwelwel/awesomeyou/blob/main/LICENSE for license information.
 *--------------------------------------------------------------------------------------------*/

import type { ProjectOptions, ProjectStats } from '@site/src/@types/projects';
import { categories } from '@site/src/configs/categories';
import { languages } from '@site/src/configs/languages';

type Props = {
  name: string;
  title: string;
  description: string;
  projects: (ProjectOptions & {
    commits: number;
    stats: ProjectStats;
  })[];
};

export const ldFaqs = (options: Props) => {
  const { name, projects, description, title } = options;

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: title,
        acceptedAnswer: {
          '@type': 'Answer',
          text: description,
        },
      },
      ...projects.flatMap((project) => {
        const questions = [
          {
            name: `O que é o ${project.name}?`,
            text: project.description,
          },
          {
            name: `${project.name} foi criado por brasileiros?`,
            text: project.madeInBrazil
              ? `Sim, ${project.name} ${project.isAuthor ? 'foi criado' : 'é mantido'} por ${name}.`
              : `Não, mas é mantido por pessoas brasileiras, como ${name}.`,
          },
          ...(project.isAuthor
            ? [
                {
                  name: `Quem criou o ${project.name}?`,
                  text: `${project.name} foi criado por ${name}, contribuidor brasileiro ativo da comunidade open source.`,
                },
              ]
            : []),
          ...(project.languages?.length
            ? [
                {
                  name: `Quais linguagens o ${project.name} utiliza?`,
                  text: `${project.name} é escrito principalmente em ${project.languages
                    .map((language) => languages[language])
                    .join(', ')}.`,
                },
              ]
            : []),
          ...(project.categories?.length
            ? [
                {
                  name: `Qual a categoria do ${project.name}?`,
                  text: `${project.name} é classificado como ${project.categories
                    .map((category) => categories[category])
                    .join(', ')}.`,
                },
              ]
            : []),
          {
            name: `Qual o repositório do ${project.name}?`,
            text: `Você pode acessar o repositório em ${project.repository}`,
          },
        ];

        return questions.map(({ name, text }) => ({
          '@type': 'Question',
          name,
          acceptedAnswer: {
            '@type': 'Answer',
            text,
          },
        }));
      }),
    ],
  };
};
