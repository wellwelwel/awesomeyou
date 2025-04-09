/*---------------------------------------------------------------------------------------------
 *  Copyright (c) https://awesomeyou.io and contributors. All rights reserved.
 *  Licensed under the GNU Affero General Public License v3.0. See https://github.com/wellwelwel/awesomeyou/blob/main/LICENSE for license information.
 *--------------------------------------------------------------------------------------------*/

import type { ProjectOptions, ProjectStats } from '@site/src/@types/projects';
import { extractRepository } from '@site/src/helpers/extract-repository';
import { getScore } from '@site/src/helpers/get-score';
import { chocolateyDownloads } from '@site/src/helpers/services/stats/chocolatey';
import { issuesClosed } from '@site/src/helpers/services/stats/closed-issues';
import { commits } from '@site/src/helpers/services/stats/commits';
import { contributors } from '@site/src/helpers/services/stats/contributors';
import { forks } from '@site/src/helpers/services/stats/forks';
import { homebrewDownloads } from '@site/src/helpers/services/stats/homebrew';
import { issues } from '@site/src/helpers/services/stats/issues';
import { license } from '@site/src/helpers/services/stats/license';
import { npmDownloads } from '@site/src/helpers/services/stats/npm';
import { packagistDownloads } from '@site/src/helpers/services/stats/packagist';
import { pypiDownloads } from '@site/src/helpers/services/stats/pypi';
import { getRepoDepsManually } from '@site/src/helpers/services/stats/repo-dependencies';
import { stars } from '@site/src/helpers/services/stats/stars';
import { vscodeDownloads } from '@site/src/helpers/services/stats/vscode';

export const processProject = async (
  options: ProjectOptions,
  cb: (data: {
    repository: string;
    organization: string;
    results: ProjectStats;
  }) => unknown
) => {
  const {
    repository: repositoryURL,
    npm,
    pypi,
    homebrew,
    vscode,
    chocolatey,
    packagist,
  } = options;
  const { organization, repository } = extractRepository(repositoryURL);
  const results: ProjectStats = Object.create(null);

  const requests = await Promise.all([
    license(organization, repository),
    stars(organization, repository),
    forks(organization, repository),
    issues(organization, repository),
    issuesClosed(organization, repository),
    commits(organization, repository),
    contributors(organization, repository),
    getRepoDepsManually(organization, repository),
  ]);

  results.license = requests[0];
  results.stars = requests[1];
  results.forks = requests[2];
  results.issues = requests[3];
  results.closedIssues = requests[4];
  results.commits = requests[5];
  results.contributors = requests[6];
  results.repositoryDependents = requests[7];

  if (npm) results.npm = await npmDownloads(npm);
  if (homebrew) results.homebrew = await homebrewDownloads(homebrew);
  if (pypi) results.pypi = await pypiDownloads(pypi);
  if (vscode) results.vscode = await vscodeDownloads(vscode);
  if (chocolatey) results.chocolatey = await chocolateyDownloads(chocolatey);
  if (packagist) results.packagist = await packagistDownloads(packagist);

  results.score = getScore({
    contributors: results?.contributors?.value,
    forks: results?.forks?.value,
    homebrew: results?.homebrew?.value,
    npm: results?.npm?.value,
    pypi: results?.pypi?.value,
    vscode: results?.vscode?.value,
    chocolatey: results?.chocolatey?.value,
    packagist: results?.packagist?.value,
    stars: results?.stars?.value,
    issues: results?.issues?.value,
    closedIssues: results?.closedIssues?.value,
    commits: results?.commits,
    repositoryDependents: results.repositoryDependents?.value,
  });

  return await cb({
    organization,
    repository,
    results,
  });
};
