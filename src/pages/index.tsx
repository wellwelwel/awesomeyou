import type { ReactNode } from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import {
  ChevronRight,
  // CircleDot,
  // CircleFadingPlus,
  Code,
  SquareFunction,
  // Earth,
  // GitPullRequestClosed,
  // MicVocal,
  UsersRound,
} from 'lucide-react';
import { ReactTyped } from 'react-typed';
import { Name } from '@site/src/components/Name';

import '@site/src/css/pages/home.scss';

// import { FAQ } from '@site/src/components/FAQ';

export default (): ReactNode => {
  const { siteConfig } = useDocusaurusContext();

  return (
    <Layout
      title={siteConfig.title}
      description='Descubra projetos open-source incríveis criados e mantidos por desenvolvedores brasileiros.'
    >
      <div id='home'>
        <main>
          <header>
            <h1>
              <div>
                <Name name='Awesome Brazilian' />
              </div>
              <div>
                <Name name='< open-source >' />
              </div>
              <div>
                <Name name='People' />
              </div>
            </h1>
            <small>
              <ReactTyped
                strings={[
                  'Awesome You &#x1F499;', // 💙
                  'Awesome You &#x1F49A;', // 💚
                  'Awesome You &#x1F49B;', // 💛
                ]}
                smartBackspace={false}
                typeSpeed={50}
                backSpeed={25}
                backDelay={2000}
                loop={true}
                fadeOut={true}
              />
            </small>
            <small>
              Uma iniciativa que combina o lado humano com o open-source, focada
              em te apresentar projetos <em>open-source</em> incríveis criados e
              mantidos por desenvolvedores <strong>brasileiros</strong>.
            </small>
            <menu>
              <section>
                <Link to='/projects' className='btn-split'>
                  <span className='btn-content'>
                    <span className='text'>Projetos</span>
                  </span>
                  <span className='btn-dropdown'>
                    <Code />
                  </span>
                </Link>
                <Link to='/maintainers' className='btn-split'>
                  <span className='btn-dropdown'>
                    <UsersRound />
                  </span>
                  <span className='btn-content'>
                    <span className='text'>Pessoas</span>
                  </span>
                </Link>
              </section>
            </menu>
          </header>
          {/* <main>
            <FAQ
              title={
                <>
                  <Earth /> Posso cadastrar projetos fora do Brasil?
                </>
              }
            >
              <p>
                Se você é brasileiro e mantém ativamente um projeto open-source
                com impacto real — no mundo real —, mas ele é de outro país,
                você é mais que bem-vindo.
              </p>
              <p>
                Nossa iniciativa valoriza não apenas os projetos, mas
                especialmente as pessoas que os tornam reais.
              </p>
            </FAQ>
            <FAQ
              title={
                <>
                  <GitPullRequestClosed /> Qual a diferença entre ser membro e
                  mantenedor?
                </>
              }
            >
              <p>
                Em projetos grandes ou organizacionais, é comum que membros
                contribuam sem ter autonomia ou autoridade para definir sua
                direção.
              </p>
              <p>
                Já os mantenedores são responsáveis pela gestão e evolução dos
                projetos. Podem aprovar, revisar e mesclar Pull Requests.
              </p>
              <p>
                Em outras palavras, mantenedores têm poder de decisão e execução
                sobre as contribuições internas e externas.
              </p>
            </FAQ>
            <FAQ
              title={
                <>
                  <CircleDot /> Como fazer parte da iniciativa?
                </>
              }
            >
              <p>
                Nosso foco é unir projetos open-source que impactam o mundo
                real.
              </p>

              <h3>Requisitos obrigatórios:</h3>
              <ul>
                <li>
                  Possuir uma licença open-source transparente (repositórios sem
                  o arquivo "LICENSE" não serão aceitos).
                </li>
                <li>
                  Aceitar contribuições externas (Pull Requests e Issues).
                </li>
                <li>
                  Ser um projeto com atividades há pelo menos um ano (seja
                  através de commits, downloads ou instalações recorrentes).
                </li>
              </ul>

              <p>
                É importante mencionar a dificuldade ao tentar mensurar o
                impacto de um projeto.
              </p>

              <p>
                Uma solução amplamente adotada é aceitar projetos que
                conquistaram no mínimo 100 estrelas, mas queremos ir além da
                popularidade.
              </p>

              <p>Por conta disso, criamos um sistema simples de pontos.</p>
            </FAQ>
            <FAQ
              title={
                <>
                  <CircleFadingPlus /> Como somar pontos?
                </>
              }
            >
              <p>
                Se seu projeto bater a partir de <strong>200 pontos</strong>,
                você pode se incluir como mantenedor de impacto e adicionar os
                projetos que atendem aos requisitos.
              </p>

              <h3>Somando pontos:</h3>
              <ul>
                <li>
                  Cada <strong>contribuidor com commits</strong> aceitos
                  equivale a <strong>3 pontos</strong>.
                </li>
                <li>
                  Cada <strong>fork</strong> equivale a{' '}
                  <strong>2 pontos</strong>.
                </li>
                <li>
                  Cada <strong>estrela</strong> equivale a{' '}
                  <strong>1 ponto</strong>.
                </li>
                <li>
                  A cada <strong>1.000 downloads ou instalações mensais</strong>{' '}
                  via NPM, Homebrew ou PyPi, são somados mais{' '}
                  <strong>10 pontos</strong>.
                </li>
              </ul>

              <p>
                Sabemos que barreiras iniciais podem ser um desafio. Seu projeto
                é inovador, mas ainda não atende aos critérios numéricos? Se ele
                gera impacto real, envie mesmo assim para receber feedbacks
                construtivos da comunidade.
              </p>
              <p>
                Essa barreira inicial pode nem sempre parecer justa, mas ajuda a
                manter a relevância dos mantenedores e seus respectivos
                projetos.
              </p>
            </FAQ>
            <FAQ
              title={
                <>
                  <MicVocal /> Como palestrar ou participar do podcast?{' '}
                  <span>(em breve)</span>
                </>
              }
            >
              <p>
                Nossa comunidade vai além das listas e cria um ambiente
                amplamente diverso e inclusivo. Ao abrir um Pull Request, você
                pode selecionar se gostaria de participar de um bate papo
                técnico para nosso futuro podcast ou até mesmo realizar uma
                palestra ao vivo.
              </p>
              <p>
                Essa ainda é uma seção em progresso, mas uma das mais
                interessantes dessa iniciativa.
              </p>
              <ul>
                <li>O que te motivou a criar seu projeto?</li>
                <li>Quais desafios você enfrentou no processo?</li>
                <li>Como foi a reação da comunidade?</li>
                <li>
                  O projeto já te trouxe benefícios na sua vida profissional?
                </li>
              </ul>
            </FAQ>
          </main> */}
          <footer>
            <SquareFunction /> Verifique o{' '}
            <Link to='calculator'>
              score do seu projeto <ChevronRight />
            </Link>
          </footer>
        </main>
      </div>
    </Layout>
  );
};
