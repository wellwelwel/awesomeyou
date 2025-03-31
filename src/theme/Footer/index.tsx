import type { ReactNode } from 'react';
import { memo, useEffect, useRef } from 'react';
import Link from '@docusaurus/Link';
import { ChevronUp, MessageCircleWarning } from 'lucide-react';
import { SafeLink } from '@site/src/components/SafeLink';

const Footer = (): ReactNode => {
  const float = useRef<HTMLButtonElement>(null);

  const toTop = () => {
    const doc = document.querySelector('#__docusaurus');
    if (!doc) return;

    doc.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const doc = document.querySelector('#__docusaurus');
    if (!doc) return;

    const checkScroll = () => {
      const scrollTop = doc.scrollTop;

      if (scrollTop > 250) {
        float.current?.classList.remove('hide');
        return;
      }

      float.current?.classList.add('hide');
    };

    checkScroll();
    doc.addEventListener('scroll', checkScroll);

    return () => {
      doc.removeEventListener('scroll', checkScroll);
    };
  }, [float.current]);

  return (
    <>
      <footer className='main-footer'>
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
        <button
          ref={float}
          id='float'
          className='hide'
          onClick={toTop}
          title='Voltar para o topo'
          aria-label='Voltar para o topo'
        >
          <ChevronUp />
        </button>
      </footer>
    </>
  );
};

export default memo(Footer);
