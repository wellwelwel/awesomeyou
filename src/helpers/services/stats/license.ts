export const license = async (organization: string, repository: string) => {
  const results = await (
    await fetch(
      `https://img.shields.io/github/license/${organization}/${repository}.json`
    )
  ).json();

  return results.value.includes('identifiable') ? 'Other' : results.value;
};
