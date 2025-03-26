export const localeNumber = (num: number) => {
  if (num < 1000) return num.toLocaleString('pt-BR');

  const suffixes = [
    { singular: ' mil', plural: ' mil' },
    { singular: ' milhão', plural: ' milhões' },
    { singular: ' bilhão', plural: ' bilhões' },
  ];

  let tier = Math.floor(Math.log10(num) / 3);

  if (tier === 0) return num.toLocaleString('pt-BR');

  const shortNumber = (num / Math.pow(10, tier * 3))
    .toFixed(1)
    .replace('.0', '');

  const suffix =
    Number(shortNumber) >= 2
      ? suffixes[tier - 1].plural
      : suffixes[tier - 1].singular;
  return `${shortNumber}${suffix}`;
};

export const setResult = (value: string) => {
  const number =
    Number(value.replace(/[^0-9.]/g, '')) *
    (/k/i.test(value.replace(/mês/, ''))
      ? 1_000
      : /m/i.test(value.replace(/mês/, ''))
        ? 1_000_000
        : 1);
  const label = localeNumber(number);

  return {
    value: number,
    label,
  };
};
