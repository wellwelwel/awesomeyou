export const calculatePenaltyFromActivity = (activityDate: string): number => {
  const currentYear = new Date().getUTCFullYear();
  const yearMatch = activityDate.match(/\b\d{4}\b/);

  if (!yearMatch) return 0; // 1 month or less (unpenalized)

  const activityYear = parseInt(yearMatch[0], 10);
  const yearsPassed = currentYear - activityYear;

  if (yearsPassed < 2) return 0; // up to one year (unpenalized)

  return yearsPassed * 1000;
};

/**
 * - Each star equals 1 point.
 * - Each fork equals 2 points.
 * - Each interval of 1,000 downloads equals 3 points.
 * - Each commit contributor equals 4 points.
 * - Each issue opened penalizes 1 point.
 * - Each issue closed equals 2 points.
 * - From two years onwards, each year without maintenance (commits) penalizes 1000 points.
 */
export const getScore = (options: {
  /* Popularity */
  stars?: number;
  /* Intention */
  forks?: number;
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
  /* Maintenance: Activity */
  issues?: number;
  /* Maintenance: Activity */
  closedIssues?: number;
}) => {
  const {
    contributors,
    forks,
    homebrew,
    npm,
    pypi,
    stars,
    commits,
    closedIssues,
    issues,
  } = options;

  let score = 0;

  if (typeof stars === 'number') score += stars;
  if (typeof forks === 'number') score += forks * 2;
  if (typeof npm === 'number') score += Math.floor(npm / 1000) * 3;
  if (typeof homebrew === 'number') score += Math.floor(homebrew / 1000) * 3;
  if (typeof pypi === 'number') score += Math.floor(pypi / 1000) * 3;
  if (typeof contributors === 'number') score += contributors * 4;

  if (typeof commits === 'string') {
    const penalty = calculatePenaltyFromActivity(commits);

    score = score - penalty;
  }

  if (typeof closedIssues === 'number' && typeof issues === 'number') {
    score -= issues;
    score += closedIssues * 2;
  }

  return score;
};
