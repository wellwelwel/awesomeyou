/*---------------------------------------------------------------------------------------------
 *  Copyright (c) https://awesomeyou.io and contributors. All rights reserved.
 *  Licensed under the GNU Affero General Public License v3.0. See https://github.com/wellwelwel/awesomeyou/blob/main/LICENSE for license information.
 *--------------------------------------------------------------------------------------------*/

import type { ReactNode } from 'react';
import React, { memo, useEffect, useRef } from 'react';
import Link from '@docusaurus/Link';
import { useLocation } from '@docusaurus/router';
import {
  Calculator,
  Code,
  CopyX,
  Github,
  GraduationCap,
  Home,
  List,
  Menu,
  PackagePlus,
  Star,
  UsersRound,
} from 'lucide-react';
import { Toaster } from 'sonner';
import { SafeLink } from '@site/src/components/SafeLink';

const Navbar = (): ReactNode => {
  const sidebar = useRef<HTMLElement>(null);
  const header = useRef<HTMLButtonElement>(null);
  const location = useLocation();
  const toTop = (element: Element) => {
    element.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant',
    });
  };

  useEffect(() => {
    const doc = document.querySelector('#__docusaurus');
    if (!doc) return;

    const checkScroll = () => {
      const scrollTop = doc.scrollTop;

      if (scrollTop > 55) {
        header.current?.classList.add('show-bg');
        return;
      }

      header.current?.classList.remove('show-bg');
    };

    checkScroll();
    doc.addEventListener('scroll', checkScroll);

    return () => {
      doc.removeEventListener('scroll', checkScroll);
    };
  }, [header.current]);

  useEffect(() => {
    const doc = document.querySelector('#__docusaurus');
    if (!doc) return;

    if (!location.hash) {
      toTop(doc);
      return;
    }

    const anchor = document.querySelector(location.hash);
    if (!anchor) {
      toTop(doc);
      return;
    }

    const top = anchor.getBoundingClientRect().top + window.scrollY - 50;

    doc.scrollTo({
      top,
      left: 0,
      behavior: 'smooth',
    });
  }, [location.key]);

  return (
    <>
      <Toaster
        richColors={true}
        theme='light'
        position='top-right'
        closeButton={true}
      />
      <header ref={header} className='main-header'>
        <Link to='/'>
          <Home className='logo' /> Awesome You
        </Link>
        <aside>
          <SafeLink
            to='https://github.com/wellwelwel/awesomeyou'
            title='GitHub do Projeto'
            aria-label='GitHub do Projeto'
          >
            <Github />
          </SafeLink>
          <button
            onClick={() => sidebar.current?.classList.add('on')}
            className='trigger-sidebar'
            title='Abrir menu'
            aria-label='Abrir menu'
          >
            <Menu />
          </button>
        </aside>
      </header>
      <aside
        ref={sidebar}
        id='sidebar'
        onClick={() => sidebar.current?.classList.remove('on')}
      >
        <div className='content'>
          <header>
            <Link to='/'>
              <Home />
            </Link>
            <button
              onClick={() => sidebar.current?.classList.remove('on')}
              className='close-sidebar'
              title='Fechar menu'
              aria-label='Fechar menu'
            >
              <CopyX />
            </button>
          </header>
          <main>
            <Link to='/projects'>
              <Code /> Projetos
            </Link>
            <Link to='/maintainers'>
              <UsersRound /> Pessoas
            </Link>
            <Link to='/learn'>
              <GraduationCap /> Aprenda Programação
            </Link>
            <Link to='/lists'>
              <List /> Conheça Listas Incríveis
            </Link>
            <Link to='/calculator'>
              <Calculator /> Descruba seu Score
            </Link>
            <Link to='/new'>
              <PackagePlus /> Submeter Projetos
            </Link>
            <SafeLink to='https://github.com/wellwelwel/awesomeyou'>
              <Star /> Comunidade no GitHub
            </SafeLink>
          </main>
        </div>
      </aside>
    </>
  );
};

export default memo(Navbar);
