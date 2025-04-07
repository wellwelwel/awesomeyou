/*---------------------------------------------------------------------------------------------
 *  Copyright (c) https://awesomeyou.io and contributors. All rights reserved.
 *  Licensed under the GNU Affero General Public License v3.0. See https://github.com/wellwelwel/awesomeyou/blob/main/LICENSE for license information.
 *--------------------------------------------------------------------------------------------*/

const list = new Intl.ListFormat('pt-BR', {
  style: 'long',
  type: 'conjunction',
});

export const format = {
  list: list.format.bind(list),
};
