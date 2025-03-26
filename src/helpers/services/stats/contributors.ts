import { setResult } from '@site/src/helpers/services/stats/set-result';

export const contributors = async (
  organization: string,
  repository: string
) => {
  const results = await (
    await fetch(
      `https://img.shields.io/github/contributors-anon/${organization}/${repository}.json`
    )
  ).json();

  return setResult(results.value);
};
