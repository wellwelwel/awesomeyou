import '@site/src/css/pages/maintainer.scss';

import type { ProcessedMaintainer } from '@site/plugins/maintainers-page';
import React, { memo } from 'react';
import Layout from '@theme/Layout';
import {
  Cross,
  ExternalLink,
  Fingerprint,
  Github,
  Heart,
  HeartHandshake,
  LandPlot,
  MapPin,
  Network,
  Share2,
  SmilePlus,
  Star,
} from 'lucide-react';
import { Name } from '@site/src/components/Name';
import { normalizeURL, SafeLink } from '@site/src/components/SafeLink';
import { extractRepository } from '../helpers/extract-repository';
import { FAQ } from './FAQ';

const MaintainerPage: React.FC<{ data: ProcessedMaintainer }> = ({ data }) => {
  const { username, bio, blog, location, name, projects } = data;

  return (
    <Layout
      title={name}
      description={`Conheça ${name}, uma pessoa brasileira mantenedora de projetos open source.`}
    >
      <div id='maintainer'>
        <main>
          <header>
            <h1>
              <Name name={`Conheça ${name}`} />
            </h1>
            <small className='baloon'>
              <div className='float'>
                <Fingerprint />
              </div>
              <span>
                {' '}
                <img
                  src={`https://avatars.githubusercontent.com/${username}`}
                  loading='eager'
                  alt={`${username} profile avatar`}
                />{' '}
                {bio}
              </span>
              <footer>
                <div className='links'>
                  {' '}
                  <SafeLink to={`https://github.com/${username}`}>
                    <Github />
                    {username}
                  </SafeLink>
                  {blog ? (
                    <SafeLink to={`https://${normalizeURL(blog)}`}>
                      <Network />
                      {normalizeURL(blog)}
                    </SafeLink>
                  ) : null}
                </div>

                {location ? (
                  <div>
                    <MapPin /> {location}
                  </div>
                ) : null}
              </footer>
            </small>
          </header>
          <div className='faqs'>
            <FAQ
              title={
                <>
                  <SmilePlus /> Como você pode apoiar mantenedores?
                </>
              }
              open
            >
              <small>
                <p>
                  <Star />{' '}
                  <span>
                    Incentive deixando uma <strong>estrela</strong> nos projetos
                    que você gosta, especialmente se usa algum deles.
                  </span>
                </p>
                <p>
                  <Share2 />{' '}
                  <span>
                    Compartilhe os projetos que {name} mantém com a sua rede,
                    mostrando como eles já te ajudaram.
                  </span>
                </p>
                <p>
                  <HeartHandshake />{' '}
                  <span>
                    Ajude outros usuários respondendo dúvidas no repositório.
                  </span>
                </p>
                <p>
                  <Cross /> <span>Contribua com os projetos.</span>
                </p>
                <p>
                  <Heart />{' '}
                  <span>
                    <SafeLink to={`https://github.com/sponsors/${username}`}>
                      Patrocine
                    </SafeLink>{' '}
                    os mantenedores.
                  </span>
                </p>
              </small>
            </FAQ>
          </div>
          <main className='projects'>
            <h2>
              <LandPlot /> {projects.length} projetos cadastrados na Awesome
              You{' '}
            </h2>
            {projects.map((project, i) => {
              const { organization, repository } = extractRepository(
                project.repository
              );

              const isAuthor = project.isAuthor ? 'criou' : 'mantém';
              const isLaguange =
                project.categories?.includes('language') &&
                'a linguagem de programação';
              const isTestRunner =
                project.categories?.includes('test') &&
                !project.categories?.includes('tool') &&
                !project.categories?.includes('plugin') &&
                'o test runner';
              const category = isLaguange || isTestRunner || 'o projeto';
              const isBrazilian = project.madeInBrazil
                ? isLaguange
                  ? ' brasileira'
                  : ' brasileiro'
                : '';
              const usesOrganization =
                project.isAuthor && organization !== username ? (
                  <>
                    {' '}
                    através da organização{' '}
                    <SafeLink to={`https://github.com/${organization}`}>
                      {organization}
                    </SafeLink>{' '}
                  </>
                ) : (
                  ''
                );

              return (
                <section key={`project:${i}`} className='project'>
                  <header>
                    <SafeLink to={project.repository}>
                      <span>
                        <img
                          src={`https://avatars.githubusercontent.com/${organization}`}
                          loading='lazy'
                          alt={`${organization} profile avatar`}
                        />
                        <span className='name'>
                          <p>{project.name ? project.name : repository}</p>
                          <p>{project.description}</p>
                        </span>
                      </span>
                      <ExternalLink />
                    </SafeLink>
                  </header>
                  <main>
                    <p>
                      {name} {isAuthor} {category}
                      {isBrazilian}{' '}
                      <strong>{project.name || repository}</strong>
                      {usesOrganization} e já realizou{' '}
                      <SafeLink
                        to={`${project.repository}/commits?author=${username}`}
                      >
                        {Number(project.commits).toLocaleString('pt-BR')}{' '}
                        commits
                      </SafeLink>{' '}
                      no repositório do projeto.
                    </p>
                  </main>
                  {/* <footer></footer> */}
                </section>
              );
            })}
          </main>
        </main>
      </div>
    </Layout>
  );
};

export default memo(MaintainerPage);
