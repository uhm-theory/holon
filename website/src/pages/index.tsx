import type {ReactNode, JSX} from 'react';
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

// Новая визуализация: Самозамыкающаяся структура
// Демонстрирует: единый примитив, самомоделирование, 7 измерений, когерентность, стрелу времени
function SelfReflectingVisualization() {
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

  // Псевдослучайные значения на основе индекса (стабильные между рендерами)
  const seededRandom = (seed: number) => {
    const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
    return x - Math.floor(x);
  };

  // 7 потоков, исходящих из центра и возвращающихся — самомоделирование
  const generateFlowPath = (index: number, totalTime: number) => {
    const baseAngle = (index * 360 / 7) - 90;
    const angleRad = (baseAngle * Math.PI) / 180;

    // Индивидуальные параметры для каждого потока (псевдослучайные, но стабильные)
    const seed = index + 1;
    const phaseOffset = seededRandom(seed) * Math.PI * 2;
    const speedVariation = 0.8 + seededRandom(seed * 2) * 0.4; // 0.8 - 1.2
    const amplitudeVariation = 0.7 + seededRandom(seed * 3) * 0.6; // 0.7 - 1.3

    // Параметры потока
    const innerRadius = 45;
    const outerRadius = 135 + seededRandom(seed * 4) * 15; // 135-150, вариация
    const curvature = 0.55 + seededRandom(seed * 5) * 0.15; // 0.55-0.7

    // Индивидуальное "дыхание" для каждого потока
    const breathe = Math.sin(totalTime * 0.4 * speedVariation + phaseOffset) * 10 * amplitudeVariation;

    // Точка выхода из центра
    const startX = cx + Math.cos(angleRad) * innerRadius;
    const startY = cy + Math.sin(angleRad) * innerRadius;

    // Дальняя точка (с индивидуальным дыханием)
    const farX = cx + Math.cos(angleRad) * (outerRadius + breathe);
    const farY = cy + Math.sin(angleRad) * (outerRadius + breathe);

    // Контрольные точки для изгиба обратно к центру
    const nextAngle = ((index + 1) * 360 / 7 - 90) * Math.PI / 180;
    const returnAngle = angleRad + (nextAngle - angleRad) * curvature;

    // Небольшая вариация в контрольных точках
    const ctrlVariation = 0.1 + seededRandom(seed * 6) * 0.1;
    const ctrl1X = cx + Math.cos(angleRad + ctrlVariation) * (outerRadius * 0.7);
    const ctrl1Y = cy + Math.sin(angleRad + ctrlVariation) * (outerRadius * 0.7);

    const ctrl2X = cx + Math.cos(returnAngle) * (outerRadius * 0.5);
    const ctrl2Y = cy + Math.sin(returnAngle) * (outerRadius * 0.5);

    // Точка возврата к центру
    const endX = cx + Math.cos(returnAngle) * innerRadius;
    const endY = cy + Math.sin(returnAngle) * innerRadius;

    return {
      path: `M ${startX} ${startY}
             Q ${ctrl1X} ${ctrl1Y} ${farX} ${farY}
             Q ${ctrl2X} ${ctrl2Y} ${endX} ${endY}`,
      phaseOffset,
      speedVariation,
      farX,
      farY,
      angleRad
    };
  };

  // Генерация плавного внутреннего кольца когерентности
  const generateInnerRing = () => {
    const ringRadius = 95;
    const points: string[] = [];
    const numPoints = 70; // Много точек для плавности

    for (let i = 0; i <= numPoints; i++) {
      const angle = (i / numPoints) * Math.PI * 2 - Math.PI / 2;
      // Добавляем мягкую волну
      const wave = Math.sin(angle * 7 + time * 0.5) * 3;
      const r = ringRadius + wave;
      const x = cx + Math.cos(angle) * r;
      const y = cy + Math.sin(angle) * r;
      points.push(i === 0 ? `M ${x} ${y}` : `L ${x} ${y}`);
    }

    return (
      <path
        d={points.join(' ') + ' Z'}
        fill="none"
        stroke="var(--ifm-color-primary)"
        strokeWidth={1.5}
        opacity={0.2 + Math.sin(time * 0.3) * 0.05}
        className={styles.innerRing}
      />
    );
  };

  // Генерация связей между соседними потоками (когерентность) — теперь как точки на кольце
  const generateCoherencePoints = () => {
    const points: JSX.Element[] = [];
    const ringRadius = 95;

    for (let i = 0; i < 7; i++) {
      const angle = ((i * 360 / 7) - 90) * Math.PI / 180;
      const wave = Math.sin(angle * 7 + time * 0.5) * 3;
      const r = ringRadius + wave;
      const x = cx + Math.cos(angle) * r;
      const y = cy + Math.sin(angle) * r;

      // Пульсирующая точка на кольце
      const pulseSize = 3 + Math.sin(time * 0.7 + i * 0.9) * 1.5;
      const opacity = 0.4 + Math.sin(time * 0.5 + i * 1.2) * 0.2;

      points.push(
        <circle
          key={`point-${i}`}
          cx={x}
          cy={y}
          r={pulseSize}
          fill="var(--ifm-color-primary)"
          opacity={opacity}
          className={styles.coherencePoint}
        />
      );
    }
    return points;
  };

  const flows = Array.from({ length: 7 }, (_, i) => generateFlowPath(i, time));

  return (
    <svg viewBox="0 0 500 500" className={styles.orbitalSvg}>
      <defs>
        {/* Градиент для центрального источника */}
        <radialGradient id="sourceGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--ifm-color-primary)" stopOpacity="0.9" />
          <stop offset="40%" stopColor="var(--ifm-color-primary)" stopOpacity="0.4" />
          <stop offset="100%" stopColor="var(--ifm-color-primary)" stopOpacity="0" />
        </radialGradient>

        {/* Градиент для потоков */}
        <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="var(--ifm-color-primary)" stopOpacity="0.8" />
          <stop offset="50%" stopColor="var(--ifm-color-primary)" stopOpacity="0.4" />
          <stop offset="100%" stopColor="var(--ifm-color-primary)" stopOpacity="0.6" />
        </linearGradient>

        {/* Мягкое свечение */}
        <filter id="softGlow2" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="4" result="blur"/>
          <feMerge>
            <feMergeNode in="blur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>

        {/* Сильное свечение для центра */}
        <filter id="coreGlow" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="8" result="blur"/>
          <feMerge>
            <feMergeNode in="blur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      {/* Фоновое свечение — единый примитив */}
      <circle
        cx={cx} cy={cy} r="180"
        fill="url(#sourceGlow)"
        className={styles.sourceGlow}
      />

      {/* Плавное внутреннее кольцо когерентности */}
      <g className={styles.coherenceLayer}>
        {generateInnerRing()}
        {generateCoherencePoints()}
      </g>

      {/* 7 самозамыкающихся потоков — самомоделирование */}
      <g className={styles.flowsLayer}>
        {flows.map((flow, i) => (
          <g key={`flow-${i}`}>
            {/* Основной поток */}
            <path
              d={flow.path}
              fill="none"
              stroke="var(--ifm-color-primary)"
              strokeWidth={2.5}
              strokeLinecap="round"
              opacity={0.6 + Math.sin(time * 0.5 + i * 0.9) * 0.2}
              className={styles.flowPath}
              filter="url(#softGlow2)"
            />
            {/* Движущаяся точка — стрела времени */}
            <circle
              r={4}
              fill="var(--ifm-color-primary)"
              opacity={0.8}
              className={styles.flowParticle}
              style={{
                offsetPath: `path('${flow.path}')`,
                offsetDistance: `${((time * 15 + i * 14.3) % 100)}%`,
              } as React.CSSProperties}
            />
          </g>
        ))}
      </g>

      {/* Центральное ядро — терминальный объект T / источник */}
      {(() => {
        // Плавное блуждание центра во всех направлениях
        // Все функции = 0 при t=0, создаём эффект Лиссажу
        const wanderX = Math.sin(time * 0.31) * 4 + Math.sin(time * 0.67) * 2;
        const wanderY = Math.sin(time * 0.23) * 4 + Math.sin(time * 0.59) * 2;
        const breathe = 1 + Math.sin(time * 0.4) * 0.03;
        const coreX = cx + wanderX;
        const coreY = cy + wanderY;

        return (
          <g className={styles.coreGroup}>
            <circle
              cx={coreX} cy={coreY} r={38 * breathe}
              fill="var(--ifm-color-primary)"
              opacity={0.2}
              filter="url(#coreGlow)"
              className={styles.coreOuter}
            />
            <circle
              cx={coreX} cy={coreY} r={28 * breathe}
              fill="var(--ifm-color-primary)"
              className={styles.coreInner}
            />
            {/* Символ бесконечности / самореференции */}
            <text
              x={coreX} y={coreY}
              className={styles.coreSymbol}
            >
              ∞
            </text>
          </g>
        );
      })()}

      {/* Тонкое внешнее кольцо — граница системы */}
      <circle
        cx={cx} cy={cy} r="175"
        fill="none"
        stroke="var(--ifm-color-primary)"
        strokeWidth={1}
        strokeDasharray="3 6"
        opacity={0.2}
        className={styles.boundaryRing}
      />
    </svg>
  );
}

/* --- ЗАКОММЕНТИРОВАННАЯ СТАРАЯ ВИЗУАЛИЗАЦИЯ ---
// Орбитальная визуализация 7-мерной структуры Голонома с динамическими связями
function CoherenceOrbitalVisualizationOld() {
  const cx = 250, cy = 250;
  const maxConnectionDistance = 180;
  const minConnectionDistance = 40;

  const [time, setTime] = useState(0);
  const animationRef = useRef<number | undefined>(undefined);
  const startTimeRef = useRef<number>(Date.now());

  const dimensions: Dimension[] = [
    { symbol: 'A', name: 'Артикуляция', baseAngle: -90, radius: 55, orbitSpeed: 3, orbitDirection: 1 },
    { symbol: 'S', name: 'Структура', baseAngle: 150, radius: 110, orbitSpeed: 2, orbitDirection: 1 },
    { symbol: 'D', name: 'Динамика', baseAngle: 30, radius: 110, orbitSpeed: 2, orbitDirection: 1 },
    { symbol: 'L', name: 'Логика', baseAngle: -30, radius: 110, orbitSpeed: 2, orbitDirection: 1 },
    { symbol: 'E', name: 'Опыт', baseAngle: -130, radius: 165, orbitSpeed: 1.5, orbitDirection: -1 },
    { symbol: 'O', name: 'Основание', baseAngle: -10, radius: 165, orbitSpeed: 1.5, orbitDirection: -1 },
    { symbol: 'U', name: 'Единство', baseAngle: 110, radius: 165, orbitSpeed: 1.5, orbitDirection: -1 },
  ];

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

  const getDistance = (p1: {x: number, y: number}, p2: {x: number, y: number}) => {
    return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
  };

  const getConnectionOpacity = (distance: number) => {
    if (distance > maxConnectionDistance) return 0;
    if (distance < minConnectionDistance) return 0.6;
    const ratio = (maxConnectionDistance - distance) / (maxConnectionDistance - minConnectionDistance);
    return ratio * 0.6;
  };

  const nodeSize = 18;

  const renderConnections = () => {
    const connections: JSX.Element[] = [];
    const gammaRadius = 26;

    for (let i = 0; i < positions.length; i++) {
      for (let j = i + 1; j < positions.length; j++) {
        const p1 = positions[i];
        const p2 = positions[j];
        const distance = getDistance({x: p1.x, y: p1.y}, {x: p2.x, y: p2.y});
        const opacity = getConnectionOpacity(distance);

        if (opacity > 0.02) {
          const dx = p2.x - p1.x;
          const dy = p2.y - p1.y;
          const len = Math.sqrt(dx * dx + dy * dy);
          const nx = dx / len;
          const ny = dy / len;

          const x1 = p1.x + nx * nodeSize;
          const y1 = p1.y + ny * nodeSize;
          const x2 = p2.x - nx * nodeSize;
          const y2 = p2.y - ny * nodeSize;

          connections.push(
            <line
              key={`conn-${p1.dim.symbol}-${p2.dim.symbol}`}
              x1={x1} y1={y1} x2={x2} y2={y2}
              stroke="var(--ifm-color-primary)"
              strokeWidth={1 + opacity}
              opacity={opacity}
              className={styles.dynamicConnection}
            />
          );
        }
      }
    }

    positions.forEach((p) => {
      const distanceFromCenter = getDistance({x: p.x, y: p.y}, { x: cx, y: cy });
      const centerOpacity = 0.15 + (0.15 * (1 - distanceFromCenter / 200));

      const dx = p.x - cx;
      const dy = p.y - cy;
      const len = Math.sqrt(dx * dx + dy * dy);
      const nx = dx / len;
      const ny = dy / len;

      const x1 = cx + nx * gammaRadius;
      const y1 = cy + ny * gammaRadius;
      const x2 = p.x - nx * nodeSize;
      const y2 = p.y - ny * nodeSize;

      connections.push(
        <line
          key={`center-${p.dim.symbol}`}
          x1={x1} y1={y1} x2={x2} y2={y2}
          stroke="var(--ifm-color-primary)"
          strokeWidth={1}
          opacity={centerOpacity}
          className={styles.centerConnection}
        />
      );
    });

    return connections;
  };

  const renderNode = (p: typeof positions[0]) => {
    const nodeSize = 18;
    return (
      <g key={p.dim.symbol} className={styles.dimensionGroup} transform={`translate(${p.x}, ${p.y})`}>
        <circle r={nodeSize} className={styles.dimensionNode} filter="url(#softGlow)" />
        <text className={styles.dimensionSymbol}>{p.dim.symbol}</text>
        <text x={0} y={-28} className={styles.dimensionNameHover} textAnchor="middle">{p.dim.name}</text>
      </g>
    );
  };

  const getPositions = () => {
    return dimensions.map(dim => {
      const currentAngle = dim.baseAngle + (time * dim.orbitSpeed * dim.orbitDirection);
      const rad = (currentAngle * Math.PI) / 180;
      return { dim, x: cx + dim.radius * Math.cos(rad), y: cy + dim.radius * Math.sin(rad) };
    });
  };

  const positions = getPositions();

  return (
    <svg viewBox="0 0 500 500" className={styles.orbitalSvg}>
      <defs>
        <radialGradient id="gammaGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--ifm-color-primary)" stopOpacity="0.6" />
          <stop offset="70%" stopColor="var(--ifm-color-primary)" stopOpacity="0.2" />
          <stop offset="100%" stopColor="var(--ifm-color-primary)" stopOpacity="0" />
        </radialGradient>
        <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <filter id="strongGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="6" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>
      <circle cx={cx} cy={cy} r="200" fill="url(#gammaGlow)" className={styles.pulseGlow} />
      <circle cx={cx} cy={cy} r={165} className={styles.orbitRing} />
      <circle cx={cx} cy={cy} r={110} className={styles.orbitRing} />
      <circle cx={cx} cy={cy} r={55} className={styles.orbitRing} />
      <g className={styles.connectionsLayer}>{renderConnections()}</g>
      <g className={styles.gammaGroup}>
        <circle cx={cx} cy={cy} r="32" className={styles.gammaCoreOuter} filter="url(#strongGlow)" />
        <circle cx={cx} cy={cy} r="26" className={styles.gammaCore} />
        <text x={cx} y={cy} className={styles.gammaText}>Γ</text>
      </g>
      {positions.map(renderNode)}
    </svg>
  );
}
--- КОНЕЦ ЗАКОММЕНТИРОВАННОЙ ВИЗУАЛИЗАЦИИ --- */

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
          <SelfReflectingVisualization />
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

// 9 блоков в логической последовательности теории:
// Примитив → Структура → Время → Динамика → Жизнеспособность → Сознание → Космология → Доказательства → Приложения
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
    link: '/docs/applied/coherence-cybernetics/axiomatics',
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
