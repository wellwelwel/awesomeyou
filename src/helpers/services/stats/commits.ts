/*---------------------------------------------------------------------------------------------
 *  Copyright (c) https://awesomeyou.io and contributors. All rights reserved.
 *  Licensed under the GNU Affero General Public License v3.0. See https://github.com/wellwelwel/awesomeyou/blob/main/LICENSE for license information.
 *--------------------------------------------------------------------------------------------*/

import type { GitHubList, ShieldStatsProps } from '@site/src/@types/apis';
import { GitHubAPI } from '@site/src/helpers/apis/github';
import { delay } from '@site/src/helpers/delay';

const langMap: Record<string, string> = {
  today: 'Hoje',
  yesterday: 'Ontem',
  'this week': 'Esta semana',
  'this month': 'Este mês',
  'this year': 'Este ano',
  'last week': 'Semana passada',
  'last month': 'Mês passado',
  'last year': 'Ano passado',
  'two weeks ago': 'Duas semanas atrás',
  'three weeks ago': 'Três semanas atrás',
  'four weeks ago': 'Quatro semanas atrás',
  'last sunday': 'Último domingo',
  'last monday': 'Última segunda-feira',
  'last tuesday': 'Última terça-feira',
  'last wednesday': 'Última quarta-feira',
  'last thursday': 'Última quinta-feira',
  'last friday': 'Última sexta-feira',
  'last saturday': 'Último sábado',
  january: 'Janeiro',
  february: 'Fevereiro',
  march: 'Março',
  april: 'Abril',
  may: 'Maio',
  june: 'Junho',
  july: 'Julho',
  august: 'Agosto',
  september: 'Setembro',
  october: 'Outubro',
  november: 'Novembro',
  december: 'Dezembro',
};

const getManually = async (
  organization: string,
  repository: string
): Promise<string> => {
  const data = await GitHubAPI<GitHubList>(
    `repos/${organization}/${repository}/commits?per_page=1&page=1`
  );

  if (typeof data?.[0].commit?.author?.date !== 'string') return '';

  const commitDate = new Date(data[0].commit.author.date);
  const currentDate = new Date();
  const diffTime = currentDate.getTime() - commitDate.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const weeks = Math.floor(diffDays / 7);

  const formatStrategies = {
    today: () => 'Hoje',
    yesterday: () => 'Ontem',
    thisWeek: () => 'Esta semana',
    lastWeek: () => 'Semana passada',
    multipleWeeks: () => `${weeks} semanas atrás`,
    lastMonth: () => 'Mês passado',
    monthYear: () =>
      new Intl.DateTimeFormat('pt-BR', {
        month: 'long',
        year: 'numeric',
      })
        .format(commitDate)
        .replace(/^\w/, (c) => c.toUpperCase())
        .replace(' de ', ' '),
  };

  const getStrategy = (): keyof typeof formatStrategies => {
    if (diffDays === 0) return 'today';
    if (diffDays === 1) return 'yesterday';
    if (diffDays < 7) return 'thisWeek';
    if (diffDays < 30) return weeks === 1 ? 'lastWeek' : 'multipleWeeks';
    if (diffDays < 365) return weeks <= 4 ? 'lastMonth' : 'monthYear';

    return 'monthYear';
  };

  return formatStrategies[getStrategy()]();
};

export const commits = async (
  organization: string,
  repository: string
): Promise<string> => {
  const maxRetries = 10;
  const lag = 10;
  const retryDelay = 1000 + lag;

  let processed: string | undefined;
  let attempts = 0;

  while (attempts < maxRetries) {
    attempts++;

    const results: ShieldStatsProps = await (
      await fetch(
        `https://img.shields.io/github/last-commit/${organization}/${repository}.json?cacheSeconds=1`
      )
    ).json();

    if (
      results.value !== 'Unable to select next GitHub token from pool' &&
      results.value !== 'invalid'
    ) {
      const raw: string = results.value;
      const regex = new RegExp(`^${Object.keys(langMap).join('|')}$`, 'gi');

      const translatedValue: string = raw.replace(regex, (match) => {
        return langMap[match.toLowerCase()] || match;
      });

      processed = translatedValue;

      break;
    }

    if (attempts >= maxRetries) break;

    await delay(retryDelay);
  }

  if (!processed) {
    try {
      processed = await getManually(organization, repository);
    } catch {}
  }

  return processed || 'Ops, falha na API';
};
