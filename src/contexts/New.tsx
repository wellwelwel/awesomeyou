/*---------------------------------------------------------------------------------------------
 *  Copyright (c) https://awesomeyou.io and contributors. All rights reserved.
 *  Licensed under the GNU Affero General Public License v3.0. See https://github.com/wellwelwel/awesomeyou/blob/main/LICENSE for license information.
 *--------------------------------------------------------------------------------------------*/

import type { ProjectOptions, RawProject } from '@site/src/@types/projects';
import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  RefObject,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { toast } from 'sonner';

type ContextType = {
  modalRef: RefObject<HTMLDivElement | null>;
  useMaintainer: [string, Dispatch<SetStateAction<string>>];
  useJSON: [RawProject, Dispatch<SetStateAction<RawProject>>];
  openProject: (project?: string) => void;
  useCurrentProject: [
    ProjectOptions | undefined,
    Dispatch<SetStateAction<ProjectOptions | undefined>>,
  ];
  showSteps: RefObject<boolean>;
};

export const displayModal = (status: boolean) => {
  const html = document.querySelector('html');
  if (!html) return;

  status ? html.classList.add('in-modal') : html.classList.remove('in-modal');
};

export const Context = createContext<ContextType>(Object.create(null));

export const Provider: FC<{ children: ReactNode }> = ({ children }) => {
  const useMaintainer = useState<string>('');
  const useJSON = useState<RawProject>(Object.create(null));
  const useCurrentProject = useState<ProjectOptions | undefined>(undefined);
  const modalRef = useRef<HTMLDivElement>(null);
  const [maintainer] = useMaintainer;
  const [, setCurrentProject] = useCurrentProject;
  const [json] = useJSON;
  const showSteps = useRef(false);

  const openProject = useCallback(
    (repositoryURL?: string) => {
      if (!maintainer || maintainer === '') {
        toast.error(
          'Digite o username ou URL de uma das pessoas que mantém os projetos.'
        );
        return;
      }

      displayModal(true);
      modalRef.current?.classList.add('show');

      if (!repositoryURL) {
        showSteps.current = false;
        setCurrentProject(undefined);
        return;
      }

      const project = json.projects?.find(
        (project) => project.repository === repositoryURL
      );

      setCurrentProject(project);
      showSteps.current = true;
    },
    [maintainer, json, setCurrentProject, showSteps.current]
  );

  useEffect(() => {
    useJSON[1]((prev) => ({
      ...prev,
      $schema: '../../../schemas/projects.json',
      projects: [],
    }));
  }, [useJSON[1]]);

  return (
    <Context.Provider
      value={{
        modalRef,
        useMaintainer,
        useJSON,
        useCurrentProject,
        openProject,
        showSteps,
      }}
    >
      {children}
    </Context.Provider>
  );
};
