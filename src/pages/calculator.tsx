import type { ReactNode } from 'react';
import { useRef, useState } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import '@site/src/css/pages/home.scss';
import Link from '@docusaurus/Link';
import { createLRU } from 'lru.min';
import {
  Activity,
  Award,
  Bug,
  BugOff,
  Flame,
  FlameKindling,
  HeartHandshake,
  Loader,
  Rocket,
  Star,
  Trophy,
  UtensilsCrossed,
  Wrench,
} from 'lucide-react';
import { toast } from 'sonner';
import { ScoreSimulator } from '@site/src/@types/projects';
import { processProject } from '@site/src/helpers/generate-stats';
import { getScore } from '@site/src/helpers/get-score';

export default (): ReactNode => {
  const { siteConfig } = useDocusaurusContext();
  const [stats, setStats] = useState<ScoreSimulator>(Object.create(null));
  const repositoryURL = useRef<string>('');
  const { current: LRU } = useRef(
    createLRU<string, ScoreSimulator>({ max: 100 })
  );

  const getRepository = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const user = formData.get('user');
    const repository = formData.get('repository');

    if (!user || typeof user !== 'string') {
      toast.error('Insira um usuário válido');
      return;
    }

    if (!repository || typeof repository !== 'string') {
      toast.error('Insira um repositório válido');
      return;
    }

    const key = `${user}/${repository}`;
    repositoryURL.current = `https://github.com/${key}`;

    if (LRU.has(key)) {
      setStats(LRU.get(key)!);
      return;
    }

    return await processProject(
      {
        repository: repositoryURL.current,
        description: '',
        madeInBrazil: true,
      },
      ({ results }) => {
        if (results.license.includes('repo not found')) {
          toast.error('Repositório não encontrado.');
          return false;
        }

        const score = getScore({
          closedIssues: results?.closedIssues?.value,
          contributors: results?.contributors?.value,
          forks: results?.forks?.value,
          homebrew: results?.homebrew?.value,
          issues: results?.issues?.value,
          npm: results?.npm?.value,
          pypi: results?.pypi?.value,
          stars: results?.stars?.value,
          commits: results?.commits,
        });

        const result = { ...results, score };

        LRU.set(key, result);

        setStats(result);
      }
    );
  };

  stats && console.log(stats);

  return (
    <Layout
      title={siteConfig.title}
      description='Descubra projetos open-source incríveis criados e mantidos por desenvolvedores brasileiros.'
    >
      <div id='home'>
        <main>
          <header>
            <h1>Teste</h1>
            <small>...</small>
            <section>
              <h2>Verifique seu score</h2>
              <form onSubmit={getRepository}>
                <input
                  placeholder='dracula'
                  defaultValue='dracula'
                  type='text'
                  name='user'
                />
                <input
                  placeholder='dracula-theme'
                  defaultValue='dracula-theme'
                  type='text'
                  name='repository'
                />
                <button>Gerar Score</button>
              </form>
              <div className='social'>
                <div className='tabs'>
                  <h3>
                    <Rocket /> Impacto
                  </h3>

                  <h3>
                    <Activity /> Atividade
                  </h3>
                </div>

                {stats ? (
                  <>
                    <table>
                      <tbody>
                        {stats.score ? (
                          <tr>
                            <td>
                              <span>Score:</span>
                            </td>
                            <td>
                              {stats.score > 1_000_000 ? (
                                <Trophy />
                              ) : stats.score > 100_000 ? (
                                <Award />
                              ) : stats.score > 10_000 ? (
                                <Flame />
                              ) : stats.score > 1_000 ? (
                                <FlameKindling />
                              ) : (
                                <Loader />
                              )}
                              <span className='score'>
                                {Number(stats.score).toLocaleString('pt-BR')}
                              </span>
                            </td>
                          </tr>
                        ) : null}

                        <tr>
                          <td>Contribuidores:</td>
                          <td>
                            <Link
                              to={`repositoryURL ? '#' : ${repositoryURL.current}/graphs/contributors`}
                            >
                              <HeartHandshake />
                              {stats?.contributors?.label || null}
                            </Link>
                          </td>
                        </tr>

                        {stats.npm ? (
                          <tr>
                            <td>
                              <span>Downloads por mês:</span>
                            </td>
                            <td>
                              <Link
                                to={`https://www.npmjs.com/package/${stats.npm}`}
                              >
                                <img loading='lazy' src='/img/npm.svg' />
                                {stats?.npm?.label || null}
                              </Link>
                            </td>
                          </tr>
                        ) : null}

                        {stats.homebrew ? (
                          <tr>
                            <td>
                              <span>Downloads por mês:</span>
                            </td>
                            <td>
                              <Link
                                to={`https://formulae.brew.sh/formula/${stats.homebrew}`}
                              >
                                <img loading='lazy' src='/img/homebrew.svg' />
                                {stats?.homebrew?.label || null}
                              </Link>
                            </td>
                          </tr>
                        ) : null}

                        {stats.pypi ? (
                          <tr>
                            <td>
                              <span>Downloads por mês:</span>
                            </td>
                            <td>
                              <Link
                                to={`https://pypi.org/project/${stats.pypi}/`}
                              >
                                <img loading='lazy' src='/img/pypi.svg' />
                                {stats?.pypi?.label || null}
                              </Link>
                            </td>
                          </tr>
                        ) : null}

                        <tr>
                          <td>Forks:</td>
                          <td>
                            <Link
                              to={
                                repositoryURL.current
                                  ? '#'
                                  : `${repositoryURL.current}/graphs/contributors`
                              }
                            >
                              <UtensilsCrossed />
                              {stats?.forks?.label || null}
                            </Link>
                          </td>
                        </tr>

                        <tr>
                          <td>Estrelas:</td>
                          <td>
                            <Link
                              to={
                                repositoryURL.current
                                  ? '#'
                                  : `${repositoryURL.current}/stargazers`
                              }
                            >
                              <Star />
                              {stats?.stars?.label || null}
                            </Link>
                          </td>
                        </tr>
                      </tbody>
                    </table>

                    <table>
                      <tbody>
                        <tr>
                          <td>Issues abertas:</td>
                          <td>
                            <Link
                              to={
                                repositoryURL.current
                                  ? '#'
                                  : `${repositoryURL.current}/issues`
                              }
                            >
                              <Bug />
                              {stats?.issues?.label || null}
                            </Link>
                          </td>
                        </tr>

                        <tr>
                          <td>Issues fechadas:</td>
                          <td>
                            <Link
                              to={`${repositoryURL.current ? '#' : repositoryURL.current}/issues?q=is:issue+is:closed`}
                            >
                              <BugOff />
                              {stats?.closedIssues?.label || null}
                            </Link>
                          </td>
                        </tr>

                        <tr>
                          <td>Último commit:</td>
                          <td>
                            <Link
                              to={
                                repositoryURL.current
                                  ? '#'
                                  : `${repositoryURL.current}/commits`
                              }
                            >
                              <Wrench />
                              {stats?.commits || null}
                            </Link>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </>
                ) : null}
              </div>
            </section>
          </header>
        </main>
      </div>
    </Layout>
  );
};
