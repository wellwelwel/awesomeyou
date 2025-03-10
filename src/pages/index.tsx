import type { ReactNode } from 'react';
import type { IntersectionOptions } from 'react-intersection-observer';
import { useEffect, useState } from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import {
  Award,
  Calculator,
  ChevronRight,
  Code,
  Dices,
  ExternalLink,
  Flame,
  FlameKindling,
  GraduationCap,
  List,
  PackagePlus,
  Sprout,
  Trophy,
  UsersRound,
} from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import { ReactTyped } from 'react-typed';
import { Name } from '@site/src/components/Name';
import { ResumedMaintaners } from '../@types/maintainers';
import { ResumedProject } from '../@types/projects';
import { SafeLink } from '../components/SafeLink';
import { randomize } from '../helpers/radomizer';
import { localeNumber } from '../helpers/services/stats/set-result';

import '@site/src/css/pages/home.scss';

export default (): ReactNode => {
  const { siteConfig } = useDocusaurusContext();

  const [data, setData] = useState<{
    projects: ResumedProject[];
    maintainers: ResumedMaintaners[];
  }>({
    projects: [],
    maintainers: [],
  });

  const viewerOptions: IntersectionOptions = {
    triggerOnce: true,
  };

  const sectionViews = [
    useInView(viewerOptions),
    useInView(viewerOptions),
    useInView(viewerOptions),
    useInView(viewerOptions),
  ];

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    fetch(`/json/resume/maintainers.json`, { signal }).then(
      async (response) => {
        const results: ResumedMaintaners[] = await response.json();

        setData((prev) => ({
          ...prev,
          maintainers: randomize(results),
        }));
      }
    );

    fetch(`/json/resume/projects.json`, { signal }).then(async (response) => {
      const results: ResumedProject[] = await response.json();

      setData((prev) => ({
        ...prev,
        projects: randomize(results),
      }));
    });

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <Layout
      title={siteConfig.title}
      description='Descubra projetos open-source incríveis criados e mantidos por desenvolvedores brasileiros.'
    >
      <div id='home'>
        <main>
          <header>
            <h1>
              <div>
                <Name name='Awesome Brazilian' />
              </div>
              <div>
                <Name name='< open-source >' />
              </div>
              <div>
                <Name name='People' />
              </div>
            </h1>
            <small>
              <ReactTyped
                strings={[
                  'Awesome You &#x1F499;', // 💙
                  'Awesome You &#x1F49A;', // 💚
                  'Awesome You &#x1F49B;', // 💛
                ]}
                smartBackspace={false}
                typeSpeed={50}
                backSpeed={25}
                backDelay={2000}
                loop={true}
                fadeOut={true}
              />
            </small>
            <small>
              Uma iniciativa que traz o lado humano do <em>open-source</em>, te
              apresentando projetos incríveis criados e mantidos por
              desenvolvedores brasileiros.
            </small>
            <menu>
              <section>
                <Link to='projects' className='btn-split'>
                  <span className='btn-content'>
                    <span className='text'>Projetos</span>
                  </span>
                  <span className='btn-dropdown'>
                    <Code />
                  </span>
                </Link>
                <Link to='maintainers' className='btn-split'>
                  <span className='btn-dropdown'>
                    <UsersRound />
                  </span>
                  <span className='btn-content'>
                    <span className='text'>Pessoas</span>
                  </span>
                </Link>
              </section>
            </menu>
          </header>
          <main id='cards'>
            <h2>
              <strong>Re</strong> Descubra o <em>open-source</em> ✨
            </h2>
            <div className='show cards'>
              <Link to='projects'>
                <header>
                  <Code />
                  Projetos
                </header>
                <main>
                  Conheça projetos open-source criados e mantidos por
                  brasileiros.
                </main>
                <footer>
                  <ChevronRight />
                </footer>
              </Link>

              <Link to='maintainers'>
                <header>
                  <UsersRound />
                  Pessoas
                </header>
                <main>
                  Conheça mantenedores por trás de projetos incríveis.
                </main>
                <footer>
                  <ChevronRight />
                </footer>
              </Link>

              <Link to='learn'>
                <header>
                  <GraduationCap />
                  Aprenda Programação
                </header>
                <main>
                  Encontre repositórios que ensinam desde conteúdos básicos a
                  conceitos avançados.
                </main>
                <footer>
                  <ChevronRight />
                </footer>
              </Link>

              <Link to='lists'>
                <header>
                  <List />
                  Conheça Listas Incríveis
                </header>
                <main>
                  Por que parar por aqui? Veja listas criadas por brasileiros
                  com repositórios incríveis.
                </main>
                <footer>
                  <ChevronRight />
                </footer>
              </Link>

              <Link to='calculator'>
                <header>
                  <Calculator />
                  Descubra seu score
                </header>
                <main>
                  Seja por diversão, meta ou apenas curiosidade, descubra o
                  impacto do seu projeto.
                </main>
                <footer>
                  <ChevronRight />
                </footer>
              </Link>

              <Link to='new'>
                <header>
                  <PackagePlus />
                  Submeta seu projeto
                </header>
                <main>
                  Você tem um projeto inovador que pode receber contribuições da
                  comunidade? Torne ele parte dessa iniciativa.
                </main>
                <footer>
                  <ChevronRight />
                </footer>
              </Link>
            </div>
          </main>
          <main
            ref={sectionViews[0][0]}
            className={sectionViews[0][1] ? 'show' : 'hide'}
            id='projects'
          >
            <h2>Apoie projetos criados por brasileiros 🏡</h2>
            <small>
              Selecionados aleatóriamente <Dices />
            </small>
            <div className='cards'>
              {data.projects.slice(0, 3).map((project, i) => (
                <SafeLink
                  key={`project:${i}`}
                  to={`https://github.com/${project.organization}/${project.repository}`}
                >
                  <header>
                    <img
                      src={`https://avatars.githubusercontent.com/${project.organization}`}
                      loading='lazy'
                      alt={`${project.organization} profile avatar`}
                    />
                    {`${project.organization}/${project.repository}`}
                  </header>
                  <main>
                    <button>
                      {project.score > 1_000_000 ? (
                        <Trophy />
                      ) : project.score > 100_000 ? (
                        <Award />
                      ) : project.score > 10_000 ? (
                        <Flame />
                      ) : project.score > 1_000 ? (
                        <FlameKindling />
                      ) : (
                        <Sprout />
                      )}{' '}
                      Score
                      <span>|</span>
                      <strong>{localeNumber(project.score)}</strong>
                    </button>
                    <p>{project.description}</p>
                  </main>
                  <footer>
                    <ExternalLink />
                  </footer>
                </SafeLink>
              ))}
            </div>
            <footer>
              <Link to='projects'>
                Ver Todos <ChevronRight />
              </Link>
            </footer>
          </main>
          <main
            ref={sectionViews[1][0]}
            className={sectionViews[1][1] ? 'show' : 'hide'}
            id='maintainers'
          >
            <h2>Conheça mantenedores brasileiros 👋</h2>
            <small>
              Selecionados aleatóriamente <Dices />
            </small>
            <div className='cards'>
              {data.maintainers.slice(0, 3).map((maintainer, i) => (
                <Link
                  key={`maintainer:${i}`}
                  to={`maintainers/${maintainer.username}`}
                >
                  <header>
                    <img
                      src={`https://avatars.githubusercontent.com/${maintainer.username}`}
                      loading='lazy'
                      alt={`${maintainer.name} profile avatar`}
                    />
                    {maintainer.name}
                  </header>
                  <main>{maintainer.bio}</main>
                  <footer>
                    <ChevronRight />
                  </footer>
                </Link>
              ))}
            </div>
            <footer>
              <Link to='maintainers'>
                Ver Todos <ChevronRight />
              </Link>
            </footer>
          </main>
          <main
            ref={sectionViews[2][0]}
            className={sectionViews[2][1] ? 'show' : 'hide'}
            id='about'
          >
            <h2>
              Por que "<strong>Awesome You</strong>"?
            </h2>
            <small>
              <p>
                Já viu repositórios que listam outros repositórios e sempre
                começam com "Awesome [Linguagem]", "Awesome Made by [País]" e
                assim vai?
              </p>
              <p>Aqui quem é "Awesome" é você 🫶</p>
            </small>
          </main>
          <main
            ref={sectionViews[3][0]}
            className={sectionViews[3][1] ? 'show' : 'hide'}
            id='team'
          >
            <h2>
              Quem está por trás da <strong>Awesome You</strong>?
            </h2>
            <small>
              <p>
                Para discussões, ideias, reportar erros, iniciar discussões e
                até debates, você pode abrir um Issue no nosso{' '}
                <SafeLink to='https://github.com/wellwelwel/awesomeyou'>
                  <strong>Repositório do GitHub</strong>
                </SafeLink>
                , assim toda comunidade pode participar.
              </p>
              <p>
                Se precisar entrar em contato diretamente com alguém do nosso
                time, fique à vontade para nos chamar através da rede social de
                sua preferência 🤝
              </p>
            </small>
            <div className='team'>
              <div className='cards'>
                <SafeLink to='https://weslley.io/'>
                  <header>
                    <img
                      loading='lazy'
                      src='/img/team/1738374865030.jpeg'
                      alt='Weslley Araújo'
                    />
                    <span>Weslley Araújo</span>
                  </header>
                </SafeLink>
                <SafeLink to='https://linktr.ee/lari.sazevedo'>
                  <header>
                    <img
                      loading='lazy'
                      src='/img/team/1734193593018.jpeg'
                      alt='Larissa Azevedo'
                    />
                    <span>Larissa Azevedo</span>
                  </header>
                </SafeLink>
                <SafeLink to='https://beacons.ai/lsantos'>
                  <header>
                    <img
                      loading='lazy'
                      src='/img/team/1675982740716.jpeg'
                      alt='Lucas Santos'
                    />
                    <span>Lucas Santos</span>
                  </header>
                </SafeLink>
              </div>
            </div>
            <footer>
              Nosso trabalho vai além de ser voluntário, nós simplesmente amamos
              o que fazemos 💙
            </footer>
          </main>
        </main>
      </div>
    </Layout>
  );
};
