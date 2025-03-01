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

const activeCategoryFilter = new Set<string>('');
const activeLanguageFilter = new Set<string>('');

const Projects = (): ReactNode => {
  const [scores, setScores] = useState<Record<string, number> | null>(null);
  const projectsByMaintainers = useMemo(() => projects(), []);
  const mergedProjects = useMemo(
    () =>
      mergeRepositories(projectsByMaintainers.flatMap((projects) => projects)),
    [projectsByMaintainers]
  );

  const [allProjects, setAllProjects] = useState(mergedProjects);
  const projectsLength = allProjects.length;
  const [visibleCount, setVisibleCount] = useState(projectsLength);

  const title = "<Brazil class='Open Source' />";

  const filter = useCallback(
    (event: ChangeEvent<HTMLSelectElement>, type: 'language' | 'category') => {
      const value = event.target.value;

      if (type === 'language') {
        activeLanguageFilter.clear();
        if (value) activeLanguageFilter.add(value);
      } else {
        activeCategoryFilter.clear();
        if (value) activeCategoryFilter.add(value);
      }

      const allElements = Array.from(
        document.querySelectorAll('[data-repository]')
      );

      let visibleItems = 0;

      for (const project of allElements) {
        const matchesCategory =
          !activeCategoryFilter.size ||
          Array.from(activeCategoryFilter).some((category) => {
            const attr = project.getAttribute(`data-${category}`);
            return attr !== null;
          });

        const matchesLanguage =
          !activeLanguageFilter.size ||
          Array.from(activeLanguageFilter).some((lang) => {
            const attr = project.getAttribute(`data-${lang}`);
            return attr !== null;
          });

        const isHiddenByCountry = project.classList.contains('d-n2');

        const shouldBeVisible =
          matchesCategory && matchesLanguage && !isHiddenByCountry;
        project.classList.toggle('d-n', !shouldBeVisible);

        if (shouldBeVisible) {
          visibleItems++;
        }
      }

      setVisibleCount(visibleItems);
    },
    []
  );

  const filterByCountry = useCallback(
    (event: MouseEvent<HTMLButtonElement>, origin: number | false) => {
      document
        .querySelectorAll('button[data-filter="country"]')
        .forEach((btn) => btn.classList.remove('active'));
      event.currentTarget.classList.add('active');

      const allElements = Array.from(
        document.querySelectorAll('[data-repository]')
      );

      let visibleItems = 0;

      for (const project of allElements) {
        const isHiddenByCountryFilter =
          typeof origin === 'number' &&
          project.getAttribute('data-madeinbrazil') !== String(origin);

        project.classList.toggle('d-n2', isHiddenByCountryFilter);

        const isHiddenByTypeFilter = project.classList.contains('d-n');
        const isVisible = !isHiddenByCountryFilter && !isHiddenByTypeFilter;

        if (isVisible) {
          visibleItems++;
        }
      }

      setVisibleCount(visibleItems);
    },
    []
  );

  const sortProjectsByScore = useCallback(
    async (
      event: MouseEvent<HTMLButtonElement>,
      sortByScore: 0 | 1 | false
    ) => {
      if (!scores) return;

      document
        .querySelectorAll('button[data-filter="order"]')
        .forEach((btn) => btn.classList.remove('active'));

      event.currentTarget.classList.add('active');

      const allElements = Array.from<HTMLElement>(
        document.querySelectorAll('[data-repository]')
      );

      if (typeof sortByScore !== 'number') {
        for (const project of allElements)
          project.style.removeProperty('order');

        return;
      }

      const itemsToSort = allElements.map((element) => {
        const repo = element.getAttribute('data-repository');
        if (!repo) return { element, score: 0 };

        const repoPath = repo.replace('https://github.com/', '');

        return {
          element,
          score: scores[repoPath] || 0,
        };
      });

      if (sortByScore === 0) {
        itemsToSort.sort((a, b) => b.score - a.score);
      } else {
        itemsToSort.sort((a, b) => a.score - b.score);
      }

      itemsToSort.forEach((item, index) => {
        item.element.style.order = String(index + 1);
      });
    },
    [scores]
  );

  useEffect(() => {
    setAllProjects(randomize(mergedProjects));
    setVisibleCount(mergedProjects.length);
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
                    className='active'
                    data-filter='order'
                    onClick={(e) => sortProjectsByScore(e, false)}
                  >
                    <Dices /> Padrão
                  </button>
                  <button
                    data-filter='order'
                    onClick={(e) => sortProjectsByScore(e, 0)}
                  >
                    <Flame /> Maior Score
                  </button>
                  <button
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
                    className='active'
                    data-filter='country'
                    onClick={(e) => filterByCountry(e, false)}
                  >
                    <Earth />
                    Todos
                  </button>
                  <button
                    data-filter='country'
                    onClick={(e) => filterByCountry(e, 1)}
                  >
                    <House />
                    Brasil
                  </button>
                  <button
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
                Exibindo <span className='length'>{visibleCount}</span> Projetos
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
            {allProjects.map((project, i) => {
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
