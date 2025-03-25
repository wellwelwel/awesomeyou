import {
  localeNumber,
  setResult,
} from '@site/src/helpers/services/stats/set-result';

export const vscodeDownloads = async (vscode: string) => {
  const getDownloadsManually = async (): Promise<number> => {
    try {
      // Require CORS
      const response = await fetch(
        `https://marketplace.visualstudio.com/items?itemName=${vscode}`
      );

      const text = await response.text();
      const lines = text.split('\n');

      for (let line = 0; line < lines.length; line++) {
        const currentLine = lines[line].trim();

        if (!currentLine.includes('data-reactroot')) continue;

        const marker = ' installs';
        const markerIndex = currentLine.indexOf(marker);

        if (markerIndex === -1) break;

        let startIndex = markerIndex;

        while (
          startIndex > 0 &&
          ((currentLine[startIndex - 1] >= '0' &&
            currentLine[startIndex - 1] <= '9') ||
            currentLine[startIndex - 1] === ',')
        )
          startIndex--;

        const formatedNumber = currentLine
          .substring(startIndex, markerIndex)
          .trim();

        return Number(formatedNumber.replace(/,/g, '')) || 0;
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

  return setResult(results.value);
};
