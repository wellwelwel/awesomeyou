/*---------------------------------------------------------------------------------------------
 *  Copyright (c) https://awesomeyou.io and contributors. All rights reserved.
 *  Licensed under the GNU Affero General Public License v3.0. See https://github.com/wellwelwel/awesomeyou/blob/main/LICENSE for license information.
 *--------------------------------------------------------------------------------------------*/

import type { MaintainerInfo } from '@site/src/@types/maintainers';
import type { ProjectOptions } from '@site/src/@types/projects';
import React, { FC, useRef } from 'react';
import Link from '@docusaurus/Link';
import { ExternalLink, Github, MapPin, Network } from 'lucide-react';
import { Name } from '@site/src/components/Name';
import { normalizeURL, SafeLink } from '@site/src/components/SafeLink';
import { extractRepository } from '@site/src/helpers/extract-repository';
import { normalizeChars } from '@site/src/helpers/normalize-chars';
import { useScroll } from '@site/src/hooks/useScroll';

export interface MaintainerOptions {
  username: string;
  info: MaintainerInfo;
  projects: ProjectOptions[];
}

type Props = {
  maintainer: MaintainerOptions;
};

export const Maintainer: FC<Props> = ({ maintainer }) => {
  const ref = useRef<HTMLElement>(null);

  useScroll(ref, (isVisible, target) => {
    if (!isVisible) return;

    target.classList.add('show');
  });

  return (
    <section
      ref={ref}
      className='card'
      key={maintainer.username}
      data-search={normalizeChars(
        [
          maintainer.info.name,
          ...maintainer.projects.map((project) => {
            const { repository } = extractRepository(project.repository);

            if (project.name) return `${project.name}${repository}`;

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
            <SafeLink to={`https://github.com/${maintainer.username}`}>
              <Github /> <span>@{maintainer.username}</span>
            </SafeLink>
            {maintainer.info.blog && (
              <SafeLink to={`https://${normalizeURL(maintainer.info.blog)}`}>
                <Network /> <span>{normalizeURL(maintainer.info.blog)}</span>
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
            <SafeLink key={index} to={project.repository} className='project'>
              <span>
                <img
                  src={`https://avatars.githubusercontent.com/${organization}`}
                  loading='lazy'
                  alt={`${maintainer.username} profile avatar`}
                />
                <span className='name'>{project.name || repository}</span>
              </span>
              <ExternalLink />
            </SafeLink>
          );
        })}
      </footer>
    </section>
  );
};
