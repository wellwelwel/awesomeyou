export const API =
  process.env.NODE_ENV === 'production'
    ? 'https://api.awesomeyou.io'
    : `http://${location.hostname}:6061`;
