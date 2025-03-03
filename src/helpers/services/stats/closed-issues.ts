import { setResult } from './set-result';

export const issuesClosed = async (
  organization: string,
  repository: string
) => {
  const results = await (
    await fetch(
      `https://img.shields.io/github/issues-closed/${organization}/${repository}.json`
    )
  ).json();

  return setResult(results.value.replace(/closed/, ''));
};
