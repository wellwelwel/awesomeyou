/*---------------------------------------------------------------------------------------------
 *  Copyright (c) https://awesomeyou.io and contributors. All rights reserved.
 *  Licensed under the GNU Affero General Public License v3.0. See https://github.com/wellwelwel/awesomeyou/blob/main/LICENSE for license information.
 *--------------------------------------------------------------------------------------------*/

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
  'five weeks ago': 'Cinco semanas atrás',
  'six weeks ago': 'Seis semanas atrás',
  'seven weeks ago': 'Sete semanas atrás',
  'eight weeks ago': 'Oito semanas atrás',
  'nine weeks ago': 'Nove semanas atrás',
  'ten weeks ago': 'Dez semanas atrás',
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

export const commits = async (organization: string, repository: string) => {
  const results = await (
    await fetch(
      `https://img.shields.io/github/last-commit/${organization}/${repository}.json`
    )
  ).json();

  const raw: string = results.value;
  const regex = new RegExp(Object.keys(langMap).join('|'), 'gi');

  const translatedValue: string = raw.replace(regex, (match) => {
    return langMap[match.toLowerCase()] || match;
  });

  return translatedValue;
};
