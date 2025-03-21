export const extractRepository = (
  url: string
): { organization: string; repository: string } => {
  const input = String(url).trim();

  const limit = Object.freeze({
    domain: 'https://www.github.com/'.length,
    organization: 39,
    repository: 100,
  });

  const length = {
    input: input.length,
    max: limit.domain + limit.organization + limit.repository,
  };

  if (length.input > length.max)
    throw new Error(
      `O tamanho máximo da URL foi excedido (${length.input}/${length.max}).`
    );

  const match = input.match(
    /^https?:\/\/github\.com\/([^\/]+)\/([^\/]+)(?:\/|$)/
  );

  if (!match || !match[1] || !match[2])
    throw new Error('A URL do repositório é inválida.');

  const result = {
    organization: match[1],
    repository: match[2],
  };

  if (result.organization.length > limit.organization)
    throw new Error(
      `O nome da organização excedeu o tamanho de caracteres (${result.organization.length}/${limit.organization}).`
    );

  if (result.repository.length > limit.repository)
    throw new Error(
      `O nome do repositório excedeu o tamanho de caracteres (${result.repository.length}/${limit.repository}).`
    );

  return result;
};
