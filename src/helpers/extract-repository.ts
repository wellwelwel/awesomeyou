export const extractRepository = (
  url: string
): { organization: string; repository: string } => {
  const limit = Object.freeze({
    domain: 'https://www.github.com/'.length,
    organization: 39,
    repository: 100,
  });

  if (url.length > limit.domain + limit.organization + limit.repository)
    throw new Error('Invalid GitHub repository URL length.');

  const match = url.match(
    /^https?:\/\/github\.com\/([^\/]+)\/([^\/]+)(?:\/|$)/
  );

  if (!match || !match[1] || !match[2])
    throw new Error('Invalid GitHub repository URL format.');

  const result = {
    organization: match[1],
    repository: match[2],
  };

  if (result.organization.length > limit.organization)
    throw new Error(
      "Organization name exceeds GitHub's limit of 39 characters."
    );

  if (result.repository.length > limit.repository)
    throw new Error(
      "Repository name exceeds GitHub's limit of 100 characters."
    );

  return result;
};
