---
sidebar_position: 1
title: Математический аппарат
description: Формальная математическая спецификация УГМ
---

# Математический Аппарат

:::note О нотации
В этом документе:
- $\mathcal{H}$ — гильбертово пространство. Не путать с $H$ — гамильтонианом.
- $\mathcal{C}$ — пространство контекстов. Не путать с $C$ — [мерой сознательности](/docs/core/consciousness/self-observation#мера-сознательности-c).
- $\mathcal{R}[\Gamma, E]$ — регенеративный член уравнения эволюции. Не путать с $R$ — [мерой рефлексии](/docs/core/consciousness/self-observation#мера-рефлексии-r).
- $N = 7$ — размерность пространства состояний [Голонома](/docs/core/structure/holon).
:::

## Пространство состояний

Пространство состояний [Голонома](/docs/core/structure/holon) — 7-мерное комплексное гильбертово пространство (см. [Семь измерений](/docs/core/structure/dimensions)):

$$
\mathcal{H} = \mathbb{C}^7 = \mathrm{span}\{|A\rangle, |S\rangle, |D\rangle, |L\rangle, |E\rangle, |O\rangle, |U\rangle\}
$$

## Матрица когерентности

См. [Матрица когерентности](/docs/core/dynamics/coherence-matrix) для полного определения.

$$
\Gamma \in \mathcal{L}(\mathcal{H}) \quad \text{— линейный оператор на } \mathcal{H}
$$

где $\mathcal{L}(\mathcal{H})$ — пространство линейных операторов на $\mathcal{H}$.

$$
\Gamma = \Gamma^\dagger \quad \text{— эрмитов}
$$

$$
\Gamma \geq 0 \quad \text{— положительно полуопределён}
$$

$$
\mathrm{Tr}(\Gamma) = 1 \quad \text{— нормирован}
$$

### Матричная форма

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

## Гамильтониан

См. [Эволюция: Унитарный член](/docs/core/dynamics/evolution#1-унитарный-член).

$$
H = \sum_{i=1}^{N} \omega_i |i\rangle\langle i| + \sum_{i \neq j} J_{ij} |i\rangle\langle j|
$$

где:
- $\omega_i$ — собственные частоты измерений
- $J_{ij}$ — коэффициенты связи между измерениями
- $N = 7$ — число измерений

## Уравнение эволюции

См. [Эволюция](/docs/core/dynamics/evolution) для полного описания.

$$
\frac{d\Gamma}{dt} = -i[H, \Gamma] + \underbrace{\sum_k \gamma_k \left( L_k \Gamma L_k^\dagger - \frac{1}{2}\{L_k^\dagger L_k, \Gamma\} \right)}_{\mathcal{D}[\Gamma]} + \mathcal{R}[\Gamma, E]
$$

где:
- $-i[H, \Gamma]$ — унитарная (гамильтонова) эволюция
- $\mathcal{D}[\Gamma]$ — диссипативный член ([декогеренция](/docs/core/dynamics/evolution#2-диссипативный-член))
- $\mathcal{R}[\Gamma, E]$ — [регенеративный член](/docs/core/dynamics/evolution#3-регенеративный-член)
- $L_k$ — операторы Линдблада
- $\gamma_k \geq 0$ — скорости декогеренции

## Мера жизнеспособности (Чистота)

См. [Жизнеспособность](/docs/core/dynamics/viability) для полного описания.

$$
P = \mathrm{Tr}(\Gamma^2) \in \left[\frac{1}{N}, 1\right] = \left[\frac{1}{7}, 1\right]
$$

- $P = 1$: чистое состояние ($\Gamma = |\psi\rangle\langle\psi|$)
- $P = 1/N = 1/7$: [максимально смешанное состояние](/docs/core/dynamics/coherence-matrix#максимально-смешанное-состояние) ($\Gamma = I_N/N$)

### Условие жизнеспособности

[Голоном](/docs/core/structure/holon) жизнеспособен, если:

$$
P > P_{\text{critical}} \approx 0.3
$$

При $P < P_{\text{critical}}$ система входит в необратимый распад (см. [условие смерти](/docs/core/dynamics/viability#условие-смерти)).

## Экспериенциальное пространство

См. [Категорный формализм](/docs/proofs/categorical-formalism#2-категория-exp) для полного описания.

### Проективное пространство качеств

$$
\mathbb{P}(\mathcal{H}_E) := (\mathcal{H}_E \setminus \{0\}) / {\sim}
$$

где $|\psi\rangle \sim |\varphi\rangle \Leftrightarrow \exists c \in \mathbb{C}^*: |\psi\rangle = c|\varphi\rangle$.

Для $\mathcal{H}_E = \mathbb{C}^N$: $\dim_\mathbb{C}(\mathbb{P}(\mathbb{C}^N)) = N - 1$.

**Топология:**
- $\mathbb{P}(\mathbb{C}^N)$ компактно и связно
- $\mathbb{P}(\mathbb{C}^N) \cong S^{2N-1} / S^1$

### Метрика Фубини-Штуди

**Определение:**
$$
d_{\mathrm{FS}}([|\psi\rangle], [|\varphi\rangle]) := \arccos(|\langle\psi|\varphi\rangle|) \in [0, \pi/2]
$$

**Свойства:**
- $d_{\mathrm{FS}} = 0 \Leftrightarrow |\psi\rangle = e^{i\theta}|\varphi\rangle$
- $d_{\mathrm{FS}} = \pi/2 \Leftrightarrow \langle\psi|\varphi\rangle = 0$
- $d_{\mathrm{FS}}$ — риманова метрика на $\mathbb{P}(\mathcal{H}_E)$

**Инфинитезимальная форма:**
$$
ds^2 = \langle d\psi|d\psi\rangle - |\langle\psi|d\psi\rangle|^2
$$

### Полное экспериенциальное пространство

$$
\mathcal{E} := \Delta^{N-1} \times_{\mathrm{Spec}} \mathbb{P}(\mathcal{H}_E)^N \times \mathcal{C} \times \mathrm{Hist}
$$

где:
- $\Delta^{N-1} = \{(\lambda_1, \ldots, \lambda_N) : \lambda_i \geq 0, \sum \lambda_i = 1\}$ — $(N-1)$-симплекс интенсивностей
- $\mathbb{P}(\mathcal{H}_E)^N$ — $N$ копий проективного пространства (качества)
- $\mathcal{C}$ — пространство контекстов (состояния измерений кроме [E](/docs/core/structure/dimension-e))
- $\mathrm{Hist}$ — пространство историй (траекторий)
- $\times_{\mathrm{Spec}}$ — расслоённое произведение над спектром

### Полная метрика на $\mathcal{E}$

$$
d_{\mathcal{E}}(\mathcal{Q}_1, \mathcal{Q}_2) := \sqrt{d_\Delta(\lambda_1, \lambda_2)^2 + \alpha \sum_i d_{\mathrm{FS}}([q_1^{(i)}], [q_2^{(i)}])^2 + \beta \cdot d_{\mathcal{C}}(c_1, c_2)^2 + \gamma \cdot d_{\mathrm{Hist}}(h_1, h_2)^2}
$$

где $\alpha, \beta, \gamma > 0$ — весовые коэффициенты.

## Категорный формализм

См. [Категорный формализм](/docs/proofs/categorical-formalism) для полного описания и доказательств.

### Категория матриц плотности

**Определение (DensityMat):**

$$
\mathbf{DensityMat} := (\mathrm{Ob}, \mathrm{Mor})
$$

$$
\mathrm{Ob}(\mathbf{DensityMat}) = \{\rho \in \mathcal{L}(\mathcal{H}) : \rho^\dagger = \rho, \rho \geq 0, \mathrm{Tr}(\rho) = 1\}
$$

$$
\mathrm{Mor}_{\mathbf{DM}}(\rho_1, \rho_2) = \{\Phi : \mathcal{L}(\mathcal{H}) \to \mathcal{L}(\mathcal{H}) \mid \Phi \text{ — CPTP}, \Phi(\rho_1) = \rho_2\}
$$

**Представление Крауса:** $\Phi$ — CPTP $\Leftrightarrow \exists\{K_i\}: \Phi(\rho) = \sum_i K_i \rho K_i^\dagger$, $\sum_i K_i^\dagger K_i = I$

См. [Формализация оператора φ](/docs/proofs/formalization-phi) для деталей CPTP-каналов.

### Функтор опыта

**Определение F на объектах:**
$$
F: \mathrm{Ob}(\mathbf{DensityMat}) \to \mathrm{Ob}(\mathbf{Exp})
$$

$$
F(\rho) := (\mathrm{Spectrum}(\rho_E), \mathrm{Quality}(\rho_E), \mathrm{Context}(\Gamma_{-E}), \mathrm{History}(t))
$$

**[Теорема (Функториальность)](/docs/proofs/categorical-formalism#5-доказательство-функториальности):** $F$ — функтор.

*Доказательство:*
1. $F(\mathrm{id}_\rho) = \mathrm{id}_{F(\rho)}$ ✓
2. $F(\Psi \circ \Phi) = F(\Psi) \circ F(\Phi)$ ✓

### Теорема о невозможности спектрального функтора

:::warning [Теорема](/docs/applied/coherence-cybernetics/model-theory#теорема-невозможность-спектрального-функтора)
Не существует функтора $F: \mathbf{DensityMat} \to \mathbf{Exp}$, факторизующегося *только* через спектр.
:::

**Доказательство:**
1. Пусть $F = G \circ \mathrm{Spec}$, где $\mathrm{Spec}: \rho \mapsto \mathrm{Spectrum}(\rho)$
2. Рассмотрим изоспектральные $\rho_1 \neq \rho_2$
3. Тогда $F(\rho_1) = F(\rho_2)$
4. Но $\rho_1$ и $\rho_2$ могут описывать различимые опыты
5. Противоречие ∎

**Следствие:** Полный функтор $F$ должен учитывать собственные векторы, контекст и историю.

## Меры сознательности

### Мера рефлексии

См. [Самонаблюдение: Мера рефлексии R](/docs/core/consciousness/self-observation#мера-рефлексии-r).

$$
R(\Gamma) := 1 - \frac{\|\Gamma - \varphi(\Gamma)\|_F^2}{\|\Gamma\|_F^2} \in [0, 1]
$$

где $\varphi$ — [оператор самомоделирования](/docs/proofs/formalization-phi), $\|\cdot\|_F$ — норма Фробениуса.

### Мера интеграции

См. [Измерение Единства: Мера интеграции Φ](/docs/core/structure/dimension-u#мера-интеграции-φ).

$$
\Phi(\Gamma) := \frac{\sum_{i \neq j} |\gamma_{ij}|^2}{\sum_i \gamma_{ii}^2}
$$

### Мера дифференциации

$$
D_{\text{diff}}(\Gamma) := \mathrm{rank}(\rho_E)
$$

### Мера сознательности

См. [Самонаблюдение: Мера сознательности C](/docs/core/consciousness/self-observation#мера-сознательности-c).

$$
C = \Phi \times D_{\text{diff}} \times R
$$

---

**Связанные документы:**
- [Голоном](/docs/core/structure/holon) — определение $\mathbb{H}$
- [Семь измерений](/docs/core/structure/dimensions) — базис $\mathcal{H}$
- [Матрица когерентности](/docs/core/dynamics/coherence-matrix) — определение $\Gamma$
- [Эволюция](/docs/core/dynamics/evolution) — динамика $d\Gamma/dt$
- [Жизнеспособность](/docs/core/dynamics/viability) — мера $P$ и $P_{\text{critical}}$
- [Самонаблюдение](/docs/core/consciousness/self-observation) — меры $R$, $C$, $D_{\text{diff}}$
- [Измерение Единства](/docs/core/structure/dimension-u) — мера $\Phi$
- [Формализация оператора φ](/docs/proofs/formalization-phi) — CPTP-каналы
- [Категорный формализм](/docs/proofs/categorical-formalism) — функтор $F$
- [Иерархия интериорности](/docs/proofs/interiority-hierarchy) — уровни L0→L1→L2
- [Вычислительная реализация](./computational) — Python-код
