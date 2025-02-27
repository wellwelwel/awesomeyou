import type { FC } from 'react';
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
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
  Unplug,
  UsersRound,
  UtensilsCrossed,
  Wrench,
} from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import { MaintainerInfo } from '@site/src/@types/maintainers';
import { MergedProjects, ProjectStats } from '@site/src/@types/projects';
import { Name } from '@site/src/components/Name';
import { SafeLink as Link } from '@site/src/components/SafeLink';
import { categories } from '@site/src/configs/categories';
import { languages } from '@site/src/configs/languages';
import { ProjectsContext } from '@site/src/contexts/Projects';
import { extractRepository } from '@site/src/helpers/extract-repository';
import { randomize } from '@site/src/helpers/radomizer';

export const Project: FC<MergedProjects & { score?: number }> = ({
  name,
  description,
  repository: repositoryURL,
  npm,
  pypi,
  homebrew,
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

  const { getCounter } = useContext(ProjectsContext);
  const counter = getCounter(projectName);
  const isFirstOnes = counter <= 2;
  const [stats, setStats] = useState<ProjectStats | null>(null);
  const [maintainersInfos, setMaintainersInfos] = useState<
    Record<string, MaintainerInfo>
  >(Object.create(null));
  const hasFetchedProjects = useRef(false);
  const hasFetchedMaintainers = useRef(false);
  const { ref: inViewRef, inView: hookInView } = useInView({
    threshold: 0,
    triggerOnce: true,
  });

  const inView = isFirstOnes ? true : hookInView;

  const getStats = useCallback(() => {
    if (hasFetchedProjects.current) return;

    hasFetchedProjects.current = true;

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
    if (hasFetchedMaintainers.current) return;
    hasFetchedMaintainers.current = true;

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
              hireable: null,
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

  useEffect(() => {
    getMaintainersInfos();
  }, [getMaintainersInfos]);

  useEffect(() => {
    if (!(isFirstOnes || inView)) return;

    getStats();
    getMaintainersInfos();
  }, [isFirstOnes, inView, getStats, getMaintainersInfos]);

  return (
    <nav
      ref={inViewRef}
      className={(() => {
        if (isFirstOnes) return undefined;
        return inView ? 'show' : 'hide';
      })()}
      data-counter={counter}
      data-repository={repositoryURL}
      data-madeinbrazil={Number(madeInBrazil)}
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
          <Link to={repositoryURL} aria-label='Go to repository'>
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
                  {stats?.license || null}
                </small>
              </span>
              <ExternalLink />
            </h2>
            <p>{description}</p>
          </Link>

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
                      <Link to={`${repositoryURL}/graphs/contributors`}>
                        <HeartHandshake />
                        {stats?.contributors?.label || null}
                      </Link>
                    </td>
                  </tr>

                  {npm ? (
                    <tr>
                      <td>
                        <span>Downloads por mês:</span>
                      </td>
                      <td>
                        <Link to={`https://www.npmjs.com/package/${npm}`}>
                          <img loading='lazy' src='/img/npm.svg' />
                          {stats?.npm?.label || null}
                        </Link>
                      </td>
                    </tr>
                  ) : null}

                  {homebrew ? (
                    <tr>
                      <td>
                        <span>Downloads por mês:</span>
                      </td>
                      <td>
                        <Link
                          to={`https://formulae.brew.sh/formula/${homebrew}`}
                        >
                          <img loading='lazy' src='/img/homebrew.svg' />
                          {stats?.homebrew?.label || null}
                        </Link>
                      </td>
                    </tr>
                  ) : null}

                  {pypi ? (
                    <tr>
                      <td>
                        <span>Downloads por mês:</span>
                      </td>
                      <td>
                        <Link to={`https://pypi.org/project/${pypi}/`}>
                          <img loading='lazy' src='/img/pypi.svg' />
                          {stats?.pypi?.label || null}
                        </Link>
                      </td>
                    </tr>
                  ) : null}

                  <tr>
                    <td>Forks:</td>
                    <td>
                      <Link to={`${repositoryURL}/graphs/contributors`}>
                        <UtensilsCrossed />
                        {stats?.forks?.label || null}
                      </Link>
                    </td>
                  </tr>

                  <tr>
                    <td>Estrelas:</td>
                    <td>
                      <Link to={`${repositoryURL}/stargazers`}>
                        <Star />
                        {stats?.stars?.label || null}
                      </Link>
                    </td>
                  </tr>
                </tbody>
              </table>

              <table ref={refs.activity.table}>
                <tbody>
                  <tr>
                    <td>Issues abertas:</td>
                    <td>
                      <Link to={`${repositoryURL}/issues`}>
                        <Bug />
                        {stats?.issues?.label || null}
                      </Link>
                    </td>
                  </tr>

                  <tr>
                    <td>Issues fechadas:</td>
                    <td>
                      <Link to={`${repositoryURL}/issues?q=is:issue+is:closed`}>
                        <BugOff />
                        {stats?.closedIssues?.label || null}
                      </Link>
                    </td>
                  </tr>

                  <tr>
                    <td>Último commit:</td>
                    <td>
                      <Link to={`${repositoryURL}/commits`}>
                        <Wrench />
                        {stats?.commits || null}
                      </Link>
                    </td>
                  </tr>
                </tbody>
              </table>
            </>

            <h3>
              <UsersRound /> Mantenedores Brasileiros
            </h3>
            <menu>
              {randomize(maintainers).map((maintainer) => (
                <Link
                  key={`maintainer:${projectName}:${maintainer}`}
                  to={`https://github.com/${maintainer}`}
                >
                  {maintainersInfos[maintainer]?.name || maintainer}
                  <ArrowUpDown />
                  {maintainersInfos[maintainer]?.name ? (
                    <section>
                      <div>
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
                      </div>

                      {maintainersInfos[maintainer].location ? (
                        <div>
                          <MapPin /> {maintainersInfos[maintainer].location}
                        </div>
                      ) : null}
                      {maintainersInfos[maintainer].hireable ? (
                        <div>
                          <Unplug /> Disponível para contratação
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
                    </section>
                  ) : null}
                </Link>
              ))}
            </menu>
          </div>
          <footer>
            <Link to={repositoryURL}>
              <span>Apoie esse projeto</span> <StarHalf />
            </Link>
            {message ? (
              <section>
                <span>{message}</span>
              </section>
            ) : null}
          </footer>
        </section>
      </main>
    </nav>
  );
};
