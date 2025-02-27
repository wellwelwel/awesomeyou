import { ProjectOptions, ProjectStats } from '@site/src/@types/projects';
import { extractRepository } from '@site/src/helpers/extract-repository';

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

const localeNumber = (num: number) => {
  if (num < 1000) return num.toLocaleString('pt-BR');

  const suffixes = [' mil', 'M', 'B'];
  let tier = Math.floor(Math.log10(num) / 3);

  if (tier === 0) return num.toLocaleString('pt-BR');

  const shortNumber = (num / Math.pow(10, tier * 3))
    .toFixed(1)
    .replace('.0', '');
  return `${shortNumber}${suffixes[tier - 1]}`;
};

const setResult = (value: string) => {
  const number =
    Number(value.replace(/[^0-9.]/g, '')) *
    (/k/i.test(value.replace(/mês/, ''))
      ? 1_000
      : /m/i.test(value.replace(/mês/, ''))
        ? 1_000_000
        : 1);
  const label = localeNumber(number);

  return {
    value: number,
    label,
  };
};

const license = async (organization: string, repository: string) => {
  const results = await (
    await fetch(
      `https://img.shields.io/github/license/${organization}/${repository}.json`
    )
  ).json();

  return results.value.includes('identifiable') ? 'Other' : results.value;
};

const stars = async (organization: string, repository: string) => {
  const results = await (
    await fetch(
      `https://img.shields.io/github/stars/${organization}/${repository}.json`
    )
  ).json();

  return setResult(results.value);
};

const issues = async (organization: string, repository: string) => {
  const results = await (
    await fetch(
      `https://img.shields.io/github/issues/${organization}/${repository}.json`
    )
  ).json();

  return setResult(results.value.replace(/open/, ''));
};

const issuesClosed = async (organization: string, repository: string) => {
  const results = await (
    await fetch(
      `https://img.shields.io/github/issues-closed/${organization}/${repository}.json`
    )
  ).json();

  return setResult(results.value.replace(/closed/, ''));
};

const forks = async (organization: string, repository: string) => {
  const results = await (
    await fetch(
      `https://img.shields.io/github/forks/${organization}/${repository}.json`
    )
  ).json();

  return setResult(results.value);
};

const commits = async (organization: string, repository: string) => {
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

const contributors = async (organization: string, repository: string) => {
  const results = await (
    await fetch(
      `https://img.shields.io/github/contributors/${organization}/${repository}.json`
    )
  ).json();

  return setResult(results.value);
};

const npmDownloads = async (npm: string) => {
  const results = await (
    await fetch(`https://img.shields.io/npm/dm/${npm}.json`)
  ).json();

  return setResult(results.value.replace(/month/, 'mês'));
};

const homebrewDownloads = async (homebrew: string) => {
  const results = await (
    await fetch(`https://img.shields.io/homebrew/installs/dm/${homebrew}.json`)
  ).json();

  return setResult(results.value.replace(/month/, 'mês'));
};

const pypiDownloads = async (pypi: string) => {
  const results = await (
    await fetch(`https://img.shields.io/pypi/dm/${pypi}.json`)
  ).json();

  return setResult(results.value.replace(/month/, 'mês'));
};

export const processProject = async (
  options: ProjectOptions,
  cb: (data: {
    repository: string;
    organization: string;
    results: ProjectStats;
  }) => unknown
) => {
  const { repository: repositoryURL, npm, pypi, homebrew } = options;
  const { organization, repository } = extractRepository(repositoryURL);
  const results = Object.create(null);

  const requests = await Promise.all([
    license(organization, repository),
    stars(organization, repository),
    forks(organization, repository),
    issues(organization, repository),
    issuesClosed(organization, repository),
    commits(organization, repository),
    contributors(organization, repository),
  ]);

  results.license = requests[0];
  results.stars = requests[1];
  results.forks = requests[2];
  results.issues = requests[3];
  results.closedIssues = requests[4];
  results.commits = requests[5];
  results.contributors = requests[6];

  if (npm) results.npm = await npmDownloads(npm);
  if (homebrew) results.homebrew = await homebrewDownloads(homebrew);
  if (pypi) results.pypi = await pypiDownloads(pypi);

  return await cb({
    organization,
    repository,
    results,
  });
};
