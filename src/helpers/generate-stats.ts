import { ProjectOptions, ProjectStats } from '@site/src/@types/projects';
import { extractRepository } from '@site/src/helpers/extract-repository';
import { chocolateyDownloads } from './services/stats/chocolatey';
import { issuesClosed } from './services/stats/closed-issues';
import { commits } from './services/stats/commits';
import { contributors } from './services/stats/contributors';
import { forks } from './services/stats/forks';
import { homebrewDownloads } from './services/stats/homebrew';
import { issues } from './services/stats/issues';
import { license } from './services/stats/license';
import { npmDownloads } from './services/stats/npm';
import { pypiDownloads } from './services/stats/pypi';
import { getRepoDepsManually } from './services/stats/repo-dependencies';
import { stars } from './services/stats/stars';
import { vscodeDownloads } from './services/stats/vscode';

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
  } = options;
  const { organization, repository } = extractRepository(repositoryURL);
  const results = Object.create(null);

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

  return await cb({
    organization,
    repository,
    results,
  });
};
