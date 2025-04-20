/*---------------------------------------------------------------------------------------------
 *  Copyright (c) https://awesomeyou.io and contributors. All rights reserved.
 *  Licensed under the GNU Affero General Public License v3.0. See https://github.com/wellwelwel/awesomeyou/blob/main/LICENSE for license information.
 *--------------------------------------------------------------------------------------------*/

import '@site/src/css/pages/maintainer.scss';

import type { ProcessedMaintainer } from '@site/src/@types/maintainers';
import React, { memo } from 'react';
import Head from '@docusaurus/Head';
import Layout from '@theme/Layout';
import { categories } from '@site/src/configs/categories';
import { languages } from '@site/src/configs/languages';
import { Provider } from '@site/src/contexts/Maintainer';
import { extractRepository } from '@site/src/helpers/extract-repository';
import { format } from '@site/src/helpers/formatter';
import { FAQS } from './_faq';
import { Header } from './_header';
import { Projects } from './_projects';

const MaintainerPage: React.FC<{ data: ProcessedMaintainer }> = ({ data }) => {
  const { username, name, projects: projectsRaw } = data;
  const projects = projectsRaw.map((project) => {
    const { repository, organization } = extractRepository(project.repository);
    return {
      ...project,
      name: project.name || repository,
      organization,
    };
  });
  const projectsNames = projects.map((project) => project.name);
  const projectsResume = format.list(projectsNames);
  const projectsOrganizations = projects.map((project) => project.organization);
  const description = `${name} é uma pessoa brasileira mantenedora de projetos open source, como ${projectsResume}.`;
  const title = `Quem é ${name}?`;
  const ld = {
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
  const ldByProjects = projects.map((project) => ({
    '@context': 'https://schema.org',
    '@type': 'SoftwareSourceCode',
    name: project.name,
    codeRepository: project.repository,
    programmingLanguage: project.languages?.[0]
      ? languages[project.languages?.[0]]
      : undefined,
    ...(() => {
      if (project.isAuthor)
        return {
          author: {
            '@type': 'Person',
            name,
            url: `https://github.com/${username}`,
          },
        };
    })(),
    applicationCategory: project.categories?.[0]
      ? categories[project.categories?.[0]]
      : undefined,
    keywords: [
      project.languages?.map((language) => languages[language]),
      project.categories?.map((category) => categories[category]),
    ].flat(1),
    isAccessibleForFree: true,
  }));
  const ldByFAQs = {
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
                  text: `${project.name} foi criado por ${name}, contribuinte brasileiro ativo da comunidade open source.`,
                },
              ]
            : []),
          ...(project.languages?.length
            ? [
                {
                  name: `Quais linguagens o ${project.name} utiliza?`,
                  text: `${project.name} é escrito principalmente em ${project.languages
                    .map((lang) => languages[lang])
                    .join(', ')}.`,
                },
              ]
            : []),
          ...(project.categories?.length
            ? [
                {
                  name: `Qual a categoria do ${project.name}?`,
                  text: `${project.name} é classificado como ${project.categories
                    .map((cat) => categories[cat])
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

  const keywords = Array.from(
    new Set([
      'open source',
      'open-source',
      'brazilian',
      'brazilians',
      'project',
      'projects',
      'código aberto',
      'código-aberto',
      'brasileiro',
      'brasileiros',
      'projeto',
      'projetos',
      'GitHub',
      name,
      username,
      ...projectsNames,
      ...projectsOrganizations,
      ...projects.flatMap((project) =>
        project.categories ? project.categories.map((c) => categories[c]) : []
      ),
      ...projects.flatMap((project) =>
        project.languages ? project.languages.map((l) => languages[l]) : []
      ),
    ])
  ).sort();

  return (
    <Layout title={title} description={description}>
      <Head>
        <meta
          property='og:image'
          content={`https://avatars.githubusercontent.com/${username}`}
          data-rh='true'
        />
        <meta
          property='twitter:image'
          content={`https://avatars.githubusercontent.com/${username}`}
          data-rh='true'
        />
        <meta name='keywords' content={keywords.join(', ')} />
        <script type='application/ld+json' data-rh='true'>
          {JSON.stringify(ldByFAQs)}
        </script>
        <script type='application/ld+json' data-rh='true'>
          {JSON.stringify(ld)}
        </script>
        {ldByProjects.map((ldByProject) => (
          <script type='application/ld+json' data-rh='true'>
            {JSON.stringify(ldByProject)}
          </script>
        ))}
      </Head>
      <Provider
        title={title}
        description={description}
        maintainer={{ ...data, projects }}
      >
        <div id='maintainer'>
          <main>
            <Header />
            <Projects />
            <FAQS />
          </main>
        </div>
      </Provider>
    </Layout>
  );
};

export default memo(MaintainerPage);
