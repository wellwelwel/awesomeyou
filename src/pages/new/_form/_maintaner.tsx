import type { FC } from 'react';
import { useContext } from 'react';
import { BookOpen, CircleAlert, CircleHelp, Github, User } from 'lucide-react';
import { Context } from '@site/src/contexts/New';

export const Maintainer: FC = () => {
  const { useMaintainer } = useContext(Context);
  const [, setMaintainer] = useMaintainer;

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
          onChange={(e) => setMaintainer(e.currentTarget.value.trim() || '***')}
        />
        <small>
          <CircleAlert /> O username do perfil de quem mantém o projeto no
          GitHub (obrigatório).
        </small>
      </label>
      <label>
        <span>
          <BookOpen />
          <span>
            Mini Bio <sup>?</sup>
          </span>
        </span>
        <input
          placeholder=''
          type='text'
          name='maintainer'
          maxLength={200}
          required
        />
        <small>
          <CircleHelp /> Você pode escrever uma mini bio em português de até 200
          caracteres, caso contrário, será usada sua Bio do GitHub.
        </small>
      </label>
    </>
  );
};
