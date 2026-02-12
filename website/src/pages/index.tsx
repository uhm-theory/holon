import type {ReactNode, JSX} from 'react';
import {useState, useEffect, useRef} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

/**
 * Оккультно-техногенная визуализация УГМ
 *
 * Предельный фундаментализм:
 * - Гептаграмма {7/3} — священная звезда семи измерений
 * - Фрактальность — мини-гептаграммы в вершинах (самоподобие)
 * - Лучи от центра — потоки самомоделирования (φ)
 * - ∞ в центре — бесконечность как источник
 * - Вращение — стрела времени
 */
function CoherenceVisualization() {
  const cx = 250, cy = 250;
  const [time, setTime] = useState(0);
  const animationRef = useRef<number | undefined>(undefined);
  const startTimeRef = useRef<number>(Date.now());

  useEffect(() => {
    const animate = () => {
      const elapsed = (Date.now() - startTimeRef.current) / 1000;
      setTime(elapsed);
      animationRef.current = requestAnimationFrame(animate);
    };
    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  // Геометрические параметры
  const rotationSpeed = 1.5;
  const coreR = 35;           // ядро ∞
  const innerR = 65;          // внутреннее кольцо
  const starR = 125;          // радиус гептаграммы (лучи)
  const boundaryR = 170;      // граница

  // Дыхание системы
  const breath = 1 + Math.sin(time * 0.35) * 0.02;

  // Гептаграмма {7/3}
  const renderHeptagram = () => {
    const lines: JSX.Element[] = [];
    const r = starR * breath;

    for (let i = 0; i < 7; i++) {
      const j = (i + 3) % 7;
      const a1 = ((i * 360 / 7) - 90) * Math.PI / 180;
      const a2 = ((j * 360 / 7) - 90) * Math.PI / 180;

      const x1 = cx + Math.cos(a1) * r;
      const y1 = cy + Math.sin(a1) * r;
      const x2 = cx + Math.cos(a2) * r;
      const y2 = cy + Math.sin(a2) * r;

      const pulse = Math.sin(time * 0.4 + i * 0.5);
      const opacity = 0.25 + pulse * 0.15;

      lines.push(
        <line key={`star-${i}`}
          x1={x1} y1={y1} x2={x2} y2={y2}
          stroke="var(--ifm-color-primary)"
          strokeWidth={1.5}
          opacity={opacity}
        />
      );
    }
    return lines;
  };

  // Лучи от центра (самомоделирование φ)
  const renderRays = () => {
    const elements: JSX.Element[] = [];

    for (let i = 0; i < 7; i++) {
      const angle = ((i * 360 / 7) - 90) * Math.PI / 180;

      const phase = i * (Math.PI * 2 / 7);
      const pulse = Math.sin(time * 0.6 + phase);
      const rayLen = (starR + pulse * 6) * breath;

      const x1 = cx + Math.cos(angle) * coreR;
      const y1 = cy + Math.sin(angle) * coreR;
      const x2 = cx + Math.cos(angle) * rayLen;
      const y2 = cy + Math.sin(angle) * rayLen;

      // Луч
      elements.push(
        <line key={`ray-${i}`}
          x1={x1} y1={y1} x2={x2} y2={y2}
          stroke="var(--ifm-color-primary)"
          strokeWidth={1.5}
          strokeLinecap="round"
          opacity={0.35 + pulse * 0.15}
        />
      );

      // Узел на конце
      elements.push(
        <circle key={`node-${i}`}
          cx={x2} cy={y2}
          r={3.5 * breath}
          fill="var(--ifm-color-primary)"
          opacity={0.5 + pulse * 0.2}
        />
      );
    }
    return elements;
  };

  // Дуги когерентности
  const renderArcs = () => {
    const arcs: JSX.Element[] = [];
    const r = innerR * breath;

    for (let i = 0; i < 7; i++) {
      const a1 = ((i * 360 / 7) - 90) * Math.PI / 180;
      const a2 = (((i + 1) * 360 / 7) - 90) * Math.PI / 180;

      const x1 = cx + Math.cos(a1) * r;
      const y1 = cy + Math.sin(a1) * r;
      const x2 = cx + Math.cos(a2) * r;
      const y2 = cy + Math.sin(a2) * r;

      const midA = (a1 + a2) / 2;
      const ctrlR = r * 1.15;
      const ctrlX = cx + Math.cos(midA) * ctrlR;
      const ctrlY = cy + Math.sin(midA) * ctrlR;

      const pulse = Math.sin(time * 0.5 + i * 0.7);

      arcs.push(
        <path key={`arc-${i}`}
          d={`M ${x1} ${y1} Q ${ctrlX} ${ctrlY} ${x2} ${y2}`}
          fill="none"
          stroke="var(--ifm-color-primary)"
          strokeWidth={1}
          opacity={0.15 + pulse * 0.1}
        />
      );
    }
    return arcs;
  };

  // Мини-гептаграммы в вершинах (фрактальность)
  const renderMiniHeptagrams = () => {
    const elements: JSX.Element[] = [];
    const mainR = starR * breath;
    const miniR = 8; // маленький радиус

    for (let v = 0; v < 7; v++) {
      const va = ((v * 360 / 7) - 90) * Math.PI / 180;
      const vx = cx + Math.cos(va) * mainR;
      const vy = cy + Math.sin(va) * mainR;

      // Мини-гептаграмма {7/3}
      for (let i = 0; i < 7; i++) {
        const j = (i + 3) % 7;
        const a1 = ((i * 360 / 7) - 90) * Math.PI / 180;
        const a2 = ((j * 360 / 7) - 90) * Math.PI / 180;

        const x1 = vx + Math.cos(a1) * miniR;
        const y1 = vy + Math.sin(a1) * miniR;
        const x2 = vx + Math.cos(a2) * miniR;
        const y2 = vy + Math.sin(a2) * miniR;

        const pulse = Math.sin(time * 0.5 + v * 0.9);

        elements.push(
          <line key={`mini-${v}-${i}`}
            x1={x1} y1={y1} x2={x2} y2={y2}
            stroke="var(--ifm-color-primary)"
            strokeWidth={0.5}
            opacity={0.12 + pulse * 0.08}
          />
        );
      }
    }
    return elements;
  };

  return (
    <svg viewBox="0 0 500 500" className={styles.orbitalSvg}>
      <defs>
        <radialGradient id="bgGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--ifm-color-primary)" stopOpacity="0.5" />
          <stop offset="50%" stopColor="var(--ifm-color-primary)" stopOpacity="0.15" />
          <stop offset="100%" stopColor="var(--ifm-color-primary)" stopOpacity="0" />
        </radialGradient>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur"/>
          <feMerge>
            <feMergeNode in="blur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        <filter id="coreGlow" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="5" result="blur"/>
          <feMerge>
            <feMergeNode in="blur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      {/* Фоновое свечение */}
      <circle cx={cx} cy={cy} r={boundaryR * breath} fill="url(#bgGrad)" />

      {/* Внешний гептагон */}
      <polygon
        points={Array.from({ length: 7 }, (_, i) => {
          const a = ((i * 360 / 7) - 90) * Math.PI / 180;
          return `${cx + Math.cos(a) * boundaryR * breath},${cy + Math.sin(a) * boundaryR * breath}`;
        }).join(' ')}
        fill="none"
        stroke="var(--ifm-color-primary)"
        strokeWidth={1}
        opacity={0.2}
      />

      {/* Вращающаяся группа */}
      <g style={{
        transform: `rotate(${time * rotationSpeed}deg)`,
        transformOrigin: `${cx}px ${cy}px`
      }}>
        {/* Внутреннее кольцо */}
        <circle cx={cx} cy={cy} r={innerR * breath}
          fill="none"
          stroke="var(--ifm-color-primary)"
          strokeWidth={0.5}
          strokeDasharray="2 4"
          opacity={0.2} />

        {/* Среднее кольцо */}
        <circle cx={cx} cy={cy} r={starR * breath}
          fill="none"
          stroke="var(--ifm-color-primary)"
          strokeWidth={0.5}
          opacity={0.1} />

        {/* Дуги когерентности */}
        <g filter="url(#glow)">{renderArcs()}</g>

        {/* Гептаграмма */}
        <g filter="url(#glow)">{renderHeptagram()}</g>

        {/* Мини-гептаграммы в вершинах (фрактальность) */}
        {renderMiniHeptagrams()}

        {/* Лучи */}
        <g filter="url(#glow)">{renderRays()}</g>
      </g>

      {/* Центральное ядро ∞ */}
      {(() => {
        const wx = Math.sin(time * 0.31) * 2;
        const wy = Math.sin(time * 0.23) * 2;
        const x = cx + wx;
        const y = cy + wy;
        const r = coreR * breath;

        return (
          <g className={styles.coreGroup}>
            <circle cx={x} cy={y} r={r * 1.3}
              fill="var(--ifm-color-primary)"
              opacity={0.12}
              filter="url(#coreGlow)" />
            <circle cx={x} cy={y} r={r}
              fill="var(--ifm-color-primary)"
              className={styles.coreCircle} />
            <text x={x} y={y}
              className={styles.coreSymbol}
              textAnchor="middle"
              dominantBaseline="central">
              ∞
            </text>
          </g>
        );
      })()}
    </svg>
  );
}

// Матрица когерентности
function CoherenceMatrixVisualization() {
  const dims = ['A', 'S', 'D', 'L', 'E', 'O', 'U'];

  return (
    <div className={styles.matrixContainer}>
      <div className={styles.matrixGrid}>
        {dims.map((row, i) => (
          dims.map((col, j) => (
            <div
              key={`${i}-${j}`}
              className={clsx(
                styles.matrixCell,
                i === j && styles.diagonal,
                i !== j && styles.offDiagonal
              )}
              title={i === j ? `γ${row}${row} (населённость)` : `γ${row}${col} (когерентность)`}
            >
              <span className={styles.cellValue}>
                {`γ${row}${col}`}
              </span>
            </div>
          ))
        ))}
      </div>
      <div className={styles.matrixCaption}>
        Матрица Когерентности Γ ∈ ℂ⁷ˣ⁷
      </div>
    </div>
  );
}

function HomepageHeader() {
  return (
    <header className={styles.hero}>
      <div className={styles.heroContent}>
        <div className={styles.heroText}>
          <Heading as="h1" className={styles.heroTitle}>
            Унитарный Голономный Монизм
          </Heading>
          <p className={styles.heroSubtitle}>
            Что минимально необходимо для существования?
          </p>
          <p className={styles.heroDescription}>
            Структура, способная моделировать себя, неизбежно обретает время, границы и внутреннюю сторону.
            Теория исследует следствия самосогласованности — и находит, что бытие, форма и опыт неразделимы.
          </p>
          <div className={styles.heroButtons}>
            <Link className="button button--primary button--lg" to="/docs/intro">
              Введение
            </Link>
          </div>
        </div>
        <div className={styles.heroVisual}>
          <CoherenceVisualization />
        </div>
      </div>
    </header>
  );
}

function MatrixSection() {
  return (
    <section className={styles.matrixSection}>
      <div className="container">
        <div className={styles.matrixLayout}>
          <div className={styles.matrixInfo}>
            <Heading as="h2">Матрица Когерентности</Heading>
            <p>
              Центральный математический объект — матрица 7×7.
              Диагональ — «населённости» измерений.
              Внедиагональные элементы — когерентности между ними.
            </p>
            <ul className={styles.matrixProperties}>
              <li><strong>Чистота</strong> — скалярная мера целостности</li>
              <li><strong>Критический порог</strong> — условие жизнеспособности (теорема)</li>
              <li><strong>Меры сознательности</strong> — формализация через интеграцию и рефлексию</li>
              <li><strong>Иерархия</strong> — три уровня с выводимыми порогами</li>
            </ul>
          </div>
          <div className={styles.matrixVisual}>
            <CoherenceMatrixVisualization />
          </div>
        </div>
        <div className={styles.matrixButton}>
          <Link className="button button--secondary" to="/docs/core/dynamics/coherence-matrix">
            Формальное определение
          </Link>
        </div>
      </div>
    </section>
  );
}

type DocSection = {
  title: string;
  description: string;
  link: string;
  items: string[];
};

const docSections: DocSection[] = [
  {
    title: 'Единственный примитив',
    description: 'Начало всего',
    link: '/docs/core/foundations/axiom-omega',
    items: ['Один примитив — всё остальное выводится', 'Логика, время и пространство — следствия', 'Принцип информационной различимости'],
  },
  {
    title: 'Структура',
    description: 'Форма реальности',
    link: '/docs/core/structure/holon',
    items: ['Голоном — целостная единица', 'Семь измерений бытия', 'Матрица когерентности'],
  },
  {
    title: 'Эмерджентное время',
    description: 'Время из структуры',
    link: '/docs/proofs/emergent-time',
    items: ['Время не постулируется — выводится', 'Основание как внутренние часы', 'Дискретность и стрела времени'],
  },
  {
    title: 'Динамика',
    description: 'Законы изменения',
    link: '/docs/core/dynamics/evolution',
    items: ['Диссипация и регенерация', 'Глобальный аттрактор', 'Уравнение эволюции из логики'],
  },
  {
    title: 'Жизнеспособность',
    description: 'Условия существования',
    link: '/docs/core/dynamics/viability',
    items: ['Чистота — мера целостности', 'Критический порог (теорема)', 'Область устойчивости'],
  },
  {
    title: 'Сознание',
    description: 'Формализация самомоделирования',
    link: '/docs/core/consciousness/self-observation',
    items: ['Иерархия интериорности (L0→L1→L2)', 'Пороги — теоремы из аксиом', 'Меры: рефлексия, интеграция'],
  },
  {
    title: 'Космология',
    description: 'Гипотезы о происхождении',
    link: '/docs/core/cosmology/origin',
    items: ['Источник (гипотеза)', 'Эмерджентное пространство', 'Исследовательская программа'],
  },
  {
    title: 'Доказательства',
    description: 'Формальные теоремы',
    link: '/docs/proofs/theorem-minimality-7',
    items: ['Минимальность семи измерений', 'Пять путей к критическому порогу', 'Категорный формализм'],
  },
  {
    title: 'Кибернетика',
    description: 'Инженерные приложения',
    link: '/docs/applied/coherence-cybernetics/introduction',
    items: ['Протокол измерения для ИИ', 'Теорема о невозможности зомби', 'Регенерация и когерентность'],
  },
];

function DocumentationSection() {
  return (
    <section className={styles.docsSection}>
      <div className="container">
        <div className={styles.docsGrid}>
          {docSections.map((section) => (
            <Link key={section.title} to={section.link} className={styles.docCard}>
              <h3>{section.title}</h3>
              <p className={styles.docDescription}>{section.description}</p>
              <ul className={styles.docItems}>
                {section.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  return (
    <Layout
      title="Формальная теория реальности"
      description="Унитарный Голономный Монизм — аксиоматическая теория на основе ∞-топоса Sh∞(𝒞). Время, структура и сознание выводятся как следствия.">
      <HomepageHeader />
      <main>
        <MatrixSection />
        <DocumentationSection />
      </main>
    </Layout>
  );
}
