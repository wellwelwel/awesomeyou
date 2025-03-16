export const API =
  process.env.NODE_ENV !== 'production'
    ? 'http://localhost:6061'
    : 'https://api.awesomeyou.io';
