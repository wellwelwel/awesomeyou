export const env: NodeJS.ProcessEnv = (() => {
  try {
    return process?.env || Object.create(null);
  } catch (error) {
    return Object.create(null);
  }
})();
