export const sortObjectByValues = <T extends Record<string, unknown>>(
  obj: T
): T =>
  Object.fromEntries(
    Object.entries(obj).sort(([, a], [, b]) =>
      String(a).localeCompare(String(b))
    )
  ) as T;
