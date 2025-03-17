import type { ReactNode } from 'react';
import { useRef, useState } from 'react';
import Layout from '@theme/Layout';
import {
  ChevronRight,
  CircleAlert,
  CircleHelp,
  Clipboard,
  ExternalLink,
  FileCode2,
  GitBranchPlus,
  GitGraph,
  Github,
  GitPullRequestCreateArrow,
  Heart,
  IdCard,
  LetterText,
  MessageCircleHeart,
  PackageCheck,
  Utensils,
  WandSparkles,
} from 'lucide-react';
import { Name } from '@site/src/components/Name';

import '@site/src/css/pages/new.scss';

import Link from '@docusaurus/Link';
import { SafeLink } from '../components/SafeLink';

export default (): ReactNode => {
  const scoreRef = useRef<HTMLDivElement>(null);
  const [maintainer, setMaintainer] = useState('<maintainer>');

  const json = {
    $schema: '../../../schemas/projects.json',
    projects: [{}],
  };

  return (
    <Layout title='Novo Projeto'>
      <div id='new'>
        <main>
          <header>
            <h1>
              <Name name='<Novo Projeto + />' />
            </h1>
            <small>
              <p>
                Para manter a relevância dos projetos dentro da iniciativa e dos
                seus respectivos mantenedores, os projetos precisam atingir pelo
                menos <strong>250 pontos</strong>.{' '}
                <Link to='/calculator'>
                  Use nossa calculadora para descobrir o score do projeto{' '}
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
                  onChange={(e) =>
                    setMaintainer(
                      e.currentTarget.value.trim() || '<maintainer>'
                    )
                  }
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
                  placeholder='Ex.: https://github.com/lpereira/lwan'
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
                  placeholder='Ex.: Esse é um projeto incrível que faz coisas ainda mais incríveis quando usado por você.'
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
                    Mensagem (CTA) <sup>?</sup>
                  </span>
                </span>
                <input
                  placeholder='Ex.: Deixe uma estrela para mostrar seu apoio.'
                  type='text'
                  name='message'
                  required
                />
                <small>
                  <CircleHelp /> Uma mensagem (Call to Action) para atrair
                  pessoas a usarem, contribuírem e apoiarem seu projeto
                  (opcional).
                </small>
              </label>
              <label>
                <span>
                  <img loading='lazy' src='/img/npm.svg' alt='npm' /> Pacote NPM{' '}
                  <sup>?</sup>
                </span>
                <input placeholder='Ex.: gotql' type='text' name='npm' />
                <small>
                  <CircleHelp /> Nome do pacote npm, caso exista (opcional).
                </small>
              </label>
              <label>
                <span>
                  <img loading='lazy' src='/img/homebrew.svg' alt='npm' />{' '}
                  Pacote Homebrew<sup>?</sup>
                </span>
                <input placeholder='Ex.: rio' type='text' name='homebrew' />
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
                <input placeholder='Ex.: splinter' type='text' name='pypi' />
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
                  placeholder='Ex.: elixir'
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
                  Quem criou o projeto é brasileiro? <sup>?</sup>
                </span>
                <small>
                  <CircleHelp /> Marque essa opção se a resposta for "sim".
                </small>
              </label>
              <label className='span'>
                <span>
                  <input type='checkbox' name='isAuthor' required />
                  <ins>{maintainer}</ins> criou esse projeto? <sup>?</sup>
                </span>
                <small>
                  <CircleHelp /> Marque essa opção se a resposta for "sim".
                </small>
              </label>

              <textarea
                readOnly
                name='json'
                value={JSON.stringify(json, null, 2)}
              />

              <button>
                <Clipboard /> Copiar JSON
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
              <Utensils />
              <span>
                Faça um <strong>fork</strong> do repositório{' '}
                <strong>
                  <SafeLink to='https://github.com/wellwelwel/awesomeyou/fork'>
                    awesomeyou
                  </SafeLink>
                </strong>
                .
              </span>
            </p>
            <p>
              <GitBranchPlus />
              <span>
                Baixe seu fork localmente e crie uma nova <em>branch</em>.
              </span>
            </p>
            <p>
              <FileCode2 />
              <span>
                Crie o arquivo{' '}
                <code>
                  ./content/maintainers/<ins>{maintainer}</ins>/projects.json
                </code>{' '}
                e cole o conteúdo que você copiou na primeira etapa.
              </span>
            </p>
            <p>
              <PackageCheck />
              <span>
                Instale as dependências do projeto com o comando{' '}
                <code>npm ci</code>.
              </span>
            </p>
            <p>
              <WandSparkles />
              <span>
                Aplique a formatação com o comando <code>npm run lint:fix</code>
                .
              </span>
            </p>
            <p>
              <GitGraph />
              <span>
                Crie o <em>commit</em> com suas modificações.
              </span>
            </p>
            <p>
              <GitPullRequestCreateArrow />
              <span>
                Abra uma <strong>Pull Request</strong> com o título "
                <strong>docs: add {'<repository>'}</strong>".
              </span>
            </p>
            <p>
              <Heart />
              <span>
                Fique à vontade para falar do seu projeto e conversar em
                português.
              </span>
            </p>
          </main>
        </main>
      </div>
    </Layout>
  );
};
