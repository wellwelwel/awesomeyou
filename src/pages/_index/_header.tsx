/*---------------------------------------------------------------------------------------------
 *  Copyright (c) https://awesomeyou.io and contributors. All rights reserved.
 *  Licensed under the GNU Affero General Public License v3.0. See https://github.com/wellwelwel/awesomeyou/blob/main/LICENSE for license information.
 *--------------------------------------------------------------------------------------------*/

import type { FC } from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import Link from '@docusaurus/Link';
import { Code, Quote, UsersRound } from 'lucide-react';
import { ReactTyped } from 'react-typed';
import PeopleA from '@site/content/assets/img/people/A.svg';
import PeopleB from '@site/content/assets/img/people/B.svg';
import PeopleC from '@site/content/assets/img/people/C.svg';
import PeopleD from '@site/content/assets/img/people/D.svg';
import PeopleE from '@site/content/assets/img/people/E.svg';
import PeopleF from '@site/content/assets/img/people/F.svg';
import PeopleI from '@site/content/assets/img/people/I.svg';
import PeopleJ from '@site/content/assets/img/people/J.svg';
import PeopleK from '@site/content/assets/img/people/K.svg';
import PeopleL from '@site/content/assets/img/people/L.svg';
import PeopleM from '@site/content/assets/img/people/M.svg';
import PeopleN from '@site/content/assets/img/people/N.svg';
import PeopleO from '@site/content/assets/img/people/O.svg';
import PeopleP from '@site/content/assets/img/people/P.svg';
import PeopleQ from '@site/content/assets/img/people/Q.svg';
import PeopleR from '@site/content/assets/img/people/R.svg';
import PeopleS from '@site/content/assets/img/people/S.svg';
import PeopleT from '@site/content/assets/img/people/T.svg';
import PeopleU from '@site/content/assets/img/people/U.svg';
import PeopleV from '@site/content/assets/img/people/V.svg';
import { Name } from '@site/src/components/Name';
import { randomize } from '@site/src/helpers/randomizer';

let remainingNumbers: number[];

const curiosities = [
  'Sabia que a maioria das linguagens de programação são open source?',
  'Seu apoio pode começar com uma simples estrela',
  'Acredita-se que primeiro software open source, chamado A-2 System, foi desenvolvido em 1953',
  'O impacto do open source vai além de código: comunidades, inovações e colaborações',
  'O GitHub hospeda mais de 200 milhões de repositórios públicos',
  'Consegue imaginar como seria um mundo sem open source?',
  'Gigantes como Google, Microsoft e Facebook mantêm diversos projetos open source',
  'Muitas startups e empresas baseiam seus produtos em software open source',
  'O impacto do open source é maior que a node_modules',
  'E se o Git não fosse open source?',
  'Se existe uma tecnologia proprietária, com certeza há uma alternativa open source',
  'Contribuir com o open source é uma excelente forma de aprendizado e crescimento profissional',
  'Até fontes que designers usam podem ser open source',
  'Um filme utilizando um software de edição de vídeo open source ganhou o Oscar em 2025',
  'Até na música existem softwares de produção musical open source',
  'Existem até redes socias open source, inclusive brasileiras',
  'Como seria desenvolver software sem bibliotecas e frameworks open source?',
  'Ao deixar uma estrela no repositório, você aparece no feed do autor do projeto',
  'O jogo Doom abriu seu código para o público em 1997, se tornando open source',
  'Já pensou quantos projetos incríveis você pode descobrir hoje?',
];

const shuffleArray = () => {
  remainingNumbers = randomize(Array.from({ length: 20 }, (_, i) => i + 1));
};

export const Header: FC = () => {
  const [currentNumber, setCurrentNumber] = useState(1);
  const pauseRef = useRef(false);
  const barRef = useRef<HTMLDivElement>(null);

  const changeCircle = (item: number) => {
    setCurrentNumber(item);
    pauseRef.current = true;
    setTimeout(() => {
      barRef.current?.classList.add('static');
    }, 10);
  };

  const play = () => {
    pauseRef.current = false;
    barRef.current?.classList.remove('static');
  };

  const randomizeCircles = useCallback(() => {
    if (pauseRef.current) return;
    if (remainingNumbers.length === 0) shuffleArray();

    const current = document.querySelector('.feat .on');
    const nextNumber = remainingNumbers.pop() as number;
    setCurrentNumber(nextNumber);

    setTimeout(() => {
      current?.classList.remove('on');
    }, 250);

    document
      .querySelector(`.feat span:nth-child(${nextNumber})`)
      ?.classList.add('on');
  }, []);

  useEffect(() => {
    shuffleArray();
    randomizeCircles();

    const container = document.querySelector('.feat');
    if (!container) return;

    const children = Array.from(container.querySelectorAll('span'));

    for (const item of children)
      item.style.order = String(Math.floor(Math.random() * 20));

    const highlightInterval = setInterval(randomizeCircles, 5000);

    return () => {
      clearInterval(highlightInterval);
    };
  }, []);

  return (
    <>
      <header>
        <aside>
          <h1 aria-label='Como seu projeto impacta o mundo real?'>
            <div>
              <Name name='Como seu projeto impacta o' />
            </div>
            <div>
              <Name name='mundo real?' />
            </div>
          </h1>
          <small>Awesome You 💛</small>
          <small>
            Conheça uma iniciativa que valoriza o lado humano do{' '}
            <em>open source</em>.
          </small>
          <menu>
            <section>
              <Link to='projects' className='btn-split'>
                <span className='btn-content'>
                  <span className='text'>Projetos</span>
                </span>
                <span className='btn-dropdown'>
                  <Code />
                </span>
              </Link>
              <Link to='maintainers' className='btn-split'>
                <span className='btn-dropdown'>
                  <UsersRound />
                </span>
                <span className='btn-content'>
                  <span className='text'>Pessoas</span>
                </span>
              </Link>
            </section>
          </menu>
        </aside>
        <div className='feat'>
          <span onMouseEnter={() => changeCircle(1)} onMouseLeave={play}>
            <PeopleA />
          </span>
          <span onMouseEnter={() => changeCircle(2)} onMouseLeave={play}>
            <PeopleB />
          </span>
          <span onMouseEnter={() => changeCircle(3)} onMouseLeave={play}>
            <PeopleC />
          </span>
          <span onMouseEnter={() => changeCircle(4)} onMouseLeave={play}>
            <PeopleD />
          </span>
          <span onMouseEnter={() => changeCircle(5)} onMouseLeave={play}>
            <PeopleE />
          </span>
          <span onMouseEnter={() => changeCircle(6)} onMouseLeave={play}>
            <PeopleF />
          </span>
          <span onMouseEnter={() => changeCircle(7)} onMouseLeave={play}>
            <PeopleI />
          </span>
          <span onMouseEnter={() => changeCircle(8)} onMouseLeave={play}>
            <PeopleJ />
          </span>
          <span onMouseEnter={() => changeCircle(9)} onMouseLeave={play}>
            <PeopleK />
          </span>
          <span onMouseEnter={() => changeCircle(10)} onMouseLeave={play}>
            <PeopleL />
          </span>
          <span onMouseEnter={() => changeCircle(11)} onMouseLeave={play}>
            <PeopleM />
          </span>
          <span onMouseEnter={() => changeCircle(12)} onMouseLeave={play}>
            <PeopleN />
          </span>
          <span onMouseEnter={() => changeCircle(13)} onMouseLeave={play}>
            <PeopleO />
          </span>
          <span onMouseEnter={() => changeCircle(14)} onMouseLeave={play}>
            <PeopleP />
          </span>
          <span onMouseEnter={() => changeCircle(15)} onMouseLeave={play}>
            <PeopleQ />
          </span>
          <span onMouseEnter={() => changeCircle(16)} onMouseLeave={play}>
            <PeopleR />
          </span>
          <span onMouseEnter={() => changeCircle(17)} onMouseLeave={play}>
            <PeopleS />
          </span>
          <span onMouseEnter={() => changeCircle(18)} onMouseLeave={play}>
            <PeopleT />
          </span>
          <span onMouseEnter={() => changeCircle(19)} onMouseLeave={play}>
            <PeopleU />
          </span>
          <span onMouseEnter={() => changeCircle(20)} onMouseLeave={play}>
            <PeopleV />
          </span>
        </div>
      </header>
      <small className='quoted'>
        <div ref={barRef} key={currentNumber} className='bar'></div>
        <Quote />
        <ReactTyped
          typeSpeed={20}
          strings={[`${curiosities[currentNumber - 1]} ✨`]}
        />
      </small>
    </>
  );
};
