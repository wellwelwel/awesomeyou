import type { ReactNode } from 'react';
import {
  startTransition,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import {
  Calculator,
  ChevronRight,
  Code,
  Dices,
  ExternalLink,
  GraduationCap,
  List,
  PackagePlus,
  Shapes,
  UsersRound,
} from 'lucide-react';
import { ReactTyped } from 'react-typed';
import { ResumedMaintaners } from '@site/src/@types/maintainers';
import { ResumedProject } from '@site/src/@types/projects';
import { Name } from '@site/src/components/Name';
import { SafeLink } from '@site/src/components/SafeLink';
import { categories } from '@site/src/configs/categories';
import { languages } from '@site/src/configs/languages';
import { randomize } from '@site/src/helpers/radomizer';

import '@site/src/css/pages/home.scss';

export default (): ReactNode => {
  const projectSort = useRef(0);
  const maintainerSort = useRef(0);

  const [data, setData] = useState<{
    projects: ResumedProject[];
    maintainers: ResumedMaintaners[];
  }>({
    projects: [],
    maintainers: [],
  });

  const sortMaintainers = useCallback(
    (results: ResumedMaintaners[]) => {
      setData((prev) => ({
        ...prev,
        maintainers: randomize(results),
      }));

      maintainerSort.current++;
    },
    [setData]
  );

  const sortProjects = useCallback(
    (results: ResumedProject[]) => {
      setData((prev) => ({
        ...prev,
        projects: randomize(results),
      }));

      projectSort.current++;
    },
    [setData]
  );

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    startTransition(() => {
      fetch(`/json/resume/maintainers.json`, { signal }).then(
        async (response) => {
          const results = await response.json();

          sortMaintainers(results);
        }
      );

      fetch(`/json/resume/projects.json`, { signal }).then(async (response) => {
        const results = await response.json();

        sortProjects(results);
      });
    });

    return () => {
      controller.abort();
    };
  }, [sortProjects, sortMaintainers]);

  return (
    <Layout
      title='Home'
      description='Descubra projetos open source incríveis criados e mantidos por desenvolvedores brasileiros.'
    >
      <div id='home'>
        <main>
          <header>
            <h1>
              <div>
                <Name name='Awesome Brazilian' />
              </div>
              <div>
                <Name name='< open source >' />
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
              Uma iniciativa que traz o lado humano do <em>open source</em>, te
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
              <strong>Re</strong> Descubra o <em>open source</em> ✨
            </h2>
            <div className='show cards'>
              <Link to='projects'>
                <header>
                  <Code />
                  Projetos
                </header>
                <main>
                  Conheça projetos open source criados e mantidos por
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
                  Conheça pessoas mantenedoras por trás de projetos incríveis.
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
                  Descubra seu Score
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
                  Submeta seu Projeto
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
          <main className='show' id='projects'>
            <h2>Apoie projetos criados por brasileiros 🏡</h2>
            <small onClick={() => sortProjects(data.projects)}>
              Gerar Novamente <Dices />
            </small>
            <div className='cards'>
              {data.projects.slice(0, 3).map((project, i) => (
                <div
                  key={`project:${i}:${projectSort.current}`}
                  className='card show'
                >
                  <SafeLink
                    to={`https://github.com/${project.organization}/${project.repository}`}
                  >
                    <header>
                      <img
                        src={`https://avatars.githubusercontent.com/${project.organization}`}
                        loading='lazy'
                        alt={`${project.organization} profile avatar`}
                      />
                      <span title={project.name || project.repository}>
                        {project.name || project.repository}
                      </span>
                      <ExternalLink />
                    </header>
                    <main>
                      <p>{project.description}</p>
                    </main>
                    <footer>
                      {project.language && (
                        <button>
                          <Code /> {languages[project.language]}
                        </button>
                      )}
                      {project.category && (
                        <button>
                          <Shapes /> {categories[project.category]}
                        </button>
                      )}
                    </footer>
                  </SafeLink>
                </div>
              ))}
            </div>
            <footer>
              <Link to='projects'>
                Ver Todos <ChevronRight />
              </Link>
            </footer>
          </main>
          <main className='show' id='maintainers'>
            <h2>Conheça mantenedores brasileiros 👋</h2>
            <small onClick={() => sortMaintainers(data.maintainers)}>
              Gerar Novamente <Dices />
            </small>
            <div className='cards'>
              {data.maintainers.slice(0, 3).map((maintainer, i) => (
                <div
                  key={`project:${i}:${maintainerSort.current}`}
                  className='card show'
                >
                  <Link to={`maintainers/${maintainer.username}`}>
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
                </div>
              ))}
            </div>
            <footer>
              <Link to='maintainers'>
                Ver Todos <ChevronRight />
              </Link>
            </footer>
          </main>
          <main className='show' id='about'>
            <h2>
              Por que "<strong>Awesome You</strong>"?
            </h2>
            <small>
              <p>
                Já viu repositórios que listam outros repositórios e sempre
                começam com "Awesome [Linguagem]", "Awesome Made by [País]" e
                assim vai?
              </p>
              <p>Aqui quem é "Awesome" é você 😌</p>
            </small>
          </main>
          <main className='show' id='team'>
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
                Se precisar entrar em contato de forma privada com alguém do
                nosso time, fique à vontade para nos chamar através da rede
                social de sua preferência 🤝
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
