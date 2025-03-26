import '@site/src/css/pages/maintainer.scss';

import type { ProcessedMaintainer } from '@site/plugins/maintainers-page';
import React, { memo } from 'react';
import Layout from '@theme/Layout';
import {
  Award,
  Cross,
  ExternalLink,
  Fingerprint,
  Flame,
  FlameKindling,
  Github,
  Heart,
  HeartHandshake,
  LandPlot,
  Lightbulb,
  MapPin,
  Network,
  Scale,
  Share2,
  SmilePlus,
  Sprout,
  Star,
  Trophy,
} from 'lucide-react';
import { Name } from '@site/src/components/Name';
import { normalizeURL, SafeLink } from '@site/src/components/SafeLink';
import { extractRepository } from '@site/src/helpers/extract-repository';
import { getScore } from '@site/src/helpers/get-score';
import { localeNumber } from '@site/src/helpers/services/stats/set-result';
import { FAQ } from './FAQ';

const MaintainerPage: React.FC<{ data: ProcessedMaintainer }> = ({ data }) => {
  const { username, bio, blog, location, name, projects } = data;
  const ifPlural = projects.length > 1 && 's';

  return (
    <Layout
      title={name}
      description={`Conheça ${name}, uma pessoa brasileira mantenedora de projetos open source.`}
    >
      <div id='maintainer'>
        <main>
          <header>
            <h1>
              Conheça{' '}
              <ins>
                <Name name={name} />
              </ins>
            </h1>
            <small className='baloon'>
              <div className='float'>
                <Fingerprint />
              </div>
              <span>
                {' '}
                <img
                  src={`https://avatars.githubusercontent.com/${username}`}
                  loading='eager'
                  alt={`${username} profile avatar`}
                />{' '}
                {bio}
              </span>
              <footer>
                <div className='links'>
                  {' '}
                  <SafeLink to={`https://github.com/${username}`}>
                    <Github />
                    {username}
                  </SafeLink>
                  {blog ? (
                    <SafeLink to={`https://${normalizeURL(blog)}`}>
                      <Network />
                      {normalizeURL(blog)}
                    </SafeLink>
                  ) : null}
                </div>

                {location ? (
                  <div>
                    <MapPin /> {location}
                  </div>
                ) : null}
              </footer>
            </small>
          </header>
          <div className='faqs'>
            <FAQ
              title={
                <>
                  <SmilePlus /> Como você pode apoiar mantenedores?
                </>
              }
              open
            >
              <small>
                <p>
                  <Star />{' '}
                  <span>
                    Incentive deixando uma <ins>estrela</ins> nos projetos que
                    você gosta, especialmente nos que você usa.
                  </span>
                </p>
                <p>
                  <Share2 />{' '}
                  <span>
                    <ins>Compartilhe</ins> projetos que {name} mantém com a sua
                    rede e como eles já te ajudaram.
                  </span>
                </p>
                <p>
                  <HeartHandshake />{' '}
                  <span>
                    <ins>Ajude outros usuários</ins> respondendo dúvidas no
                    repositório.
                  </span>
                </p>
                <p>
                  <Cross />{' '}
                  <span>
                    <ins>Contribua</ins> com os projetos.
                  </span>
                </p>
                <p>
                  <Heart />{' '}
                  <span>
                    <SafeLink to={`https://github.com/sponsors/${username}`}>
                      Patrocine
                    </SafeLink>{' '}
                    mantenedores.
                  </span>
                </p>
              </small>
            </FAQ>
          </div>
          <main className='projects'>
            <h2>
              <LandPlot /> {projects.length} projeto{ifPlural} cadastrado
              {ifPlural} na Awesome You{' '}
            </h2>
            {projects.length > 1 && (
              <small>
                <Lightbulb /> Os projetos são ordenados pelo maior número de
                commits.
              </small>
            )}
            {projects.map((project, i) => {
              const { organization, repository } = extractRepository(
                project.repository
              );
              const { stats } = project;

              const isAuthor = project.isAuthor ? 'criou' : 'mantém';
              const isLaguange =
                project.categories?.includes('language') &&
                'a linguagem de programação';
              const isTheme = project.categories?.includes('theme') && 'o tema';
              const isList = project.categories?.includes('list') && 'a lista';
              const isEducational =
                project.categories?.includes('educational') &&
                'o projeto educacional';
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
              const totalDownloads =
                (stats.chocolatey?.value || 0) +
                (stats.homebrew?.value || 0) +
                (stats.npm?.value || 0) +
                (stats.pypi?.value || 0) +
                (stats.vscode?.value || 0);

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
                <section key={`project:${i}`} className='project'>
                  <header>
                    <SafeLink to={project.repository}>
                      <span>
                        <img
                          src={`https://avatars.githubusercontent.com/${organization}`}
                          loading='lazy'
                          alt={`${organization} profile avatar`}
                        />
                        <span className='name'>
                          <p>{project.name ? project.name : repository}</p>
                          <p>{project.description}</p>
                        </span>
                      </span>
                      <ExternalLink />
                    </SafeLink>
                  </header>
                  <main>
                    <p>
                      {name} {isAuthor} {category}
                      {isBrazilian}{' '}
                      <strong>{project.name || repository}</strong>
                      {usesOrganization} e é autor de{' '}
                      <SafeLink
                        to={`${project.repository}/commits?author=${username}`}
                      >
                        {Number(project.commits).toLocaleString('pt-BR')}{' '}
                        commits
                      </SafeLink>
                      .
                    </p>
                    <p>
                      O repositório do projeto no{' '}
                      <SafeLink to={project.repository}>GitHub</SafeLink> conta{' '}
                      com {stats.contributors.label} contribuidor
                      {stats.contributors.value > 1 && 'es'}
                      {stats.repositoryDependents.value > 0 &&
                        `, ${stats.repositoryDependents.value > 1000 ? 'mais de ' : ''}${stats.repositoryDependents.label} repositórios públicos dependem diretamente dele`}
                      {totalDownloads > 0 &&
                        `, além de possuir mais de ${localeNumber(totalDownloads)}${totalDownloads > 1000000 ? ' de ' : ''} downloads públicos`}{' '}
                      e possui {stats.stars.label} estrelas.
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
            })}
          </main>
        </main>
      </div>
    </Layout>
  );
};

export default memo(MaintainerPage);
