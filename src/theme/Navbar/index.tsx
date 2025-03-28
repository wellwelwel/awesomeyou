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
  UsersRound,
} from 'lucide-react';
import { Toaster } from 'sonner';
import { SafeLink } from '@site/src/components/SafeLink';

const Navbar = (): ReactNode => {
  const sidebar = useRef<HTMLElement>(null);
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
      <header className='main-header'>
        <Link to='/'>
          <Home className='logo' />
        </Link>
        <aside>
          <Link to='/projects'>
            <Code /> <span>Projetos</span>
          </Link>
          <Link to='/maintainers'>
            <UsersRound /> <span>Pessoas</span>
          </Link>
          <SafeLink to='https://github.com/wellwelwel/awesomeyou'>
            <Github />
          </SafeLink>
          <button
            onClick={() => sidebar.current?.classList.add('on')}
            className='trigger-sidebar'
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
            <button
              onClick={() => sidebar.current?.classList.remove('on')}
              className='close-sidebar'
            >
              <CopyX />
            </button>
          </header>
          <main>
            <Link to='/'>
              <Home /> Página Inicial
            </Link>
            <Link to='/projects'>
              <Code /> Explore Projetos
            </Link>
            <Link to='/maintainers'>
              <UsersRound /> Conheça Pessoas Mantenedoras
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
          </main>
        </div>
      </aside>
    </>
  );
};

export default memo(Navbar);
