/*---------------------------------------------------------------------------------------------
 *  Copyright (c) https://awesomeyou.io and contributors. All rights reserved.
 *  Licensed under the GNU Affero General Public License v3.0. See https://github.com/wellwelwel/awesomeyou/blob/main/LICENSE for license information.
 *--------------------------------------------------------------------------------------------*/

import type { FC } from 'react';
import { useContext } from 'react';
import { Code, Lightbulb } from 'lucide-react';
import { Context } from '@site/src/contexts/Maintainer';
import { Project } from './_project';

export const Projects: FC = () => {
  const { maintainer } = useContext(Context);
  const { projects } = maintainer;
  const ifPlural = projects.length > 1 && 's';

  return (
    <main className='projects'>
      <h2>
        <span>
          <Code /> {projects.length} projeto{ifPlural} cadastrado
          {ifPlural}
        </span>
        <img
          src='/assets/img/ants-working.svg'
          loading='eager'
          alt={'Ilustração com Formigas Trabalhando'}
        />
      </h2>
      {projects.length > 1 && (
        <small>
          <Lightbulb /> Os projetos são ordenados pelo maior número de commits.
        </small>
      )}
      {projects.map((project, i) => (
        <Project key={`project:${i}`} {...project} />
      ))}
    </main>
  );
};
