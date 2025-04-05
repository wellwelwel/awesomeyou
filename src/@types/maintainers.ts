import type { ProjectOptions, ProjectStats } from '@site/src/@types/projects';

export type MaintainerInfo = {
  username: string;
  name: string;
  bio: string | null;
  blog: string | null;
  location: string | null;
};

export type ResumedMaintaners = {
  username: string;
  name: string;
  bio: string;
};

export type ProcessedMaintainer = MaintainerInfo & {
  username: string;
  projects: (ProjectOptions & {
    commits: number;
    stats: ProjectStats;
  })[];
};
