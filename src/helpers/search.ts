/*---------------------------------------------------------------------------------------------
 *  Copyright (c) https://awesomeyou.io and contributors. All rights reserved.
 *  Licensed under the GNU Affero General Public License v3.0. See https://github.com/wellwelwel/awesomeyou/blob/main/LICENSE for license information.
 *--------------------------------------------------------------------------------------------*/

import type { ChangeEvent } from 'react';
import { normalizeChars } from './normalize-chars';

export const search = (e: ChangeEvent<HTMLInputElement>) => {
  const searchTerm = normalizeChars(e.target.value);
  const cards = Array.from(document.querySelectorAll('[data-search]'));

  for (const card of cards) {
    const dataSearch = normalizeChars(
      card.getAttribute('data-search')?.toLowerCase() || ''
    );

    if (searchTerm === '' || dataSearch.includes(searchTerm)) {
      card.classList.remove('d-n-search');
      continue;
    }

    card.classList.add('d-n-search');
  }
};
