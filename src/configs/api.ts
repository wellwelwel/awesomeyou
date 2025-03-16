export const API =
  process.env.NODE_ENV === 'production'
    ? 'https://api.awesomeyou.io'
    : 'http://localhost:6061';
