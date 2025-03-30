import {
  ChangeEvent,
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { ProjectOptions, RawProject } from '@site/src/@types/projects';

type ContextType = {
  useMaintainer: [string, Dispatch<SetStateAction<string>>];
  useJSON: [RawProject, Dispatch<SetStateAction<RawProject>>];
  updateJSON: (
    e: ChangeEvent<HTMLInputElement>,
    field: keyof ProjectOptions,
    isBoolean?: boolean
  ) => void;
};

export const Context = createContext<ContextType>(
  Object.create(null) as ContextType
);

export const Provider: FC<{ children: ReactNode }> = ({ children }) => {
  const useMaintainer = useState('***');
  const useJSON = useState({} as RawProject);

  const updateJSON = useCallback(
    (
      e: ChangeEvent<HTMLInputElement>,
      field: keyof ProjectOptions,
      isBoolean?: boolean
    ) => {
      const value =
        e.currentTarget?.value.trim().length > 0
          ? e.currentTarget?.value.trim()
          : undefined;
      const checked = e.currentTarget?.checked ? true : undefined;

      useJSON[1]((prev) => ({
        ...prev,
        projects: [
          {
            ...prev.projects[0],
            [field]: isBoolean ? checked : value,
          },
        ],
      }));
    },
    []
  );

  useEffect(() => {
    useJSON[1]((prev) => {
      return {
        ...prev,
        $schema: '../../../schemas/projects.json',
        projects: [
          {
            repository: '',
            description: '',
          },
        ],
      };
    });
  }, [useJSON[1]]);

  return (
    <Context.Provider value={{ useMaintainer, useJSON, updateJSON }}>
      {children}
    </Context.Provider>
  );
};
