import '@site/src/css/pages/maintainer.scss';

import type { ProcessedMaintainer } from '@site/plugins/maintainers-page';
import React, { memo } from 'react';
import Layout from '@theme/Layout';
import {
  Award,
  Bot,
  CloudSun,
  Code,
  Cross,
  Eraser,
  ExternalLink,
  Fingerprint,
  Flame,
  FlameKindling,
  Ghost,
  Github,
  Heart,
  HeartHandshake,
  Lightbulb,
  MapPin,
  MessageSquareShare,
  Network,
  Rocket,
  Scale,
  ScanSearch,
  Share2,
  SmilePlus,
  Sparkles,
  Sprout,
  Star,
  StarHalf,
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
  const fomatter = new Intl.ListFormat('pt-BR', {
    style: 'long',
    type: 'conjunction',
  });
  const description = `${name} é uma pessoa brasileira mantenedora de projetos open source, como ${fomatter.format(
    projects.map((project) => {
      const { repository } = extractRepository(project.repository);

      return project.name || repository;
    })
  )}.`;

  return (
    <Layout title={name} description={description}>
      <div id='maintainer'>
        <main>
          <header>
            <h1>
              Conheça{' '}
              <ins>
                <Name name={name} />
              </ins>{' '}
              <img src={'/img/hi.gif'} loading='lazy' />
            </h1>
            <small>{description}</small>
            <small className='baloon'>
              <div className='float'>
                <Fingerprint />
              </div>
              <span>
                <img
                  src={`https://avatars.githubusercontent.com/${username}`}
                  loading='eager'
                  alt={`${username} profile avatar`}
                />
                <span>
                  <p className='name'>{name}</p>
                  <p>{bio}</p>
                </span>
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

          <main className='projects'>
            <h2>
              <Code /> {projects.length} projeto{ifPlural} cadastrado
              {ifPlural}
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
                      — O repositório do projeto no{' '}
                      <SafeLink to={project.repository}>GitHub</SafeLink> conta{' '}
                      com <strong>{stats.contributors.label}</strong>{' '}
                      contribuidor
                      {stats.contributors.value > 1 && 'es'}
                      {stats.repositoryDependents.value > 0 && (
                        <>
                          ,{' '}
                          {stats.repositoryDependents.value > 1000
                            ? 'mais de '
                            : ''}
                          <strong>{stats.repositoryDependents.label}</strong>
                          {stats.repositoryDependents.value > 1000000
                            ? ' de '
                            : ' '}
                          repositórios públicos dependem diretamente dele
                        </>
                      )}
                      {monthDownloads > 0 && (
                        <>
                          , além de possuir mais de{' '}
                          <strong>{localeNumber(monthDownloads)}</strong>
                          {monthDownloads > 1000000 ? ' de ' : ''} downloads
                          públicos mensais
                        </>
                      )}
                      {totalDownloads > 0 && (
                        <>
                          {monthDownloads > 0 ? ',' : ', além de possuir'} mais
                          de <strong>{localeNumber(totalDownloads)}</strong>
                          {totalDownloads > 1000000 ? ' de ' : ''} downloads
                          públicos totais
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
            })}
          </main>

          <div className='faqs'>
            <h2>
              <Rocket /> Ajude a fazer acontecer!
            </h2>

            <FAQ
              open
              title={
                <>
                  <SmilePlus /> Como você pode apoiar?
                </>
              }
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
                    rede e conte como eles já te ajudaram.
                  </span>
                </p>
                <p>
                  <HeartHandshake />{' '}
                  <span>
                    <ins>Ajude outros usuários</ins> respondendo dúvidas no
                    repositório dos projetos.
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
            <FAQ
              title={
                <>
                  <MessageSquareShare /> Mas afinal, por que apoiar?
                </>
              }
            >
              <small>
                <p>
                  <Ghost />{' '}
                  <span>
                    Já imaginou como seria se o open source não existisse?
                  </span>
                </p>
                <p>
                  <Eraser />{' '}
                  <span>
                    Imagine desde linguagens de programação a livrarias que você
                    usa desaparecendo ou se tornando pagas e o impacto que isso
                    teria.
                  </span>
                </p>
                <p>
                  <StarHalf />{' '}
                  <span>
                    Às vezes, mesmo uma simples estrela pode colocar um sorriso
                    no rosto de quem cria projetos que você usa de graça.
                  </span>
                </p>
                <p>
                  <Sprout />{' '}
                  <span>
                    Aliás, se fosse você quem criasse um projeto inovador,
                    aposto que gostaria que apoiassem seu trabalho, certo?
                  </span>
                </p>
                <p>
                  <CloudSun />{' '}
                  <span>
                    Apoiar das mais diversas formas quem cria projetos open
                    source, motiva o crescimento e a evolução contínua desse
                    ecossistema incrível (e todos saem ganhando).
                  </span>
                </p>
              </small>
            </FAQ>
            <FAQ
              title={
                <>
                  <MessageSquareShare /> Qual o propósito dessa página?
                </>
              }
            >
              <small>
                <p>
                  <Bot />{' '}
                  <span>
                    Todo conteúdo gerado nessa página é estático, facilitando a
                    leitura e interpretação por sistemas de busca (crawlers),
                    direcionando cada mantenedor brasileiro cadastrado na
                    Awesome You através de um{' '}
                    <SafeLink to='https://awesomeyou.io/sitemap.xml'>
                      sitemap.xml
                    </SafeLink>{' '}
                    inteligente.
                  </span>
                </p>
                <p>
                  <ScanSearch />{' '}
                  <span>
                    A intenção é ajudar sistemas de buscas encontrarem
                    facilmente projetos, por exemplo, ao pesquisar por "Quais
                    linguagens de programação foram criadas por brasileiros?" ou
                    "Quais brasileiros fazem parte de X projeto?".
                  </span>
                </p>
                <p>
                  <Sparkles />{' '}
                  <span>
                    A mesma ideia vale para Inteligências Artificiais e,
                    inclusive, logo também suportaremos os novos padrões{' '}
                    <strong>llms.txt</strong>.
                  </span>
                </p>
              </small>
            </FAQ>
          </div>
        </main>
      </div>
    </Layout>
  );
};

export default memo(MaintainerPage);
