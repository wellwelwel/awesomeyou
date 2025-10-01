/*---------------------------------------------------------------------------------------------
 *  Copyright (c) https://awesomeyou.io and contributors. All rights reserved.
 *  Licensed under the GNU Affero General Public License v3.0. See https://github.com/wellwelwel/awesomeyou/blob/main/LICENSE for license information.
 *--------------------------------------------------------------------------------------------*/

import type { ResumedMaintaners } from '@site/src/@types/maintainers';
import type { ResumedProject } from '@site/src/@types/projects';

export type ShieldStatsProps = {
  value: string;
  label: string;
};

export type GitHubStatsProps = {
  total_count: number;
  forks_count: number;
  stargazers_count: number;
  license: {
    spdx_id: string;
  };
};

export type GitHubList = {
  commit: {
    author: {
      date: string;
    };
  };
}[];

export type GitHubRateLimit = {
  rate: {
    limit: number;
    remaining: number;
    reset: number;
  };
};

export type GitHubUser = {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
  name: string;
  bio: string;
  location: string;
  blog: string;
  twitter_username: string;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
};

export type CloudflareError = {
  errors?: {
    message?: string;
  }[];
};

export type APIErrorResponse = {
  message: string;
};

export type MaintainersAPIResponse = ResumedMaintaners[];

export type ProjectsAPIResponse = ResumedProject[];
