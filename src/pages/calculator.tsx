import type { ScoreSimulator } from '@site/src/@types/projects';
import type { ReactNode } from 'react';
import { useRef, useState } from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
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
  Scale,
  Star,
  Trophy,
  UtensilsCrossed,
  Wrench,
} from 'lucide-react';
import { toast } from 'sonner';
import { API } from '@site/src/configs/api';

import '@site/src/css/pages/home.scss';

export default (): ReactNode => {
  const { siteConfig } = useDocusaurusContext();
  const [stats, setStats] = useState<ScoreSimulator | null>(null);
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

    const key = `${user.trim()}/${repository.trim()}`;
    repositoryURL.current = `https://github.com/${key}`;

    if (LRU.has(key)) {
      setStats(LRU.get(key)!);
      return;
    }

    console.log(
      await (
        await fetch(API, {
          method: 'POST',
          body: JSON.stringify({
            repositoryURL: repositoryURL.current,
          }),
        })
      ).json()
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
            <h1>Teste 2</h1>
            <small>...</small>
            <section>
              <h2>Verifique seu score</h2>
              <form onSubmit={getRepository}>
                <input
                  placeholder='dracula'
                  defaultValue='raphamorim'
                  type='text'
                  name='user'
                />
                <input
                  placeholder='dracula-theme'
                  defaultValue='lucario'
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
                    <header>
                      <img
                        src={`https://avatars.githubusercontent.com/${stats.username}`}
                        loading='lazy'
                        alt={`${stats.username} profile avatar`}
                      />
                    </header>
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
                              to={`repositoryURL ? undefined : ${repositoryURL.current}/graphs/contributors`}
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
                              to={`${repositoryURL.current}/graphs/contributors`}
                            >
                              <UtensilsCrossed />
                              {stats?.forks?.label || null}
                            </Link>
                          </td>
                        </tr>

                        <tr>
                          <td>Estrelas:</td>
                          <td>
                            <Link to={`${repositoryURL.current}/stargazers`}>
                              <Star />
                              {stats?.stars?.label || null}
                            </Link>
                          </td>
                        </tr>

                        {stats?.license && (
                          <tr
                            className={
                              stats.license.includes('not specified')
                                ? 'error'
                                : undefined
                            }
                          >
                            <td>Licença:</td>
                            <td>
                              <Scale />
                              <span className='score'>{stats?.license}</span>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>

                    <table>
                      <tbody>
                        <tr>
                          <td>Issues abertas:</td>
                          <td>
                            <Link to={`${repositoryURL.current}/issues`}>
                              <Bug />
                              {stats?.issues?.label || null}
                            </Link>
                          </td>
                        </tr>

                        <tr>
                          <td>Issues fechadas:</td>
                          <td>
                            <Link
                              to={`${repositoryURL.current}/issues?q=is:issue+is:closed`}
                            >
                              <BugOff />
                              {stats?.closedIssues?.label || null}
                            </Link>
                          </td>
                        </tr>

                        <tr>
                          <td>Último commit:</td>
                          <td>
                            <Link to={`${repositoryURL.current}/commits`}>
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
