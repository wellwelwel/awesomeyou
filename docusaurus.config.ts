import type * as Preset from '@docusaurus/preset-classic';
import type { Config } from '@docusaurus/types';
import { themes as prismThemes } from 'prism-react-renderer';

const config: Config = {
  title: 'Awesome Brazilian Open Source People and Projects',
  // favicon: 'img/favicon.ico',
  url: 'https://awesomeyou.io/',
  baseUrl: '/',
  trailingSlash: true,
  onBrokenLinks: 'log',
  onBrokenMarkdownLinks: 'log',
  onBrokenAnchors: 'log',
  onDuplicateRoutes: 'throw',
  i18n: {
    defaultLocale: 'pt-BR',
    locales: ['pt-BR'],
  },
  presets: [
    [
      'classic',
      {
        blog: false,
        docs: false,
        theme: {
          customCss: ['./src/css/themes.scss'],
        },
        pages: {
          admonitions: true,
          recmaPlugins: [],
          rehypePlugins: [],
          remarkPlugins: [],
        },
      } satisfies Preset.Options,
    ],
  ],
  staticDirectories: ['./content/assets'],
  themeConfig: {
    metadata: [
      {
        name: 'keywords',
        content: [
          // English
          'open source',
          'open-source',
          'brazilian',
          'brazilians',
          'awesome',
          'project',
          'projects',

          // Portuguse (BR)
          'código aberto',
          'código-aberto',
          'brasileiro',
          'brasileiros',
          'incríveis',
          'projeto',
          'projetos',
        ].join(', '),
      },
    ],
    colorMode: {
      disableSwitch: true,
      respectPrefersColorScheme: false,
      defaultMode: 'light',
    },
    footer: {},
    prism: {
      theme: prismThemes.dracula,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['bash', 'json', 'diff', 'sql'],
    },
  } satisfies Preset.ThemeConfig,

  plugins: ['docusaurus-plugin-sass'],
};

export default config;
