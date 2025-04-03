import { FC, useContext } from 'react';
import {
  Award,
  ExternalLink,
  Flame,
  FlameKindling,
  Scale,
  Sprout,
  Trophy,
} from 'lucide-react';
import { ProjectOptions, ProjectStats } from '@site/src/@types/projects';
import { SafeLink } from '@site/src/components/SafeLink';
import { Context } from '@site/src/contexts/Maintainer';
import { getScore } from '@site/src/helpers/get-score';
import { localeNumber } from '@site/src/helpers/services/stats/set-result';

type Props = ProjectOptions & {
  commits: number;
  stats: ProjectStats;
  name: string;
  organization: string;
};

export const Project: FC<Props> = (project) => {
  const { maintainer } = useContext(Context);
  const { name, username } = maintainer;
  const { stats, organization } = project;
  const isAuthor = project.isAuthor ? 'criou' : 'mantém';
  const isLaguange =
    project.categories?.includes('language') && 'a linguagem de programação';
  const isTheme = project.categories?.includes('theme') && 'o tema';
  const isList = project.categories?.includes('list') && 'a lista';
  const isEducational =
    project.categories?.includes('educational') && 'o projeto educacional';
  const isTestRunner =
    project.categories?.includes('test') &&
    !project.categories?.includes('tool') &&
    !project.categories?.includes('plugin') &&
    'o test runner';
  const category =
    isLaguange ||
    isTheme ||
    isList ||
    isEducational ||
    isTestRunner ||
    'o projeto';
  const isBrazilian = project.madeInBrazil
    ? isLaguange || isList
      ? ' brasileira'
      : ' brasileiro'
    : '';
  const usesOrganization =
    project.isAuthor && organization !== username ? (
      <>
        {' '}
        sob a organização{' '}
        <SafeLink to={`https://github.com/${organization}`}>
          {organization}
        </SafeLink>{' '}
      </>
    ) : (
      ''
    );

  const monthDownloads =
    (stats.homebrew?.value || 0) +
    (stats.npm?.value || 0) +
    (stats.pypi?.value || 0);

  const totalDownloads =
    (stats.chocolatey?.value || 0) + (stats.vscode?.value || 0);

  const score = getScore({
    chocolatey: stats.chocolatey?.value,
    closedIssues: stats.closedIssues?.value,
    commits: stats.commits,
    contributors: stats.contributors?.value,
    forks: stats.forks?.value,
    homebrew: stats.homebrew?.value,
    issues: stats.issues?.value,
    npm: stats.npm?.value,
    pypi: stats.pypi?.value,
    repositoryDependents: stats.repositoryDependents?.value,
    stars: stats.stars?.value,
    vscode: stats.vscode?.value,
  });

  return (
    <section className='project'>
      <header>
        <SafeLink to={project.repository}>
          <span>
            <img
              src={`https://avatars.githubusercontent.com/${organization}`}
              loading='lazy'
              alt={`${organization} profile avatar`}
            />
            <span className='name'>
              <p>{project.name}</p>
              <p>{project.description}</p>
            </span>
          </span>
          <ExternalLink />
        </SafeLink>
      </header>
      <main>
        <p>
          {name} {isAuthor} {category}
          {isBrazilian} <strong>{project.name}</strong>
          {usesOrganization} e é autor de{' '}
          <SafeLink to={`${project.repository}/commits?author=${username}`}>
            {Number(project.commits).toLocaleString('pt-BR')} commits
          </SafeLink>
          .
        </p>
        <p>
          — O repositório do projeto no{' '}
          <SafeLink to={project.repository}>GitHub</SafeLink> conta com{' '}
          <strong>{stats.contributors.label}</strong> contribuidor
          {stats.contributors.value > 1 && 'es'}
          {stats.repositoryDependents.value > 0 && (
            <>
              , {stats.repositoryDependents.value > 1000 ? 'mais de ' : ''}
              <strong>{stats.repositoryDependents.label}</strong>
              {stats.repositoryDependents.value > 1000000 ? ' de ' : ' '}
              repositórios públicos dependem diretamente dele
            </>
          )}
          {monthDownloads > 0 && (
            <>
              , além de possuir mais de{' '}
              <strong>{localeNumber(monthDownloads)}</strong>
              {monthDownloads > 1000000 ? ' de ' : ''} downloads públicos
              mensais
            </>
          )}
          {totalDownloads > 0 && (
            <>
              {monthDownloads > 0 ? ',' : ', além de possuir'} mais de{' '}
              <strong>{localeNumber(totalDownloads)}</strong>
              {totalDownloads > 1000000 ? ' de ' : ''} downloads públicos totais
            </>
          )}{' '}
          e {stats.stars.value > 1000 ? ' mais de ' : ' '}
          <strong>{stats.stars.label}</strong> estrelas.
        </p>
      </main>
      <footer>
        <p>
          Score:{' '}
          {score > 1_000_000 ? (
            <Trophy />
          ) : score > 100_000 ? (
            <Award />
          ) : score > 10_000 ? (
            <Flame />
          ) : score > 1_000 ? (
            <FlameKindling />
          ) : (
            <Sprout />
          )}{' '}
          {Number(score).toLocaleString('pt-BR')}
        </p>
        <p>
          Licença: <Scale /> {stats.license}
        </p>
      </footer>
      {project.message && (
        <SafeLink className='cta' to={project.repository}>
          {project.message}
          <ExternalLink />
        </SafeLink>
      )}
    </section>
  );
};
