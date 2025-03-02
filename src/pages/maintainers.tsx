import React, { memo, useEffect, useState } from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import { ProjectOptions } from '../@types/projects';
import { randomize } from '../helpers/radomizer';

interface Maintainer {
  username: string;
  projects: ProjectOptions[];
}

const loadMaintainers = (): Maintainer[] => {
  const context = require.context(
    '@site/content/maintainers',
    true,
    /projects\.json$/
  );
  const maintainers: Maintainer[] = [];

  context.keys().forEach((key: string) => {
    const parts = key.split('/');

    if (parts.length >= 2) {
      const username = parts[1];
      const projectsData = context(key);

      if (projectsData && Array.isArray(projectsData.projects)) {
        maintainers.push({
          username,
          projects: projectsData.projects,
        });
      }
    }
  });

  return maintainers;
};

const MaintainersIndex: React.FC = () => {
  const rawMaintainers = loadMaintainers();
  const [maintainers, setMaintainers] = useState<Maintainer[]>([]);

  useEffect(() => {
    setMaintainers(randomize([...rawMaintainers]));
  }, []);

  return (
    <Layout title={''} description='Lista de projetos open source do Brasil'>
      <main style={{ padding: '2rem', zIndex: 1 }}>
        <h1>Mantenedores</h1>

        <ul style={{ listStyle: 'none', padding: 0 }}>
          {maintainers.map((maintainer) => (
            <li key={maintainer.username} style={{ marginBottom: '2rem' }}>
              <h2>
                <Link to={`/maintainers/${maintainer.username}`}>
                  {maintainer.username}
                </Link>
              </h2>

              <ul>
                {maintainer.projects.map((project, index) => (
                  <li key={index}>
                    <strong>{project.name || '...'}</strong>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </main>
    </Layout>
  );
};

export default memo(MaintainersIndex);
