import '@site/src/css/pages/new.scss';

import type { ReactNode } from 'react';
import Layout from '@theme/Layout';
import { Provider } from '@site/src/contexts/New';
import { FAQS } from './_faq/_faq';
import { Form } from './_form';
import { Header } from './_header';

export default (): ReactNode => {
  return (
    <Layout title='Novo Projeto'>
      <Provider>
        <div id='new'>
          <main>
            <Header />
            <Form />
          </main>
          <FAQS />
        </div>
      </Provider>
    </Layout>
  );
};
