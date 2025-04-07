/*---------------------------------------------------------------------------------------------
 *  Copyright (c) https://awesomeyou.io and contributors. All rights reserved.
 *  Licensed under the GNU Affero General Public License v3.0. See https://github.com/wellwelwel/awesomeyou/blob/main/LICENSE for license information.
 *--------------------------------------------------------------------------------------------*/

import type {
  ProcessedProject,
  ProjectOptions,
} from '@site/src/@types/projects';
import type { ChangeEvent, FC } from 'react';
import { useCallback, useContext } from 'react';
import {
  ArrowUp10,
  Binary,
  CircleAlert,
  CircleHelp,
  Code,
  Github,
  IdCard,
  LetterText,
  MessageCircleHeart,
  Palette,
  Shapes,
  SquareDashedMousePointer,
} from 'lucide-react';
import { toast } from 'sonner';
import { categories } from '@site/src/configs/categories';
import { languages } from '@site/src/configs/languages';
import { Context } from '@site/src/contexts/New';
import { extractRepository } from '@site/src/helpers/extract-repository';
import { format } from '@site/src/helpers/formatter';
import { sortObjectByValues } from '@site/src/helpers/sort-object';

const initialState: ProjectOptions = {
  repository: '',
  description: '',
  madeInBrazil: false,
  isAuthor: false,
  name: '',
  message: '',
  npm: '',
  homebrew: '',
  pypi: '',
  chocolatey: '',
  vscode: '',
};

export const Project: FC = () => {
  const { useMaintainer, useCurrentProject, showSteps } = useContext(Context);
  const [maintainer] = useMaintainer;
  const [currentProject, setCurrentProject] = useCurrentProject;
  const project = { ...initialState, ...currentProject };
  const repositoryName: string = (() => {
    try {
      const { repository } = extractRepository(project.repository);
      return repository;
    } catch (error) {
      return 'Ex.: Meu Projeto';
    }
  })();

  const setRepository = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      try {
        const repositoryURL = e.currentTarget.value.trim();
        const { organization, repository } = extractRepository(repositoryURL);

        showSteps.current = true;

        try {
          const path = `/assets/json/projects/${organization}/${repository}.json`;
          const existingData: ProcessedProject = await (
            await fetch(path)
          ).json();

          toast.info('Projeto encontrado na iniciativa', {
            description: `Mantenedores: ${format.list(existingData.maintainers.map((maitainer) => maitainer.name))}.`,
            duration: 6000,
          });

          setCurrentProject((prev) => ({
            ...initialState,
            ...(prev || Object.create(null)),
            repository: repositoryURL,
            description: existingData.description,
            name: existingData.name || '',
            categories: existingData.categories || [],
            languages: existingData.languages || [],
            madeInBrazil: existingData.madeInBrazil || false,
            message: existingData.message || '',
            chocolatey: existingData.chocolatey || '',
            homebrew: existingData.homebrew || '',
            npm: existingData.npm || '',
            pypi: existingData.pypi || '',
            vscode: existingData.vscode || '',
          }));
        } catch {}
      } catch (error) {
        showSteps.current = false;

        if (error instanceof Error) toast.error(error.message);
      }
    },
    []
  );

  const updateProject = useCallback(
    async (
      e: ChangeEvent<HTMLInputElement>,
      field: keyof ProjectOptions,
      isBoolean?: boolean
    ) => {
      e.stopPropagation();
      toast.dismiss();

      if (field === 'repository') setRepository(e);

      const value =
        e.currentTarget?.value.trim().length > 0 ? e.currentTarget?.value : '';
      const checked = e.currentTarget?.checked;

      setCurrentProject((prev) => ({
        ...initialState,
        ...(prev || Object.create(null)),
        [field]: isBoolean ? checked : value,
      }));
    },
    [setCurrentProject, showSteps.current]
  );

  const updateList = useCallback(
    <T extends keyof ProjectOptions>(
      e: ChangeEvent<HTMLInputElement>,
      {
        key,
        limit,
        error,
        field,
      }: { key: string; limit: number; error: string; field: T }
    ) => {
      const { checked, parentElement } = e.currentTarget;

      const updateState = (prev: ProjectOptions): ProjectOptions => {
        const currentList = (prev?.[field] as string[]) || [];

        if (checked && currentList.length >= limit) {
          e.preventDefault();
          e.stopPropagation();
          e.currentTarget && (e.currentTarget.checked = false);
          toast.warning(error);

          return prev;
        }

        const newList = checked
          ? [...currentList, key]
          : currentList.filter((item) => item !== key);

        return {
          ...initialState,
          ...(prev || Object.create(null)),
          [field]: newList.length > 0 ? newList : undefined,
        };
      };

      setCurrentProject((prev) => updateState(prev || Object.create(null)));

      if (parentElement) {
        if (!checked) {
          parentElement.classList.remove('on');
          return;
        }

        const previousCount =
          (currentProject?.[field] as string[] | undefined)?.length || 0;
        parentElement.classList[previousCount < limit ? 'add' : 'remove']('on');
      }
    },
    [setCurrentProject, currentProject]
  );

  return (
    <>
      <h2>
        <Binary /> Projeto
      </h2>
      <label>
        <span>
          <Github />
          <span>
            URL do Repositório <em>*</em>
          </span>
        </span>
        <input
          placeholder='Ex.: https://github.com/lpereira/lwan'
          type='text'
          name='repositoryURL'
          required
          value={project.repository}
          onChange={(e) => updateProject(e, 'repository')}
        />
        <small>
          <CircleAlert /> Obrigatório.
        </small>
      </label>
      {showSteps.current && (
        <>
          <label>
            <span>
              <LetterText />
              <span>
                Descrição <em>*</em>
              </span>
            </span>
            <input
              placeholder='Ex.: Esse é um projeto incrível que faz coisas ainda mais incríveis quando usado por você.'
              type='text'
              name='description'
              required
              value={project.description}
              onChange={(e) => updateProject(e, 'description')}
            />
            <small>
              <CircleAlert /> Descrição do projeto (obrigatório).
            </small>
          </label>
          <label className='span'>
            <span>
              <input
                type='checkbox'
                name='madeInBrazil'
                checked={project.madeInBrazil}
                onChange={(e) => updateProject(e, 'madeInBrazil', true)}
              />
              Quem criou o projeto é brasileiro? <sup>?</sup>
            </span>
            <small>
              <CircleHelp /> Marque essa opção se a resposta for "sim".
            </small>
          </label>
          <label className='span'>
            <span>
              <input
                type='checkbox'
                name='isAuthor'
                checked={project.isAuthor}
                onChange={(e) => updateProject(e, 'isAuthor', true)}
              />
              <ins>{maintainer}</ins> criou esse projeto? <sup>?</sup>
            </span>
            <small>
              <CircleHelp /> Marque essa opção se a resposta for "sim".
            </small>
          </label>

          <h2>
            <Palette /> Personalização
          </h2>
          <label>
            <span>
              <IdCard />
              <span>
                Nome <sup>?</sup>
              </span>
            </span>
            <input
              placeholder={repositoryName}
              type='text'
              name='project-name'
              value={project.name}
              onChange={(e) => updateProject(e, 'name')}
            />
            <small>
              <CircleHelp /> Se o nome não for definido, será usado o nome do
              repositório (opcional).
            </small>
          </label>
          <label>
            <span>
              <MessageCircleHeart />
              <span>
                Mensagem (CTA) <sup>?</sup>
              </span>
            </span>
            <input
              placeholder='Ex.: Deixe uma estrela para mostrar seu apoio.'
              type='text'
              name='message'
              value={project.message}
              onChange={(e) => updateProject(e, 'message')}
            />
            <small>
              <CircleHelp /> Uma mensagem (Call to Action) para atrair pessoas a
              usarem, contribuírem e apoiarem seu projeto (opcional).
            </small>
          </label>

          <h2>
            <Code /> Selecione até 2 linguagens
          </h2>
          <div className='multiple'>
            {Object.entries(sortObjectByValues(languages)).map(
              ([key, language]) => {
                const isChecked =
                  project?.languages?.includes(key as keyof typeof languages) ||
                  false;

                return (
                  <label key={key} className='span'>
                    <span className={isChecked ? 'on' : undefined}>
                      <input
                        type='checkbox'
                        name='languages'
                        checked={isChecked}
                        onChange={(e) =>
                          updateList(e, {
                            key,
                            limit: 2,
                            error: 'Você selecionou o máximo de linguagens.',
                            field: 'languages',
                          })
                        }
                      />
                      <SquareDashedMousePointer /> {language}
                    </span>
                  </label>
                );
              }
            )}
          </div>

          <h2>
            <Shapes /> Selecione até 4 categorias
          </h2>
          <div className='multiple'>
            {Object.entries(sortObjectByValues(categories)).map(
              ([key, category]) => {
                const isChecked =
                  project?.categories?.includes(
                    key as keyof typeof categories
                  ) || false;

                return (
                  <label key={key} className='span'>
                    <span className={isChecked ? 'on' : undefined}>
                      <input
                        type='checkbox'
                        name='categories'
                        checked={isChecked}
                        onChange={(e) =>
                          updateList(e, {
                            key,
                            limit: 4,
                            error: 'Você selecionou o máximo de categorias.',
                            field: 'categories',
                          })
                        }
                      />
                      <SquareDashedMousePointer /> {category}
                    </span>
                  </label>
                );
              }
            )}
          </div>

          <h2>
            <ArrowUp10 /> Downloads e Instalações
          </h2>
          <label>
            <span>
              <img loading='lazy' src='/assets/img/npm.svg' alt='npm' /> Pacote
              NPM <sup>?</sup>
            </span>
            <input
              placeholder='Ex.: gotql'
              type='text'
              name='npm'
              value={project.npm}
              onChange={(e) => updateProject(e, 'npm')}
            />
            <small>
              <CircleHelp /> Nome do pacote npm, caso exista (opcional).
            </small>
          </label>
          <label>
            <span>
              <img loading='lazy' src='/assets/img/homebrew.svg' alt='npm' />{' '}
              Pacote Homebrew
              <sup>?</sup>
            </span>
            <input
              placeholder='Ex.: rio'
              type='text'
              name='homebrew'
              value={project.homebrew}
              onChange={(e) => updateProject(e, 'homebrew')}
            />
            <small>
              <CircleHelp /> Nome do pacote Homebrew, caso exista (opcional).
            </small>
          </label>
          <label>
            <span>
              <img loading='lazy' src='/assets/img/pypi.svg' alt='PyPi' />{' '}
              Pacote PyPi <sup>?</sup>
            </span>
            <input
              placeholder='Ex.: splinter'
              type='text'
              name='pypi'
              value={project.pypi}
              onChange={(e) => updateProject(e, 'pypi')}
            />
            <small>
              <CircleHelp /> Nome do pacote PyPi, caso exista (opcional).
            </small>
          </label>
          <label>
            <span>
              <img
                loading='lazy'
                src='/assets/img/chocolatey.svg'
                alt='Chocolatey'
              />{' '}
              Pacote Chocolatey <sup>?</sup>
            </span>
            <input
              placeholder='Ex.: elixir'
              type='text'
              name='chocolatey'
              value={project.chocolatey}
              onChange={(e) => updateProject(e, 'chocolatey')}
            />
            <small>
              <CircleHelp /> Nome do pacote Chocolatey, caso exista (opcional).
            </small>
          </label>
          <label>
            <span>
              <img
                loading='lazy'
                src='/assets/img/vscode.svg'
                alt='Visual Studio Code Marketplace'
              />{' '}
              Visual Studio Code ID <sup>?</sup>
            </span>
            <input
              placeholder='Ex.: dracula-theme.theme-dracula'
              type='text'
              name='vscode'
              value={project.vscode}
              onChange={(e) => updateProject(e, 'vscode')}
            />
            <small>
              <CircleHelp /> ID da extensão do Visual Studio Code Marketplace,
              caso exista (opcional).
            </small>
          </label>
        </>
      )}
    </>
  );
};
