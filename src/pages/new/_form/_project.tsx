import type { FC } from 'react';
import { useContext } from 'react';
import {
  ArrowUp10,
  CircleAlert,
  CircleHelp,
  Github,
  IdCard,
  LetterText,
  MessageCircleHeart,
  Shapes,
} from 'lucide-react';
import { Context } from '@site/src/contexts/New';

export const Project: FC = () => {
  const { useMaintainer, updateJSON } = useContext(Context);
  const [maintainer] = useMaintainer;

  return (
    <>
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
          onChange={(e) => updateJSON(e, 'repository')}
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
          onChange={(e) => updateJSON(e, 'description')}
        />
        <small>
          <CircleAlert /> Descrição do projeto (obrigatório).
        </small>
      </label>

      <h2>
        <Shapes /> Personalização
      </h2>
      <label>
        <span>
          <IdCard />
          <span>
            Nome <sup>?</sup>
          </span>
        </span>
        <input
          placeholder='Ex.: Meu Projeto'
          type='text'
          name='project-name'
          onChange={(e) => updateJSON(e, 'name')}
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
          onChange={(e) => updateJSON(e, 'message')}
        />
        <small>
          <CircleHelp /> Uma mensagem (Call to Action) para atrair pessoas a
          usarem, contribuírem e apoiarem seu projeto (opcional).
        </small>
      </label>
      <label className='span'>
        <span>
          <input
            type='checkbox'
            name='madeInBrazil'
            onChange={(e) => updateJSON(e, 'madeInBrazil', true)}
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
            onChange={(e) => updateJSON(e, 'isAuthor', true)}
          />
          <ins>{maintainer}</ins> criou esse projeto? <sup>?</sup>
        </span>
        <small>
          <CircleHelp /> Marque essa opção se a resposta for "sim".
        </small>
      </label>

      <h2>
        <ArrowUp10 /> Números
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
          onChange={(e) => updateJSON(e, 'npm')}
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
          onChange={(e) => updateJSON(e, 'homebrew')}
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
          onChange={(e) => updateJSON(e, 'pypi')}
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
          onChange={(e) => updateJSON(e, 'chocolatey')}
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
          onChange={(e) => updateJSON(e, 'vscode')}
        />
        <small>
          <CircleHelp /> ID da extensão do Visual Studio Code Marketplace, caso
          exista (opcional).
        </small>
      </label>
    </>
  );
};
