import React from 'react';
import { ProcessedMaintainer } from '@site/plugins/maintainers-page';
import { ProjectOptions } from '@site/src/@types/projects';
import { Name } from './Name';
import { SafeLink } from './SafeLink';

interface MaintainerPageProps {
  data: ProcessedMaintainer;
}

const MaintainerPage: React.FC<MaintainerPageProps> = ({ data }) => {
  const { username, projects } = data;

  return (
    <main style={{ padding: '2rem', zIndex: 1 }}>
      <header>
        <img
          src={`https://avatars.githubusercontent.com/${username}`}
          loading='eager'
          alt={`${username} profile avatar`}
        />
        <h1>
          👋 Conheça <Name name={username} />
        </h1>
      </header>

      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {projects.map((project: ProjectOptions, index: number) => (
          <li
            key={index}
            style={{
              marginBottom: '2rem',
              borderBottom: '1px solid #ccc',
              paddingBottom: '1rem',
            }}
          >
            <h2>{project.name || '...'}</h2>
            <p>{project.description}</p>
            <p>
              <strong>Repositório:</strong>{' '}
              <SafeLink to={project.repository}>{project.repository}</SafeLink>
            </p>
            {project.languages && project.languages.length > 0 && (
              <p>
                <strong>Linguagens:</strong> {project.languages.join(', ')}
              </p>
            )}
            {project.categories && project.categories.length > 0 && (
              <p>
                <strong>Categorias:</strong> {project.categories.join(', ')}
              </p>
            )}
            {project.npm && (
              <p>
                <strong>NPM:</strong>{' '}
                <SafeLink to={`https://www.npmjs.com/package/${project.npm}`}>
                  {project.npm}
                </SafeLink>
              </p>
            )}
            {project.pypi && (
              <p>
                <strong>PyPI:</strong>{' '}
                <SafeLink to={`https://pypi.org/project/${project.pypi}`}>
                  {project.pypi}
                </SafeLink>
              </p>
            )}
            {project.homebrew && (
              <p>
                <strong>Homebrew:</strong>{' '}
                <SafeLink
                  to={`https://formulae.brew.sh/formula/${project.homebrew}`}
                >
                  {project.homebrew}
                </SafeLink>
              </p>
            )}
            <p>
              <strong>Foi criado por um autor brasileiro?</strong>{' '}
              {project.madeInBrazil ? 'Sim' : 'Não'}
            </p>
            {project.message && (
              <p>
                <em>{project.message}</em>
              </p>
            )}
          </li>
        ))}
      </ul>
    </main>
  );
};

export default MaintainerPage;
