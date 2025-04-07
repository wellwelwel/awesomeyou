/*---------------------------------------------------------------------------------------------
 *  Copyright (c) https://awesomeyou.io and contributors. All rights reserved.
 *  Licensed under the GNU Affero General Public License v3.0. See https://github.com/wellwelwel/awesomeyou/blob/main/LICENSE for license information.
 *--------------------------------------------------------------------------------------------*/

import type { ProcessedMaintainer } from '@site/src/@types/maintainers';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { Plugin } from '@docusaurus/types';

export default function pluginDynamicMaintainers(
  _context: unknown,
  _options: unknown
): Plugin<ProcessedMaintainer[]> {
  return {
    name: 'docusaurus-plugin-dynamic-maintainers',

    async loadContent() {
      const content = JSON.parse(
        await readFile(
          'content/assets/json/maintainers/_cache/infos.json',
          'utf8'
        )
      );

      return content.maintainers;
    },

    async contentLoaded({ content, actions }) {
      const { addRoute, createData } = actions;

      for (const maintainer of content) {
        const dataPath = await createData(
          `${maintainer.username}.json`,
          JSON.stringify(maintainer, null, 0)
        );

        addRoute({
          path: `/maintainers/${maintainer.username}`,
          component: '@site/src/pages/_dynamic/maintainer/index.tsx',
          exact: true,
          modules: { data: dataPath },
        });
      }
    },

    getPathsToWatch() {
      return [resolve('./content/maintainers')];
    },
  };
}
