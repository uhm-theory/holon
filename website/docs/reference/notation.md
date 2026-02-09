---
sidebar_position: 2
title: Нотация
description: Математические обозначения теории УГМ
---

# Математическая Нотация

:::warning Потенциальные конфликты нотации
В теории УГМ некоторые символы имеют несколько значений в зависимости от контекста:
- $D$ — [измерение Динамики](/docs/core/structure/dimension-d) **vs** $D_{\text{diff}}$ — [мера дифференциации](/docs/core/consciousness/self-observation#мера-сознательности-c)
- $\mathcal{H}$ — гильбертово пространство **vs** $H$ — гамильтониан
- $\Phi$ — [мера интеграции](/docs/core/structure/dimension-u#мера-интеграции-φ). Для обозначения произвольных CPTP-каналов используется $\Psi$
- $R$ — [мера рефлексии](/docs/core/consciousness/self-observation#мера-рефлексии-r) **vs** $\mathcal{R}$ — регенеративный член
- $\mathcal{C}$ — пространство контекстов **vs** $C$ — [мера сознательности](/docs/core/consciousness/self-observation#мера-сознательности-c)

Контекст обычно делает значение однозначным.
:::

:::info Связь с IIT (Integrated Information Theory)
Мера интеграции $\Phi$ в УГМ **отличается** от $\Phi$ в теории Тонони (IIT):

| Параметр | УГМ | IIT |
|----------|-----|-----|
| **Определение** | $\Phi_{\text{UHM}} = \sum_{i \neq j} \|\gamma_{ij}\|^2 / \sum_i \gamma_{ii}^2$ | $\Phi_{\text{IIT}}$ = минимум взаимной информации при партициях |
| **Интерпретация** | Когерентность между измерениями | Интегрированная информация |
| **Вычислительная сложность** | $O(n^2)$ | NP-трудно |

УГМ обобщает IIT: мера сознательности $C = \Phi \times D_{\text{diff}} \times R$ включает интеграцию $\Phi$, дифференциацию $D_{\text{diff}}$ и рефлексию $R$.
:::

## Основные символы

| Символ | Значение | Определение |
|--------|----------|-------------|
| $\Gamma$ | [Матрица когерентности](/docs/core/dynamics/coherence-matrix) | $\Gamma \in \mathcal{L}(\mathcal{H})$, $\Gamma^\dagger = \Gamma$, $\Gamma \geq 0$, $\mathrm{Tr}(\Gamma) = 1$ |
| $\mathbb{H}$ | [Голоном](/docs/core/structure/holon) | Минимальная самодостаточная единица реальности |
| $\mathcal{H}$ | Гильбертово пространство | $\mathcal{H} = \mathbb{C}^7$ — см. [Семь измерений](/docs/core/structure/dimensions) |
| $P$ | [Чистота](/docs/core/dynamics/viability#определение-чистоты) | $P = \mathrm{Tr}(\Gamma^2) \in [1/7, 1]$ |
| $S_{vN}$ | Энтропия фон Неймана | $S_{vN} = -\mathrm{Tr}(\Gamma \log \Gamma) \in [0, \log 7]$ |

## Измерения

Семь базисных состояний [пространства $\mathcal{H}$](/docs/core/structure/dimensions):

| Символ | Измерение | Связанная структура | Подробнее |
|--------|-----------|---------------------|-----------|
| $A$ | Артикуляция | Проекторы, измерения | [→](/docs/core/structure/dimension-a) |
| $S$ | Структура | Гамильтониан $H$ | [→](/docs/core/structure/dimension-s) |
| $D$ | Динамика | Унитарная эволюция $U(t)$ | [→](/docs/core/structure/dimension-d) |
| $L$ | Логика | Алгебра операторов | [→](/docs/core/structure/dimension-l) |
| $E$ | Опыт | Матрица плотности $\rho_E$ | [→](/docs/core/structure/dimension-e) |
| $O$ | Основание | Вакуумное состояние $\vert 0\rangle$ | [→](/docs/core/structure/dimension-o) |
| $U$ | Единство | Операция следа $\mathrm{Tr}$ | [→](/docs/core/structure/dimension-u) |

## Базис пространства состояний

$$
\mathcal{H} = \mathrm{span}\{|A\rangle, |S\rangle, |D\rangle, |L\rangle, |E\rangle, |O\rangle, |U\rangle\} = \mathbb{C}^7
$$

Ортонормированность: $\langle i|j\rangle = \delta_{ij}$ для $i, j \in \{A, S, D, L, E, O, U\}$.

## Уравнение эволюции

Полное [уравнение эволюции](/docs/core/dynamics/evolution):

$$
\frac{d\Gamma}{dt} = -i[H, \Gamma] + \mathcal{D}[\Gamma] + \mathcal{R}[\Gamma, E]
$$

где:

**[Унитарный член](/docs/core/dynamics/evolution#1-унитарный-член):**
$$
-i[H, \Gamma] = -i(H\Gamma - \Gamma H)
$$

**[Диссипативный член](/docs/core/dynamics/evolution#2-диссипативный-член):**
$$
\mathcal{D}[\Gamma] = \sum_k \gamma_k \left( L_k \Gamma L_k^\dagger - \frac{1}{2}\{L_k^\dagger L_k, \Gamma\} \right)
$$

**[Регенеративный член](/docs/core/dynamics/evolution#3-регенеративный-член):**
$$
\mathcal{R}[\Gamma, E] = \kappa(\Gamma) \cdot (\Gamma_{\text{target}} - \Gamma) \cdot \Theta(\Delta F)
$$

где:
- $\kappa(\Gamma) \geq 0$ — скорость регенерации (зависит от состояния)
- $\Gamma_{\text{target}}$ — целевое состояние (аттрактор)
- $\Delta F$ — изменение свободной энергии
- $\Theta$ — [функция Хевисайда](#специальные-обозначения)

## Коммутаторы и антикоммутаторы

| Обозначение | Определение |
|-------------|-------------|
| $[A, B]$ | $AB - BA$ (коммутатор) |
| $\{A, B\}$ | $AB + BA$ (антикоммутатор) |

## Операторы опыта (измерение E)

См. [Измерение Опыта](/docs/core/structure/dimension-e) и [Категория Exp](/docs/proofs/categorical-formalism#2-категория-exp).

| Обозначение | Значение |
|-------------|----------|
| $\rho_E$ | Редуцированная матрица плотности измерения Опыта |
| $\lambda_i$ | Собственное значение $\Gamma$ (интенсивность) |
| $\vert q_i\rangle$ | Собственный вектор $\Gamma$ (качество) |
| $[\vert q\rangle]$ | Класс эквивалентности в $\mathbb{P}(\mathcal{H}_E)$ |
| $\mathbb{P}(\mathcal{H}_E)$ | [Проективное пространство](/docs/formal/specification#проективное-пространство-качеств) качеств |
| $d_{\mathrm{FS}}$ | [Метрика Фубини-Штуди](/docs/formal/specification#метрика-фубини-штуди) |

**Метрика Фубини-Штуди:**
$$
d_{\mathrm{FS}}([|\psi\rangle], [|\phi\rangle]) = \arccos(|\langle\psi|\phi\rangle|) \in [0, \pi/2]
$$

## Меры сознательности

См. [Самонаблюдение](/docs/core/consciousness/self-observation) для полных определений.

| Мера | Формула | Диапазон |
|------|---------|----------|
| [Интеграция $\Phi$](/docs/core/structure/dimension-u#мера-интеграции-φ) | $\Phi(\Gamma) = \dfrac{\sum_{i \neq j} |\gamma_{ij}|^2}{\sum_i \gamma_{ii}^2}$ | $[0, +\infty)$ |
| [Дифференциация $D_{\text{diff}}$](/docs/core/consciousness/self-observation#мера-сознательности-c) | $D_{\text{diff}}(\Gamma) = \exp(S_{vN}(\rho_E))$ | $[1, 7]$ |
| [Рефлексия $R$](/docs/core/consciousness/self-observation#мера-рефлексии-r) | $R(\Gamma) = 1 - \dfrac{\|\Gamma - \varphi(\Gamma)\|_F^2}{\|\Gamma\|_F^2}$ | $[0, 1]$ |
| [Сознательность $C$](/docs/core/consciousness/self-observation#мера-сознательности-c) | $C(\Gamma) = \Phi \times D_{\text{diff}} \times R$ | $[0, +\infty)$ |

## Оператор самомоделирования

См. [Формализация оператора φ](/docs/proofs/formalization-phi) для полного описания.

**CPTP-канал** (Completely Positive Trace-Preserving):
$$
\varphi(\Gamma) = \sum_m K_m \Gamma K_m^\dagger
$$

**Условие полноты** (сохранение следа):
$$
\sum_m K_m^\dagger K_m = I
$$

**Сходимость к неподвижной точке** $\Gamma^* = \varphi(\Gamma^*)$:
$$
\|\varphi^n(\Gamma_0) - \Gamma^*\|_F \leq k^n \cdot \|\Gamma_0 - \Gamma^*\|_F, \quad k \in [0, 1)
$$

## Иерархия интериорности

См. [Иерархия интериорности](/docs/proofs/interiority-hierarchy) для формальных условий и доказательств.

| Уровень | Обозначение | Условие |
|---------|-------------|---------|
| L0 | $\mathrm{Int}(S)$ — Интериорность | $\Gamma \neq I/7$ (не максимально смешанное) |
| L1 | $\mathrm{PG}(S)$ — Феноменальная геометрия | $\Phi(\Gamma) > 0$ |
| L2 | Когнитивные квалиа | $R \geq R_{\text{th}}$ и $\Phi \geq \Phi_{\text{th}}$ |

**Пороговые значения** ([геометрическая мотивация](/docs/core/foundations/axiom-septicity#пороги-l2-геометрическая-мотивация)):

| Порог | Значение | Статус |
|-------|----------|--------|
| $R_{\text{th}}$ | $1/3$ | Геометрическая мотивация |
| $\Phi_{\text{th}}$ | $1$ | Геометрическая мотивация |

## Тензор напряжений

См. [Жизнеспособность](/docs/core/dynamics/viability) для полного описания.

$$
\sigma_{\mathrm{sys}}(\Gamma) = [\sigma_A, \sigma_S, \sigma_D, \sigma_L, \sigma_E, \sigma_O, \sigma_U]^T \in \mathbb{R}^7
$$

**Условие жизнеспособности:**
$$
\|\sigma_{\mathrm{sys}}(\Gamma)\|_\infty < 1
$$

**Запас жизнеспособности:**
$$
\mathrm{margin}(\Gamma) = 1 - \|\sigma_{\mathrm{sys}}(\Gamma)\|_\infty > 0
$$

## Специальные обозначения

| Обозначение | Значение |
|-------------|----------|
| $\|\cdot\|_F$ | Норма Фробениуса: $\|A\|_F = \sqrt{\mathrm{Tr}(A^\dagger A)} = \sqrt{\sum_{ij} |a_{ij}|^2}$ |
| $\|\cdot\|_\infty$ | Супремум-норма: $\|x\|_\infty = \max_i |x_i|$ |
| $\Theta(\cdot)$ | Функция Хевисайда |
| $\delta_{ij}$ | Символ Кронекера |
| $\mathrm{Tr}(\cdot)$ | След матрицы |
| $A^\dagger$ | Эрмитово сопряжение |

## Категорная нотация

См. [Категорный формализм](/docs/proofs/categorical-formalism) для полного описания.

| Обозначение | Значение |
|-------------|----------|
| $\mathbf{DensityMat}$ | [Категория матриц плотности](/docs/proofs/categorical-formalism#1-категория-densitymat) |
| $\mathbf{Exp}$ | [Категория экспериенциальных состояний](/docs/proofs/categorical-formalism#2-категория-exp) |
| $\mathbf{Hol}$ | Категория Голономов |
| $F: \mathbf{DensityMat} \to \mathbf{Exp}$ | [Функтор опыта](/docs/proofs/categorical-formalism#3-функтор-f-на-объектах) |
| $\mathrm{CPTP}$ | Completely Positive Trace-Preserving каналы |
| $\mathrm{Mor}(\rho_1, \rho_2)$ | Морфизмы между объектами |
| $\otimes$ | Тензорное произведение (композиция Голономов) |

## Нотация Кибернетики Когерентности

См. [Кибернетика Когерентности](/docs/applied/coherence-cybernetics/definitions) для полного описания.

| Обозначение | Значение |
|-------------|----------|
| $\mathcal{V}$ | [Область жизнеспособности](/docs/core/dynamics/viability) |
| $\mathrm{VIT}$ | Тензор целостности жизнеспособности (Viability Integrity Tensor) |
| $\kappa(\Gamma)$ | Скорость регенерации (функция состояния) |
| $\kappa_0$ | Базовая скорость регенерации |
| $\mathrm{Coh}_E$ | $E$-когерентность |
| $P_{\text{critical}}$ | Критическая чистота $= 2/7 \approx 0.286$ — [теорема](/docs/core/foundations/axiom-septicity#критическая-чистота-геометрический-критерий) |
| $\theta_i$ | Пороги компонент стресса |
| $D_{\mathrm{KL}}$ | Расхождение Кульбака-Лейблера: $D_{\mathrm{KL}}(p \| q) = \sum_i p_i \log(p_i / q_i)$ |

---

**Связанные документы:**
- [Глоссарий](./glossary) — определения терминов
- [Математический аппарат](/docs/formal/specification) — формальные определения
- [Вычислительная реализация](/docs/formal/computational) — Python-код
- [Матрица когерентности](/docs/core/dynamics/coherence-matrix) — определение $\Gamma$
- [Эволюция](/docs/core/dynamics/evolution) — уравнение $d\Gamma/dt$
- [Жизнеспособность](/docs/core/dynamics/viability) — мера $P$ и $P_{\text{critical}}$
- [Самонаблюдение](/docs/core/consciousness/self-observation) — меры $R$, $\Phi$, $D_{\text{diff}}$, $C$
- [Иерархия интериорности](/docs/proofs/interiority-hierarchy) — уровни L0→L1→L2
- [Категорный формализм](/docs/proofs/categorical-formalism) — функтор $F$
- [Формализация оператора φ](/docs/proofs/formalization-phi) — CPTP-каналы
