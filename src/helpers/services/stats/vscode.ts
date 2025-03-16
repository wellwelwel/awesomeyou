import {
  localeNumber,
  setResult,
} from '@site/src/helpers/services/stats/set-result';

export const vscodeDownloads = async (vscode: string) => {
  const getDownloadsManually = async () => {
    try {
      // Require CORS
      const response = await fetch(
        `https://marketplace.visualstudio.com/items?itemName=${vscode}`
      );

      const text = await response.text();
      const downloadsMatch = text.match(/([\d,]+) installs/);

      if (downloadsMatch && downloadsMatch[1]) {
        const downloads = downloadsMatch[1].replace(/,/g, '');

        return Number(downloads);
      }

      return 0;
    } catch {
      return 0;
    }
  };

  const results = await (
    await fetch(
      `https://img.shields.io/visual-studio-marketplace/i/${vscode}.json`
    )
  ).json();

  if (results.value.includes('rate limited by upstream service')) {
    const contingency = await getDownloadsManually();

    return {
      value: contingency,
      label: localeNumber(contingency),
    };
  }

  return setResult(results.value.replace(/month/, 'mês'));
};
