import '@site/src/css/pages/projects.scss';

import type { MergedProjects } from '@site/src/@types/projects';
import type { ChangeEvent, FC, MouseEvent, ReactNode } from 'react';
import {
  memo,
  startTransition,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import Layout from '@theme/Layout';
import {
  ArrowDownWideNarrow,
  Code,
  Dices,
  Earth,
  Flame,
  House,
  Plane,
  Quote,
  Search,
  SlidersHorizontal,
  Sprout,
} from 'lucide-react';
import { Name } from '@site/src//components/Name';
import { FAQ } from '@site/src/components/FAQ';
import { Project } from '@site/src/components/Project';
import { categories } from '@site/src/configs/categories';
import { languages } from '@site/src/configs/languages';
import { extractRepository } from '@site/src/helpers/extract-repository';
import { randomize } from '@site/src/helpers/radomizer';
import { sortObjectByValues } from '@site/src/helpers/sort-object';
import { search } from '../helpers/search';

type ProjectsProps = {
  title: ReactNode;
  icon: ReactNode;
  description: ReactNode;
  projects: MergedProjects[];
  excludeFilters?: (keyof typeof categories)[];
};

const tips = {
  default:
    'Por padrão, os projetos são exibidos em ordem aleatória, assim você sempre descobrirá novos projetos ao voltar aqui.',
  greater:
    'Projetos com grande impacto se destacam por sua ampla adoção, popularidade e pela força de sua comunidade, especialmente quando somados entre si.',
  less: 'Descubra e incentive projetos inovadores! Ao contribuir com projetos em crescimento, você tem a oportunidade de participar do amadurecimento de novas ideias e tecnologias.',
};

const Projects: FC<ProjectsProps> = ({
  title,
  icon,
  description,
  projects,
  excludeFilters,
}) => {
  const [allProjects, setAllProjects] = useState<MergedProjects[]>([]);
  const [scores, setScores] = useState<Record<string, number> | null>(null);
  const projectsLength = allProjects.length;
  const [visibleCount, setVisibleCount] = useState(projectsLength);
  const { current: activeCategoryFilter } = useRef(new Set<string>(''));
  const { current: activeLanguageFilter } = useRef(new Set<string>(''));
  const searchRef = useRef<HTMLInputElement>(null);
  const [tip, setTip] = useState<keyof typeof tips>('default');

  const usedLanguages = useMemo(() => {
    const languageSet = new Set<string>();

    allProjects.forEach((project) => {
      if (project.languages) {
        project.languages.forEach((lang) => languageSet.add(String(lang)));
      }
    });

    return languageSet;
  }, [allProjects]);

  const usedCategories = useMemo(() => {
    const categorySet = new Set<string>();

    allProjects.forEach((project) => {
      if (project.categories) {
        project.categories.forEach((cat) => categorySet.add(String(cat)));
      }
    });

    if (excludeFilters)
      for (const category of excludeFilters) categorySet.delete(category);

    return categorySet;
  }, [allProjects]);

  const filter = useCallback(
    (
      event: MouseEvent<HTMLButtonElement>,
      type: 'language' | 'category',
      value: string
    ) => {
      event.currentTarget
        .parentElement!.querySelectorAll('button')
        .forEach((btn) => btn.classList.remove('active'));
      event.currentTarget.classList.add('active');

      if (searchRef.current) searchRef.current.value = '';

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

      for (const element of allElements) element.classList.remove('d-n-search');

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

      if (searchRef.current) searchRef.current.value = '';

      const allElements = Array.from(
        document.querySelectorAll('[data-repository]')
      );

      for (const element of allElements) element.classList.remove('d-n-search');

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

      if (sortByScore === 0) setTip('greater');
      else if (sortByScore === 1) setTip('less');
      else setTip('default');

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

      itemsToSort.forEach(
        (item, index) => (item.element.style.order = String(index + 1))
      );
    },
    [scores]
  );

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    startTransition(() => {
      fetch(`/json/scores.json`, { signal }).then(async (response) => {
        const results = await response.json();

        setScores(results);
      });
    });

    return () => {
      controller.abort();
    };
  }, [setScores]);

  const handleSearch = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      search(e);

      setVisibleCount(
        Array.from(
          document.querySelectorAll(
            '[data-repository]:not(.d-n-search):not(.d-n):not(.d-n2)'
          )
        ).length
      );
    },
    [search, setVisibleCount]
  );

  useEffect(() => {
    setAllProjects(randomize(projects));
    setVisibleCount(projects.length);
  }, [projects]);

  return (
    <Layout
      title='Projetos'
      description='Lista de projetos open source do Brasil'
    >
      <div id='projects'>
        <main>
          <header>
            <h1>
              <Name name={`<Brazil class='${title}' />`} />
            </h1>

            <small className='baloon'>
              <div className='float'>{icon}</div>
              <span>{description}</span>
            </small>
          </header>

          <FAQ
            title={
              <>
                <ArrowDownWideNarrow /> Exibição
              </>
            }
          >
            <menu>
              <div>
                <h4>Ordem</h4>
                <div>
                  <button
                    className='active'
                    data-filter='order'
                    onClick={(e) => sortProjectsByScore(e, false)}
                  >
                    <Dices /> Fisher-Yates
                  </button>
                  <button
                    data-filter='order'
                    onClick={(e) => sortProjectsByScore(e, 1)}
                  >
                    <Sprout /> Ajude a Construir
                  </button>
                  <button
                    data-filter='order'
                    onClick={(e) => sortProjectsByScore(e, 0)}
                  >
                    <Flame /> Maior Impacto
                  </button>
                </div>
              </div>
            </menu>
          </FAQ>

          <FAQ
            title={
              <>
                <SlidersHorizontal /> Filtros
              </>
            }
          >
            <menu>
              <div className='container'>
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
                <div>
                  <h4>Linguagens</h4>
                  <div>
                    <button
                      className='active'
                      data-filter='language'
                      onClick={(e) => filter(e, 'language', '')}
                    >
                      Todas
                    </button>
                    {Object.entries(sortObjectByValues(languages))
                      .filter(([key]) => usedLanguages.has(key))
                      .map(([key, name]) => (
                        <button
                          key={`filter:languages:${key}`}
                          data-filter='language'
                          onClick={(e) => filter(e, 'language', key)}
                        >
                          {name}
                        </button>
                      ))}
                  </div>
                </div>
                <div>
                  <h4>Categorias</h4>
                  <div>
                    <button
                      className='active'
                      data-filter='category'
                      onClick={(e) => filter(e, 'category', '')}
                    >
                      Todas
                    </button>
                    {Object.entries(sortObjectByValues(categories))
                      .filter(([key]) => usedCategories.has(key))
                      .map(([key, name]) => (
                        <button
                          key={`filter:categories:${key}`}
                          data-filter='category'
                          onClick={(e) => filter(e, 'category', key)}
                        >
                          {name}
                        </button>
                      ))}
                  </div>
                </div>
              </div>
            </menu>
          </FAQ>

          <div className='search' onChange={handleSearch}>
            <Search />
            <input
              ref={searchRef}
              type='search'
              name='search'
              placeholder='Pesquise pelo nome do projeto ou de quem os mantém'
            />
          </div>

          <h3 className='counter'>
            <Code /> Exibindo <span className='length'>{visibleCount}</span>{' '}
            Projetos
          </h3>

          <small className='quoted'>
            <Quote /> <span>{tips[tip || 'default']}</span>
          </small>

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
    </Layout>
  );
};

export default memo(Projects);
