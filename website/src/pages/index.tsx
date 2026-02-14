import type {ReactNode, JSX} from 'react';
import {useState, useEffect, useRef} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

/**
 * Визуализация УГМ
 *
 * Минималистичная гептаграмма {7/3} — Звезда Магов:
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

// Интерпретации элементов матрицы когерентности
const matrixInfo: Record<string, { name: string; desc: string }> = {
  // Диагональ (населённости)
  AA: { name: 'Артикуляция', desc: 'Активность различения' },
  SS: { name: 'Структура', desc: 'Устойчивость формы' },
  DD: { name: 'Динамика', desc: 'Активность процессов' },
  LL: { name: 'Логика', desc: 'Внутренняя согласованность' },
  EE: { name: 'Интериорность', desc: 'Интенсивность интериорных состояний' },
  OO: { name: 'Основание', desc: 'Связь с источником' },
  UU: { name: 'Единство', desc: 'Интегрированность' },
  // Когерентности (21 пара)
  AS: { name: 'Морфогенез', desc: 'Различия → устойчивые формы' },
  AD: { name: 'Актуализация', desc: 'Различение → актуальный процесс' },
  AL: { name: 'Предикация', desc: 'Различение → логический предикат' },
  AE: { name: 'Апперцепция', desc: 'Различение → интериорность' },
  AO: { name: 'Спонтанность', desc: 'Различения из основания' },
  AU: { name: 'Дифференциация', desc: 'Различение в целом' },
  SD: { name: 'Персистенция', desc: 'Форма через процесс' },
  SL: { name: 'Номос', desc: 'Структура с необходимостью' },
  SE: { name: 'Репрезентация', desc: 'Структура в интериорности' },
  SO: { name: 'Архетип', desc: 'Формы из основания' },
  SU: { name: 'Симметрия', desc: 'Структурное единство' },
  DL: { name: 'Регуляция', desc: 'Логически управляемый процесс' },
  DE: { name: 'Аффекция', desc: 'Процесс → интериорность' },
  DO: { name: 'Генезис', desc: 'Порождение из основания' },
  DU: { name: 'Телеология', desc: 'Направленное изменение' },
  LE: { name: 'Эвиденция', desc: 'Логика в интериорности' },
  LO: { name: 'Фундирование', desc: 'Логика из основания' },
  LU: { name: 'Консистентность', desc: 'Непротиворечивость целого' },
  EO: { name: 'Имманентность', desc: 'Основание в интериорности' },
  EU: { name: 'Синтез', desc: 'Интеграция в целое' },
  OU: { name: 'Полнота', desc: 'Источник ≡ целое' },
};

// Матрица когерентности Γ
function CoherenceMatrixVisualization() {
  const dims = ['A', 'S', 'D', 'L', 'E', 'O', 'U'];
  const [tooltip, setTooltip] = useState<{
    row: string; col: string; name: string; desc: string;
    x: number; y: number;
  } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const getInfo = (i: number, j: number) => {
    const key = i <= j ? `${dims[i]}${dims[j]}` : `${dims[j]}${dims[i]}`;
    return matrixInfo[key];
  };

  const handleMouseEnter = (e: React.MouseEvent, i: number, j: number) => {
    const container = containerRef.current;
    if (!container) return;
    const cRect = container.getBoundingClientRect();
    const tRect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const info = getInfo(i, j);
    setTooltip({
      row: dims[i], col: dims[j],
      name: info.name, desc: info.desc,
      x: tRect.left - cRect.left + tRect.width / 2,
      y: tRect.top - cRect.top,
    });
  };

  return (
    <div className={styles.matrixContainer} ref={containerRef}>
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
              onMouseEnter={(e) => handleMouseEnter(e, i, j)}
              onMouseLeave={() => setTooltip(null)}
            >
              <span className={styles.cellValue}>{`γ${row}${col}`}</span>
            </div>
          ))
        ))}
      </div>
      {tooltip && (
        <div
          className={styles.matrixTooltip}
          style={{ left: tooltip.x, top: tooltip.y }}
        >
          <strong>γ{tooltip.row}{tooltip.col}: {tooltip.name}</strong>
          <span>{tooltip.desc}</span>
        </div>
      )}
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
            Единственный примитив — ∞-топос. Пять аксиом — и ни одного
            произвольного выбора. Время возникает изнутри, монизм доказуем,
            внутреннее — не надстройка над физикой, а условие жизнеспособности.
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
              Центральный математический объект — эрмитова матрица 7×7.
              Диагональ — населённости измерений (A, S, D, L, E, O, U).
              Внедиагональные элементы — когерентности между ними.
            </p>
            <ul className={styles.matrixProperties}>
              <li><strong>Чистота P = Tr(Γ²)</strong> — мера целостности</li>
              <li><strong>Критический порог P_crit = 2/7</strong> — условие жизнеспособности</li>
              <li><strong>Сознание C = Φ × D_diff × R</strong> — три компоненты</li>
              <li><strong>Пять уровней L0→L4</strong> — от интериорности до единства</li>
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
    description: 'Пять аксиом Ω⁷',
    link: '/docs/core/foundations/axiom-omega',
    items: ['∞-топос Sh∞(𝒞) — всё остальное выводится', 'Логика, время и пространство — следствия', 'Принцип информационной различимости'],
  },
  {
    title: 'Структура',
    description: 'Семь измерений Голонома',
    link: '/docs/core/structure/holon',
    items: ['Голоном — целостная единица бытия', 'Семь измерений: A, S, D, L, E, O, U', 'Матрица когерентности Γ ∈ ℂ⁷ˣ⁷'],
  },
  {
    title: 'Октонионный фундамент',
    description: 'Почему именно 7',
    link: '/docs/proofs/minimality/theorem-octonionic-derivation',
    items: ['P1 + P2 → 𝕆 → dim(Im(𝕆)) = 7', 'Плоскость Фано и G₂-симметрия', 'Код Хэмминга H(7,4) и граница Кэли-Диксона'],
  },
  {
    title: 'Динамика',
    description: 'Уравнение эволюции',
    link: '/docs/core/dynamics/evolution',
    items: ['dΓ/dτ = −i[H,Γ] + 𝒟[Γ] + ℛ[Γ,E]', 'Диссипация из логики, регенерация из опыта', 'Глобальный аттрактор'],
  },
  {
    title: 'Эмерджентное время',
    description: 'Время из структуры',
    link: '/docs/proofs/dynamics/emergent-time',
    items: ['Время не постулируется — выводится', 'O-измерение как внутренние часы', 'Дискретность τ ∈ ℤ₇ и стрела времени'],
  },
  {
    title: 'Жизнеспособность',
    description: 'Условия существования',
    link: '/docs/core/dynamics/viability',
    items: ['Чистота P — мера целостности', 'P_crit = 2/7 (теорема, пять путей)', 'Область устойчивости'],
  },
  {
    title: 'Gap-семантика',
    description: 'Интериорность / экстериорность',
    link: '/docs/core/dynamics/gap-operator',
    items: ['Gap(i,j) = |sin(arg(γᵢⱼ))| — двойственность', 'Фано-канал: диссипация по PG(2,2)', 'Фазовая диаграмма когерентных состояний'],
  },
  {
    title: 'Сознание',
    description: 'От квалиа до коллективного разума',
    link: '/docs/consciousness/overview',
    items: ['21-парная таксономия квалиа из Γ', 'Эмоции, внимание, память — из формализма', 'ИИ-сознание: операциональные критерии'],
  },
  {
    title: 'Физическое соответствие',
    description: 'От Γ к Стандартной Модели',
    link: '/docs/physics/overview',
    items: ['G₂-калибровочная симметрия и поколения', 'Юкавская иерархия из текстур Фано', 'Космологическая постоянная: Λ-бюджет'],
  },
  {
    title: 'Доказательства',
    description: 'Формальные теоремы',
    link: '/docs/proofs/minimality/theorem-minimality-7',
    items: ['Минимальность 7 измерений (Трек A)', 'Пять путей к P_crit = 2/7', 'Категорный формализм и лакс-2-функтор'],
  },
  {
    title: 'Когерентная Кибернетика',
    description: 'Инженерные приложения',
    link: '/docs/applied/coherence-cybernetics/introduction',
    items: ['Протокол измерения Γ для ИИ', 'Условная теорема «Нет зомби»', 'Панинтериоризм ≠ панпсихизм'],
  },
  {
    title: 'Справочник',
    description: 'Верификация и нотация',
    link: '/docs/reference/falsifiability',
    items: ['Фальсифицируемые предсказания теории', 'Реестр статусов [Т]/[С]/[О]/[И]/[Г]/[П]', 'Глоссарий, нотация, спецификация'],
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
      description="Унитарный Голономный Монизм — аксиоматическая теория на основе ∞-топоса Sh∞(𝒞). Время, структура и сознание выводятся как следствия пяти аксиом.">
      <HomepageHeader />
      <main>
        <MatrixSection />
        <DocumentationSection />
      </main>
    </Layout>
  );
}
