/*---------------------------------------------------------------------------------------------
 *  Copyright (c) https://awesomeyou.io and contributors. All rights reserved.
 *  Licensed under the GNU Affero General Public License v3.0. See https://github.com/wellwelwel/awesomeyou/blob/main/LICENSE for license information.
 *--------------------------------------------------------------------------------------------*/

import { FC, ReactNode } from 'react';
import { Plus } from 'lucide-react';

export type FAQProps = {
  title: ReactNode;
  children: ReactNode;
  open?: boolean;
};

export const FAQ: FC<FAQProps> = ({ title, children, open }) => {
  return (
    <div className={(() => (open ? 'faq open' : 'faq'))()}>
      <h2
        onClick={(e) => e.currentTarget.parentElement!.classList.toggle('open')}
      >
        <span>{title}</span>
        <Plus className='arrow' />
      </h2>
      <div className='wrapper'>
        <span>{children}</span>
      </div>
    </div>
  );
};
