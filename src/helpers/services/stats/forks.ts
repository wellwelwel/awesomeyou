import { setResult } from '@site/src/helpers/services/stats/set-result';

export const forks = async (organization: string, repository: string) => {
  const results = await (
    await fetch(
      `https://img.shields.io/github/forks/${organization}/${repository}.json`
    )
  ).json();

  return setResult(results.value);
};
