const regex = {
  packageName: /[^a-z0-9-_.@\/]/gi,
};

export const isValidParam = (param: undefined | string): boolean => {
  if (typeof param === 'undefined') return true;
  if (typeof param !== 'string') return false;
  if (param.length > 64) return false;
  if (regex.packageName.test(param)) return false;

  return true;
};

export const sanitizeParam = (param: unknown): undefined | string => {
  if (typeof param !== 'string') return undefined;

  const input = param.trim().replace(regex.packageName, '');

  return !input ? undefined : input;
};
