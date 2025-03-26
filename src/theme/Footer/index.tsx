import type { ReactNode } from 'react';
import { memo } from 'react';
import Link from '@docusaurus/Link';
import { MessageCircleWarning } from 'lucide-react';
import { SafeLink } from '@site/src/components/SafeLink';

const Footer = (): ReactNode => {
  return (
    <footer>
      <h4>
        <MessageCircleWarning /> Awesome You
      </h4>
      <section>
        <p>
          É importante ressaltar que a{' '}
          <Link to='/'>
            <strong>Awesome You</strong>
          </Link>{' '}
          não possui nenhum vínculo com o{' '}
          <SafeLink to='https://github.com/'>
            <strong>GitHub</strong>
          </SafeLink>
          , sendo um projeto <em>open source</em> independente feito pela
          comunidade para a comunidade.
        </p>
        <p>
          Os dados vêm de APIs públicas e das próprias informações fornecidas
          pelos contribuidores ao incluirem projetos e mantenedores.
        </p>
        <p>
          Você pode encontrar nosso código fonte e contribuir através do{' '}
          <SafeLink to='https://github.com/wellwelwel/awesomeyou'>
            <strong>Repositório do GitHub</strong>
          </SafeLink>
          .
        </p>
        <p>
          Este site está sob a licença{' '}
          <SafeLink to='https://github.com/wellwelwel/awesomeyou/blob/main/LICENSE'>
            <strong>GNU Affero General Public License v3.0</strong>
          </SafeLink>{' '}
          e seu conteúdo criativo está protegido sob a licença{' '}
          <SafeLink to='https://github.com/wellwelwel/awesomeyou/blob/main/LICENSE-assets'>
            <strong>CC-BY-4.0</strong>
          </SafeLink>
          .
        </p>
      </section>
    </footer>
  );
};

export default memo(Footer);
