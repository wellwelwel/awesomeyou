export const SCORE_FACTORS = {
  STAR_POINTS: 1,
  FORK_POINTS: 2,
  TOTAL_DOWNLOADS_POINTS: 2,
  TOTAL_DOWNLOADS_INTERVAL: 5000,
  MONTHLY_DOWNLOADS_POINTS: 3,
  MONTHLY_DOWNLOADS_INTERVAL: 1000,
  CONTRIBUTOR_POINTS: 4,
  ISSUE_PENALTY: 1,
  CLOSED_ISSUE_POINTS: 2,
  INACTIVE_ISSUE_PENALTY: 2500,
  INACTIVE_YEAR_BASE_PENALTY: 250,
  MIN_INACTIVE_YEARS_FOR_PENALTY: 2,
} as const;

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
 * - Each interval of 5,000 total downloads equals 2 points.
 * - Each interval of 1,000 downloads per month equals 3 points.
 * - Each commit contributor equals 4 points.
 * - Each issue opened penalizes 1 point.
 * - Each issue closed equals 2 points, limited to 50% of the total score.
 * - From two years onwards, each year without maintenance (commits) penalizes 250 points progressively and for each Issue opened, it penalizes 2,500 points.
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
  /* Community */
  contributors?: number;
  /* Maintenance: Activity */
  commits?: string;
  /* Maintenance: Community Reports */
  issues?: number;
  /* Maintenance: Community Support */
  closedIssues?: number;
}) => {
  const {
    contributors,
    forks,
    homebrew,
    npm,
    pypi,
    vscode,
    stars,
    commits,
    closedIssues,
    issues,
  } = options;

  let score = 0;

  // Contributors
  if (typeof contributors === 'number')
    score += contributors * SCORE_FACTORS.CONTRIBUTOR_POINTS;

  // Total Downloads
  if (typeof vscode === 'number')
    score +=
      Math.floor(vscode / SCORE_FACTORS.TOTAL_DOWNLOADS_INTERVAL) *
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

  // Forks
  if (typeof forks === 'number') score += forks * SCORE_FACTORS.FORK_POINTS;

  // Stars
  if (typeof stars === 'number') score += stars * SCORE_FACTORS.STAR_POINTS;

  // Maintenance
  if (typeof closedIssues === 'number') {
    const closedIssuesPoints = closedIssues * SCORE_FACTORS.CLOSED_ISSUE_POINTS;
    const maxAllowedPoints = score * 0.5;

    score += Math.min(closedIssuesPoints, maxAllowedPoints);
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
