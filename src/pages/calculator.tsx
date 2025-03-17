import type { ScoreSimulator } from '@site/src/@types/projects';
import type { ReactNode } from 'react';
import { startTransition, useRef, useState } from 'react';
import Layout from '@theme/Layout';
import { createLRU } from 'lru.min';
import {
  Activity,
  Award,
  Bug,
  BugOff,
  ChevronRight,
  CircleAlert,
  CircleHelp,
  ClipboardList,
  Dna,
  ExternalLink,
  Flame,
  FlameKindling,
  Gamepad2,
  Github,
  HeartHandshake,
  Rocket,
  Scale,
  Sprout,
  Star,
  Trophy,
  UtensilsCrossed,
  Wrench,
} from 'lucide-react';
import { toast } from 'sonner';
import { Name } from '@site/src/components/Name';
import { SafeLink } from '@site/src/components/SafeLink';
import { API } from '@site/src/configs/api';
import { extractRepository } from '@site/src/helpers/extract-repository';

import '@site/src/css/pages/calculator.scss';

import Link from '@docusaurus/Link';

export default (): ReactNode => {
  const [stats, setStats] = useState<ScoreSimulator | null>(null);
  const scoreRef = useRef<HTMLDivElement>(null);
  const repositoryURL = useRef<string>('');
  const { current: LRU } = useRef(
    createLRU<string, ScoreSimulator>({ max: 1000 })
  );

  const getRepository = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    scoreRef.current?.classList.remove('active');

    startTransition(async () => {
      try {
        const formData = new FormData(event.currentTarget);
        const repositoryFormURL = formData.get('repositoryURL');
        const npm = formData.get('npm');
        const homebrew = formData.get('homebrew');
        const pypi = formData.get('pypi');
        const chocolatey = formData.get('chocolatey');
        const vscode = formData.get('vscode');

        if (!repositoryFormURL || typeof repositoryFormURL !== 'string') {
          toast.error('Insira uma URL válida.');
          return;
        }

        const { organization, repository } =
          extractRepository(repositoryFormURL);

        const validatedURL = `${organization.trim()}/${repository.trim()}`;
        const key = `${validatedURL}:${npm}:${homebrew}:${pypi}:${chocolatey}:${vscode}`;

        repositoryURL.current = `https://github.com/${validatedURL}`;

        toast.dismiss();

        setTimeout(() => {
          scoreRef.current?.classList.add('active');
        }, 250);

        if (LRU.has(key)) {
          setStats(LRU.get(key)!);
          return;
        }

        LRU.set(
          key,
          await (
            await fetch(API, {
              method: 'POST',
              body: JSON.stringify({
                repositoryURL: repositoryURL.current,
                npm,
                homebrew,
                pypi,
                chocolatey,
                vscode,
              }),
            })
          ).json()
        );

        setStats(LRU.get(key)!);
      } catch (error) {
        error instanceof Error && toast.error(error.message);
      }
    });
  };

  return (
    <Layout
      title='Calculadora'
      description='Descubra projetos open source incríveis criados e mantidos por desenvolvedores brasileiros.'
    >
      <div id='calculator'>
        <main>
          <header>
            <h1>
              <Name name='<Descubra seu Score />' />
            </h1>
            <small>
              <p>
                Esse cálculo não é uma forma de validar se um projeto é bom ou
                não. Cada projeto possui seus propósitos e diferentes formas de
                impacto. Nós apenas usamos métricas passíveis de automação para
                garantir a relevância dos projetos dentro da iniciativa.
              </p>
              <br />
              <Link to='/new'>
                Quer cadastrar seu projeto na <strong>Awesome You</strong>? Siga
                as instruções na página de inscrição <ChevronRight />
              </Link>
            </small>
            <form onSubmit={getRepository}>
              <label>
                <span>
                  <Github />
                  <span>
                    URL do Repositório <em>*</em>
                  </span>
                </span>
                <input
                  placeholder='Ex.: https://github.com/BrasilAPI/BrasilAPI'
                  type='text'
                  name='repositoryURL'
                  required
                />
                <small>
                  <CircleAlert /> Obrigatório.
                </small>
              </label>
              <label>
                <span>
                  <img loading='lazy' src='/img/npm.svg' alt='npm' /> Pacote NPM{' '}
                  <sup>?</sup>
                </span>
                <input placeholder='Ex.: poku' type='text' name='npm' />
                <small>
                  <CircleHelp /> Nome do pacote npm, caso exista (opcional).
                </small>
              </label>
              <label>
                <span>
                  <img loading='lazy' src='/img/homebrew.svg' alt='npm' />{' '}
                  Pacote Homebrew<sup>?</sup>
                </span>
                <input placeholder='Ex.: elixir' type='text' name='homebrew' />
                <small>
                  <CircleHelp /> Nome do pacote Homebrew, caso exista
                  (opcional).
                </small>
              </label>
              <label>
                <span>
                  <img loading='lazy' src='/img/pypi.svg' alt='PyPi' /> Pacote
                  PyPi <sup>?</sup>
                </span>
                <input placeholder='Ex.: socketify' type='text' name='pypi' />
                <small>
                  <CircleHelp /> Nome do pacote PyPi, caso exista (opcional).
                </small>
              </label>
              <label>
                <span>
                  <img
                    loading='lazy'
                    src='/img/chocolatey.svg'
                    alt='Chocolatey'
                  />{' '}
                  Pacote Chocolatey <sup>?</sup>
                </span>
                <input
                  placeholder='Ex.: rio-terminal'
                  type='text'
                  name='chocolatey'
                />
                <small>
                  <CircleHelp /> Nome do pacote Chocolatey, caso exista
                  (opcional).
                </small>
              </label>
              <label>
                <span>
                  <img
                    loading='lazy'
                    src='/img/vscode.svg'
                    alt='Visual Studio Code Marketplace'
                  />{' '}
                  Visual Studio Code ID <sup>?</sup>
                </span>
                <input
                  placeholder='Ex.: dracula-theme.theme-dracula'
                  type='text'
                  name='vscode'
                />
                <small>
                  <CircleHelp /> ID da extensão do Visual Studio Code
                  Marketplace, caso exista (opcional).
                </small>
              </label>
              <label className='span'>
                <span>
                  <input type='checkbox' name='terms' required />
                  Entendo que o score é baseado em métricas automatizadas
                  limitadas e não reflete a qualidade do projeto. <em>*</em>
                </span>
              </label>
              <button>
                <Gamepad2 /> Gerar Score
              </button>
            </form>
          </header>
          <main ref={scoreRef}>
            <div className='score'>
              {stats && (
                <>
                  <SafeLink to='https://github.com/wellwelwel/awesomeyou/issues/1'>
                    Acredita que essa pontuação deveria ser diferente? Sugira
                    melhorias e ideias para aprimorar as automações
                    <ExternalLink />
                  </SafeLink>
                  <h3>
                    <ClipboardList /> Resultado
                  </h3>
                  <table>
                    <tbody>
                      <tr>
                        <td>Repositório</td>
                        <td>
                          <img
                            src={`https://avatars.githubusercontent.com/${stats.username}`}
                            loading='lazy'
                            className='organization'
                            alt={`${stats.username} profile avatar`}
                          />{' '}
                          {stats.username}/{stats.repository}
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span>Score</span>
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
                            <Sprout />
                          )}
                          <span className='score'>
                            {Number(stats.score).toLocaleString('pt-BR')}
                          </span>
                        </td>
                      </tr>
                      <tr
                        className={
                          stats.license.includes('not specified')
                            ? 'error'
                            : undefined
                        }
                      >
                        <td>Licença</td>
                        <td>
                          <Scale />
                          <span className='score'>
                            {stats?.license.includes('not specified')
                              ? 'Licença não especificada'
                              : stats?.license}
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  <h3>
                    <Rocket /> Impacto
                  </h3>
                  <table>
                    <tbody>
                      <tr>
                        <td>Contribuidores</td>
                        <td>
                          <HeartHandshake />
                          {stats?.contributors?.label || 0}
                        </td>
                      </tr>

                      <tr>
                        <td>Dependentes</td>
                        <td>
                          <Dna />
                          {stats?.repositoryDependents?.label}
                        </td>
                      </tr>

                      {stats?.npm?.label && (
                        <tr>
                          <td>
                            <span>Downloads por Mês</span>
                          </td>
                          <td>
                            <img loading='lazy' src='/img/npm.svg' alt='npm' />
                            {stats.npm.label}
                          </td>
                        </tr>
                      )}

                      {stats?.homebrew?.label && (
                        <tr>
                          <td>
                            <span>Downloads por Mês</span>
                          </td>
                          <td>
                            <img
                              loading='lazy'
                              src='/img/homebrew.svg'
                              alt='Homebrew'
                            />
                            {stats.homebrew.label}
                          </td>
                        </tr>
                      )}

                      {stats?.pypi?.label && (
                        <tr>
                          <td>
                            <span>Downloads por Mês</span>
                          </td>
                          <td>
                            <img
                              loading='lazy'
                              src='/img/pypi.svg'
                              alt='PyPi'
                            />
                            {stats.pypi.label}
                          </td>
                        </tr>
                      )}

                      {stats?.chocolatey?.label && (
                        <tr title='Chocolatey'>
                          <td>
                            <span>Downloads Totais:</span>
                          </td>
                          <td>
                            <img loading='lazy' src='/img/chocolatey.svg' />
                            {stats.chocolatey.label}
                          </td>
                        </tr>
                      )}

                      {stats?.vscode?.label && (
                        <tr title='Visual Studio Code Marketplace'>
                          <td>
                            <span>Downloads Totais:</span>
                          </td>
                          <td>
                            <img loading='lazy' src='/img/vscode.svg' />
                            {stats.vscode.label}
                          </td>
                        </tr>
                      )}

                      <tr>
                        <td>Forks</td>
                        <td>
                          <UtensilsCrossed />
                          {stats?.forks?.label || 0}
                        </td>
                      </tr>

                      <tr>
                        <td>Estrelas</td>
                        <td>
                          <Star />
                          {stats?.stars?.label || 0}
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  <h3>
                    <Activity /> Atividade
                  </h3>
                  <table>
                    <tbody>
                      <tr>
                        <td>Issues abertas</td>
                        <td>
                          <Bug />
                          {stats?.issues?.label || 0}
                        </td>
                      </tr>

                      <tr>
                        <td>Issues fechadas</td>
                        <td>
                          <BugOff />
                          {stats?.closedIssues?.label || 0}
                        </td>
                      </tr>

                      <tr>
                        <td>Último commit</td>
                        <td>
                          <Wrench />
                          {stats?.commits || 0}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </>
              )}
            </div>
          </main>
        </main>
      </div>
    </Layout>
  );
};
