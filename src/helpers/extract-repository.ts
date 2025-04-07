/*---------------------------------------------------------------------------------------------
 *  Copyright (c) https://awesomeyou.io and contributors. All rights reserved.
 *  Licensed under the GNU Affero General Public License v3.0. See https://github.com/wellwelwel/awesomeyou/blob/main/LICENSE for license information.
 *--------------------------------------------------------------------------------------------*/

export const limit = Object.freeze({
  domain: 'https://www.github.com/'.length,
  organization: 39,
  repository: 100,
});

export const extractRepository = (
  url: string
): { organization: string; repository: string } => {
  const input = String(url).trim();

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
      `O nome da organização excedeu o tamanho de caracteres (${result.organization.length}/${limit.organization}).`,
      {
        cause: 400,
      }
    );

  if (result.repository.length > limit.repository)
    throw new Error(
      `O nome do repositório excedeu o tamanho de caracteres (${result.repository.length}/${limit.repository}).`,
      {
        cause: 400,
      }
    );

  if (
    result.repository.indexOf('/') !== -1 ||
    result.repository.indexOf('#') !== -1 ||
    result.repository.indexOf('?') !== -1
  )
    throw new Error(`Verifique a URL do repositório.`, {
      cause: 400,
    });

  return result;
};
