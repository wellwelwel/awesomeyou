import type { ReactNode } from 'react';
import React, { memo, useEffect } from 'react';
import { useLocation } from '@docusaurus/router';
import { Toaster } from 'sonner';

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
      <header></header>;
    </>
  );
};

export default memo(Navbar);
