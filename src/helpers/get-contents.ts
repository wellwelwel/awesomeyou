/*---------------------------------------------------------------------------------------------
 *  Copyright (c) https://awesomeyou.io and contributors. All rights reserved.
 *  Licensed under the GNU Affero General Public License v3.0. See https://github.com/wellwelwel/awesomeyou/blob/main/LICENSE for license information.
 *--------------------------------------------------------------------------------------------*/

import type { ProcessedProject } from '@site/src/@types/projects';
import { categories } from '../configs/categories';

type Options = {
  include?: (keyof typeof categories)[];
  exclude?: (keyof typeof categories)[];
};

export const projects = ({
  include = [],
  exclude = [],
}: Options = {}): ProcessedProject[] => {
  const context = require.context(
    '@site/content/assets/json/projects',
    true,
    /\.json$/
  );

  const allProjects = context
    .keys()
    .flatMap((key): ProcessedProject => context(key));

  return allProjects.filter((project) => {
    if (!project.categories || project.categories.length === 0)
      return include.length === 0;

    const toInclude =
      include.length === 0 ||
      project.categories.some((category) => include.includes(category));

    const toExclude =
      exclude.length === 0 ||
      !project.categories.some((category) => exclude.includes(category));

    return toInclude && toExclude;
  });
};
