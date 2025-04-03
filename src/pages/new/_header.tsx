import type { FC } from 'react';
import Link from '@docusaurus/Link';
import { ChevronRight, ExternalLink, PackagePlus } from 'lucide-react';
import { Name } from '@site/src/components/Name';
import { SafeLink } from '@site/src/components/SafeLink';

export const Header: FC = () => {
  return (
    <header>
      <h1 aria-label='Novo Projeto'>
        <Name name='<Novo Projeto + />' />
      </h1>
      <small className='baloon'>
        <div className='float'>
          <PackagePlus />
        </div>
        <span>Faça parte da nossa história.</span>
      </small>
      <small>
        <p>
          Para manter a relevância dos projetos dentro da iniciativa, eles
          precisam atingir individualmente, pelo menos{' '}
          <strong>250 pontos</strong>. Consulte as{' '}
          <SafeLink to='https://github.com/wellwelwel/awesomeyou/blob/main/docs/RULES.md'>
            Regras <ExternalLink />
          </SafeLink>{' '}
          e{' '}
          <Link to='/calculator'>
            use nossa calculadora para descobrir o score do projeto{' '}
            <ChevronRight />
          </Link>
        </p>
        <br />
        <SafeLink to='https://github.com/wellwelwel/awesomeyou/issues/4'>
          Você pode contribuir para melhorar o sistema de pontos{' '}
          <ExternalLink />
        </SafeLink>
      </small>
    </header>
  );
};
