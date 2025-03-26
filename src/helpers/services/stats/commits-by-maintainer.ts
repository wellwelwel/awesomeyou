import { setResult } from './set-result.js';

export const commitsByMaintainer = async (
  organization: string,
  repository: string,
  maintainer: string
) => {
  const results = await (
    await fetch(
      `https://img.shields.io/github/commit-activity/t/${organization}/${repository}.json?authorFilter=${maintainer}`
    )
  ).json();

  return setResult(results.value);
};
