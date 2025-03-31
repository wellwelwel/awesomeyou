import type { ProjectOptions } from '@site/src/@types/projects';
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
import { categories } from '@site/src/configs/categories';
import { languages } from '@site/src/configs/languages';
import { Context } from '@site/src/contexts/New';
import { extractRepository } from '@site/src/helpers/extract-repository';
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
  const { useMaintainer, useCurrentProject } = useContext(Context);
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

  const updateProject = useCallback(
    (
      e: ChangeEvent<HTMLInputElement>,
      field: keyof ProjectOptions,
      isBoolean?: boolean
    ) => {
      const value =
        e.currentTarget?.value.trim().length > 0
          ? e.currentTarget?.value.trim()
          : '';
      const checked = e.currentTarget?.checked;

      setCurrentProject((prev) => ({
        ...initialState,
        ...(prev || Object.create(null)),
        [field]: isBoolean ? checked : value,
      }));
    },
    [setCurrentProject]
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
        <Code /> Selecione até duas linguagens (em breve)
      </h2>
      <div className='multiple'>
        {Object.entries(sortObjectByValues(languages)).map(
          ([key, language]) => (
            <label key={key} className='span'>
              <span>
                <input
                  type='checkbox'
                  name='languages'
                  disabled
                  onChange={(e) =>
                    e.currentTarget.parentElement?.classList[
                      e.currentTarget.checked ? 'add' : 'remove'
                    ]('on')
                  }
                />{' '}
                <SquareDashedMousePointer /> {language}
              </span>
            </label>
          )
        )}
      </div>

      <h2>
        <Shapes /> Selecione até três categorias (em breve)
      </h2>
      <div className='multiple'>
        {Object.entries(sortObjectByValues(categories)).map(
          ([key, category]) => (
            <label key={key} className='span'>
              <span>
                <input
                  type='checkbox'
                  name='categories'
                  onChange={(e) =>
                    e.currentTarget.parentElement?.classList[
                      e.currentTarget.checked ? 'add' : 'remove'
                    ]('on')
                  }
                />{' '}
                <SquareDashedMousePointer /> {category}
              </span>
            </label>
          )
        )}
      </div>

      <h2>
        <ArrowUp10 /> Downloads e Instalações
      </h2>
      <label>
        <span>
          <img loading='lazy' src='/img/npm.svg' alt='npm' /> Pacote NPM{' '}
          <sup>?</sup>
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
          <img loading='lazy' src='/img/homebrew.svg' alt='npm' /> Pacote
          Homebrew
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
          <img loading='lazy' src='/img/pypi.svg' alt='PyPi' /> Pacote PyPi{' '}
          <sup>?</sup>
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
          <img loading='lazy' src='/img/chocolatey.svg' alt='Chocolatey' />{' '}
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
            src='/img/vscode.svg'
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
          <CircleHelp /> ID da extensão do Visual Studio Code Marketplace, caso
          exista (opcional).
        </small>
      </label>
    </>
  );
};
