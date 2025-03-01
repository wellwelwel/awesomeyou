import type { ChangeEvent, MouseEvent, ReactNode } from 'react';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import {
  Dices,
  Earth,
  Flame,
  House,
  Lightbulb,
  Loader,
  Plane,
} from 'lucide-react';
import { Name } from '@site/src//components/Name';
import { Project } from '@site/src/components/Project';
import { SafeLink } from '@site/src/components/SafeLink';
import { categories } from '@site/src/configs/categories';
import { languages } from '@site/src/configs/languages';
import { extractRepository } from '@site/src/helpers/extract-repository';
import { projects } from '@site/src/helpers/get-contents';
import { mergeRepositories } from '@site/src/helpers/merge-projects';
import { randomize } from '@site/src/helpers/radomizer';
import { sortObjectByValues } from '@site/src/helpers/sort-object';

import '@site/src/css/pages/projects.scss';

const Projects = (): ReactNode => {
  const [scores, setScores] = useState<Record<string, number> | null>(null);
  const projectsByMaintainers = useMemo(() => projects(), []);
  const mergedProjects = useMemo(
    () =>
      mergeRepositories(projectsByMaintainers.flatMap((projects) => projects)),
    [projectsByMaintainers]
  );

  const [allProjects, setAllProjects] = useState(mergedProjects);
  const title = "<Brazil class='Open Source' />";

  // Using state for filters instead of external Sets
  const [categoryFilter, setCategoryFilter] = useState<
    keyof typeof categories | ''
  >('');
  const [languageFilter, setLanguageFilter] = useState<
    keyof typeof languages | ''
  >('');
  const [countryFilter, setCountryFilter] = useState<number | false>(false);
  const [sortByScore, setSortByScore] = useState<0 | 1 | false>(false);

  const filteredProjects = useMemo(() => {
    return allProjects.filter((project) => {
      const matchesCategory =
        !categoryFilter ||
        (project.categories && project.categories.includes(categoryFilter));

      const matchesLanguage =
        !languageFilter ||
        (project.languages && project.languages.includes(languageFilter));

      const matchesCountry =
        countryFilter === false ||
        project.madeInBrazil === Boolean(countryFilter);

      return matchesCategory && matchesLanguage && matchesCountry;
    });
  }, [allProjects, categoryFilter, languageFilter, countryFilter]);

  const displayedProjects = useMemo(() => {
    if (!scores || sortByScore === false) return filteredProjects;

    return [...filteredProjects].sort((a, b) => {
      const { organization: orgA, repository: repoA } = extractRepository(
        a.repository
      );
      const { organization: orgB, repository: repoB } = extractRepository(
        b.repository
      );
      const scoreA = scores[`${orgA}/${repoA}`] || 0;
      const scoreB = scores[`${orgB}/${repoB}`] || 0;

      return sortByScore === 0 ? scoreB - scoreA : scoreA - scoreB;
    });
  }, [filteredProjects, scores, sortByScore]);

  const filter = useCallback(
    (event: ChangeEvent<HTMLSelectElement>, type: 'language' | 'category') => {
      const value = event.target.value as keyof typeof languages;
      if (type === 'language') {
        setLanguageFilter(value);
        return;
      }

      setCategoryFilter(value as keyof typeof categories);
    },
    []
  );

  const filterByCountry = useCallback(
    (event: MouseEvent<HTMLButtonElement>, origin: number | false) => {
      document
        .querySelectorAll('button[data-filter="country"]')
        .forEach((btn) => btn.classList.remove('active'));
      event.currentTarget.classList.add('active');

      setCountryFilter(origin);
    },
    []
  );

  const sortProjectsByScore = useCallback(
    (event: MouseEvent<HTMLButtonElement>, sortByScoreValue: 0 | 1 | false) => {
      if (!scores) return;

      document
        .querySelectorAll('button[data-filter="order"]')
        .forEach((btn) => btn.classList.remove('active'));
      event.currentTarget.classList.add('active');

      setSortByScore(sortByScoreValue);
    },
    [scores]
  );

  useEffect(() => {
    setAllProjects(randomize(mergedProjects));
  }, [mergedProjects]);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    fetch(`/json/scores.json`, { signal }).then(async (response) => {
      const results = await response.json();

      setScores(results);
    });

    return () => {
      controller.abort();
    };
  }, [setScores]);

  return (
    <Layout title={title} description='Lista de projetos open source do Brasil'>
      <div id='projects'>
        <main>
          <header>
            <h1>
              <Name name={title} />
            </h1>
            <small>
              Uma lista inteligente pra você conhecer projetos{' '}
              <em>open-source</em> criados e mantidos por desenvolvedores{' '}
              <strong>brasileiros</strong>.
            </small>
            <section>
              <h2>Apoie gratuitamente</h2>
              <p>🌟 Dê uma estrela para os repositórios que mais gostar.</p>
              <p>
                🤝 Contribua resolvendo os issues abertos e tenha seu nome
                eternizado nos commits do repositório.
              </p>
              <p>
                💡 Use, teste e compartilhe projetos que você nem sabia que
                tinham nosso querido país envolvido.
              </p>
            </section>
          </header>
          <menu>
            <h3>Filtros</h3>
            <div className='container'>
              <div>
                <h4>Linguagens</h4>
                <select
                  name='languages'
                  onChange={(e) => filter(e, 'language')}
                  value={languageFilter}
                >
                  <option value=''>Todas</option>
                  {Object.entries(sortObjectByValues(languages)).map(
                    ([key, name]) => (
                      <option key={`filter:languages:${key}`} value={key}>
                        {name}
                      </option>
                    )
                  )}
                </select>
              </div>
              <div>
                <h4>Categorias</h4>
                <select
                  name='categories'
                  onChange={(e) => filter(e, 'category')}
                  value={categoryFilter}
                >
                  <option value=''>Todas</option>
                  {Object.entries(sortObjectByValues(categories)).map(
                    ([key, name]) => (
                      <option key={`filter:categories:${key}`} value={key}>
                        {name}
                      </option>
                    )
                  )}
                </select>
              </div>
            </div>

            <div className='container'>
              <div>
                <h4>Ordenar por:</h4>
                <div>
                  <button
                    className={sortByScore === false ? 'active' : ''}
                    data-filter='order'
                    onClick={(e) => sortProjectsByScore(e, false)}
                  >
                    <Dices /> Padrão
                  </button>
                  <button
                    className={sortByScore === 0 ? 'active' : ''}
                    data-filter='order'
                    onClick={(e) => sortProjectsByScore(e, 0)}
                  >
                    <Flame /> Maior Score
                  </button>
                  <button
                    className={sortByScore === 1 ? 'active' : ''}
                    data-filter='order'
                    onClick={(e) => sortProjectsByScore(e, 1)}
                  >
                    <Loader /> Menor Score
                  </button>
                </div>
              </div>
              <div>
                <h4>Países</h4>
                <div>
                  <button
                    className={countryFilter === false ? 'active' : ''}
                    data-filter='country'
                    onClick={(e) => filterByCountry(e, false)}
                  >
                    <Earth />
                    Todos
                  </button>
                  <button
                    className={countryFilter === 1 ? 'active' : ''}
                    data-filter='country'
                    onClick={(e) => filterByCountry(e, 1)}
                  >
                    <House />
                    Brasil
                  </button>
                  <button
                    className={countryFilter === 0 ? 'active' : ''}
                    data-filter='country'
                    onClick={(e) => filterByCountry(e, 0)}
                  >
                    <Plane />
                    Estrangeiros
                  </button>
                </div>
              </div>
            </div>

            <div>
              <h4>
                Exibindo{' '}
                <span className='length'>{displayedProjects.length}</span>{' '}
                Projetos
              </h4>
              <small>
                <blockquote>
                  <Lightbulb /> Por padrão, os projetos são exibidos em ordem
                  aleatória por meio do algoritmo de{' '}
                  <SafeLink
                    rel='noopener noreferrer'
                    to='https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle'
                  >
                    Fisher-Yates
                  </SafeLink>
                  . Assim, você sempre irá descobrir projetos novos toda vez que
                  voltar na lista.
                </blockquote>
              </small>
            </div>
          </menu>
          <div className='container'>
            {displayedProjects.map((project, i) => {
              const { organization, repository } = extractRepository(
                project.repository
              );

              return (
                <Project
                  key={`project:${i}`}
                  score={
                    scores
                      ? scores?.[`${organization}/${repository}`]
                      : undefined
                  }
                  {...project}
                />
              );
            })}
          </div>
        </main>
      </div>
      <Link to='/'>Back</Link>
    </Layout>
  );
};

export default memo(Projects);
