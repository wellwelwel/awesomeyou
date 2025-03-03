import { localeNumber } from './set-result';

export const getRepoDepsManually = async (
  organization: string,
  repository: string
) => {
  try {
    // Require CORS
    const response = await fetch(
      `https://github.com/${organization}/${repository}/network/dependents`
    );

    const text = await response.text();
    const downloadsMatch = text.match(/([\d,]+)\s{1,}Repositories/);

    if (downloadsMatch && downloadsMatch[1]) {
      const downloads = Number(downloadsMatch[1].replace(/,/g, ''));

      return {
        value: downloads,
        label: localeNumber(downloads),
      };
    }

    return {
      value: 0,
      label: '0',
    };
  } catch {
    return {
      value: 0,
      label: '0',
    };
  }
};
