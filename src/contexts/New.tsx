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
import { ProjectOptions, RawProject } from '@site/src/@types/projects';

type ContextType = {
  modalRef: RefObject<HTMLDivElement | null>;
  useMaintainer: [string, Dispatch<SetStateAction<string>>];
  useJSON: [RawProject, Dispatch<SetStateAction<RawProject>>];
  openProject: (project?: string) => void;
  useCurrentProject: [
    ProjectOptions | undefined,
    Dispatch<SetStateAction<ProjectOptions | undefined>>,
  ];
};

export const displayModal = (status: boolean) => {
  const html = document.querySelector('html');
  if (!html) return;

  status ? html.classList.add('in-modal') : html.classList.remove('in-modal');
};

export const Context = createContext<ContextType>(Object.create(null));

export const Provider: FC<{ children: ReactNode }> = ({ children }) => {
  const useMaintainer = useState<string>('***');
  const useJSON = useState<RawProject>(Object.create(null));
  const useCurrentProject = useState<ProjectOptions | undefined>(undefined);
  const modalRef = useRef<HTMLDivElement>(null);
  const [maintainer] = useMaintainer;
  const [, setCurrentProject] = useCurrentProject;
  const [json] = useJSON;

  const openProject = useCallback(
    (repositoryURL?: string) => {
      if (!maintainer || maintainer === '***') {
        toast.error('Defina o username de que mantém os projetos.');
        return;
      }

      displayModal(true);
      modalRef.current?.classList.add('show');

      if (!repositoryURL) {
        setCurrentProject(undefined);
        return;
      }

      const project = json.projects?.find(
        (project) => project.repository === repositoryURL
      );

      setCurrentProject(project);
    },
    [maintainer, json, setCurrentProject]
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
      }}
    >
      {children}
    </Context.Provider>
  );
};
