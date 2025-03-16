import React, { memo, useEffect, useState } from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import {
  ChevronRight,
  ExternalLink,
  Github,
  MapPin,
  Network,
} from 'lucide-react';
import { MaintainerInfo } from '@site/src/@types/maintainers';
import { ProjectOptions } from '@site/src/@types/projects';
import { Name } from '@site/src/components/Name';
import { normalizeURL, SafeLink } from '@site/src/components/SafeLink';
import { extractRepository } from '@site/src/helpers/extract-repository';
import { randomize } from '@site/src/helpers/radomizer';

import '@site/src/css/pages/maintainers.scss';

interface Maintainer {
  username: string;
  projects: ProjectOptions[];
  info: MaintainerInfo;
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
  }, []);

  const title = "<Brazil class='Pessoas' />";

  return (
    <Layout title={''} description='Lista de projetos open source do Brasil'>
      <div id='maintainers'>
        <main>
          <header className='show'>
            <h1>
              <Name name={title} />
            </h1>
            <small>
              Conheça novos mantenedores brasileiros toda vez que voltar aqui.
            </small>
          </header>

          <main>
            <div className='cards'>
              {maintainers?.map((maintainer) => {
                if (maintainer?.projects?.length === 0) return null;

                return (
                  <section className='card' key={maintainer.username}>
                    <header>
                      <Link to={`/maintainers/${maintainer.username}`}>
                        <img
                          src={`https://avatars.githubusercontent.com/${maintainer.username}`}
                          loading='lazy'
                          alt={`${maintainer.username} profile avatar`}
                        />
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
                          <ChevronRight />
                        </h2>
                      </Link>
                    </header>

                    {maintainer.info.bio && (
                      <main>
                        <p className='bio'>{maintainer.info.bio}</p>
                      </main>
                    )}

                    <main>
                      <div className='links'>
                        <SafeLink
                          to={`https://github.com/${maintainer.username}`}
                        >
                          <Github /> @{maintainer.username}
                        </SafeLink>
                        {maintainer.info.blog && (
                          <SafeLink
                            to={`https://${normalizeURL(maintainer.info.blog)}`}
                          >
                            <Network /> {normalizeURL(maintainer.info.blog)}
                          </SafeLink>
                        )}
                      </div>
                    </main>

                    <footer>
                      {maintainer.projects.map((project, index) => {
                        const { organization, repository } = extractRepository(
                          project.repository
                        );

                        return (
                          <SafeLink
                            key={index}
                            to={project.repository}
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
