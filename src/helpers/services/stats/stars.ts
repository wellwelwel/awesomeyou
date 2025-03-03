import { setResult } from './set-result';

export const stars = async (organization: string, repository: string) => {
  const results = await (
    await fetch(
      `https://img.shields.io/github/stars/${organization}/${repository}.json`
    )
  ).json();

  return setResult(results.value);
};
