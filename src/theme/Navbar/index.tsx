import type { ReactNode } from 'react';
import React, { memo, useEffect } from 'react';
import Link from '@docusaurus/Link';
import { useLocation } from '@docusaurus/router';
import { Code, Github, UsersRound } from 'lucide-react';
import { Toaster } from 'sonner';
import Logo from '@site/content/assets/img/logo.svg';
import { SafeLink } from '@site/src/components/SafeLink';

const Navbar = (): ReactNode => {
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
      <Toaster richColors={true} theme='light' position='top-right' />
      <header className='main-header'>
        <Link to='/'>
          <Logo className='logo' />
        </Link>
        <aside>
          <Link to='/projects'>
            <Code /> Projetos
          </Link>
          <Link to='/maintainers'>
            <UsersRound /> Pessoas
          </Link>
          <SafeLink to='https://github.com/wellwelwel/awesomeyou'>
            <Github />
          </SafeLink>
        </aside>
      </header>
    </>
  );
};

export default memo(Navbar);
