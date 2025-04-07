/*---------------------------------------------------------------------------------------------
 *  Copyright (c) https://awesomeyou.io and contributors. All rights reserved.
 *  Licensed under the GNU Affero General Public License v3.0. See https://github.com/wellwelwel/awesomeyou/blob/main/LICENSE for license information.
 *--------------------------------------------------------------------------------------------*/

import type { MaintainerInfo } from '@site/src/@types/maintainers';
import type { categories } from '@site/src/configs/categories';
import type { languages } from '@site/src/configs/languages';

export type StatsPropos = {
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
  npm?: string;
  pypi?: string;
  homebrew?: string;
  vscode?: string;
  chocolatey?: string;
  madeInBrazil?: boolean;
  isAuthor?: boolean;
};

export type RawProject = {
  $schema: string;
  projects: ProjectOptions[];
};

export type ProjectStats = {
  license: string;
  stars: StatsPropos;
  forks: StatsPropos;
  issues: StatsPropos;
  closedIssues: StatsPropos;
  contributors: StatsPropos;
  commits: string;
  repositoryDependents: StatsPropos;
  npm?: StatsPropos;
  homebrew?: StatsPropos;
  pypi?: StatsPropos;
  vscode?: StatsPropos;
  chocolatey?: StatsPropos;
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

export type ProcessedProject = {
  organization: string;
  repository: string;
  description: string;
  url: string;
  stats: ProjectStats;
  maintainers: MaintainerInfo[];
  languages?: (keyof typeof languages)[];
  categories?: (keyof typeof categories)[];
  madeInBrazil?: boolean;
  name?: string;
  message?: string;
  npm?: string;
  pypi?: string;
  homebrew?: string;
  vscode?: string;
  chocolatey?: string;
  updatedAt?: string;
};
