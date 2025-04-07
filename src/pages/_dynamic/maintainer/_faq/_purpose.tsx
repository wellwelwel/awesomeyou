/*---------------------------------------------------------------------------------------------
 *  Copyright (c) https://awesomeyou.io and contributors. All rights reserved.
 *  Licensed under the GNU Affero General Public License v3.0. See https://github.com/wellwelwel/awesomeyou/blob/main/LICENSE for license information.
 *--------------------------------------------------------------------------------------------*/

import type { FC } from 'react';
import { Bot, MessageSquareShare, ScanSearch, Sparkles } from 'lucide-react';
import { FAQ } from '@site/src/components/FAQ';
import { SafeLink } from '@site/src/components/SafeLink';

export const Purpose: FC = () => {
  return (
    <FAQ
      title={
        <>
          <MessageSquareShare /> Qual o propósito dessa página?
        </>
      }
    >
      <small>
        <p>
          <ScanSearch />
          <span>
            Ajudar sistemas de buscas vincularem facilmente projetos aos seus
            respectivos mantenedores brasileiros, por exemplo, ao pesquisar por
            "Quais linguagens de programação foram criadas por brasileiros?" ou
            "Quais brasileiros fazem parte de X projeto?".
          </span>
        </p>
        <p>
          <Bot />
          <span>
            Todo conteúdo gerado nessa página é estático, facilitando a leitura
            e interpretação por sistemas de busca (crawlers), direcionando cada
            mantenedor brasileiro cadastrado na Awesome You através de um{' '}
            <SafeLink to='https://awesomeyou.io/sitemap.xml'>
              sitemap.xml
            </SafeLink>{' '}
            dinâmico e um schema <em>JSON-LD</em> estratégico.
          </span>
        </p>
        <p>
          <Sparkles />
          <span>
            A mesma ideia vale para Inteligências Artificiais com o novo padrão{' '}
            <SafeLink to='https://awesomeyou.io/llms.txt'>llms.txt</SafeLink>.
          </span>
        </p>
      </small>
    </FAQ>
  );
};
