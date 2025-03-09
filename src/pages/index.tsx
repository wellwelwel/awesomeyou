import type { ReactNode } from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import {
  Calculator,
  ChevronRight,
  Code,
  GraduationCap,
  List,
  PackagePlus,
  UsersRound,
} from 'lucide-react';
import { ReactTyped } from 'react-typed';
import { Name } from '@site/src/components/Name';

import '@site/src/css/pages/home.scss';

export default (): ReactNode => {
  const { siteConfig } = useDocusaurusContext();

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
          <main>
            <h2>
              <strong>[Re]</strong> Descubra o <em>open-source</em> ✨
            </h2>
            <div className='cards'>
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
                  Você tem um projeto inovador que pode receber contribuições?
                  Deixe a gente descobrir ele.
                </main>
                <footer>
                  <ChevronRight />
                </footer>
              </Link>
            </div>
          </main>
        </main>
      </div>
    </Layout>
  );
};
