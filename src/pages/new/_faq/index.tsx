import type { FC } from 'react';
import { Instructions } from './_instructions';
import { Multiple } from './_multiple';
import { Update } from './_update';

export const FAQS: FC = () => {
  return (
    <main>
      <Instructions />
      <Multiple />
      <Update />
    </main>
  );
};
