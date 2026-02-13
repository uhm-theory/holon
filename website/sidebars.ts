import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

/**
 * UHM Theory Documentation Sidebars
 *
 * Four main sections:
 * - theory: Core UHM theory (foundations, structure, dynamics, consciousness, cosmology, ethics)
 * - proofs: Formal proofs and mathematical specification
 * - applied: Applications (Coherence Cybernetics, Research)
 * - reference: Glossary, notation, falsifiability
 */
const sidebars: SidebarsConfig = {
  theory: [
    'intro',
    {
      type: 'category',
      label: 'Основания',
      collapsed: false,
      items: [
        'core/foundations/axiom-omega',
        'core/foundations/axiom-septicity',
        'core/foundations/consequences',
      ],
    },
    {
      type: 'category',
      label: 'Структура реальности',
      items: [
        'core/structure/holon',
        {
          type: 'category',
          label: 'Семь измерений',
          items: [
            'core/structure/dimensions',
            'core/structure/dimension-a',
            'core/structure/dimension-s',
            'core/structure/dimension-d',
            'core/structure/dimension-l',
            'core/structure/dimension-e',
            'core/structure/dimension-o',
            'core/structure/dimension-u',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Динамика',
      items: [
        'core/dynamics/coherence-matrix',
        'core/dynamics/evolution',
        'core/dynamics/viability',
      ],
    },
    {
      type: 'category',
      label: 'Сознание',
      items: [
        'core/consciousness/self-observation',
        'core/consciousness/interiority',
        'core/consciousness/hard-problem',
      ],
    },
    {
      type: 'category',
      label: 'Космология',
      items: [
        'core/cosmology/origin',
        'core/cosmology/spacetime',
      ],
    },
    {
      type: 'category',
      label: 'Этика и смысл',
      items: [
        'core/ethics/foundations',
        'core/ethics/meaning',
        'core/ethics/freedom',
      ],
    },
  ],

  proofs: [
    {
      type: 'category',
      label: 'Формальные доказательства',
      collapsed: false,
      items: [
        'proofs/theorem-minimality-7',
        'proofs/theorem-octonionic-derivation',
        'proofs/theorem-purity-critical',
        'proofs/emergent-time',
        'proofs/formalization-phi',
        'proofs/categorical-formalism',
        'proofs/interiority-hierarchy',
        'proofs/physics-correspondence',
      ],
    },
    {
      type: 'category',
      label: 'Формальная спецификация',
      items: [
        'formal/specification',
        'formal/computational',
      ],
    },
  ],

  applied: [
    {
      type: 'category',
      label: 'Когерентная кибернетика',
      collapsed: false,
      items: [
        'applied/coherence-cybernetics/introduction',
        'applied/coherence-cybernetics/axiomatics',
        'applied/coherence-cybernetics/definitions',
        'applied/coherence-cybernetics/theorems',
        'applied/coherence-cybernetics/cybernetics-history',
        'applied/coherence-cybernetics/consciousness-theories',
        'applied/coherence-cybernetics/panpsychism-analysis',
        'applied/coherence-cybernetics/cognitive-hierarchy',
        'applied/coherence-cybernetics/research-programs',
        'applied/coherence-cybernetics/predictions',
        'applied/coherence-cybernetics/model-theory',
        'applied/coherence-cybernetics/applications',
        'applied/coherence-cybernetics/implementation',
      ],
    },
    {
      type: 'category',
      label: 'Исследования',
      items: [
        'applied/research/measurement-protocol',
        'applied/research/engineering-insights',
        'applied/research/poincare-perelman',
      ],
    },
  ],

  reference: [
    'reference/glossary',
    'reference/notation',
    'reference/falsifiability',
  ],
};

export default sidebars;
