import type { FC } from 'react';
import { Rocket } from 'lucide-react';
import { Purpose } from './_purpose';
import { Support } from './_support';
import { Why } from './_why';

export const FAQS: FC = () => {
  return (
    <div className='faqs'>
      <h2>
        <Rocket /> Ajude a fazer acontecer!
      </h2>
      <Support />
      <Why />
      <Purpose />
    </div>
  );
};
