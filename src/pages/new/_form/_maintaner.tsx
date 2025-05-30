/*---------------------------------------------------------------------------------------------
 *  Copyright (c) https://awesomeyou.io and contributors. All rights reserved.
 *  Licensed under the GNU Affero General Public License v3.0. See https://github.com/wellwelwel/awesomeyou/blob/main/LICENSE for license information.
 *--------------------------------------------------------------------------------------------*/

import type { RawProject } from '@site/src/@types/projects';
import type { ChangeEvent, FC } from 'react';
import { startTransition, useCallback, useContext, useEffect } from 'react';
import { createLRU } from 'lru.min';
import { CircleAlert, Github, User } from 'lucide-react';
import { toast } from 'sonner';
import { Context } from '@site/src/contexts/New';

const LRU = createLRU<string, boolean>({ max: 100 });

export const Maintainer: FC = () => {
  const { useMaintainer, useJSON, useFileExists } = useContext(Context);
  const [maintainer, setMaintainer] = useMaintainer;
  const [, setJSON] = useJSON;
  const [, setFileExists] = useFileExists;

  const updateMaintainer = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const username = e.currentTarget.value.trim().split('/').pop() || '';

      setMaintainer(username);
    },
    [setMaintainer]
  );

  const checkUser = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    toast.dismiss();

    const username = e.currentTarget.value.trim();
    if (!username) return;

    if (LRU.has(username)) {
      if (!LRU.get(username))
        toast.error(`O username "${username}" não foi encontrado.`);

      return;
    }

    startTransition(async () => {
      try {
        const response = await fetch(
          `https://api.github.com/users/${username}`
        );
        const exists = response.status !== 404;

        LRU.set(username, exists);

        const { name } = await response.json();

        if (!exists) {
          toast.error(`O username "${username}" não foi encontrado.`);
          return;
        }

        if (typeof name === 'string')
          toast.success(
            `Obrigado por estar aqui, ${(name || username).split(' ').shift()} ✨`
          );
      } catch {}
    });
  }, []);

  useEffect(() => {
    toast.dismiss();

    if (maintainer.trim().length === 0) return;

    startTransition(async () => {
      try {
        const response = await fetch(
          `/maintainers/${maintainer}/projects.json`
        );
        const exists = response.status !== 404;

        if (!exists) {
          setFileExists(false);

          return;
        }

        const raw: RawProject = await response.json();

        setFileExists(true);
        setJSON(raw);

        toast.info(`${maintainer} possui projetos na iniciativa 🚀`);
      } catch {}
    });
  }, [maintainer]);

  return (
    <>
      <h2>
        <User /> Quem mantém os projetos?
      </h2>
      <label className='column'>
        <span>
          <Github />
          <span>
            Username ou URL do GitHub <em>*</em>
          </span>
        </span>
        <input
          placeholder='Ex.: felipefialho'
          type='text'
          name='maintainer'
          maxLength={39}
          required
          value={maintainer}
          onChange={updateMaintainer}
          onBlur={checkUser}
        />
        <small>
          <CircleAlert /> O username do perfil de quem mantém o projeto no
          GitHub (obrigatório).
        </small>
      </label>
    </>
  );
};
