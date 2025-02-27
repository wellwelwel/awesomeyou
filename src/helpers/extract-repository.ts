export const extractRepository = (
  url: string
): { organization: string; repository: string } => {
  const match = url.match(
    /^https?:\/\/github\.com\/([^\/]+)\/([^\/]+)(?:\/|$)/
  );

  return {
    organization: match![1],
    repository: match![2],
  };
};
