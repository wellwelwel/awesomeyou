/*---------------------------------------------------------------------------------------------
 *  Copyright (c) https://awesomeyou.io and contributors. All rights reserved.
 *  Licensed under the GNU Affero General Public License v3.0. See https://github.com/wellwelwel/awesomeyou/blob/main/LICENSE for license information.
 *--------------------------------------------------------------------------------------------*/

/// <reference types="@cloudflare/workers-types" />

import type { Env as CounttyEnv } from 'countty';
import { createCountty } from 'countty';
import { extractRepository } from '@site/src/helpers/extract-repository';
import { processProject } from '@site/src/helpers/generate-stats';
import { getScore } from '@site/src/helpers/get-score';
import { cache } from './configs/cache.js';
import { ALLOWED_ORIGINS } from './configs/origins.js';
import { checkRateLimit, RATE_LIMIT } from './configs/rate-limit.js';
import { isValidParam, sanitizeParam } from './helpers/validations.js';

const { Countty, createContext } = createCountty();

export { Countty };

export default {
  async fetch(request: Request, env: Env & CounttyEnv) {
    // Countty
    const { router, rateLimit: counttyRateLimit } = createContext(request, env);
    const url = new URL(request.url);
    const { pathname } = url;
    const counttyRoute: Record<string, () => Promise<Response>> = {
      '/create': router.create,
      '/badge': router.badge,
      '/backup': router.backup,
      '/list': router.list,
      // '/views': router.views,
      // '/remove': router.remove,
      // '/reset': router.reset,
    };

    if (pathname in counttyRoute) {
      if (!counttyRateLimit.available)
        return new Response(
          JSON.stringify({
            message: 'Request limit exceeded. Please try again later.',
          }),
          { status: 429 }
        );

      return counttyRoute[pathname]();
    }

    // Awesome You
    if (request.method !== 'POST')
      return new Response('Método não permitido.', { status: 405 });

    const rateLimit = checkRateLimit(request);
    const origin = request.headers.get('Origin');
    const isProduction = env.ENVIRONMENT === 'production';

    if (!origin || typeof origin !== 'string')
      return new Response('Método não permitido.', { status: 405 });

    if (isProduction && !ALLOWED_ORIGINS.has(origin))
      return new Response('Acesso negado.', { status: 403 });

    const headers = Object.freeze({
      'Access-Control-Allow-Origin': isProduction ? origin : '*',
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Content-Type': 'application/json; charset=utf-8',
      'X-RateLimit-Limit': String(RATE_LIMIT.MAX_REQUESTS),
      'X-RateLimit-Remaining': String(rateLimit.remaining),
    });

    const response = (response: unknown, status = 200) =>
      new Response(JSON.stringify(response), { status, headers });

    try {
      if (!rateLimit.available)
        return response(
          {
            message:
              'Limite de requisições excedido. Tente novamente mais tarde.',
          },
          429
        );

      const rawBody = await request.text();
      const { repositoryURL: repositoryRaw, ...body } = JSON.parse(rawBody);

      if (typeof repositoryRaw !== 'string')
        return response({ message: 'Repositório inválido.' }, 400);

      if (!isValidParam(body.npm))
        return response({ message: 'Pacote npm inválido.' }, 400);

      if (!isValidParam(body.homebrew))
        return response({ message: 'Pacote Homebrew inválido.' }, 400);

      if (!isValidParam(body.pypi))
        return response({ message: 'Pacote PyPi inválido.' }, 400);

      if (!isValidParam(body.chocolatey))
        return response({ message: 'Pacote Chocolatey inválido.' }, 400);

      if (!isValidParam(body.vscode))
        return response(
          { message: 'ID do Visual Code Studio Marketplace inválido.' },
          400
        );

      if (!isValidParam(body.packagist))
        return response({ message: 'Pacote Packagist inválido.' }, 400);

      const repositoryURL = repositoryRaw.trim();
      const npm = sanitizeParam(body.npm);
      const homebrew = sanitizeParam(body.homebrew);
      const pypi = sanitizeParam(body.pypi);
      const chocolatey = sanitizeParam(body.chocolatey);
      const vscode = sanitizeParam(body.vscode);
      const packagist = sanitizeParam(body.packagist);

      const { organization, repository } = extractRepository(repositoryURL);

      let key = repositoryURL;
      if (typeof npm === 'string') key += `:${npm}`;
      if (typeof homebrew === 'string') key += `:${homebrew}`;
      if (typeof pypi === 'string') key += `:${pypi}`;
      if (typeof chocolatey === 'string') key += `:${chocolatey}`;
      if (typeof vscode === 'string') key += `:${vscode}`;
      if (typeof packagist === 'string') key += `:${packagist}`;

      return cache.stats.has(key)
        ? response(cache.stats.get(key))
        : response(
            await processProject(
              {
                description: '', // unused
                repository: repositoryURL,
                npm,
                homebrew,
                pypi,
                chocolatey,
                vscode,
                packagist,
              },
              ({ results }) => {
                const score = getScore({
                  closedIssues: results?.closedIssues?.value,
                  contributors: results?.contributors?.value,
                  forks: results?.forks?.value,
                  homebrew: results?.homebrew?.value,
                  issues: results?.issues?.value,
                  npm: results?.npm?.value,
                  pypi: results?.pypi?.value,
                  stars: results?.stars?.value,
                  commits: results?.commits,
                  chocolatey: results?.chocolatey?.value,
                  repositoryDependents: results?.repositoryDependents?.value,
                  vscode: results?.vscode?.value,
                  packagist: results?.packagist?.value,
                });

                const result = {
                  ...results,
                  score,
                  username: organization,
                  repository,
                };

                cache.stats.set(key, result);

                return {
                  ...results,
                  score,
                  username: organization,
                  repository,
                };
              }
            )
          );
    } catch (error) {
      if (error instanceof Error && error.cause === 400)
        return response({ message: error.message }, 400);

      if (env.ENVIRONMENT !== 'production') console.error(error);

      return response({ message: 'Ops! Erro interno.' }, 500);
    }
  },
} satisfies ExportedHandler<Env & CounttyEnv>;
