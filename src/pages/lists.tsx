import type { MouseEvent, ReactNode } from 'react';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import Layout from '@theme/Layout';
import { Dices, Flame, Sprout } from 'lucide-react';
import { Name } from '@site/src//components/Name';
import { Project } from '@site/src/components/Project';
import { extractRepository } from '@site/src/helpers/extract-repository';
import { projects } from '@site/src/helpers/get-contents';
import { mergeRepositories } from '@site/src/helpers/merge-projects';
import { randomize } from '@site/src/helpers/radomizer';

import '@site/src/css/pages/projects.scss';

export const tips = {
  default: (
    <small key='1'>
      <Dices />
      <span>
        Por padrão, as listas são exibidas em ordem aleatória. Assim, você
        sempre irá descobrir listas novas toda vez que voltar aqui.
      </span>
    </small>
  ),
  greater: (
    <small key='2'>
      <Flame />
      <span>
        Repositórios com grande impacto e reconhecimento geralmente se destacam
        por sua ampla adoção, popularidade e pela força de sua comunidade,
        especialmente quando somados entre si.
      </span>
    </small>
  ),
  less: (
    <small key='3'>
      <Sprout />
      <span>
        <p>
          Descubra e incentive novas listas! Ao contribuir com iniciativas em
          constante crescimento, você tem a oportunidade de participar do
          amadurecimento de novas ideias.
        </p>
        <p>
          Sua estrela pode colocar um sorriso no rosto de quem mantém o projeto
          ✨
        </p>
      </span>
    </small>
  ),
} as const;

const Projects = (): ReactNode => {
  const [scores, setScores] = useState<Record<string, number> | null>(null);
  const projectsByMaintainers = useMemo(() => projects(), []);
  const [tip, setTip] = useState<keyof typeof tips>('default');

  const mergedProjects = useMemo(
    () =>
      mergeRepositories(
        projectsByMaintainers.flatMap((projects) => projects)
      ).filter((project) => project.categories?.includes('list')),
    [projectsByMaintainers]
  );

  const [allProjects, setAllProjects] = useState(mergedProjects);
  const projectsLength = allProjects.length;
  const [visibleCount, setVisibleCount] = useState(projectsLength);

  const title = "<Brazil class='Listas' />";

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

        setTip('default');
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
        setTip('greater');
        itemsToSort.sort((a, b) => b.score - a.score);
      } else {
        setTip('less');
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
              Por que parar por aqui, quando podemos incluir e conhecer novos
              projetos em diversas listas criadas por brasileiros?
            </small>
          </header>
          <menu>
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
                  <Sprout /> Menor Score
                </button>
              </div>
            </div>

            <div>
              <h4>
                Exibindo <span className='length'>{visibleCount}</span> Listas
              </h4>
              {tips[tip]}
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
    </Layout>
  );
};

export default memo(Projects);
