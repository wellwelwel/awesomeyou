import { setResult } from '@site/src/helpers/services/stats/set-result';

export const homebrewDownloads = async (homebrew: string) => {
  const results = await (
    await fetch(`https://img.shields.io/homebrew/installs/dm/${homebrew}.json`)
  ).json();

  return setResult(results.value.replace(/month/, 'mês'));
};
