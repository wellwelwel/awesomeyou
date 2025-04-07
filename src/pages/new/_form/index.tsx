/*---------------------------------------------------------------------------------------------
 *  Copyright (c) https://awesomeyou.io and contributors. All rights reserved.
 *  Licensed under the GNU Affero General Public License v3.0. See https://github.com/wellwelwel/awesomeyou/blob/main/LICENSE for license information.
 *--------------------------------------------------------------------------------------------*/

import type { FC } from 'react';
import { useCallback, useContext } from 'react';
import { Blocks, Eraser, PackagePlus, Pencil, Plus, Undo2 } from 'lucide-react';
import { toast } from 'sonner';
import { Context, displayModal } from '@site/src/contexts/New';
import { deepTrim } from '@site/src/helpers/deep-trim';
import { extractRepository } from '@site/src/helpers/extract-repository';
import { Maintainer } from './_maintaner';
import { Project } from './_project';

export const Form: FC = () => {
  const { modalRef, useJSON, useCurrentProject, openProject } =
    useContext(Context);
  const [json, setJSON] = useJSON;
  const { projects } = json;
  const [currentProject, setCurrentProject] = useCurrentProject;

  const resetCurrentProject = useCallback(() => {
    displayModal(false);
    modalRef.current?.classList.remove('show');
    setCurrentProject(undefined);

    for (const element of Array.from(
      document.querySelectorAll('.multiple .on')
    )) {
      element.classList.remove('on');
      element.querySelector('input')?.classList.remove('on');
    }
  }, [modalRef.current, setCurrentProject]);

  const saveCurrentProject = useCallback(() => {
    if (!currentProject) {
      toast.error('Preencha os campos obrigatórios para salvar.');
      return;
    }

    if (!currentProject.repository) {
      toast.error('Insira o repositório do projeto.');
      return;
    }

    try {
      extractRepository(currentProject.repository);
    } catch (error) {
      error instanceof Error && toast.error(error.message);
      return;
    }

    if (!currentProject.description) {
      toast.error('Insira a descrição do projeto.');
      return;
    }

    for (const key in currentProject) {
      if (!Object.prototype.hasOwnProperty.call(currentProject, key)) continue;

      const index = key as keyof typeof currentProject;

      if (
        !currentProject[index] &&
        index !== 'repository' &&
        index !== 'description'
      )
        delete currentProject[index];
    }

    const index = json.projects?.findIndex(
      (project) => project.repository === currentProject.repository
    );

    if (index !== -1)
      setJSON((prev) => {
        const updatedProjects = [...prev.projects];

        updatedProjects[index] = currentProject;

        return { ...prev, projects: deepTrim(updatedProjects) };
      });
    else
      setJSON((prev) => ({
        ...prev,
        projects: [...prev.projects, deepTrim(currentProject)],
      }));

    toast.success('Projeto adicionado.');
    resetCurrentProject();
  }, [currentProject, setJSON]);

  const deleteCurrentProject = useCallback(() => {
    if (!currentProject) {
      resetCurrentProject();
      return;
    }

    const index = json.projects?.findIndex(
      (project) => project?.repository === currentProject?.repository
    );

    if (index !== -1)
      setJSON((prev) => {
        const updatedProjects = [...prev.projects];

        delete updatedProjects[index];

        return {
          ...prev,
          projects: updatedProjects.filter(Boolean),
        };
      });

    toast.info('Projeto removido.');
    resetCurrentProject();
  }, [currentProject, setJSON]);

  return (
    <form>
      <Maintainer />
      <h2>
        <Blocks /> Projetos
      </h2>
      <div className='projects'>
        {projects &&
          projects?.map(
            ({ repository: repositoryURL, name }, i) =>
              repositoryURL && (
                <button
                  key={`project:${i}`}
                  type='button'
                  onClick={() => openProject(repositoryURL)}
                >
                  <Pencil />
                  {name
                    ? name
                    : (() => {
                        try {
                          const { repository } =
                            extractRepository(repositoryURL);
                          return repository;
                        } catch {}
                      })()}
                </button>
              )
          )}
        <button type='button' onClick={() => openProject()}>
          <Plus />
          Adicionar Projeto
        </button>
      </div>
      <div ref={modalRef} className='modal'>
        <div className='content'>
          <Project />
          <footer>
            <button
              type='button'
              className='delete'
              onClick={deleteCurrentProject}
            >
              <Eraser />
              Excluir
            </button>
            <div>
              <button
                type='button'
                className='cancel'
                onClick={resetCurrentProject}
              >
                <Undo2 />
                Cancelar
              </button>
              <button type='button' onClick={saveCurrentProject}>
                <PackagePlus />
                Salvar
              </button>
            </div>
          </footer>
        </div>
      </div>
    </form>
  );
};
