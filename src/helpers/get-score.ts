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
  INACTIVE_ISSUE_PENALTY: 2500,
  INACTIVE_YEAR_BASE_PENALTY: 250,
});

export const calculatePenaltyFromActivity = (activityDate: string): number => {
  const currentYear = new Date().getUTCFullYear();
  const yearMatch = activityDate.match(/\b\d{4}\b/);

  if (!yearMatch) return 0; // 1 month or less (unpenalized)

  const activityYear = parseInt(yearMatch[0], 10);
  const yearsPassed = currentYear - activityYear;

  if (yearsPassed < SCORE_FACTORS.MIN_INACTIVE_YEARS_FOR_PENALTY) return 0; // up to one year (unpenalized)

  return yearsPassed ** 2 * SCORE_FACTORS.INACTIVE_YEAR_BASE_PENALTY;
};

/**
 * - Each star equals 1 point.
 * - Each fork equals 2 points.
 * - Each commit contributor equals 5 points.
 * - Each interval of 2,000 total downloads equals 2 points.
 * - Each interval of 1,000 downloads per month equals 3 points.
 * - Each issue closed equals 2 points, limited to 50% of the current accumulated score.
 * - Each 10 direct repository dependents equals 4 points, limited to 50% of the current accumulated score.
 * - Each issue opened penalizes 1 point.
 * - From two years onwards, each year without maintenance (commits) penalizes 250 points progressively and for each Issue opened, it penalizes 2,500 points.
 *
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
}) => {
  const {
    contributors,
    forks,
    homebrew,
    npm,
    pypi,
    vscode,
    chocolatey,
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

  // Total Downloads
  if (typeof vscode === 'number')
    score +=
      Math.floor(vscode / SCORE_FACTORS.TOTAL_DOWNLOADS_INTERVAL) *
      SCORE_FACTORS.TOTAL_DOWNLOADS_POINTS;

  if (typeof chocolatey === 'number')
    score +=
      Math.floor(chocolatey / SCORE_FACTORS.TOTAL_DOWNLOADS_INTERVAL) *
      SCORE_FACTORS.TOTAL_DOWNLOADS_POINTS;

  // Monthly Downloads
  if (typeof npm === 'number')
    score +=
      Math.floor(npm / SCORE_FACTORS.MONTHLY_DOWNLOADS_INTERVAL) *
      SCORE_FACTORS.MONTHLY_DOWNLOADS_POINTS;

  if (typeof homebrew === 'number')
    score +=
      Math.floor(homebrew / SCORE_FACTORS.MONTHLY_DOWNLOADS_INTERVAL) *
      SCORE_FACTORS.MONTHLY_DOWNLOADS_POINTS;

  if (typeof pypi === 'number')
    score +=
      Math.floor(pypi / SCORE_FACTORS.MONTHLY_DOWNLOADS_INTERVAL) *
      SCORE_FACTORS.MONTHLY_DOWNLOADS_POINTS;

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
    const penalty = calculatePenaltyFromActivity(commits);

    if (typeof issues === 'number') {
      if (penalty > 0) score -= issues * SCORE_FACTORS.INACTIVE_ISSUE_PENALTY;
      else score -= issues;
    }

    score = score - penalty;
  }

  return score;
};
