export const deepTrim = <T>(data: T): T => {
  if (data === null || data === undefined) return data;
  if (typeof data === 'string') return data.trim() as T;
  if (Array.isArray(data)) return data.map(deepTrim) as T;
  if (typeof data === 'object') {
    const result = Object.create(null) as T;

    for (const key in data) {
      if (!Object.prototype.hasOwnProperty.call(data, key)) continue;

      result[key] = deepTrim(data[key]);
    }

    return result;
  }

  return data;
};
