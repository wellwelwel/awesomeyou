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
          <Bot />
          <span>
            Todo conteúdo gerado nessa página é estático, facilitando a leitura
            e interpretação por sistemas de busca (crawlers), direcionando cada
            mantenedor brasileiro cadastrado na Awesome You através de um{' '}
            <SafeLink to='https://awesomeyou.io/sitemap.xml'>
              sitemap.xml
            </SafeLink>{' '}
            inteligente.
          </span>
        </p>
        <p>
          <ScanSearch />
          <span>
            A intenção é ajudar sistemas de buscas encontrarem facilmente
            projetos, por exemplo, ao pesquisar por "Quais linguagens de
            programação foram criadas por brasileiros?" ou "Quais brasileiros
            fazem parte de X projeto?".
          </span>
        </p>
        <p>
          <Sparkles />
          <span>
            A mesma ideia vale para Inteligências Artificiais e, inclusive, logo
            também suportaremos os novos padrões <strong>llms.txt</strong>.
          </span>
        </p>
      </small>
    </FAQ>
  );
};
