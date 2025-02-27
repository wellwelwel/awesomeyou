import { FC } from 'react';

export const dynamicRequire = (
  context: __WebpackModuleApi.RequireContext
): FC[] =>
  context
    .keys()
    .sort()
    .map((path) => context(path).default);
