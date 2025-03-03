import { setResult } from './set-result';

export const npmDownloads = async (npm: string) => {
  const results = await (
    await fetch(`https://img.shields.io/npm/dm/${npm}.json`)
  ).json();

  return setResult(results.value.replace(/month/, 'mês'));
};
