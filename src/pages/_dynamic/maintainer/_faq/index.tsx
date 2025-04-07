/*---------------------------------------------------------------------------------------------
 *  Copyright (c) https://awesomeyou.io and contributors. All rights reserved.
 *  Licensed under the GNU Affero General Public License v3.0. See https://github.com/wellwelwel/awesomeyou/blob/main/LICENSE for license information.
 *--------------------------------------------------------------------------------------------*/

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
