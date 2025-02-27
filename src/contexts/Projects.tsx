import { createContext, ReactNode, useRef } from 'react';

type ProjectsContextType = {
  getCounter: (projectId: string) => number;
};

export const ProjectsContext = createContext<ProjectsContextType>(
  Object.create(null) as ProjectsContextType
);

export const ProjectsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const countersRef = useRef<Map<string, number>>(new Map());

  const getCounter = (name: string) => {
    const counters = countersRef.current;

    if (counters.has(name)) return counters.get(name)!;

    const newValue = counters.size + 1;

    counters.set(name, newValue);
    return newValue;
  };

  return (
    <ProjectsContext.Provider value={{ getCounter }}>
      {children}
    </ProjectsContext.Provider>
  );
};
