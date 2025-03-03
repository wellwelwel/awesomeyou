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
                <Link to='/projects' className='btn-split'>
                  <span className='btn-content'>
                    <span className='text'>Projetos</span>
                  </span>
                  <span className='btn-dropdown'>
                    <Code />
                  </span>
                </Link>
                <Link to='/maintainers' className='btn-split'>
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
            <p>
              <GraduationCap />
              <Link to='learn'>
                Aprenda Programação <ChevronRight />
              </Link>
            </p>
            <p>
              <List />
              <Link to='lists'>
                Conheça outras listas incríveis <ChevronRight />
              </Link>
            </p>
            <p>
              <Calculator />
              <Link to='calculator'>
                Descubra o score do seu projeto <ChevronRight />
              </Link>
            </p>
            <p>
              <PackagePlus />
              <Link to='new'>
                Submeta seu projeto <ChevronRight />
              </Link>
            </p>
          </main>
        </main>
      </div>
    </Layout>
  );
};
