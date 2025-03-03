export const extractRepository = (
  url: string
): { organization: string; repository: string } => {
  const match = url.match(
    /^https?:\/\/github\.com\/([^\/]+)\/([^\/]+)(?:\/|$)/
  );

  const result = {
    organization: match![1],
    repository: match![2],
  };

  if (result.organization.length > 39)
    throw new Error('Check the organization name.');

  if (result.repository.length > 100)
    throw new Error('Check the repository name.');

  return result;
};
