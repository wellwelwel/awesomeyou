/*---------------------------------------------------------------------------------------------
 *  Copyright (c) https://awesomeyou.io and contributors. All rights reserved.
 *  Licensed under the GNU Affero General Public License v3.0. See https://github.com/wellwelwel/awesomeyou/blob/main/LICENSE for license information.
 *--------------------------------------------------------------------------------------------*/

import { useMemo } from 'react';
import { Code } from 'lucide-react';
import Projects from '@site/src/components/Projects';
import { projects } from '@site/src/helpers/get-contents';

export default () => (
  <Projects
    title='Projetos'
    icon={<Code />}
    description='Conheça novos projetos criados e mantidos por brasileiros toda vez que voltar aqui.'
    projects={useMemo(
      () =>
        projects({
          exclude: ['list', 'educational'],
        }),
      []
    )}
  />
);
