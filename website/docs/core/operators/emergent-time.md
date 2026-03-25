---
sidebar_position: 3
title: "Эмерджентное время"
description: "Вывод времени из структуры категории 𝒞 — определения и ключевые результаты"
---

# Эмерджентное Время

:::info DRY: Мастер-определение темпоральной структуры
Время **выводится** из структуры [классификатора подобъектов Ω](/docs/core/foundations/axiom-omega), а не постулируется. Полное доказательство и все четыре конструкции — в [Теореме об эмерджентном времени](/docs/proofs/dynamics/emergent-time).
:::

## Темпоральная модальность ▷

На классификаторе $\Omega \in \mathbf{Sh}_\infty(\mathcal{C})$ определяется темпоральная модальность — **алгебраически**, независимо от динамики:

$$
\triangleright: \Omega \to \Omega, \quad \triangleright(S_i) := S_{(i+1) \bmod N}
$$

**Свойства:**
1. **Монотонность:** $p \leq q \Rightarrow \triangleright p \leq \triangleright q$
2. **Цикличность:** $\triangleright^N = \text{Id}$
3. **Совместимость с логикой:** $\triangleright(p \land q) = \triangleright p \land \triangleright q$

## Четыре эквивалентных конструкции

| # | Конструкция | Источник | Время |
|---|-------------|----------|-------|
| 1 | **Пейдж–Вуттерс** | Корреляция с [O-измерением](/docs/core/structure/dimension-o) | $\tau_n = \langle\tau_n\lvert\rho\rvert\tau_n\rangle_O$ |
| 2 | **Информационно-геометрическое** | Метрика Бурес на $\mathcal{D}(\mathcal{H})$ | $ds^2_{\text{Bures}}$ |
| 3 | **Категорное** | ∞-группоид путей $\text{Exp}_\infty$ | Цепи морфизмов |
| 4 | **Стратификационное** | Коллапс страт к $T$ | $d_{\text{strat}}$ |

:::tip Теорема: Эквивалентность четырёх конструкций времени
Все четыре конструкции дают согласованное понятие времени.
[Доказательство →](/docs/proofs/dynamics/emergent-time#6-теорема-об-эквивалентности) | Статус: **[Т]**
:::

## Механизм Пейдж–Вуттерс для УГМ {#page-wootters}

[Измерение O (Основание)](/docs/core/structure/dimension-o) выполняет роль **внутренних часов**. Полная система разлагается:

$$
\mathcal{H}_{total} = \mathcal{H}_O \otimes \mathcal{H}_{6D}
$$

где $\mathcal{H}_{6D} = \mathrm{span}\{|A\rangle, |S\rangle, |D\rangle, |L\rangle, |E\rangle, |U\rangle\}$.

### Ограничение Пейдж–Вуттерс {#constraint}

Глобальное состояние $\Gamma_{total}$ удовлетворяет **ограничению** (аналогу уравнения Уилера-ДеВитта):

$$
\hat{C} \cdot \Gamma_{total} = 0
$$

где оператор связи:

$$
\hat{C} = H_O \otimes \mathbb{1}_{6D} + \mathbb{1}_O \otimes H_{6D} + H_{int}
$$

Это ограничение эквивалентно требованию:

$$
[\hat{C}, \Gamma_{total}] = 0
$$

т.е. полная система **стационарна** — время возникает только как внутренний параметр корреляций.

### Эмерджентный параметр τ {#emergent-tau}

**Внутреннее время** $\tau$ определяется через условные состояния:

$$
\Gamma(\tau) := \frac{\mathrm{Tr}_O\left[ (|\tau\rangle\langle \tau|_O \otimes \mathbb{1}_{6D}) \cdot \Gamma_{total} \right]}{p(\tau)}
$$

где базис часов для $N = 7$:

$$
|\tau_n\rangle_O = \frac{1}{\sqrt{7}} \sum_{k=0}^{6} e^{-2\pi i k n / 7} |E_k\rangle_O, \quad n = 0, 1, \ldots, 6
$$

:::tip Теорема: Эмерджентная динамика
Условные состояния $\Gamma(\tau)$ эволюционируют согласно:

$$
\frac{d\Gamma(\tau)}{d\tau} = -i[H_{eff}, \Gamma(\tau)] + \mathcal{D}[\Gamma(\tau)] + \mathcal{R}[\Gamma(\tau), E]
$$

где $H_{eff}(\tau) = H_{6D} + \langle\tau| H_{int} |\tau\rangle_O$ — эффективный гамильтониан.
[Доказательство →](/docs/proofs/dynamics/emergent-time#3-механизм-page-wootters-для-угм) | Статус: **[Т]**
:::

:::warning Статус тензорной структуры
Разложение $\mathcal{H} = \mathcal{H}_O \otimes \mathcal{H}_{6D}$ — формально **Аксиома 5**, но **выводима** из A1–A4 через спектральную тройку T-53 **[Т]** (Sol.68): алгебра $A_{\text{int}} = \mathbb{C} \oplus M_3(\mathbb{C}) \oplus M_3(\mathbb{C})$ с KO-размерностью 6 однозначно определяет тензорное разложение. Подробнее: [вывод A5](/docs/core/foundations/axiom-omega#a5-из-спектральной-тройки). Статус: **[Т]**
:::

## Дискретность и хронон {#chronon}

Для $N = 7$ время **фундаментально дискретно**: $\tau \in \mathbb{Z}_7$. Минимальный квант субъективного времени (хронон):

$$
\delta\tau = \frac{2\pi}{7\omega_0}
$$

Непрерывное физическое время — **макроскопическое приближение** при $N_{\text{eff}} \gg 7$ для составных систем. Алгебраический предел: $\mathbb{C}[\mathbb{Z}_N] \to C(S^1)$ при $N \to \infty$.

[Подробнее о пределе $N \to \infty$ →](/docs/proofs/dynamics/emergent-time#предел-n-infty)

## Стрела времени

:::tip Теорема: Стрела времени
Стрела времени возникает как **коллапс страт** ∞-топоса к терминальному объекту $T$. Огрубление стирает гомотопическую информацию, что **необратимо**. CPTP-структура — **следствие** ориентации к $T$, а не постулат.
[Доказательство →](/docs/proofs/dynamics/emergent-time#7-теорема-о-стреле-времени) | Статус: **[Т]**
:::

## Связь с критической чистотой

При $P \to P_{\text{crit}} = 2/7$ скорость течения внутреннего времени стремится к нулю:

$$
\frac{d\tau_{int}}{dt_{ext}} \propto (P - P_{\text{crit}})^{1/2}
$$

Жизнеспособность ($P > 2/7$) эквивалентна тому, что Голоном **продолжает существовать во времени**.

[Доказательство →](/docs/proofs/dynamics/emergent-time#8-связь-с-критической-чистотой) | Статус: **[Т]**

## Связи

- **Определяется из:** [Аксиома Ω⁷](/docs/core/foundations/axiom-omega), [L-унификация](/docs/proofs/physics/physics-correspondence#2-l-унификация)
- **Используется в:** [Эволюция](/docs/core/dynamics/evolution), [Измерение O](/docs/core/structure/dimension-o), [Жизнеспособность](/docs/core/dynamics/viability)
- **Полное доказательство:** [Теорема об эмерджентном времени](/docs/proofs/dynamics/emergent-time)
- **Операторы Линдблада:** [L_k — генераторы диссипации](/docs/core/operators/lindblad-operators)
- **Критическая чистота:** [Теорема о чистоте](/docs/proofs/dynamics/theorem-purity-critical)
