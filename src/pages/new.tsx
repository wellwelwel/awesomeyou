import type { ReactNode } from 'react';
import Layout from '@theme/Layout';

import '@site/src/css/pages/home.scss';

export default (): ReactNode => {
  return (
    <Layout
      title='Nova Sumbmissão'
      description='Descubra projetos open source incríveis criados e mantidos por desenvolvedores brasileiros.'
    >
      <div id='home'>
        <main>
          <header>
            <h1>Teste 1</h1>
            <small>...</small>
            <section>
              <h2>Submeta seu Projeto</h2>
            </section>
          </header>
        </main>
      </div>
    </Layout>
  );
};
