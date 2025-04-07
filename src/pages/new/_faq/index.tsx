/*---------------------------------------------------------------------------------------------
 *  Copyright (c) https://awesomeyou.io and contributors. All rights reserved.
 *  Licensed under the GNU Affero General Public License v3.0. See https://github.com/wellwelwel/awesomeyou/blob/main/LICENSE for license information.
 *--------------------------------------------------------------------------------------------*/

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
