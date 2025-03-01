export const calculatePenaltyFromActivity = (activityDate: string): number => {
  const currentYear = new Date().getUTCFullYear();
  const yearMatch = activityDate.match(/\b\d{4}\b/);

  if (!yearMatch) return 0; // 1 month or less (unpenalized)

  const activityYear = parseInt(yearMatch[0], 10);
  const yearsPassed = currentYear - activityYear;

  if (yearsPassed < 2) return 0; // up to one year (unpenalized)

  return yearsPassed ** 2 * 250;
};

/**
 * - Each star equals 1 point.
 * - Each fork equals 2 points.
 * - Each interval of 5,000 total downloads equals 2 points.
 * - Each interval of 1,000 downloads per month equals 3 points.
 * - Each commit contributor equals 4 points.
 * - Each issue opened penalizes 1 point.
 * - Each issue closed equals 2 points.
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
  if (typeof contributors === 'number') score += contributors * 4;

  // Total Downloads
  if (typeof vscode === 'number') score += Math.floor(vscode / 5000) * 2;

  // Monthly Downloads
  if (typeof npm === 'number') score += Math.floor(npm / 1000) * 3;
  if (typeof homebrew === 'number') score += Math.floor(homebrew / 1000) * 3;
  if (typeof pypi === 'number') score += Math.floor(pypi / 1000) * 3;

  // Forks
  if (typeof forks === 'number') score += forks * 2;

  // Stars
  if (typeof stars === 'number') score += stars;

  // Maintenance
  if (typeof closedIssues === 'number') score += closedIssues * 2;

  // Activity
  if (typeof commits === 'string') {
    const penalty = calculatePenaltyFromActivity(commits);

    if (typeof issues === 'number') {
      if (penalty > 0) score -= issues * 2500;
      else score -= issues;
    }

    score = score - penalty;
  }

  return score;
};
