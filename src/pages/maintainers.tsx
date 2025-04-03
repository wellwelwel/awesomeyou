import '@site/src/css/pages/maintainers.scss';

import type { MaintainerInfo } from '@site/src/@types/maintainers';
import type { ProjectOptions } from '@site/src/@types/projects';
import React, { memo, startTransition, useEffect, useState } from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import {
  ExternalLink,
  Github,
  Heart,
  MapPin,
  Network,
  Search,
  UsersRound,
} from 'lucide-react';
import { FAQ } from '@site/src/components/FAQ';
import { Name } from '@site/src/components/Name';
import { normalizeURL, SafeLink } from '@site/src/components/SafeLink';
import { extractRepository } from '@site/src/helpers/extract-repository';
import { normalizeChars } from '@site/src/helpers/normalize-chars';
import { randomize } from '@site/src/helpers/radomizer';
import { search } from '@site/src/helpers/search';

interface Maintainer {
  username: string;
  info: MaintainerInfo;
  projects: ProjectOptions[];
}

const loadMaintainers = (): Maintainer[] => {
  const maintainers: Maintainer[] = [];
  const maintainersInfos = new Map();

  const context = require.context(
    '@site/content/maintainers',
    true,
    /projects\.json$/
  );

  const subContext = require.context(
    '@site/content/assets/json/maintainers/',
    true,
    /infos\.json$/
  );

  subContext.keys().forEach((key: string) => {
    const parts = key.split('/');
    if (parts.length >= 2) {
      const username = parts[1];
      maintainersInfos.set(username, subContext(key));
    }
  });

  context.keys().forEach((key: string) => {
    const parts = key.split('/');

    if (parts.length >= 2) {
      const username = parts[1];
      const projectsData = context(key);

      if (projectsData && Array.isArray(projectsData.projects)) {
        maintainers.push({
          username,
          projects: projectsData.projects,
          info: maintainersInfos.get(username),
        });
      }
    }
  });

  return maintainers;
};

const MaintainersIndex: React.FC = () => {
  const rawMaintainers = loadMaintainers();
  const [maintainers, setMaintainers] = useState<Maintainer[]>([]);

  useEffect(() => {
    setMaintainers(randomize([...rawMaintainers]));
  }, [setMaintainers]);

  return (
    <Layout
      title='Pessoas'
      description='Lista de projetos open source do Brasil'
    >
      <div id='maintainers'>
        <main>
          <header className='show'>
            <h1>
              <Name name="<Brazil class='Pessoas' />" />
            </h1>

            <small className='baloon'>
              <div className='float'>
                <UsersRound />
              </div>
              <span>
                Conheça novos mantenedores brasileiros toda vez que voltar aqui.
              </span>
            </small>

            <FAQ
              title={
                <>
                  <Heart /> Como você pode apoiar mantenedores?
                </>
              }
              open
            >
              <small>
                Tudo pode começar com uma simples estrela nos repositórios que
                eles mantêm, contribuindo com os projetos, usando,
                compartilhando e, inclusive, patrocinando 🙌
              </small>
            </FAQ>
          </header>

          <div className='search'>
            <Search />
            <input
              type='search'
              name='search'
              placeholder='Pesquise pelo nome do projeto ou de quem os mantém'
              onChange={(e) => startTransition(() => search(e))}
            />
          </div>

          <main>
            <div className='cards'>
              {maintainers?.map((maintainer) => {
                if (maintainer?.projects?.length === 0) return null;

                return (
                  <section
                    className='card'
                    key={maintainer.username}
                    data-search={normalizeChars(
                      [
                        maintainer.info.name,
                        ...maintainer.projects.map((project) => {
                          const { repository } = extractRepository(
                            project.repository
                          );

                          if (project.name)
                            return `${project.name}${repository}`;

                          return repository;
                        }),
                      ].join()
                    )}
                  >
                    <header>
                      <Link to={`/maintainers/${maintainer.username}`}>
                        <img
                          src={`https://avatars.githubusercontent.com/${maintainer.username}`}
                          loading='lazy'
                          alt={`${maintainer.username} profile avatar`}
                        />
                      </Link>
                      <main>
                        <Link to={`/maintainers/${maintainer.username}`}>
                          <h2>
                            <span>
                              <span className='group-name'>
                                <Name name={maintainer.info.name} />{' '}
                              </span>
                              {maintainer.info?.location ? (
                                <strong>
                                  <MapPin /> {maintainer.info?.location}
                                </strong>
                              ) : null}
                            </span>
                          </h2>
                        </Link>

                        {maintainer.info.bio && (
                          <section>
                            <p className='bio'>{maintainer.info.bio}</p>
                          </section>
                        )}

                        <div className='links'>
                          <SafeLink
                            to={`https://github.com/${maintainer.username}`}
                          >
                            <Github /> <span>@{maintainer.username}</span>
                          </SafeLink>
                          {maintainer.info.blog && (
                            <SafeLink
                              to={`https://${normalizeURL(maintainer.info.blog)}`}
                            >
                              <Network />{' '}
                              <span>{normalizeURL(maintainer.info.blog)}</span>
                            </SafeLink>
                          )}
                        </div>
                      </main>
                    </header>

                    <footer>
                      {maintainer.projects.map((project, index) => {
                        const { organization, repository } = extractRepository(
                          project.repository
                        );

                        return (
                          <SafeLink
                            key={index}
                            to={`${project.repository}/commits?author=${maintainer.username}`}
                            className='project'
                          >
                            <span>
                              <img
                                src={`https://avatars.githubusercontent.com/${organization}`}
                                loading='lazy'
                                alt={`${maintainer.username} profile avatar`}
                              />
                              <span className='name'>
                                {project.name || repository}
                              </span>
                            </span>
                            <ExternalLink />
                          </SafeLink>
                        );
                      })}
                    </footer>
                  </section>
                );
              })}
            </div>
          </main>
        </main>
      </div>
    </Layout>
  );
};

export default memo(MaintainersIndex);
