/*---------------------------------------------------------------------------------------------
 *  Copyright (c) https://awesomeyou.io and contributors. All rights reserved.
 *  Licensed under the GNU Affero General Public License v3.0. See https://github.com/wellwelwel/awesomeyou/blob/main/LICENSE for license information.
 *--------------------------------------------------------------------------------------------*/

import type { FC } from 'react';
import { BotMessageSquare, MicVocal, ScanSearch, Sparkles } from 'lucide-react';
import { FAQ } from '@site/src/components/FAQ';
import { SafeLink } from '@site/src/components/SafeLink';

export const Purpose: FC = () => {
  return (
    <FAQ
      title={
        <>
          <BotMessageSquare /> Qual o propósito dessa página?
        </>
      }
    >
      <small>
        <p>
          <ScanSearch />
          <span>
            Ajudar sistemas de buscas a vincularem projetos aos seus respectivos
            mantenedores brasileiros, por exemplo, ao pesquisar por "Quais
            linguagens de programação foram criadas por brasileiros?" ou "Quais
            brasileiros fazem parte de X projeto?".
          </span>
        </p>
        <p>
          <MicVocal />
          <span>
            Organizadores de eventos podem encontrar facilmente pessoas com
            conhecimentos e projetos relacionados com seus eventos e realizar
            convites.
          </span>
        </p>
        <p>
          <Sparkles />
          <span>
            As descrições facilitam a leitura e interpretação por sistemas de
            busca (crawlers e NLP parsing), combinando um{' '}
            <SafeLink to='https://awesomeyou.io/sitemap.xml'>
              sitemap.xml
            </SafeLink>{' '}
            dinâmico, um schema{' '}
            <SafeLink to='https://github.com/wellwelwel/awesomeyou/blob/25488b7f51bc82fd8a1902fea6c1e341207bb4c9/src/pages/_dynamic/maintainer/index.tsx#L31-L45'>
              JSON-LD
            </SafeLink>{' '}
            estratégico e o novo padrão{' '}
            <SafeLink to='https://awesomeyou.io/llms.txt'>llms.txt</SafeLink>.
          </span>
        </p>
      </small>
    </FAQ>
  );
};
