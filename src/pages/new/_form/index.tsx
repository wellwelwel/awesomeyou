import type { FC } from 'react';
import { Blocks } from 'lucide-react';
import { Maintainer } from './_maintaner';
import { Project } from './_project';

export const Form: FC = () => {
  return (
    <form>
      <Maintainer />
      <h2>
        <Blocks /> Projetos
      </h2>
      <Project />
    </form>
  );
};
