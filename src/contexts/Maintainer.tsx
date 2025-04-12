/*---------------------------------------------------------------------------------------------
 *  Copyright (c) https://awesomeyou.io and contributors. All rights reserved.
 *  Licensed under the GNU Affero General Public License v3.0. See https://github.com/wellwelwel/awesomeyou/blob/main/LICENSE for license information.
 *--------------------------------------------------------------------------------------------*/

import type { ProjectOptions, ProjectStats } from '@site/src/@types/projects';
import type { FC } from 'react';
import type { ProcessedMaintainer } from '../@types/maintainers';
import { createContext, ReactNode } from 'react';

type ContextType = {
  title: string;
  description: string;
  maintainer: Omit<ProcessedMaintainer, 'projects'> & {
    projects: (ProjectOptions & {
      commits: number;
      stats: ProjectStats;
      name: string;
      organization: string;
    })[];
  };
};

export const Context = createContext<ContextType>(Object.create(null));

export const Provider: FC<ContextType & { children: ReactNode }> = ({
  maintainer,
  title,
  description,
  children,
}) => {
  return (
    <Context.Provider
      value={{
        title,
        description,
        maintainer,
      }}
    >
      {children}
    </Context.Provider>
  );
};
