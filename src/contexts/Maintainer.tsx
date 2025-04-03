import type { ProjectOptions, ProjectStats } from '@site/src/@types/projects';
import { createContext, FC, ReactNode } from 'react';
import { ProcessedMaintainer } from '@site/plugins/maintainers-page';

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
