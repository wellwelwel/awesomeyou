import type { ReactNode } from 'react';
import { memo, useEffect, useMemo, useState } from 'react';
import Layout from '@theme/Layout';
import { Name } from '@site/src//components/Name';
import { Project } from '@site/src/components/Project';
import { extractRepository } from '@site/src/helpers/extract-repository';
import { projects } from '@site/src/helpers/get-contents';
import { mergeRepositories } from '@site/src/helpers/merge-projects';
import { randomize } from '@site/src/helpers/radomizer';

import '@site/src/css/pages/projects.scss';

const Projects = (): ReactNode => {
  const [scores, setScores] = useState<Record<string, number> | null>(null);
  const projectsByMaintainers = useMemo(() => projects(), []);

  const mergedProjects = useMemo(
    () =>
      mergeRepositories(
        projectsByMaintainers.flatMap((projects) => projects)
      ).filter((project) => project.categories?.includes('list')),
    [projectsByMaintainers]
  );

  const [allProjects, setAllProjects] = useState(mergedProjects);

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
    <Layout
      title='Listas'
      description='Lista de projetos open source do Brasil'
    >
      <div id='projects'>
        <main>
          <header>
            <h1>
              <Name name="<Brazil class='Listas' />" />
            </h1>
            <small>
              Por que parar por aqui, quando podemos incluir e conhecer novos
              projetos em diversas listas criadas por brasileiros?
            </small>
          </header>
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
