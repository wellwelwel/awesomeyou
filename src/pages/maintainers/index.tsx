/*---------------------------------------------------------------------------------------------
 *  Copyright (c) https://awesomeyou.io and contributors. All rights reserved.
 *  Licensed under the GNU Affero General Public License v3.0. See https://github.com/wellwelwel/awesomeyou/blob/main/LICENSE for license information.
 *--------------------------------------------------------------------------------------------*/

import '@site/src/css/pages/maintainers.scss';

import type { MaintainerOptions } from './_maintainer';
import React, { memo, startTransition, useEffect, useState } from 'react';
import Layout from '@theme/Layout';
import { Heart, Search, UsersRound } from 'lucide-react';
import { FAQ } from '@site/src/components/FAQ';
import { Name } from '@site/src/components/Name';
import { randomize } from '@site/src/helpers/randomizer';
import { search } from '@site/src/helpers/search';
import { Maintainer } from './_maintainer';

const loadMaintainers = (): MaintainerOptions[] => {
  const maintainers: MaintainerOptions[] = [];
  const maintainersInfos = new Map();

  const context = require.context(
    '@site/static/maintainers',
    true,
    /projects\.json$/
  );

  const subContext = require.context(
    '@site/static/assets/json/maintainers/',
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
  const [maintainers, setMaintainers] = useState<MaintainerOptions[]>([]);

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
            <h1 aria-label='Pessoas'>
              <Name
                name="<Brazil class='Pessoas' />"
                animateStroke={[0, 1.5, 1.25]}
              />
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
              {maintainers?.map((maintainer) => (
                <Maintainer
                  key={`maintainer:${maintainer.username}`}
                  maintainer={maintainer}
                />
              ))}
            </div>
          </main>
        </main>
      </div>
    </Layout>
  );
};

export default memo(MaintainersIndex);
