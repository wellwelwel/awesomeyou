import type { categories } from '@site/src/configs/categories';
import type { languages } from '@site/src/configs/languages';

export type ProjectOptions = {
  name?: string;
  description: string;
  repository: string;
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
  stars: {
    value: number;
    label: string;
  };
  forks: {
    value: number;
    label: string;
  };
  issues: {
    value: number;
    label: string;
  };
  closedIssues: {
    value: number;
    label: string;
  };
  contributors: {
    value: number;
    label: string;
  };
  commits: string;
  npm: {
    value: number;
    label: string;
  };
  homebrew: {
    value: number;
    label: string;
  };
  pypi: {
    value: number;
    label: string;
  };
  vscode?: {
    value: number;
    label: string;
  };
  chocolatey?: {
    value: number;
    label: string;
  };
  repositoryDependents?: {
    value: number;
    label: string;
  };
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
