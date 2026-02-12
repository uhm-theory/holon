import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const theoryVersion = require('./package.json').version as string;

// GitHub Pages deployment configuration
// Set these environment variables in GitHub Actions:
// - GH_PAGES_URL: https://<username>.github.io
// - GH_PAGES_BASE_URL: /<repo-name>/
const ghPagesUrl = process.env.GH_PAGES_URL || 'https://holon.sh';
const ghPagesBaseUrl = process.env.GH_PAGES_BASE_URL || '/';

const config: Config = {
  title: 'UHM Theory',
  tagline: 'Unitary Holonomic Monism — Унитарный Голономный Монизм',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  url: ghPagesUrl,
  baseUrl: ghPagesBaseUrl,

  organizationName: process.env.GH_ORG_NAME || 'uhm-theory',
  projectName: process.env.GH_PROJECT_NAME || 'holon',
  trailingSlash: false,

  onBrokenLinks: 'throw',

  i18n: {
    defaultLocale: 'ru',
    locales: ['ru'],
    localeConfigs: {
      ru: {
        label: 'Русский',
        htmlLang: 'ru-RU',
      },
    },
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          remarkPlugins: [remarkMath],
          rehypePlugins: [rehypeKatex],
          showLastUpdateTime: false,
          showLastUpdateAuthor: false,
        },
        blog: {
          showReadingTime: true,
          blogTitle: 'Блог УГМ',
          blogDescription: 'Новости и статьи о развитии Унитарного Голономного Монизма',
          postsPerPage: 10,
          blogSidebarTitle: 'Публикации',
          blogSidebarCount: 'ALL',
          remarkPlugins: [remarkMath],
          rehypePlugins: [rehypeKatex],
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themes: ['@docusaurus/theme-mermaid'],

  markdown: {
    mermaid: true,
    format: 'md',
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  clientModules: [
    require.resolve('./src/theme/MermaidRounded.js'),
  ],

  plugins: [
    [
      '@easyops-cn/docusaurus-search-local',
      {
        hashed: true,
        language: ['ru'],
        highlightSearchTermsOnTargetPage: true,
        explicitSearchResultPath: true,
        docsRouteBasePath: '/docs',
        indexBlog: true,
      },
    ],
  ],

  stylesheets: [
    {
      href: 'https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css',
      type: 'text/css',
      integrity: 'sha384-n8MVd4RsNIU0tAv4ct0nTaAbDJwPJzDEaqSD1odI+WdtXRGWt2kTvGFasHpSy3SV',
      crossorigin: 'anonymous',
    },
  ],

  themeConfig: {
    image: 'img/logo.svg',
    colorMode: {
      defaultMode: 'light',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
    docs: {
      sidebar: {
        hideable: true,
        autoCollapseCategories: true,
      },
    },
    navbar: {
      // title: 'UHM',
      logo: {
        alt: 'UHM Theory Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'html',
          position: 'left',
          value: `<span class="navbar-version">v${theoryVersion}</span>`,
        },
        {
          type: 'docSidebar',
          sidebarId: 'theory',
          position: 'left',
          label: 'Теория',
        },
        {
          type: 'docSidebar',
          sidebarId: 'proofs',
          position: 'left',
          label: 'Доказательства',
        },
        {
          type: 'docSidebar',
          sidebarId: 'applied',
          position: 'left',
          label: 'Приложения',
        },
        {
          type: 'docSidebar',
          sidebarId: 'reference',
          position: 'left',
          label: 'Справочник',
        },
        {
          to: '/blog',
          label: 'Блог',
          position: 'left',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Основы',
          items: [
            {
              label: 'Введение в теорию',
              to: '/docs/intro',
            },
            {
              label: 'Аксиома Ω⁷ — единый примитив',
              to: '/docs/core/foundations/axiom-omega',
            },
            {
              label: 'Голоном — единица бытия',
              to: '/docs/core/structure/holon',
            },
            {
              label: 'Семь измерений',
              to: '/docs/core/structure/dimensions',
            },
          ],
        },
        {
          title: 'Динамика и Сознание',
          items: [
            {
              label: 'Матрица когерентности Γ',
              to: '/docs/core/dynamics/coherence-matrix',
            },
            {
              label: 'Эмерджентное время',
              to: '/docs/proofs/emergent-time',
            },
            {
              label: 'Жизнеспособность и P_crit',
              to: '/docs/core/dynamics/viability',
            },
            {
              label: 'Иерархия интериорности',
              to: '/docs/proofs/interiority-hierarchy',
            },
            {
              label: 'Этика и свобода',
              to: '/docs/core/ethics/freedom',
            },
          ],
        },
        {
          title: 'Доказательства',
          items: [
            {
              label: 'Теорема S: dim = 7',
              to: '/docs/proofs/theorem-minimality-7',
            },
            {
              label: 'Категорный формализм',
              to: '/docs/proofs/categorical-formalism',
            },
            {
              label: 'Оператор φ',
              to: '/docs/proofs/formalization-phi',
            },
            {
              label: 'Физические соответствия',
              to: '/docs/proofs/physics-correspondence',
            },
          ],
        },
        {
          title: 'Приложения',
          items: [
            {
              label: 'Когерентная кибернетика',
              to: '/docs/applied/coherence-cybernetics/axiomatics',
            },
            {
              label: 'Протокол измерения Γ',
              to: '/docs/applied/research/measurement-protocol',
            },
            {
              label: 'Глоссарий',
              to: '/docs/reference/glossary',
            },
            {
              label: 'Фальсифицируемость',
              to: '/docs/reference/falsifiability',
            },
          ],
        },
      ],
      copyright: `© 2024-${new Date().getFullYear()} UHM Theory. Теория: CC BY-SA 4.0 | Код: MIT`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['python', 'latex', 'bash'],
    },
    mermaid: {
      theme: {light: 'neutral', dark: 'dark'},
      options: {
        flowchart: {
          curve: 'basis',
          padding: 15,
          nodeSpacing: 50,
          rankSpacing: 50,
          defaultRenderer: 'dagre-wrapper',
          htmlLabels: true,
        },
        themeVariables: {
          nodeBorder: '1px',
          clusterBorder: '1px',
        },
      },
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
