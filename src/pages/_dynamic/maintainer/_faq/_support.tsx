import type { FC } from 'react';
import { useContext } from 'react';
import {
  Cross,
  Heart,
  HeartHandshake,
  Share2,
  SmilePlus,
  Star,
} from 'lucide-react';
import { FAQ } from '@site/src/components/FAQ';
import { SafeLink } from '@site/src/components/SafeLink';
import { Context } from '@site/src/contexts/Maintainer';

export const Support: FC = () => {
  const { maintainer } = useContext(Context);
  const { name, username } = maintainer;

  return (
    <FAQ
      open
      title={
        <>
          <SmilePlus /> Como você pode apoiar?
        </>
      }
    >
      <small>
        <p>
          <Star />
          <span>
            Incentive deixando uma <ins>estrela</ins> nos projetos que você
            gosta, especialmente nos que você usa.
          </span>
        </p>
        <p>
          <Share2 />
          <span>
            <ins>Compartilhe</ins> projetos que{' '}
            <SafeLink to={`https://github.com/${username}`}>{name}</SafeLink>{' '}
            mantém com a sua rede e conte como eles já te ajudaram.
          </span>
        </p>
        <p>
          <HeartHandshake />
          <span>
            <ins>Ajude outros usuários</ins> respondendo dúvidas no repositório
            dos projetos.
          </span>
        </p>
        <p>
          <Cross />
          <span>
            <ins>Contribua</ins> com os projetos que{' '}
            <SafeLink to={`https://github.com/${username}`}>{name}</SafeLink>{' '}
            mantém.
          </span>
        </p>
        <p>
          <Heart />
          <span>
            <SafeLink to={`https://github.com/sponsors/${username}`}>
              Patrocine
            </SafeLink>{' '}
            mantenedores.
          </span>
        </p>
      </small>
    </FAQ>
  );
};
