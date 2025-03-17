import type { ReactNode } from 'react';
import { useRef } from 'react';
import Layout from '@theme/Layout';
import {
  ChevronRight,
  CircleAlert,
  CircleHelp,
  ExternalLink,
  Github,
  GitPullRequestCreate,
  IdCard,
  LetterText,
  MessageCircleHeart,
} from 'lucide-react';
import { Name } from '@site/src/components/Name';

import '@site/src/css/pages/new.scss';

import Link from '@docusaurus/Link';
import { SafeLink } from '../components/SafeLink';

export default (): ReactNode => {
  const scoreRef = useRef<HTMLDivElement>(null);

  return (
    <Layout
      title='Novo Projeto'
      description='Descubra projetos open source incríveis criados e mantidos por desenvolvedores brasileiros.'
    >
      <div id='new'>
        <main>
          <header>
            <h1>
              <Name name='<Novo Projeto + />' />
            </h1>
            <small>
              <p>
                Para manter a relevância dos projetos dentro da iniciativa e dos
                seus respectivos mantenedores, o projeto precisa atingir pelo
                menos <strong>250 pontos</strong>.{' '}
                <Link to='/calculator'>
                  Use nossa calculadora para descobrir o score do seu projeto{' '}
                  <ChevronRight />
                </Link>
              </p>
              <br />
              <SafeLink to='https://github.com/wellwelwel/awesomeyou/issues/1'>
                Você pode contribuir para melhorar o sistema de pontos{' '}
                <ExternalLink />
              </SafeLink>
            </small>
            <form>
              <label>
                <span>
                  <Github />
                  <span>
                    Username do Mantenedor <em>*</em>
                  </span>
                </span>
                <input
                  placeholder='Ex.: felipefialho'
                  type='text'
                  name='maintainer'
                  required
                />
                <small>
                  <CircleAlert /> O username do perfil de quem mantém o projeto
                  no GitHub (obrigatório).
                </small>
              </label>
              <label>
                <span>
                  <Github />
                  <span>
                    URL do Repositório <em>*</em>
                  </span>
                </span>
                <input
                  placeholder='Ex.: https://github.com/BrasilAPI/BrasilAPI'
                  type='text'
                  name='repositoryURL'
                  required
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
                  placeholder='Ex.: Esse é meu projeto incrível que faz coisas ainda mais incríveis se usado por você.'
                  type='text'
                  name='description'
                  required
                />
                <small>
                  <CircleAlert /> Descrição do projeto (obrigatório).
                </small>
              </label>
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
                  name='name'
                  required
                />
                <small>
                  <CircleHelp /> Se o nome não for definido, será usado o nome
                  do repositório (opcional).
                </small>
              </label>
              <label>
                <span>
                  <MessageCircleHeart />
                  <span>
                    Mensagem <sup>?</sup>
                  </span>
                </span>
                <input
                  placeholder='Ex.: Deixe uma estrela para mostrar seu apoio.'
                  type='text'
                  name='message'
                  required
                />
                <small>
                  <CircleHelp /> Uma mensagem (CTA) para atrair pessoas a
                  usarem, contribuírem e apoiarem seu projeto (opcional).
                </small>
              </label>
              <label>
                <span>
                  <img loading='lazy' src='/img/npm.svg' alt='npm' /> Pacote NPM{' '}
                  <sup>?</sup>
                </span>
                <input placeholder='Ex.: poku' type='text' name='npm' />
                <small>
                  <CircleHelp /> Nome do pacote npm, caso exista (opcional).
                </small>
              </label>
              <label>
                <span>
                  <img loading='lazy' src='/img/homebrew.svg' alt='npm' />{' '}
                  Pacote Homebrew<sup>?</sup>
                </span>
                <input placeholder='Ex.: elixir' type='text' name='homebrew' />
                <small>
                  <CircleHelp /> Nome do pacote Homebrew, caso exista
                  (opcional).
                </small>
              </label>
              <label>
                <span>
                  <img loading='lazy' src='/img/pypi.svg' alt='PyPi' /> Pacote
                  PyPi <sup>?</sup>
                </span>
                <input placeholder='Ex.: socketify' type='text' name='pypi' />
                <small>
                  <CircleHelp /> Nome do pacote PyPi, caso exista (opcional).
                </small>
              </label>
              <label>
                <span>
                  <img
                    loading='lazy'
                    src='/img/chocolatey.svg'
                    alt='Chocolatey'
                  />{' '}
                  Pacote Chocolatey <sup>?</sup>
                </span>
                <input
                  placeholder='Ex.: rio-terminal'
                  type='text'
                  name='chocolatey'
                />
                <small>
                  <CircleHelp /> Nome do pacote Chocolatey, caso exista
                  (opcional).
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
                />
                <small>
                  <CircleHelp /> ID da extensão do Visual Studio Code
                  Marketplace, caso exista (opcional).
                </small>
              </label>
              <label className='span'>
                <span>
                  <input type='checkbox' name='madeInBrazil' required />
                  Quem criou o projeto é brasileiro?
                </span>
                <small>
                  <CircleHelp /> Tantos projetos brasileiros como estrangeiros
                  são bem vindos, desde que possuam ao menos um mantenedor
                  brasileiro (marque essa opção se a resposta for "sim").
                </small>
              </label>
              <label className='span'>
                <span>
                  <input type='checkbox' name='isAuthor' required />
                  {'<username>'} criou esse projeto?
                </span>
                <small>
                  <CircleHelp /> Marque essa opção se a resposta for "sim".
                </small>
              </label>

              <textarea readOnly name='json'></textarea>

              <button>
                <GitPullRequestCreate /> [ WIP ] Copiar JSON
              </button>
            </form>
          </header>
          <main ref={scoreRef}></main>
        </main>
        <main>
          <header>
            <h1>
              <Name name='<Instruções />' />
            </h1>
          </header>
          <main>
            <p>
              — Faça um <strong>fork</strong> do repositório{' '}
              <strong>
                <SafeLink to='https://github.com/wellwelwel/awesomeyou/fork'>
                  awesomeyou
                </SafeLink>
              </strong>
              .
            </p>
            <p>
              — Baixe seu fork localmente e crie uma nova <em>branch</em>.
            </p>
            <p>
              — Crie o arquivo "
              <strong>
                ./content/maintainers/{'<username>'}/projects.json
              </strong>
              " e cole o conteúdo que você copiou na primeira etapa.
            </p>
            <p>
              — Instale as dependências do projeto com o comando{' '}
              <code>npm ci</code>.
            </p>
            <p>
              — Aplique a formatação com o comando <code>npm run lint:fix</code>
              .
            </p>
            <p>
              — Realize o <em>commit</em> com suas modificações.
            </p>
            <p>
              — Abra uma <strong>Pull Request</strong> com o título "
              <strong>docs: add {'<repository>'}</strong>"
            </p>
            <p>
              — Fique à vontade para falar do seu projeto e, sempre que
              possível, prefira conversar em português.
            </p>
          </main>
        </main>
      </div>
    </Layout>
  );
};
