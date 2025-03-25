import { localeNumber } from '@site/src/helpers/services/stats/set-result';

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
    const lines = text.split('\n');

    for (let line = 0; line < lines.length; line++) {
      const currentLine = lines[line].trim();

      if (!/^[\d,]+$/.test(currentLine)) continue;
      if (
        !(line + 1 < lines.length && lines[line + 1].trim() === 'Repositories')
      )
        continue;

      const downloads = Number(currentLine.replace(/,/g, '')) || 0;

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
