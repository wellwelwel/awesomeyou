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

export type ProcessedProjects = ProjectOptions & {
  maintainer: string;
};

export type MergedProjects = ProcessedProjects & {
  maintainers: string[];
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
