/*---------------------------------------------------------------------------------------------
 *  Copyright (c) https://awesomeyou.io and contributors. All rights reserved.
 *  Licensed under the GNU Affero General Public License v3.0. See https://github.com/wellwelwel/awesomeyou/blob/main/LICENSE for license information.
 *--------------------------------------------------------------------------------------------*/

import type { ProcessedProject } from '@site/src/@types/projects';
import type { FC } from 'react';
import React, { useCallback, useRef } from 'react';
import Link from '@docusaurus/Link';
import {
  Activity,
  Bug,
  BugOff,
  Code,
  Dna,
  ExternalLink,
  HeartHandshake,
  MapPin,
  Network,
  Rocket,
  Scale,
  Shapes,
  Star,
  StarHalf,
  UsersRound,
  UtensilsCrossed,
  Wrench,
} from 'lucide-react';
import { Name } from '@site/src/components/Name';
import { normalizeURL, SafeLink } from '@site/src/components/SafeLink';
import { ScoreIcon } from '@site/src/components/ScoreIcon';
import { categories } from '@site/src/configs/categories';
import { languages } from '@site/src/configs/languages';
import { normalizeChars } from '@site/src/helpers/normalize-chars';
import { randomize } from '@site/src/helpers/randomizer';
import { useScroll } from '@site/src/hooks/useScroll';

export const Project: FC<ProcessedProject> = ({
  name,
  description,
  maintainers,
  languages: currentLanguages,
  categories: currentCategories,
  madeInBrazil,
  message,
  organization,
  repository,
  url,
  npm: npmPkg,
  homebrew: homebrewPkg,
  pypi: pypiPkg,
  packagist: packagistPkg,
  vscode: vscodePkg,
  chocolatey: chocolateyPkg,
  stats,
}) => {
  const refs = {
    container: useRef<HTMLElement>(null),
    impact: {
      h3: useRef<HTMLTableElement>(null),
      table: useRef<HTMLTableElement>(null),
    },
    activity: {
      h3: useRef<HTMLTableElement>(null),
      table: useRef<HTMLTableElement>(null),
    },
  };

  if (!organization || !repository) return null;

  const {
    score,
    npm,
    homebrew,
    pypi,
    packagist,
    chocolatey,
    vscode,
    closedIssues,
    commits,
    contributors,
    forks,
    issues,
    license,
    repositoryDependents,
    stars,
  } = stats;
  const projectName = name || repository;

  const changeTab = useCallback(
    (activate: 'impact' | 'activity') => {
      if (activate === 'impact') {
        refs.activity.h3.current?.classList.remove('active');
        refs.activity.table.current?.classList.remove('active');
        refs.impact.h3.current?.classList.add('active');
        refs.impact.table.current?.classList.add('active');

        return;
      }

      refs.impact.h3.current?.classList.remove('active');
      refs.impact.table.current?.classList.remove('active');
      refs.activity.h3.current?.classList.add('active');
      refs.activity.table.current?.classList.add('active');
    },
    [refs]
  );

  useScroll(refs.container, (isVisible, target) => {
    if (!isVisible) return;

    target.classList.add('show');
  });

  return (
    <nav
      ref={refs.container}
      data-search={normalizeChars(
        [
          repository,
          name || '',
          ...Object.values(maintainers).map((info) => info.name),
        ].join()
      )}
      data-repository={url}
      data-madeinbrazil={Number(madeInBrazil) || 0}
      {...currentCategories?.reduce((acc, category) => {
        const key = `data-${category}`;

        acc[key] = true;

        return acc;
      }, Object.create(null))}
      {...currentLanguages?.reduce((acc, category) => {
        const key = `data-${category}`;

        acc[key] = true;

        return acc;
      }, Object.create(null))}
      className='hide'
    >
      <main>
        <section>
          <SafeLink to={url} aria-label='Go to repository'>
            <h2>
              <img
                src={`https://avatars.githubusercontent.com/${organization}?size=96`}
                loading='lazy'
                alt={`${projectName} profile avatar`}
              />
              <span>
                <span>
                  <Name name={projectName} />
                </span>
                <small>
                  <Scale />
                  {license}
                </small>
              </span>
              <ExternalLink />
            </h2>
            <p>{description}</p>
          </SafeLink>

          {currentLanguages || currentCategories ? (
            <menu>
              {currentLanguages?.map((current, i) => (
                <button key={`language:${i}`} data-name={languages[current]}>
                  <Code />
                  {languages[current]}
                </button>
              ))}
              {currentCategories?.map((current, i) => (
                <button key={`language:${i}`} data-name={categories[current]}>
                  <Shapes />
                  {categories[current]}
                </button>
              ))}
            </menu>
          ) : null}

          <div className='social'>
            <div className='tabs'>
              <h3
                ref={refs.impact.h3}
                className='active'
                onClick={() => changeTab('impact')}
              >
                <Rocket /> Impacto
              </h3>

              <h3 ref={refs.activity.h3} onClick={() => changeTab('activity')}>
                <Activity /> Atividade
              </h3>
            </div>

            <>
              <table ref={refs.impact.table} className='active'>
                <tbody>
                  <tr>
                    <td>
                      <span>Score:</span>
                    </td>
                    <td>
                      <ScoreIcon score={score} />
                      <span className='score'>
                        {Number(score).toLocaleString('pt-BR')}
                      </span>
                    </td>
                  </tr>

                  <tr>
                    <td>Contribuidores:</td>
                    <td>
                      <SafeLink to={`${url}/graphs/contributors`}>
                        <HeartHandshake />
                        {contributors.label}
                      </SafeLink>
                    </td>
                  </tr>

                  {repositoryDependents.value > 0 ? (
                    <tr>
                      <td>Dependentes:</td>
                      <td>
                        <SafeLink to={`${url}/network/dependents`}>
                          <Dna />
                          {repositoryDependents.label}
                        </SafeLink>
                      </td>
                    </tr>
                  ) : null}

                  {npm?.value ? (
                    <tr title='npm'>
                      <td>
                        <span>Downloads por mês:</span>
                      </td>
                      <td>
                        <SafeLink
                          to={`https://www.npmjs.com/package/${npmPkg}`}
                        >
                          <img loading='lazy' src='/assets/img/npm.svg' />
                          {npm.label}
                        </SafeLink>
                      </td>
                    </tr>
                  ) : null}

                  {homebrew?.value ? (
                    <tr title='Homebrew'>
                      <td>
                        <span>Downloads por mês:</span>
                      </td>
                      <td>
                        <SafeLink
                          to={`https://formulae.brew.sh/formula/${homebrewPkg}`}
                        >
                          <img loading='lazy' src='/assets/img/homebrew.svg' />
                          {homebrew.label}
                        </SafeLink>
                      </td>
                    </tr>
                  ) : null}

                  {pypi?.value ? (
                    <tr title='PyPi'>
                      <td>
                        <span>Downloads por mês:</span>
                      </td>
                      <td>
                        <SafeLink to={`https://pypi.org/project/${pypiPkg}/`}>
                          <img loading='lazy' src='/assets/img/pypi.svg' />
                          {pypi.label}
                        </SafeLink>
                      </td>
                    </tr>
                  ) : null}

                  {packagist?.value ? (
                    <tr title='Packagist'>
                      <td>
                        <span>Downloads por mês:</span>
                      </td>
                      <td>
                        <SafeLink
                          to={`https://packagist.org/packages/${packagistPkg}`}
                        >
                          <img loading='lazy' src='/assets/img/packagist.svg' />
                          {packagist.label}
                        </SafeLink>
                      </td>
                    </tr>
                  ) : null}

                  {chocolatey?.value ? (
                    <tr title='Chocolatey'>
                      <td>
                        <span>Downloads Totais:</span>
                      </td>
                      <td>
                        <SafeLink
                          to={`https://community.chocolatey.org/packages/${chocolateyPkg}`}
                        >
                          <img
                            loading='lazy'
                            src='/assets/img/chocolatey.svg'
                          />
                          {chocolatey.label}
                        </SafeLink>
                      </td>
                    </tr>
                  ) : null}

                  {vscode?.value ? (
                    <tr title='Visual Studio Code Marketplace'>
                      <td>
                        <span>Downloads Totais:</span>
                      </td>
                      <td>
                        <SafeLink
                          to={`https://marketplace.visualstudio.com/items?itemName=${vscodePkg}`}
                        >
                          <img loading='lazy' src='/assets/img/vscode.svg' />
                          {vscode.label}
                        </SafeLink>
                      </td>
                    </tr>
                  ) : null}

                  <tr>
                    <td>Forks:</td>
                    <td>
                      <SafeLink to={`${url}/graphs/contributors`}>
                        <UtensilsCrossed />
                        {forks.label}
                      </SafeLink>
                    </td>
                  </tr>

                  <tr>
                    <td>Estrelas:</td>
                    <td>
                      <SafeLink to={`${url}/stargazers`}>
                        <Star />
                        {stars.label}
                      </SafeLink>
                    </td>
                  </tr>
                </tbody>
              </table>

              <table ref={refs.activity.table}>
                <tbody>
                  <tr>
                    <td>Issues abertas:</td>
                    <td>
                      <SafeLink to={`${url}/issues`}>
                        <Bug />
                        {issues.label}
                      </SafeLink>
                    </td>
                  </tr>

                  <tr>
                    <td>Issues fechadas:</td>
                    <td>
                      <SafeLink to={`${url}/issues?q=is:issue+is:closed`}>
                        <BugOff />
                        {closedIssues.label}
                      </SafeLink>
                    </td>
                  </tr>

                  <tr>
                    <td>Último commit:</td>
                    <td>
                      <SafeLink to={`${url}/commits`}>
                        <Wrench />
                        {commits}
                      </SafeLink>
                    </td>
                  </tr>
                </tbody>
              </table>
            </>

            <h3>
              <span>
                <UsersRound /> Mantenedores Brasileiros
              </span>
            </h3>
            <menu>
              {randomize(maintainers).map((maintainer) => (
                <Link
                  key={`maintainer:${projectName}:${maintainer.username}`}
                  to={`/maintainers/${maintainer.username}`}
                >
                  <img
                    src={`https://avatars.githubusercontent.com/${maintainer.username}?size=72`}
                    loading='lazy'
                    alt={`${projectName} profile avatar`}
                  />
                  <section>
                    <header>
                      <aside>
                        <img
                          src={`https://avatars.githubusercontent.com/${maintainer.username}?size=184`}
                          loading='lazy'
                          alt={`${projectName} profile avatar`}
                        />
                      </aside>
                      <aside>
                        <h4>
                          {maintainer.name}{' '}
                          <strong>({maintainer.username})</strong>
                        </h4>
                        {maintainer.bio ? <div>{maintainer.bio}</div> : null}
                      </aside>
                    </header>

                    <footer>
                      {maintainer.location ? (
                        <div>
                          <MapPin /> {maintainer.location}
                        </div>
                      ) : null}
                      {maintainer.blog ? (
                        <div>
                          <Network />
                          {normalizeURL(maintainer.blog)}
                        </div>
                      ) : null}
                    </footer>
                  </section>
                </Link>
              ))}
            </menu>
          </div>
          <footer>
            <SafeLink to={url}>
              <span>Apoie esse projeto</span> <StarHalf />
            </SafeLink>
            {message ? (
              <section>
                <h4>Esse projeto deixou uma mensagem para você:</h4>
                <small>
                  <span>{message}</span>
                </small>
              </section>
            ) : null}
          </footer>
        </section>
      </main>
    </nav>
  );
};
