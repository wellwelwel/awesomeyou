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
  Headset,
  List,
  PackagePlus,
  Shapes,
  SmilePlus,
  Sparkles,
  Star,
  UsersRound,
} from 'lucide-react';
import { ReactTyped } from 'react-typed';
import PeopleA from '@site/content/assets/img/people/A.svg';
import PeopleB from '@site/content/assets/img/people/B.svg';
import PeopleC from '@site/content/assets/img/people/C.svg';
import PeopleD from '@site/content/assets/img/people/D.svg';
import PeopleE from '@site/content/assets/img/people/E.svg';
import PeopleF from '@site/content/assets/img/people/F.svg';
import PeopleI from '@site/content/assets/img/people/I.svg';
import PeopleJ from '@site/content/assets/img/people/J.svg';
import PeopleK from '@site/content/assets/img/people/K.svg';
import PeopleL from '@site/content/assets/img/people/L.svg';
import PeopleM from '@site/content/assets/img/people/M.svg';
import PeopleN from '@site/content/assets/img/people/N.svg';
import PeopleO from '@site/content/assets/img/people/O.svg';
import PeopleP from '@site/content/assets/img/people/P.svg';
import PeopleQ from '@site/content/assets/img/people/Q.svg';
import PeopleR from '@site/content/assets/img/people/R.svg';
import PeopleS from '@site/content/assets/img/people/S.svg';
import PeopleT from '@site/content/assets/img/people/T.svg';
import PeopleU from '@site/content/assets/img/people/U.svg';
import PeopleV from '@site/content/assets/img/people/V.svg';
import { ResumedMaintaners } from '@site/src/@types/maintainers';
import { ResumedProject } from '@site/src/@types/projects';
import { Name } from '@site/src/components/Name';
import { SafeLink } from '@site/src/components/SafeLink';
import { categories } from '@site/src/configs/categories';
import { languages } from '@site/src/configs/languages';
import { randomize } from '@site/src/helpers/radomizer';

import '@site/src/css/pages/home.scss';

import { FAQ } from '../components/FAQ';

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

  useEffect(() => {
    let remainingNumbers: number[];

    const shuffleArray = () => {
      remainingNumbers = randomize(Array.from({ length: 20 }, (_, i) => i + 1));
    };

    const randomizeCircles = () => {
      if (remainingNumbers.length === 0) shuffleArray();

      const nextNumber = remainingNumbers.pop() as number;
      const current = document.querySelector(`.feat .on`);

      setTimeout(() => {
        current?.classList.remove('on');
      }, 500);

      document
        .querySelector(`.feat span:nth-child(${nextNumber}) svg`)
        ?.classList.add('on');
    };

    shuffleArray();
    randomizeCircles();

    const container = document.querySelector('.feat');
    if (!container) return;

    const children = Array.from(container.querySelectorAll('span'));

    for (const item of children)
      item.style.order = String(Math.floor(Math.random() * 20));

    const highlightInterval = setInterval(randomizeCircles, 1000);

    return () => {
      clearInterval(highlightInterval);
    };
  }, []);

  return (
    <Layout
      title='Home'
      description='Descubra projetos open source incríveis criados e mantidos por desenvolvedores brasileiros.'
    >
      <div id='home'>
        <main id='call'>
          <header>
            <aside>
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
                Awesome You é uma iniciativa que traz o lado humano do{' '}
                <em>open source</em>, te apresentando projetos incríveis criados
                e mantidos por desenvolvedores brasileiros.
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
            </aside>
            <div className='feat'>
              <span>
                <PeopleA />
              </span>
              <span>
                <PeopleB />
              </span>
              <span>
                <PeopleC />
              </span>
              <span>
                <PeopleD />
              </span>
              <span>
                <PeopleE />
              </span>
              <span>
                <PeopleF />
              </span>
              <span>
                <PeopleI />
              </span>
              <span>
                <PeopleJ />
              </span>
              <span>
                <PeopleK />
              </span>
              <span>
                <PeopleL />
              </span>
              <span>
                <PeopleM />
              </span>
              <span>
                <PeopleN />
              </span>
              <span>
                <PeopleO />
              </span>
              <span>
                <PeopleP />
              </span>
              <span>
                <PeopleQ />
              </span>
              <span>
                <PeopleR />
              </span>
              <span>
                <PeopleS />
              </span>
              <span>
                <PeopleT />
              </span>
              <span>
                <PeopleU />
              </span>
              <span>
                <PeopleV />
              </span>
            </div>
          </header>
          <main id='cards'>
            <header>
              <h2>
                <strong>re</strong>
                <span>Descubra o open source</span> <Sparkles />
              </h2>
            </header>
            <div className='show cards'>
              <Link to='projects'>
                <header>
                  <div className='left projects'>
                    <Code />
                  </div>
                  Explore Projetos
                  <div className='right'>
                    <ChevronRight />
                  </div>
                </header>
              </Link>

              <Link to='maintainers'>
                <header>
                  <div className='left maintainers'>
                    <UsersRound />
                  </div>
                  Conheça Pessoas Mantenedoras
                  <div className='right'>
                    <ChevronRight />
                  </div>
                </header>
              </Link>

              <Link to='learn'>
                <header>
                  <div className='left learn'>
                    <GraduationCap />
                  </div>
                  Aprenda Programação
                  <div className='right'>
                    <ChevronRight />
                  </div>
                </header>
              </Link>

              <Link to='lists'>
                <header>
                  <div className='left lists'>
                    <List />
                  </div>
                  Conheça Listas Incríveis
                  <div className='right'>
                    <ChevronRight />
                  </div>
                </header>
              </Link>

              <Link to='calculator'>
                <header>
                  <div className='left calculator'>
                    <Calculator />
                  </div>
                  Descubra seu Score
                  <div className='right'>
                    <ChevronRight />
                  </div>
                </header>
              </Link>

              <Link to='new'>
                <header>
                  <div className='left new'>
                    <PackagePlus />
                  </div>
                  Submeter Projetos
                  <div className='right'>
                    <ChevronRight />
                  </div>
                </header>
              </Link>
            </div>
          </main>
          <main className='show' id='projects'>
            <header>
              <h2>
                <span>Apoie projetos criados por pessoas brasileiras</span>{' '}
                <Star />
              </h2>
              <small onClick={() => sortProjects(data.projects)}>
                Regerar <Dices />
              </small>
            </header>
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
            <header>
              <h2>
                <span>Conheça pessoas mantenedoras</span> <SmilePlus />
              </h2>
              <small onClick={() => sortMaintainers(data.maintainers)}>
                Regerar <Dices />
              </small>
            </header>
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
            <header>
              <h2>
                <span>Entenda Melhor</span> <Headset />
              </h2>
            </header>

            <FAQ title='Como você pode apoiar a iniciativa?' open>
              <small>
                Você pode nos apoiar com uma simples{' '}
                <SafeLink to='https://github.com/wellwelwel/awesomeyou'>
                  <strong>estrela no nosso repositório</strong>
                </SafeLink>
                , assim como todos os projetos que você descobrir através da
                nossa iniciativa 🌟
              </small>
            </FAQ>
            <FAQ
              title={
                <>
                  Por que "<span>Awesome You</span>"?
                </>
              }
            >
              <small>
                <p>
                  Já viu repositórios que listam outros repositórios e sempre
                  começam com "
                  <strong>Awesome Linguagem, País, Framework</strong>" e assim
                  vai?
                </p>
                <p>
                  Para nós, <strong>Awesome</strong> é você! Isso traz um
                  trocadilho carinhoso para refletir o trabalho de pessoas
                  mantenedoras de projetos open source brasileiros ✨
                </p>
              </small>
            </FAQ>

            <FAQ
              title={
                <>
                  Posso utilizar o código-fonte da <strong>Awesome You</strong>?
                </>
              }
            >
              <small className='mono'>
                <h3>Código Fonte</h3>
                <p>
                  Desde que sejam cumpridos os requisitos estabelecidos pela
                  licença{' '}
                  <SafeLink to='https://github.com/wellwelwel/awesomeyou/blob/main/LICENSE'>
                    <strong>
                      GNU Affero General Public License v3.0 (AGPL-3.0)
                    </strong>
                  </SafeLink>
                  , sim.
                </p>
                <p>
                  Isso significa que, caso utilize, modifique ou distribua nosso
                  código-fonte, você deve:
                </p>
                <ul>
                  <li>
                    Manter o código-fonte relacionado igualmente aberto, sob a
                    mesma licença e disponível ao público.
                  </li>
                  <li>
                    Incluir os devidos créditos, mencionando nossa homepage:{' '}
                    <strong>https://awesomeyou.io</strong> no seu projeto.
                  </li>
                </ul>
                <p>
                  O uso do código-fonte de forma proprietária é uma infração
                  direta, independentemente de a <strong>Awesome You</strong>{' '}
                  ser devidamente mencionada.
                </p>
                <p>
                  O descumprimento dessas condições constitui uma violação da
                  licença e pode resultar em medidas legais.
                </p>

                <h3>Identidade Visual</h3>
                <p>
                  O uso, modificação ou redistribuição de elementos gráficos,
                  identidade visual, logotipos e ilustrações do{' '}
                  <strong>Awesome You</strong> sem a devida atribuição constitui
                  uma violação da licença{' '}
                  <SafeLink to='https://github.com/wellwelwel/awesomeyou/blob/main/LICENSE-assets'>
                    <strong>
                      Creative Commons Attribution 4.0 (CC-BY-4.0)
                    </strong>
                  </SafeLink>{' '}
                  e pode estar sujeito a medidas legais para garantir o
                  cumprimento dos direitos autorais e dos termos de
                  licenciamento aplicáveis.
                </p>
                <p>
                  O uso de elementos gráficos, identidade visual, logotipos e
                  ilustrações da <strong>Awesome You</strong> não deve, sob
                  nenhuma circunstância, sugerir uma afiliação, parceria oficial
                  ou endosso por parte do projeto, salvo autorização expressa da
                  equipe original.
                </p>

                <h3>Nome</h3>
                <p>
                  O nome "Awesome You" é uma identidade protegida e não deve ser
                  utilizado para nomear ou representar projetos terceiros.
                </p>

                <h3>Uso Comercial</h3>
                <p>
                  Não há restrições quanto ao uso comercial, desde que todos os
                  requisitos de licenciamento mencionados acima sejam
                  integralmente cumpridos.
                </p>
              </small>
            </FAQ>

            <FAQ
              title={
                <>
                  Quem está por trás da <strong>Awesome You</strong>?
                </>
              }
            >
              <small>
                <p>
                  Como um projeto aberto e criado pela comunidade para a
                  comunidade, todos os{' '}
                  <SafeLink to='https://github.com/wellwelwel/awesomeyou/graphs/contributors'>
                    <strong>contribuidores</strong>
                  </SafeLink>{' '}
                  fazem parte do projeto 🤝
                </p>
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
                  nosso time de voluntários, fique à vontade para nos chamar
                  através da rede social de sua preferência:
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
                Nosso trabalho vai além de ser voluntário, nós simplesmente
                amamos o que fazemos 💙
              </footer>
            </FAQ>
          </main>
        </main>
      </div>
    </Layout>
  );
};
