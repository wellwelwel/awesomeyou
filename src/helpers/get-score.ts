/*---------------------------------------------------------------------------------------------
 *  Copyright (c) https://awesomeyou.io and contributors. All rights reserved.
 *  Licensed under the GNU Affero General Public License v3.0. See https://github.com/wellwelwel/awesomeyou/blob/main/LICENSE for license information.
 *--------------------------------------------------------------------------------------------*/

export const SCORE_FACTORS = Object.freeze({
  STAR_POINTS: 1,
  FORK_POINTS: 2,
  DIRECT_REPOSITORY_DEPENDENTS_POINTS: 4,
  DIRECT_REPOSITORY_DEPENDENTS_INTERVAL: 10,
  TOTAL_DOWNLOADS_POINTS: 2,
  TOTAL_DOWNLOADS_INTERVAL: 2000,
  MONTHLY_DOWNLOADS_POINTS: 3,
  MONTHLY_DOWNLOADS_INTERVAL: 1000,
  CONTRIBUTOR_POINTS: 5,
  CLOSED_ISSUE_POINTS: 2,
  ISSUE_PENALTY: 1,
  MIN_INACTIVE_YEARS_FOR_PENALTY: 2,
  INACTIVE_ISSUE_PENALTY: 2000,
  INACTIVE_YEAR_BASE_PENALTY: 200,
});

const calculatePenaltyFromActivity = (activityDate: string): number => {
  const currentYear = new Date().getUTCFullYear();
  const yearMatch = activityDate.match(/\b\d{4}\b/);

  if (!yearMatch) return 0; // 1 month or less (unpenalized)

  const activityYear = parseInt(yearMatch[0], 10);
  const yearsPassed = currentYear - activityYear;

  if (yearsPassed < SCORE_FACTORS.MIN_INACTIVE_YEARS_FOR_PENALTY) return 0; // up to one year (unpenalized)

  return yearsPassed ** 2 * SCORE_FACTORS.INACTIVE_YEAR_BASE_PENALTY;
};

const monthlyDownloads = (value?: number): number => {
  if (typeof value === 'number')
    return (
      Math.floor(value / SCORE_FACTORS.MONTHLY_DOWNLOADS_INTERVAL) *
      SCORE_FACTORS.MONTHLY_DOWNLOADS_POINTS
    );

  return 0;
};

const totalDownloads = (value?: number): number => {
  if (typeof value === 'number')
    return (
      Math.floor(value / SCORE_FACTORS.TOTAL_DOWNLOADS_INTERVAL) *
      SCORE_FACTORS.TOTAL_DOWNLOADS_POINTS
    );

  return 0;
};

/**
 * **Note:** order matters.
 */
export const getScore = (options: {
  /* Popularity */
  stars?: number;
  /* Intention */
  forks?: number;
  /* Impact: Downloads & Installations */
  vscode?: number;
  /* Impact: Downloads & Installations */
  npm?: number;
  /* Impact: Downloads & Installations */
  homebrew?: number;
  /* Impact: Downloads & Installations */
  pypi?: number;
  /* Impact: Downloads & Installations */
  chocolatey?: number;
  /* Impact: Downloads & Installations */
  packagist?: number;
  /* Community */
  contributors?: number;
  /* Maintenance: Activity */
  commits?: string;
  /* Maintenance: Community Reports */
  issues?: number;
  /* Maintenance: Community Support */
  closedIssues?: number;
  /* Maintenance: Community Support */
  repositoryDependents?: number;
}): number => {
  const {
    contributors,
    forks,
    homebrew,
    npm,
    pypi,
    vscode,
    chocolatey,
    packagist,
    stars,
    commits,
    closedIssues,
    issues,
    repositoryDependents,
  } = options;

  let score = 0;

  // Stars
  if (typeof stars === 'number') score += stars * SCORE_FACTORS.STAR_POINTS;

  // Forks
  if (typeof forks === 'number') score += forks * SCORE_FACTORS.FORK_POINTS;

  // Contributors
  if (typeof contributors === 'number')
    score += contributors * SCORE_FACTORS.CONTRIBUTOR_POINTS;

  // Monthly Downloads
  score += monthlyDownloads(npm);
  score += monthlyDownloads(homebrew);
  score += monthlyDownloads(pypi);
  score += monthlyDownloads(packagist);

  // Total Downloads
  score += totalDownloads(vscode);
  score += totalDownloads(chocolatey);

  // Maintenance
  if (typeof closedIssues === 'number') {
    const closedIssuesPoints = closedIssues * SCORE_FACTORS.CLOSED_ISSUE_POINTS;
    const maxAllowedPoints = Math.floor(score * 0.5);

    score += Math.min(closedIssuesPoints, maxAllowedPoints);
  }

  // Critical Impact
  if (typeof repositoryDependents === 'number') {
    const directDependentsPoints =
      Math.floor(
        repositoryDependents /
          SCORE_FACTORS.DIRECT_REPOSITORY_DEPENDENTS_INTERVAL
      ) * SCORE_FACTORS.DIRECT_REPOSITORY_DEPENDENTS_POINTS;

    const maxAllowedPoints = Math.floor(score * 0.5);

    score += Math.min(directDependentsPoints, maxAllowedPoints);
  }

  // Activity
  if (typeof commits === 'string') {
    const openIssues = typeof issues === 'number' ? issues : 0;
    const hasIssue = openIssues > 0;
    const penalty = hasIssue ? calculatePenaltyFromActivity(commits) : 0;

    if (hasIssue) {
      if (penalty > 0)
        score -= openIssues * SCORE_FACTORS.INACTIVE_ISSUE_PENALTY;
      else score -= openIssues;
    }

    score = score - penalty;
  }

  return score;
};
