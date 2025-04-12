/*---------------------------------------------------------------------------------------------
 *  Copyright (c) https://awesomeyou.io and contributors. All rights reserved.
 *  Licensed under the GNU Affero General Public License v3.0. See https://github.com/wellwelwel/awesomeyou/blob/main/LICENSE for license information.
 *--------------------------------------------------------------------------------------------*/

import type { ProjectOptions, ProjectStats } from '@site/src/@types/projects';
import type { FC } from 'react';
import { useContext } from 'react';
import { ExternalLink, Scale } from 'lucide-react';
import { SafeLink } from '@site/src/components/SafeLink';
import { ScoreIcon } from '@site/src/components/ScoreIcon';
import { Context } from '@site/src/contexts/Maintainer';
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
  const { score } = stats;
  const isAuthor = project.isAuthor ? 'criou' : 'mantém';
  const isLanguage =
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
    isLanguage ||
    isTheme ||
    isList ||
    isEducational ||
    isTestRunner ||
    'o projeto';
  const isBrazilian = project.madeInBrazil
    ? isLanguage || isList
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
          — O repositório do projeto conta com{' '}
          <strong>{stats.contributors.label}</strong> contribuidor
          {stats.contributors.value > 1 && 'es'}
          {stats.repositoryDependents.value > 0 && (
            <>
              , {stats.repositoryDependents.value > 1000 ? 'mais de ' : ''}
              <strong>{stats.repositoryDependents.label}</strong>
              {stats.repositoryDependents.value > 1000000 ? ' de ' : ' '}
              repositórios públicos dependem dele
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
          e possui {stats.stars.value > 1000 ? ' mais de ' : ' '}
          <strong>{stats.stars.label}</strong> estrelas.
        </p>
      </main>
      <footer>
        <p>
          Score: <ScoreIcon score={score} />{' '}
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
