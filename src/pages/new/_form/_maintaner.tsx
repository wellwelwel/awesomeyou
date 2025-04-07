/*---------------------------------------------------------------------------------------------
 *  Copyright (c) https://awesomeyou.io and contributors. All rights reserved.
 *  Licensed under the GNU Affero General Public License v3.0. See https://github.com/wellwelwel/awesomeyou/blob/main/LICENSE for license information.
 *--------------------------------------------------------------------------------------------*/

import type { FC } from 'react';
import { useContext } from 'react';
import { CircleAlert, Github, User } from 'lucide-react';
import { Context } from '@site/src/contexts/New';

export const Maintainer: FC = () => {
  const { useMaintainer } = useContext(Context);
  const [maintainer, setMaintainer] = useMaintainer;

  return (
    <>
      <h2>
        <User /> Quem matém os projetos?
      </h2>
      <label>
        <span>
          <Github />
          <span>
            Username do GitHub <em>*</em>
          </span>
        </span>
        <input
          placeholder='Ex.: felipefialho'
          type='text'
          name='maintainer'
          maxLength={39}
          required
          value={maintainer}
          onChange={(e) => setMaintainer(e.currentTarget.value.trim() || '')}
        />
        <small>
          <CircleAlert /> O username do perfil de quem mantém o projeto no
          GitHub (obrigatório).
        </small>
      </label>
    </>
  );
};
