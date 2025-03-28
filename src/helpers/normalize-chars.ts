export const normalizeChars = (text: string): string =>
  text
    .normalize('NFD')
    .toLocaleLowerCase()
    .replace(/[^a-z0-9]/g, '');
