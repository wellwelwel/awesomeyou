import { setResult } from '@site/src/helpers/services/stats/set-result';

export const chocolateyDownloads = async (chocolatey: string) => {
  const results = await (
    await fetch(`https://img.shields.io/chocolatey/dt/${chocolatey}.json`)
  ).json();

  return setResult(results.value.replace(/month/, 'mês'));
};
