import '@site/src/css/pages/maintainer.scss';

import type { ProcessedMaintainer } from '@site/plugins/maintainers-page';
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
    knowsAbout: 'Open Source',
    jobTitle: 'Mantenedor',
    affiliation: projects.map((project) => ({
      '@type': 'Organization',
      name: project.name,
      description: project.description,
      url: project.repository,
    })),
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
        />
        <meta
          property='twitter:image'
          content={`https://avatars.githubusercontent.com/${username}`}
        />
        <meta name='keywords' content={keywords.join(', ')} />
        <script type='application/ld+json' data-rh='true'>
          {JSON.stringify(ld)}
        </script>
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
