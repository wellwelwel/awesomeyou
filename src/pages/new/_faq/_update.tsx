import type { FC } from 'react';
import { FileDiff, Pencil } from 'lucide-react';
import { FAQ } from '@site/src/components/FAQ';

export const Update: FC = () => {
  return (
    <FAQ
      title={
        <>
          <Pencil /> Atualizando projetos
        </>
      }
    >
      <small>
        <div>
          <FileDiff />
          <span>
            Você pode simular um novo cadastro, então copiar e colar apenas as
            novas informações, assim como editar o <code>.json</code>{' '}
            manualmente.
          </span>
        </div>
      </small>
    </FAQ>
  );
};
