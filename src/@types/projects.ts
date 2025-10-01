/*---------------------------------------------------------------------------------------------
 *  Copyright (c) https://awesomeyou.io and contributors. All rights reserved.
 *  Licensed under the GNU Affero General Public License v3.0. See https://github.com/wellwelwel/awesomeyou/blob/main/LICENSE for license information.
 *--------------------------------------------------------------------------------------------*/

import type { MaintainerInfo } from '@site/src/@types/maintainers';
import type { categories } from '@site/src/configs/categories';
import type { languages } from '@site/src/configs/languages';

export type StatsProps = {
  value: number;
  label: string;
};

export type ProjectOptions = {
  repository: string;
  description: string;
  name?: string;
  message?: string;
  languages?: (keyof typeof languages)[];
  categories?: (keyof typeof categories)[];
  madeInBrazil?: boolean;
  isAuthor?: boolean;
  npm?: string;
  pypi?: string;
  homebrew?: string;
  vscode?: string;
  chocolatey?: string;
  packagist?: string;
};

export type RawProject = {
  $schema: string;
  projects: ProjectOptions[];
};

export type ProjectStats = {
  license: string;
  stars: StatsProps;
  forks: StatsProps;
  issues: StatsProps;
  closedIssues: StatsProps;
  contributors: StatsProps;
  commits: string;
  repositoryDependents: StatsProps;
  npm?: StatsProps;
  homebrew?: StatsProps;
  pypi?: StatsProps;
  vscode?: StatsProps;
  chocolatey?: StatsProps;
  packagist?: StatsProps;
  score: number;
};

export type ScoreSimulator = ProjectStats & {
  score: number;
  username: string;
  repository: string;
};

export type ResumedProject = {
  organization: string;
  repository: string;
  name?: string;
  description: string;
  language?: keyof typeof languages;
  category?: keyof typeof categories;
};

export type ProcessedProject = Omit<ProjectOptions, 'isAuthor'> & {
  organization: string;
  url: string;
  stats: ProjectStats;
  maintainers: MaintainerInfo[];
  updatedAt?: string;
};
