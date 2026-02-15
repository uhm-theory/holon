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
          sidebarId: 'physics',
          position: 'left',
          label: 'Физика',
        },
        {
          type: 'docSidebar',
          sidebarId: 'consciousness',
          position: 'left',
          label: 'Сознание',
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
          title: 'Теория',
          items: [
            {
              label: 'Введение',
              to: '/docs/intro',
            },
            {
              label: 'Аксиома Ω⁷',
              to: '/docs/core/foundations/axiom-omega',
            },
            {
              label: 'Голоном и семь измерений',
              to: '/docs/core/structure/holon',
            },
            {
              label: 'Матрица когерентности Γ',
              to: '/docs/core/dynamics/coherence-matrix',
            },
            {
              label: 'Gap-оператор',
              to: '/docs/core/dynamics/gap-operator',
            },
          ],
        },
        {
          title: 'Сознание',
          items: [
            {
              label: 'Обзор',
              to: '/docs/consciousness/overview',
            },
            {
              label: 'Самонаблюдение',
              to: '/docs/consciousness/foundations/self-observation',
            },
            {
              label: 'Иерархия L0→L4',
              to: '/docs/consciousness/hierarchy/interiority-hierarchy',
            },
            {
              label: 'Структура квалиа',
              to: '/docs/consciousness/phenomenology/qualia-structure',
            },
            {
              label: 'Состояния сознания',
              to: '/docs/consciousness/states/altered-states',
            },
          ],
        },
        {
          title: 'Доказательства',
          items: [
            {
              label: 'Минимальность dim = 7',
              to: '/docs/proofs/minimality/theorem-minimality-7',
            },
            {
              label: 'Категорный формализм',
              to: '/docs/proofs/categorical/categorical-formalism',
            },
            {
              label: 'Оператор φ',
              to: '/docs/proofs/categorical/formalization-phi',
            },
            {
              label: 'Эмерджентное время',
              to: '/docs/proofs/dynamics/emergent-time',
            },
            {
              label: 'Фано-канал',
              to: '/docs/proofs/gap/fano-channel',
            },
          ],
        },
        {
          title: 'Физика',
          items: [
            {
              label: 'Обзор соответствий',
              to: '/docs/physics/overview',
            },
            {
              label: 'G₂-структура',
              to: '/docs/physics/gauge-symmetry/g2-structure',
            },
            {
              label: 'Физика частиц',
              to: '/docs/physics/particle-physics/fermion-generations',
            },
            {
              label: 'Гравитация',
              to: '/docs/physics/gravity/emergent-geometry',
            },
            {
              label: 'Космологическая постоянная',
              to: '/docs/physics/gravity/cosmological-constant',
            },
          ],
        },
        {
          title: 'Приложения и Справочник',
          items: [
            {
              label: 'Когерентная кибернетика',
              to: '/docs/applied/coherence-cybernetics/introduction',
            },
            {
              label: 'Протокол измерения Γ',
              to: '/docs/applied/research/measurement-protocol',
            },
            {
              label: 'Фальсифицируемость',
              to: '/docs/reference/falsifiability',
            },
            {
              label: 'Реестр статусов',
              to: '/docs/reference/status-registry',
            },
            {
              label: 'Глоссарий',
              to: '/docs/reference/glossary',
            },
          ],
        },
      ],
      copyright: `© 2024-${new Date().getFullYear()} UHM Theory. Теория: CC BY-NC-SA 4.0 | Код: MIT`,
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
