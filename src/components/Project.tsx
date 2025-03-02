import type { FC } from 'react';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import Link from '@docusaurus/Link';
import {
  Activity,
  ArrowUpDown,
  Award,
  Bug,
  BugOff,
  Code,
  ExternalLink,
  Flame,
  FlameKindling,
  HeartHandshake,
  Loader,
  MapPin,
  Network,
  Rocket,
  Scale,
  Shapes,
  Star,
  StarHalf,
  Trophy,
  UsersRound,
  UtensilsCrossed,
  Wrench,
} from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import { MaintainerInfo } from '@site/src/@types/maintainers';
import { MergedProjects, ProjectStats } from '@site/src/@types/projects';
import { Name } from '@site/src/components/Name';
import { SafeLink } from '@site/src/components/SafeLink';
import { categories } from '@site/src/configs/categories';
import { languages } from '@site/src/configs/languages';
import { extractRepository } from '@site/src/helpers/extract-repository';

export const Project: FC<MergedProjects & { score?: number }> = ({
  name,
  description,
  repository: repositoryURL,
  npm,
  pypi,
  homebrew,
  vscode,
  chocolatey,
  maintainers,
  languages: currentLanguages,
  categories: currentCategories,
  madeInBrazil,
  message,
  score,
}) => {
  const repositoryData = extractRepository(repositoryURL);
  const refs = {
    impact: {
      h3: useRef<HTMLTableElement>(null),
      table: useRef<HTMLTableElement>(null),
    },
    activity: {
      h3: useRef<HTMLTableElement>(null),
      table: useRef<HTMLTableElement>(null),
    },
  };

  if (
    !repositoryData ||
    !repositoryData.organization ||
    !repositoryData.repository
  )
    return null;

  const { organization, repository } = repositoryData;
  const projectName = name || repository;
  const [stats, setStats] = useState<ProjectStats>(Object.create(null));
  const [maintainersInfos, setMaintainersInfos] = useState<
    Record<string, MaintainerInfo>
  >(Object.create(null));

  const getStats = useCallback(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    fetch(`/json/projects/${organization}/${repository}/stats.json`, {
      signal,
    }).then(async (results) => {
      const data = await results.json();

      setStats(data);
    });

    return () => controller.abort();
  }, [organization, repository]);

  const getMaintainersInfos = useCallback(async () => {
    const controller = new AbortController();
    const signal = controller.signal;

    const responses = await Promise.all(
      maintainers.map((maintainer) =>
        fetch(`/json/maintainers/${maintainer}/infos.json`, { signal })
          .then((response) => (response.ok ? response.json() : null))
          .then((data) => [
            maintainer,
            data ?? {
              name: maintainer,
              bio: '',
              blog: '',
              location: '',
            },
          ])
      )
    );

    setMaintainersInfos((prev) => ({
      ...prev,
      ...Object.fromEntries(responses),
    }));

    return () => controller.abort();
  }, [maintainers]);

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

  const { ref: inViewRef, inView } = useInView({
    threshold: 0,
    triggerOnce: true,
  });

  useEffect(() => {
    getMaintainersInfos();
    getStats();
  }, [getMaintainersInfos, getStats]);

  return (
    <nav
      ref={inViewRef}
      className={inView ? 'show' : 'hide'}
      data-repository={repositoryURL}
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
    >
      <main>
        <section>
          <SafeLink to={repositoryURL} aria-label='Go to repository'>
            <h2>
              <img
                src={`https://avatars.githubusercontent.com/${organization}`}
                loading='lazy'
                alt={`${projectName} profile avatar`}
              />
              <span>
                <span>
                  <Name name={projectName} />
                </span>
                <small>
                  <Scale />
                  {stats?.license}
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
                  {score ? (
                    <tr>
                      <td>
                        <span>Score:</span>
                      </td>
                      <td>
                        {score > 1_000_000 ? (
                          <Trophy />
                        ) : score > 100_000 ? (
                          <Award />
                        ) : score > 10_000 ? (
                          <Flame />
                        ) : score > 1_000 ? (
                          <FlameKindling />
                        ) : (
                          <Loader />
                        )}
                        <span className='score'>
                          {Number(score).toLocaleString('pt-BR')}
                        </span>
                      </td>
                    </tr>
                  ) : null}

                  <tr>
                    <td>Contribuidores:</td>
                    <td>
                      <SafeLink to={`${repositoryURL}/graphs/contributors`}>
                        <HeartHandshake />
                        {stats?.contributors?.label}
                      </SafeLink>
                    </td>
                  </tr>

                  {npm ? (
                    <tr title='npm'>
                      <td>
                        <span>Downloads por mês:</span>
                      </td>
                      <td>
                        <SafeLink to={`https://www.npmjs.com/package/${npm}`}>
                          <img loading='lazy' src='/img/npm.svg' />
                          {stats?.npm?.label}
                        </SafeLink>
                      </td>
                    </tr>
                  ) : null}

                  {homebrew ? (
                    <tr title='Homebrew'>
                      <td>
                        <span>Downloads por mês:</span>
                      </td>
                      <td>
                        <SafeLink
                          to={`https://formulae.brew.sh/formula/${homebrew}`}
                        >
                          <img loading='lazy' src='/img/homebrew.svg' />
                          {stats?.homebrew?.label}
                        </SafeLink>
                      </td>
                    </tr>
                  ) : null}

                  {pypi ? (
                    <tr title='PyPi'>
                      <td>
                        <span>Downloads por mês:</span>
                      </td>
                      <td>
                        <SafeLink to={`https://pypi.org/project/${pypi}/`}>
                          <img loading='lazy' src='/img/pypi.svg' />
                          {stats?.pypi?.label}
                        </SafeLink>
                      </td>
                    </tr>
                  ) : null}

                  {chocolatey ? (
                    <tr title='Chocolatey'>
                      <td>
                        <span>Downloads Totais:</span>
                      </td>
                      <td>
                        <SafeLink
                          to={`https://community.chocolatey.org/packages/${chocolatey}`}
                        >
                          <img loading='lazy' src='/img/chocolatey.svg' />
                          {stats?.chocolatey?.label}
                        </SafeLink>
                      </td>
                    </tr>
                  ) : null}

                  {vscode ? (
                    <tr title='Visual Studio Code Marketplace'>
                      <td>
                        <span>Downloads Totais:</span>
                      </td>
                      <td>
                        <SafeLink
                          to={`https://marketplace.visualstudio.com/items?itemName=${vscode}`}
                        >
                          <img loading='lazy' src='/img/vscode.svg' />
                          {stats?.vscode?.label}
                        </SafeLink>
                      </td>
                    </tr>
                  ) : null}

                  <tr>
                    <td>Forks:</td>
                    <td>
                      <SafeLink to={`${repositoryURL}/graphs/contributors`}>
                        <UtensilsCrossed />
                        {stats?.forks?.label}
                      </SafeLink>
                    </td>
                  </tr>

                  <tr>
                    <td>Estrelas:</td>
                    <td>
                      <SafeLink to={`${repositoryURL}/stargazers`}>
                        <Star />
                        {stats?.stars?.label}
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
                      <SafeLink to={`${repositoryURL}/issues`}>
                        <Bug />
                        {stats?.issues?.label}
                      </SafeLink>
                    </td>
                  </tr>

                  <tr>
                    <td>Issues fechadas:</td>
                    <td>
                      <SafeLink
                        to={`${repositoryURL}/issues?q=is:issue+is:closed`}
                      >
                        <BugOff />
                        {stats?.closedIssues?.label}
                      </SafeLink>
                    </td>
                  </tr>

                  <tr>
                    <td>Último commit:</td>
                    <td>
                      <SafeLink to={`${repositoryURL}/commits`}>
                        <Wrench />
                        {stats?.commits}
                      </SafeLink>
                    </td>
                  </tr>
                </tbody>
              </table>
            </>

            <h3>
              <UsersRound /> Mantenedores Brasileiros
            </h3>
            <menu>
              {maintainers.map((maintainer) => (
                <Link
                  target='_blank'
                  key={`maintainer:${projectName}:${maintainer}`}
                  to={`/maintainers/${maintainer}`}
                >
                  {maintainersInfos[maintainer]?.name || maintainer}
                  <ArrowUpDown />
                  {maintainersInfos[maintainer]?.name ? (
                    <section>
                      <header>
                        <aside>
                          <img
                            src={`https://avatars.githubusercontent.com/${maintainer}`}
                            loading='lazy'
                            alt={`${projectName} profile avatar`}
                          />
                        </aside>
                        <aside>
                          <h4>
                            {maintainersInfos[maintainer].name}{' '}
                            <strong>({maintainer})</strong>
                          </h4>
                          {maintainersInfos[maintainer].bio ? (
                            <div>{maintainersInfos[maintainer].bio}</div>
                          ) : null}
                        </aside>
                      </header>

                      <footer>
                        {maintainersInfos[maintainer].location ? (
                          <div>
                            <MapPin /> {maintainersInfos[maintainer].location}
                          </div>
                        ) : null}
                        {maintainersInfos[maintainer].blog ? (
                          <div>
                            <Network />
                            {maintainersInfos[maintainer].blog.replace(
                              /(^http(s)?:\/\/)|\/$/g,
                              ''
                            )}
                          </div>
                        ) : null}
                      </footer>
                    </section>
                  ) : null}
                </Link>
              ))}
            </menu>
          </div>
          <footer>
            <SafeLink to={repositoryURL}>
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
