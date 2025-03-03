import { setResult } from './set-result';

export const pypiDownloads = async (pypi: string) => {
  const results = await (
    await fetch(`https://img.shields.io/pypi/dm/${pypi}.json`)
  ).json();

  return setResult(results.value.replace(/month/, 'mês'));
};
