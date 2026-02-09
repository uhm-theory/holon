---
sidebar_position: 2
title: Определения
description: Базовые определения Кибернетики Когерентности
---

# Базовые Определения

:::note О нотации
В этом документе:
- $\Gamma$ — [матрица когерентности](/docs/core/dynamics/coherence-matrix)
- $\varphi$ — [оператор самомоделирования](/docs/proofs/formalization-phi)
- $P$ — [чистота](/docs/core/dynamics/viability#определение-чистоты)
- $D_{\text{diff}}$ — мера дифференциации (не путать с измерением $D$)
- $R$, $\Phi$, $C$ — [меры сознательности](/docs/core/consciousness/self-observation)
- L0, L1, L2 — [уровни интериорности](/docs/proofs/interiority-hierarchy)
:::

## Голоном

**Определение (Голоном):**

См. [Голоном](/docs/core/structure/holon) для полного описания.

$$
\mathbb{H} := \langle \Gamma, \mathcal{H}, H, \{L_k\}, E, \varphi \rangle
$$

где:
- $\Gamma \in \mathcal{L}(\mathcal{H})$ — [матрица когерентности](/docs/core/dynamics/coherence-matrix) (состояние)
- $\mathcal{H} = \mathbb{C}^7$ — [пространство состояний](/docs/core/structure/dimensions)
- $H \in \mathcal{L}(\mathcal{H})$, $H^\dagger = H$ — гамильтониан
- $\{L_k\}_{k=1}^m \subset \mathcal{L}(\mathcal{H})$ — операторы Линдблада
- $E$ — окружение
- $\varphi: \mathcal{L}(\mathcal{H}) \to \mathcal{L}(\mathcal{H})$ — [оператор самомоделирования](/docs/proofs/formalization-phi)

## Матричное представление Γ

**Определение (Матричное представление):**

В базисе $\{|A\rangle, |S\rangle, |D\rangle, |L\rangle, |E\rangle, |O\rangle, |U\rangle\}$:

$$
\Gamma = \begin{pmatrix}
\gamma_{AA} & \gamma_{AS} & \gamma_{AD} & \gamma_{AL} & \gamma_{AE} & \gamma_{AO} & \gamma_{AU} \\
\gamma_{SA} & \gamma_{SS} & \gamma_{SD} & \gamma_{SL} & \gamma_{SE} & \gamma_{SO} & \gamma_{SU} \\
\gamma_{DA} & \gamma_{DS} & \gamma_{DD} & \gamma_{DL} & \gamma_{DE} & \gamma_{DO} & \gamma_{DU} \\
\gamma_{LA} & \gamma_{LS} & \gamma_{LD} & \gamma_{LL} & \gamma_{LE} & \gamma_{LO} & \gamma_{LU} \\
\gamma_{EA} & \gamma_{ES} & \gamma_{ED} & \gamma_{EL} & \gamma_{EE} & \gamma_{EO} & \gamma_{EU} \\
\gamma_{OA} & \gamma_{OS} & \gamma_{OD} & \gamma_{OL} & \gamma_{OE} & \gamma_{OO} & \gamma_{OU} \\
\gamma_{UA} & \gamma_{US} & \gamma_{UD} & \gamma_{UL} & \gamma_{UE} & \gamma_{UO} & \gamma_{UU}
\end{pmatrix}
$$

**Свойства элементов:**
- $\gamma_{ij} = \gamma_{ji}^*$ (эрмитовость)
- $\gamma_{ii} \geq 0$ (диагональные — вероятности)
- $\sum_i \gamma_{ii} = 1$ (нормировка)
- $|\gamma_{ij}|^2 \leq \gamma_{ii} \cdot \gamma_{jj}$ (неравенство Коши-Шварца)

## Чистота

**Определение (Чистота):**

См. [Жизнеспособность](/docs/core/dynamics/viability#определение-чистоты) для полного описания.

$$
P(\Gamma) := \mathrm{Tr}(\Gamma^2) = \sum_{ij} |\gamma_{ij}|^2
$$

**Свойства:**
- $P \in [1/7, 1]$ для $N = 7$
- $P = 1 \Leftrightarrow \Gamma = |\psi\rangle\langle\psi|$ (чистое состояние)
- $P = 1/7 \Leftrightarrow \Gamma = I/7$ (максимально смешанное)

## Энтропия фон Неймана

**Определение (Энтропия фон Неймана):**

$$
S_{vN}(\Gamma) := -\mathrm{Tr}(\Gamma \log \Gamma) = -\sum_i \lambda_i \log \lambda_i \in [0, \log 7]
$$

**Связь с чистотой:**
- $S_{vN} = 0 \Leftrightarrow P = 1$ (чистое состояние)
- $S_{vN} = \log 7 \Leftrightarrow P = 1/7$ (максимально смешанное)

## Экспериенциальное содержание

**Определение (Экспериенциальное содержание):**

См. [Категория Exp](/docs/proofs/categorical-formalism#2-категория-exp) для формального описания.

$$
\mathcal{Q}(\Gamma, t) := (\mathrm{Intensity}, \mathrm{Quality}, \mathrm{Context}, \mathrm{History})
$$

:::note Терминология
Функция $\mathcal{Q}$ применима ко всем уровням интериорности (L0–L2). Термин **«квалиа»** резервируется только для L2 (когнитивные квалиа).
:::

| Компонент | Определение | Интерпретация |
|-----------|-------------|---------------|
| **Intensity** | $\{\lambda_k\}$ — спектр $\Gamma$ | Сила переживания |
| **Quality** | $\{[\vert q_k\rangle]\} \subset \mathbb{P}(\mathcal{H}_E)$ | Характер переживания |
| **Context** | $\Gamma_{-E}$ — состояния измерений кроме $E$ | Модуляция опыта |
| **History** | $\mathrm{Hist} := \{\Gamma(t') : t' < t\}$ | Адаптация |

## Подматрица опыта

**Определение (Подматрица опыта $\Gamma_E$):**

$$
\rho_E := \mathrm{Tr}_{-E}(\Gamma)
$$

Частичный след по всем измерениям кроме $E$. Для [уровня L1](/docs/proofs/interiority-hierarchy#уровень-1-феноменальная-геометрия-phenomenal-geometry) требуется $\mathrm{rank}(\rho_E) > 1$.

## Проективное пространство качеств

**Определение (Пространство качеств):**

Качества опыта живут в **проективном пространстве**:

$$
\mathbb{P}(\mathcal{H}_E) := (\mathcal{H}_E \setminus \{0\}) / \sim
$$

где $|\psi\rangle \sim |\phi\rangle \Leftrightarrow |\psi\rangle = c|\phi\rangle$ для $c \in \mathbb{C}^*$.

**Метрика Фубини-Штуди:**

$$
d_{\mathrm{FS}}([|\psi\rangle], [|\phi\rangle]) := \arccos(|\langle\psi|\phi\rangle|) \in [0, \pi/2]
$$

**Свойства:**
- $d_{\mathrm{FS}} = 0 \Leftrightarrow |\psi\rangle = e^{i\theta}|\phi\rangle$ (одинаковые качества)
- $d_{\mathrm{FS}} = \pi/2 \Leftrightarrow \langle\psi|\phi\rangle = 0$ (ортогональные, максимально различные)
- $d_{\mathrm{FS}}$ — риманова метрика на $\mathbb{P}(\mathcal{H}_E)$

## E-когерентность

**Определение ($E$-когерентность):**

$$
\mathrm{Coh}_E(\Gamma) := \frac{(\sum_k \lambda_k)^2}{n \cdot \sum_k \lambda_k^2}
$$

где $\lambda_k$ — собственные значения $\rho_E$, $n$ — число ненулевых собственных значений.

**Свойства:**
- $\mathrm{Coh}_E \in [1/n, 1]$
- $\mathrm{Coh}_E = 1$ — единственный доминирующий $E$-компонент
- $\mathrm{Coh}_E = 1/n$ — фрагментированная $E$-проекция

## Оператор самомоделирования (CPTP)

**Определение ($\varphi$ как CPTP-канал):**

См. [Формализация оператора φ](/docs/proofs/formalization-phi) для полного описания.

$$
\varphi: \mathcal{D}(\mathcal{H}) \to \mathcal{D}(\mathcal{H}), \quad \varphi(\Gamma) = \sum_m K_m \Gamma K_m^\dagger
$$

где $\{K_m\}$ — операторы Крауса, удовлетворяющие условию полноты:

$$
\sum_m K_m^\dagger K_m = I
$$

**Свойства CPTP:**
- Сохранение следа: $\mathrm{Tr}(\varphi(\Gamma)) = \mathrm{Tr}(\Gamma) = 1$
- Сохранение положительности: $\Gamma \geq 0 \Rightarrow \varphi(\Gamma) \geq 0$
- Сжимаемость: $\|\varphi(\Gamma_1) - \varphi(\Gamma_2)\|_F \leq k \|\Gamma_1 - \Gamma_2\|_F$, $k \in [0, 1)$

## Меры сознательности

См. [Самонаблюдение](/docs/core/consciousness/self-observation) для полного описания.

**[Интеграция $\Phi$](/docs/core/structure/dimension-u#мера-интеграции-φ):**
$$
\Phi(\Gamma) := \frac{\sum_{i \neq j} |\gamma_{ij}|^2}{\sum_i \gamma_{ii}^2} \in [0, +\infty)
$$

**[Дифференциация $D_{\text{diff}}$](/docs/core/consciousness/self-observation#мера-сознательности-c):**
$$
D_{\text{diff}}(\Gamma) := \exp(S_{vN}(\rho_E)) \in [1, 7]
$$

где $S_{vN}(\rho_E) = -\mathrm{Tr}(\rho_E \log \rho_E)$ — энтропия фон Неймана подматрицы опыта.

**Интерпретация:** $D_{\text{diff}}$ — «эффективное число состояний» опыта. Минимальное значение $D_{\min} = 2$ достигается при $\mathrm{rank}(\rho_E) = 2$ с равными собственными значениями.

**[Рефлексия $R$](/docs/core/consciousness/self-observation#мера-рефлексии-r):**
$$
R(\Gamma) := 1 - \frac{\|\Gamma - \varphi(\Gamma)\|_F^2}{\|\Gamma\|_F^2} \in [0, 1]
$$

## Мера сознательности

**Определение ([Мера сознательности $C$](/docs/core/consciousness/self-observation#мера-сознательности-c)):**

$$
C(\Gamma) := \Phi(\Gamma) \times D_{\text{diff}}(\Gamma) \times R(\Gamma) \in [0, +\infty)
$$

**Интерпретация:**
- $C = 0$ — система не удовлетворяет условиям L2
- $C \gg 1$ — высокая сознательность

## Иерархия интериорности

**Определение (Уровни интериорности):**

См. [Иерархия интериорности](/docs/proofs/interiority-hierarchy) для полных определений и доказательств.

| Уровень | Обозначение | Условие |
|---------|-------------|---------|
| L0 | $\mathrm{Int}(S)$ — Интериорность | $\Gamma \neq I/7$ (наличие «внутреннего») |
| L1 | $\mathrm{PG}(S)$ — Феноменальная геометрия | $(\mathbb{P}(\mathcal{H}_E), d_{\mathrm{FS}}, \rho_E)$, где $\Phi > 0$ |
| L2 | Когнитивные квалиа | $R \geq R_{\text{th}}$, $\Phi \geq \Phi_{\text{th}}$ |

:::info Выведенные пороги
Значения $R_{\text{th}} = 1/3$, $\Phi_{\text{th}} = 1$ **выведены** из структуры теории:
- $R_{\text{th}} = 1/3$ — минимальная точность самомодели для различения «себя» от случайного состояния
- $\Phi_{\text{th}} = 1$ — баланс когерентностей и диагонали

**См.:** [Теорема о порогах L2](/docs/core/foundations/axiom-septicity#пороги-l2-геометрическая-мотивация)
:::

## Жизнеспособность

**Определение (Жизнеспособность):**

См. [Жизнеспособность](/docs/core/dynamics/viability) для полного описания.

$$
\mathrm{Viable}(\mathbb{H}) := P(\Gamma) > P_{\text{critical}} \land \frac{dP}{dt} > -\varepsilon_{\text{death}}
$$

где:
- $P_{\text{crit}} = 2/7 \approx 0.286$ — [геометрический критерий](/docs/core/foundations/axiom-septicity#критическая-чистота-геометрический-критерий)
- $\varepsilon_{\text{death}} = 0.01 \cdot P_{\text{crit}} / \tau_{\text{char}}$ — порог скорости распада
- $\tau_{\text{char}}$ — характерное время системы (единица измерения динамики)

**Определение (Характерное время $\tau_{\text{char}}$):**

Характерное время системы — масштаб времени, на котором изменения $\Gamma$ значимы:

$$
\tau_{\text{char}} := \frac{1}{\|\mathcal{L}\|_{\text{op}}}
$$

где $\mathcal{L}$ — эффективный супероператор динамики, $\|\cdot\|_{\text{op}}$ — операторная норма.

**Практическая оценка:** В отсутствие явного $\mathcal{L}$, $\tau_{\text{char}}$ оценивается по характерному масштабу системы:

| Система | $\tau_{\text{char}}$ | Обоснование |
|---------|---------------------|-------------|
| Клетка | $\sim 1$ с | Период метаболического цикла |
| Нейрон | $\sim 10$ мс | Постоянная времени мембраны |
| Организм | $\sim 1$ день | Циркадный ритм |
| Социальная система | $\sim 1$ год | Период обновления |

## Область жизнеспособности

**Определение (Область жизнеспособности $\mathcal{V}$):**

$$
\mathcal{V} := \{\Gamma \in \mathcal{L}(\mathcal{H}) : \mathrm{Viable}(\Gamma)\}
$$

**Топология:**
- $\mathcal{V} \subset \mathcal{L}(\mathcal{H})$ — открытое множество
- $\partial\mathcal{V} = \{\Gamma : P(\Gamma) = P_{\text{critical}}\}$ — граница
- $\mathrm{int}(\mathcal{V}) = \{\Gamma : P(\Gamma) > P_{\text{critical}}\}$ — внутренность

## Тензор напряжений

**Определение (Тензор напряжений):**

$$
\sigma_{\mathrm{sys}}(\Gamma) := [\sigma_A, \sigma_S, \sigma_D, \sigma_L, \sigma_E, \sigma_O, \sigma_U]^T \in \mathbb{R}^7
$$

| Компонент | Формула | Интерпретация |
|-----------|---------|---------------|
| $\sigma_A$ | $I_{\mathrm{env}} / \theta_A$ | Нагрузка на артикуляцию |
| $\sigma_S$ | $I_{\mathrm{struct}} / \theta_S$ | Структурная сложность |
| $\sigma_D$ | $C_{\mathrm{used}} / C_{\mathrm{max}}$ | Вычислительная нагрузка |
| $\sigma_L$ | $I_{\mathrm{verify}} / \theta_L$ | Логическая неопределённость |
| $\sigma_E$ | $(I_{\mathrm{self}} + I_{\mathrm{exp}}) / \theta_E$ | Нагрузка на опыт |
| $\sigma_O$ | $(I_{\mathrm{mem}} + I_{\mathrm{ground}}) / \theta_O$ | Нагрузка на основание |
| $\sigma_U$ | $(I_{\mathrm{unity}} + I_{\mathrm{social}}) / \theta_U$ | Нагрузка на единство |

где $\theta_i > 0$ — пороги для каждого измерения.

:::warning Статус: Эмпирические параметры
Значения порогов $\theta_i$ определяются для конкретных систем эмпирически или через калибровку. Типичные значения для биологических систем (предварительные оценки):

| Порог | Значение | Интерпретация |
|-------|----------|---------------|
| $\theta_A$ | $\sim 10^3$ бит/с | Пропускная способность сенсоров |
| $\theta_S$ | $\sim 10^6$ | Количество стабильных паттернов |
| $\theta_D$ | $\sim 10^9$ оп/с | Вычислительная мощность |
| $\theta_L$ | $\sim 10^2$ бит | Логическая сложность |
| $\theta_E$ | $\sim 10^4$ | Ёмкость опыта |
| $\theta_O$ | $\sim 10^3$ | Ёмкость памяти |
| $\theta_U$ | $\sim 10^2$ | Число связей |

**Эти значения требуют экспериментальной проверки.**
:::

## Эквивалентность условий

$$
\mathrm{Viable}(\Gamma) \Leftrightarrow P(\Gamma) > P_{\text{critical}} \Leftrightarrow \|\sigma_{\mathrm{sys}}(\Gamma)\|_\infty < 1
$$

## Композиция Голономов

**Определение (Тензорное произведение Голономов):**

Для Голономов $\mathbb{H}_1 = \langle \Gamma_1, \mathcal{H}_1, H_1, \{L_{1k}\}, E_1, \varphi_1 \rangle$ и $\mathbb{H}_2$:

$$
\mathbb{H}_1 \otimes \mathbb{H}_2 := \langle \Gamma_{12}, \mathcal{H}_{12}, H_{12}, \{L_{12k}\}, E_{12}, \varphi_{12} \rangle
$$

где:
- $\Gamma_{12} = \Gamma_1 \otimes \Gamma_2 + \Gamma_{\text{int}}$ (взаимодействие)
- $\mathcal{H}_{12} = \mathcal{H}_1 \otimes \mathcal{H}_2$
- $H_{12} = H_1 \otimes I_2 + I_1 \otimes H_2 + H_{\text{coupling}}$
- $\varphi_{12}$ — коллективная рефлексия

**Определение (Мета-Голоном):**

$$
\mathbb{H}_{1 \otimes \ldots \otimes n} := \mathrm{compose}(\mathbb{H}_1, \ldots, \mathbb{H}_n) = \bigotimes_{i=1}^n \mathbb{H}_i / \sim
$$

где $\sim$ — отношение эквивалентности, отождествляющее общие подсистемы.

## Целевое состояние

**Определение (Целевое состояние $\Gamma_{\text{target}}$):**

$$
\Gamma_{\text{target}} := \arg\min_{\Gamma' \in \mathcal{V}} D_{\text{KL}}(\Gamma' \| \Gamma_{\text{eq}})
$$

где $\Gamma_{\text{eq}}$ — равновесное состояние, минимизирующее свободную энергию.

:::warning Статус определения
Точный алгоритм вычисления $\Gamma_{\text{target}}$ — **открытая проблема**. В реализациях используется аппроксимация через локальные аттракторы.
:::

---

**Связанные документы:**
- [Аксиоматика](./axiomatics) — основания КК
- [Теоремы](./theorems) — формальные результаты КК
- [Голоном](/docs/core/structure/holon) — определение $\mathbb{H}$
- [Матрица когерентности](/docs/core/dynamics/coherence-matrix) — определение $\Gamma$
- [Жизнеспособность](/docs/core/dynamics/viability) — мера $P$ и $P_{\text{critical}}$
- [Самонаблюдение](/docs/core/consciousness/self-observation) — меры $R$, $\Phi$, $D_{\text{diff}}$, $C$
- [Иерархия интериорности](/docs/proofs/interiority-hierarchy) — уровни L0→L1→L2
- [Категорный формализм](/docs/proofs/categorical-formalism) — функтор $F$, категория $\mathbf{Exp}$
- [Формализация оператора φ](/docs/proofs/formalization-phi) — CPTP-каналы
