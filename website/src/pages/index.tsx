import type {ReactNode} from 'react';
import {useState, useEffect, useRef} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

// Типы для измерений
interface Dimension {
  symbol: string;
  name: string;
  baseAngle: number;
  radius: number;
  orbitSpeed: number; // градусов в секунду
  orbitDirection: 1 | -1;
}

// Орбитальная визуализация 7-мерной структуры Голонома с динамическими связями
function CoherenceOrbitalVisualization() {
  const cx = 250, cy = 250;
  const maxConnectionDistance = 180; // максимальное расстояние для соединения
  const minConnectionDistance = 40; // минимальное расстояние (полная непрозрачность)

  const [time, setTime] = useState(0);
  const animationRef = useRef<number>();
  const startTimeRef = useRef<number>(Date.now());

  // Все измерения с параметрами орбит (скорость уменьшена вдвое)
  const dimensions: Dimension[] = [
    // A - ближайшая к центру орбита
    { symbol: 'A', name: 'Артикуляция', baseAngle: -90, radius: 55, orbitSpeed: 3, orbitDirection: 1 },
    // Form - средняя орбита
    { symbol: 'S', name: 'Структура', baseAngle: 150, radius: 110, orbitSpeed: 2, orbitDirection: 1 },
    { symbol: 'D', name: 'Динамика', baseAngle: 30, radius: 110, orbitSpeed: 2, orbitDirection: 1 },
    { symbol: 'L', name: 'Логика', baseAngle: -30, radius: 110, orbitSpeed: 2, orbitDirection: 1 },
    // Experience - внешняя орбита, обратное направление
    { symbol: 'E', name: 'Опыт', baseAngle: -130, radius: 165, orbitSpeed: 1.5, orbitDirection: -1 },
    { symbol: 'O', name: 'Основание', baseAngle: -10, radius: 165, orbitSpeed: 1.5, orbitDirection: -1 },
    { symbol: 'U', name: 'Единство', baseAngle: 110, radius: 165, orbitSpeed: 1.5, orbitDirection: -1 },
  ];

  // Анимационный цикл
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

  // Вычисление расстояния между двумя точками
  const getDistance = (p1: {x: number, y: number}, p2: {x: number, y: number}) => {
    return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
  };

  // Вычисление прозрачности соединения на основе расстояния
  const getConnectionOpacity = (distance: number) => {
    if (distance > maxConnectionDistance) return 0;
    if (distance < minConnectionDistance) return 0.6;
    // Линейная интерполяция
    const ratio = (maxConnectionDistance - distance) / (maxConnectionDistance - minConnectionDistance);
    return ratio * 0.6;
  };

  // Размер узла (одинаковый для всех)
  const nodeSize = 18;

  // Генерация всех соединений между узлами (от краёв кругов, а не центров)
  const renderConnections = () => {
    const connections: JSX.Element[] = [];
    const gammaRadius = 26; // радиус центрального круга Γ

    // Соединения между всеми парами узлов
    for (let i = 0; i < positions.length; i++) {
      for (let j = i + 1; j < positions.length; j++) {
        const p1 = positions[i];
        const p2 = positions[j];
        const distance = getDistance({x: p1.x, y: p1.y}, {x: p2.x, y: p2.y});
        const opacity = getConnectionOpacity(distance);

        if (opacity > 0.02) {
          // Вычисляем направление от p1 к p2
          const dx = p2.x - p1.x;
          const dy = p2.y - p1.y;
          const len = Math.sqrt(dx * dx + dy * dy);
          const nx = dx / len;
          const ny = dy / len;

          // Смещаем точки на край кругов
          const x1 = p1.x + nx * nodeSize;
          const y1 = p1.y + ny * nodeSize;
          const x2 = p2.x - nx * nodeSize;
          const y2 = p2.y - ny * nodeSize;

          connections.push(
            <line
              key={`conn-${p1.dim.symbol}-${p2.dim.symbol}`}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="var(--ifm-color-primary)"
              strokeWidth={1 + opacity}
              opacity={opacity}
              className={styles.dynamicConnection}
            />
          );
        }
      }
    }

    // Соединения от центра Γ к каждому узлу (от краёв)
    positions.forEach((p) => {
      const distanceFromCenter = getDistance({x: p.x, y: p.y}, { x: cx, y: cy });
      const centerOpacity = 0.15 + (0.15 * (1 - distanceFromCenter / 200));

      // Направление от центра к узлу
      const dx = p.x - cx;
      const dy = p.y - cy;
      const len = Math.sqrt(dx * dx + dy * dy);
      const nx = dx / len;
      const ny = dy / len;

      // Смещаем точки на край кругов
      const x1 = cx + nx * gammaRadius;
      const y1 = cy + ny * gammaRadius;
      const x2 = p.x - nx * nodeSize;
      const y2 = p.y - ny * nodeSize;

      connections.push(
        <line
          key={`center-${p.dim.symbol}`}
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke="var(--ifm-color-primary)"
          strokeWidth={1}
          opacity={centerOpacity}
          className={styles.centerConnection}
        />
      );
    });

    return connections;
  };

  // Рендер узла измерения - используем transform для синхронного движения
  const renderNode = (p: typeof positions[0]) => {
    const nodeSize = 18;

    return (
      <g
        key={p.dim.symbol}
        className={styles.dimensionGroup}
        transform={`translate(${p.x}, ${p.y})`}
      >
        {/* Узел измерения - позиционируется в центре группы */}
        <circle
          r={nodeSize}
          className={styles.dimensionNode}
          filter="url(#softGlow)"
        />
        {/* Символ - в центре группы */}
        <text
          className={styles.dimensionSymbol}
        >
          {p.dim.symbol}
        </text>
        {/* Название - всегда над кругом, видно только при наведении */}
        <text
          x={0}
          y={-28}
          className={styles.dimensionNameHover}
          textAnchor="middle"
        >
          {p.dim.name}
        </text>
      </g>
    );
  };

  // Вычисление всех позиций для текущего времени
  const getPositions = () => {
    return dimensions.map(dim => {
      const currentAngle = dim.baseAngle + (time * dim.orbitSpeed * dim.orbitDirection);
      const rad = (currentAngle * Math.PI) / 180;
      return {
        dim,
        x: cx + dim.radius * Math.cos(rad),
        y: cy + dim.radius * Math.sin(rad),
      };
    });
  };

  const positions = getPositions();

  return (
    <svg viewBox="0 0 500 500" className={styles.orbitalSvg}>
      <defs>
        {/* Градиенты */}
        <radialGradient id="gammaGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--ifm-color-primary)" stopOpacity="0.6" />
          <stop offset="70%" stopColor="var(--ifm-color-primary)" stopOpacity="0.2" />
          <stop offset="100%" stopColor="var(--ifm-color-primary)" stopOpacity="0" />
        </radialGradient>
        {/* Свечение */}
        <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur"/>
          <feMerge>
            <feMergeNode in="blur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        <filter id="strongGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="6" result="blur"/>
          <feMerge>
            <feMergeNode in="blur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      {/* Фоновое свечение от центра */}
      <circle cx={cx} cy={cy} r="200" fill="url(#gammaGlow)" className={styles.pulseGlow} />

      {/* Орбитальные кольца */}
      <circle cx={cx} cy={cy} r={165} className={styles.orbitRing} />
      <circle cx={cx} cy={cy} r={110} className={styles.orbitRing} />
      <circle cx={cx} cy={cy} r={55} className={styles.orbitRing} />

      {/* Динамические соединения */}
      <g className={styles.connectionsLayer}>
        {renderConnections()}
      </g>

      {/* Центральный Γ */}
      <g className={styles.gammaGroup}>
        <circle cx={cx} cy={cy} r="32" className={styles.gammaCoreOuter} filter="url(#strongGlow)" />
        <circle cx={cx} cy={cy} r="26" className={styles.gammaCore} />
        <text x={cx} y={cy} className={styles.gammaText}>Γ</text>
      </g>

      {/* Все узлы измерений */}
      {positions.map(renderNode)}

    </svg>
  );
}

// Компонент матрицы когерентности
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
  const logoUrl = useBaseUrl('/img/logo.svg');
  return (
    <header className={styles.hero}>
      <div className={styles.heroContent}>
        <div className={styles.heroText}>
          <Heading as="h1" className={styles.heroTitle}>
            Унитарный Голономный Монизм
          </Heading>
          <p className={styles.heroSubtitle}>
            Аксиоматическая онтология: единственный примитив Γ ∈ ℒ(ℂ⁷)
            порождает пространство, время и сознание
          </p>
          <div className={styles.heroMath}>
            <code>Γ ∈ ℒ(ℋ), Γ† = Γ, Γ ≥ 0, Tr(Γ) = 1</code>
          </div>
          <div className={styles.heroButtons}>
            <Link className="button button--primary button--lg" to="/docs/intro">
              Введение
            </Link>
          </div>
        </div>
        <div className={styles.heroVisual}>
          <CoherenceOrbitalVisualization />
        </div>
      </div>
    </header>
  );
}

function EquationSection() {
  return (
    <section className={styles.equationSection}>
      <div className="container">
        <div className={styles.equationWrapper}>
          <Heading as="h2" className={styles.sectionTitle}>
            Уравнение Эволюции
          </Heading>
          <div className={styles.equationBlock}>
            <div className={styles.mainEquation}>
              dΓ/dt = -i[H, Γ] + 𝒟[Γ] + ℛ[Γ, E]
            </div>
            <div className={styles.equationTerms}>
              <div className={styles.term}>
                <span className={styles.termFormula}>-i[H, Γ]</span>
                <span className={styles.termName}>Унитарная эволюция</span>
              </div>
              <div className={styles.term}>
                <span className={styles.termFormula}>𝒟[Γ]</span>
                <span className={styles.termName}>Диссипация (Линдблад)</span>
              </div>
              <div className={styles.term}>
                <span className={styles.termFormula}>ℛ[Γ, E]</span>
                <span className={styles.termName}>Регенерация</span>
              </div>
            </div>
          </div>
          <Link className="button button--secondary" to="/docs/core/dynamics/evolution">
            Подробнее о динамике
          </Link>
        </div>
      </div>
    </section>
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
              Эрмитова положительно полуопределённая матрица 7×7 с единичным следом.
              Диагональные элементы γ<sub>ii</sub> — населённости измерений.
              Внедиагональные γ<sub>ij</sub> — когерентности между измерениями.
            </p>
            <ul className={styles.matrixProperties}>
              <li><strong>Чистота:</strong> P = Tr(Γ²) ∈ [1/7, 1]</li>
              <li><strong>Энтропия:</strong> S = -Tr(Γ log Γ)</li>
              <li><strong>Жизнеспособность:</strong> P &gt; P<sub>critical</sub> = 2/7 ≈ 0.286</li>
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
    title: 'Основания',
    description: 'Аксиоматическая база теории',
    link: '/docs/core/foundations/axiom-omega',
    items: ['Аксиома Ω — единственность Γ', 'Теорема S — минимальность 7D', 'Следствия'],
  },
  {
    title: 'Структура',
    description: '7 измерений Голонома',
    link: '/docs/core/structure/holon',
    items: ['A — Артикуляция', 'S, D, L — Форма', 'E, O, U — Опыт'],
  },
  {
    title: 'Динамика',
    description: 'Законы эволюции',
    link: '/docs/core/dynamics/evolution',
    items: ['Уравнение Линдблада', 'Регенерация', 'Жизнеспособность'],
  },
  {
    title: 'Сознание',
    description: 'Теория интериорности',
    link: '/docs/core/consciousness/interiority',
    items: ['Оператор φ', 'Иерархия L0→L1→L2', 'Функтор опыта'],
  },
  {
    title: 'Формализация',
    description: 'Математический аппарат',
    link: '/docs/proofs/theorem-minimality-7',
    items: ['Минимальность dim=7', 'CPTP-каналы', 'Категорный формализм'],
  },
  {
    title: 'Приложения',
    description: 'Кибернетика Когерентности',
    link: '/docs/applied/coherence-cybernetics/axiomatics',
    items: ['Метатеория кибернетик', 'Теорема No-Zombie', 'Предсказания'],
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

function AxiomsSection() {
  return (
    <section className={styles.axiomsSection}>
      <div className="container">
        <Heading as="h2" className={styles.sectionTitle}>
          Аксиоматика
        </Heading>
        <div className={styles.axiomsList}>
          <div className={styles.axiom}>
            <div className={styles.axiomHeader}>
              <span className={styles.axiomId}>Ω</span>
              <span className={styles.axiomName}>Единственность субстанции</span>
            </div>
            <code className={styles.axiomFormula}>
              ∃! Γ ∈ 𝓛(ℋ) : Γ† = Γ, Γ ≥ 0, Tr(Γ) = 1
            </code>
          </div>
          <div className={styles.axiom}>
            <div className={styles.axiomHeader}>
              <span className={styles.axiomId}>AP</span>
              <span className={styles.axiomName}>Автопоэзис — самовоспроизведение</span>
            </div>
            <code className={styles.axiomFormula}>
              ∃φ : Γ → Γ — оператор самомоделирования (CPTP)
            </code>
          </div>
          <div className={styles.axiom}>
            <div className={styles.axiomHeader}>
              <span className={styles.axiomId}>PH</span>
              <span className={styles.axiomName}>Феноменология — интериорность</span>
            </div>
            <code className={styles.axiomFormula}>
              ∃ρ_E = Tr_(-E)(Γ) ≠ 0 — E-проекция нетривиальна
            </code>
          </div>
          <div className={styles.axiom}>
            <div className={styles.axiomHeader}>
              <span className={styles.axiomId}>QG</span>
              <span className={styles.axiomName}>Квантовое основание</span>
            </div>
            <code className={styles.axiomFormula}>
              dΓ/dt = -i[H, Γ] + 𝒟[Γ] + ℛ[Γ, E]
            </code>
          </div>
          <div className={styles.axiom}>
            <div className={styles.axiomHeader}>
              <span className={styles.axiomId}>⇒</span>
              <span className={styles.axiomName}>Теорема S — минимальность</span>
            </div>
            <code className={styles.axiomFormula}>
              (AP) ∧ (PH) ∧ (QG) ⇒ dim(ℋ) ≥ 7
            </code>
          </div>
        </div>
        <Link className="button button--secondary" to="/docs/core/foundations/axiom-omega">
          Полная аксиоматика
        </Link>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  return (
    <Layout
      title="Формальная теория реальности"
      description="Унитарный Голономный Монизм — аксиоматическая теория на основе Матрицы Когерентности Γ">
      <HomepageHeader />
      <main>
        <AxiomsSection />
        <EquationSection />
        <MatrixSection />
        <DocumentationSection />
      </main>
    </Layout>
  );
}
