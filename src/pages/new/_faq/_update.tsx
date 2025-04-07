/*---------------------------------------------------------------------------------------------
 *  Copyright (c) https://awesomeyou.io and contributors. All rights reserved.
 *  Licensed under the GNU Affero General Public License v3.0. See https://github.com/wellwelwel/awesomeyou/blob/main/LICENSE for license information.
 *--------------------------------------------------------------------------------------------*/

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
