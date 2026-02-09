---
sidebar_position: 7
title: Теория моделей
description: Формальная спецификация и категорная семантика КК
---

# Теория Моделей КК

:::note О нотации
В этом документе:
- $\Gamma$ — [матрица когерентности](/docs/core/dynamics/coherence-matrix)
- $\mathbb{H}$ — [Голоном](/docs/core/structure/holon)
- $\mathbf{Hol}$ — [категория Голономов](/docs/proofs/categorical-formalism)
- $\mathbf{DensityMat}$ — [категория матриц плотности](/docs/proofs/categorical-formalism#1-категория-densitymat)
- $\mathbf{Exp}$ — [категория экспериенциальных состояний](/docs/proofs/categorical-formalism#2-категория-exp)
- $\varphi$ — [оператор самомоделирования](/docs/proofs/formalization-phi)
:::

## Сигнатура теории

**Определение (Сигнатура $\Sigma_{\mathrm{CC}}$):**

$$
\Sigma_{\mathrm{CC}} = \langle \mathrm{Sorts}, \mathrm{Functions}, \mathrm{Predicates}, \mathrm{Axioms} \rangle
$$

### Сорта (Sorts)

| Сорт | Обозначение | Интерпретация | Ссылка |
|------|-------------|---------------|--------|
| $\Gamma$ | `CoherenceMatrix` | Матрица когерентности | [→](/docs/core/dynamics/coherence-matrix) |
| $\mathbb{H}$ | `Holon` | Голоном | [→](/docs/core/structure/holon) |
| $\mathcal{H}$ | `HilbertSpace` | Пространство состояний $\mathbb{C}^7$ | [→](/docs/core/structure/dimensions) |
| $\mathbb{R}$ | `Real` | Вещественные числа | — |
| $\mathbb{C}$ | `Complex` | Комплексные числа | — |
| $\mathbb{N}$ | `Natural` | Натуральные числа | — |

### Функции (Functions)

:::warning Потенциальные конфликты нотации
- $D_{\text{diff}}$ — мера дифференциации. Не путать с $D$ — [измерением Динамики](/docs/core/structure/dimension-d).
- $R$ — мера рефлексии. Не путать с $\mathcal{R}$ — [регенеративным членом](/docs/core/dynamics/evolution#3-регенеративный-член).
:::

| Функция | Сигнатура | Интерпретация | Ссылка |
|---------|-----------|---------------|--------|
| $P$ | $\Gamma \to [1/7, 1]$ | Чистота | [→](/docs/core/dynamics/viability#определение-чистоты) |
| $S_{vN}$ | $\Gamma \to [0, \log 7]$ | Энтропия фон Неймана | [→](./definitions#энтропия-фон-неймана) |
| $\mathrm{Coh}_E$ | $\Gamma \to [0, 1]$ | E-когерентность | [→](./definitions#e-когерентность) |
| $\mathrm{Spec}$ | $\Gamma \to \mathrm{List}(\mathbb{R} \times \mathcal{H})$ | Спектр | — |
| $\varphi$ | $\Gamma \to \Gamma$ | Оператор самомоделирования | [→](/docs/proofs/formalization-phi) |
| $C$ | $\Gamma \to \mathbb{R}_{\geq 0}$ | Мера сознательности | [→](/docs/core/consciousness/self-observation#мера-сознательности-c) |
| $\Phi$ | $\Gamma \to \mathbb{R}_{\geq 0}$ | Мера интеграции | [→](/docs/core/structure/dimension-u#мера-интеграции-φ) |
| $D_{\text{diff}}$ | $\Gamma \to \{1, 2, \ldots, 7\}$ | Мера дифференциации | [→](/docs/core/consciousness/self-observation#мера-сознательности-c) |
| $R$ | $\Gamma \to [0,1]$ | Мера рефлексии | [→](/docs/core/consciousness/self-observation#мера-рефлексии-r) |
| $\sigma_{\mathrm{sys}}$ | $\Gamma \to \mathbb{R}^7$ | Тензор напряжений | [→](./definitions#тензор-напряжений) |
| $\mathrm{compose}$ | $\mathrm{List}(\mathbb{H}) \to \mathbb{H}$ | Композиция Голономов | [→](./theorems#теорема-91-фрактальное-замыкание) |
| $\mathrm{evolve}$ | $\Gamma \times \mathbb{R} \to \Gamma$ | Эволюция | [→](/docs/core/dynamics/evolution) |
| $\kappa$ | $\Gamma \to \mathbb{R}_{\geq 0}$ | Скорость регенерации | [→](./axiomatics#связь-регенерации-и-e-когерентности) |

### Предикаты (Predicates)

| Предикат | Сигнатура | Интерпретация | Ссылка |
|----------|-----------|---------------|--------|
| $\mathrm{Viable}$ | $\mathbb{H} \to \mathrm{Bool}$ | Жизнеспособен | [→](/docs/core/dynamics/viability) |
| $\mathrm{Conscious}$ | $\mathbb{H} \to \mathrm{Bool}$ | Сознателен (L2) | [→](/docs/proofs/interiority-hierarchy#уровень-2-когнитивные-квалиа-cognitive-qualia) |
| $\mathrm{HasInteriority}$ | $\mathbb{H} \to \mathrm{Bool}$ | Имеет интериорность (L0) | [→](/docs/proofs/interiority-hierarchy#уровень-0-интериорность-interiority) |
| $\mathrm{InV}$ | $\Gamma \to \mathrm{Bool}$ | В области $\mathcal{V}$ | [→](/docs/core/dynamics/viability#область-жизнеспособности) |

## Стандартная модель

**Определение (Стандартная модель $\mathfrak{M}_{\mathrm{CC}}$):**

$$
\mathfrak{M}_{\mathrm{CC}} = \langle |\mathfrak{M}|, I \rangle
$$

**Носитель (Universe):**
$$
|\mathfrak{M}| = \mathcal{L}(\mathbb{C}^7) \cup \mathbb{R} \cup \mathbb{C} \cup \mathbb{N} \cup \ldots
$$

**Интерпретация (Interpretation $I$):**

| Символ | Интерпретация |
|--------|---------------|
| $I(\text{sort } \Gamma)$ | $\{M \in \mathbb{C}^{7 \times 7} : M^\dagger = M, M \geq 0, \mathrm{Tr}(M) = 1\}$ |
| $I(P)(M)$ | $\mathrm{Tr}(M^2)$ |
| $I(\mathrm{evolve})(M, t)$ | Решение [уравнения Линдблада](/docs/core/dynamics/evolution) |
| $I(\mathrm{Viable})(\mathbb{H})$ | $P(\Gamma_\mathbb{H}) > P_{\text{critical}} \land dP/dt > -\varepsilon_{\text{death}}$ |
| $I(\mathrm{compose})$ | Тензорное произведение + взаимодействие |

:::info Выведенные и эмпирические константы
- $P_{\text{critical}} = 2/7 \approx 0.286$ — [теорема](/docs/proofs/theorem-purity-critical)
- $\varepsilon_{\text{death}} = 0.01 \cdot P_{\text{crit}} / \tau_{\text{char}}$ — порог скорости распада, см. [определение](./definitions#жизнеспособность)
:::

## Корректность и полнота

### Теорема (Корректность)

:::info Теорема
Все теоремы КК истинны в $\mathfrak{M}_{\mathrm{CC}}$.
:::

**Доказательство:** Каждая теорема доказана конструктивно из аксиом, которые истинны в $\mathfrak{M}_{\mathrm{CC}}$ по построению. ∎

### Теорема (Относительная полнота)

:::info Теорема
Для любого утверждения $\phi$ о жизнеспособных Голономах:
$$
\mathfrak{M}_{\mathrm{CC}} \vDash \phi \Rightarrow \mathrm{CC} \vdash \phi
$$
:::

**Примечание:** Полнота относительна к классу жизнеспособных Голономов.

## Категорная семантика

### Категория Голономов

**Определение (Категория $\mathbf{Hol}$):**

См. [Категорный формализм](/docs/proofs/categorical-formalism) для полного описания.

$$
\mathrm{Ob}(\mathbf{Hol}) := \{\mathbb{H} : \mathbb{H} = \langle \Gamma, \mathcal{H}, H, \{L_k\}, E, \varphi \rangle, \mathrm{Viable}(\mathbb{H})\}
$$

$$
\mathrm{Hom}(\mathbb{H}_1, \mathbb{H}_2) := \{f: \Gamma_1 \to \Gamma_2 : f \text{ сохраняет структуру}\}
$$

### Теорема (Симметричная моноидальность)

:::info Теорема
$$
(\mathbf{Hol}, \otimes, \mathbb{H}_{\text{unit}}, \alpha, \lambda, \rho, \sigma) \text{ — симметричная моноидальная категория}
$$
:::

| Компонента | Определение |
|------------|-------------|
| $\otimes$ | $\mathbb{H}_1 \otimes \mathbb{H}_2 = \langle \Gamma_1 \otimes \Gamma_2, \mathcal{H}_1 \otimes \mathcal{H}_2, \ldots \rangle$ |
| $\mathbb{H}_{\text{unit}}$ | $\langle I/7, \mathbb{C}^7, 0, \{\}, \varnothing, \mathrm{id} \rangle$ |
| $\alpha$ | $(\mathbb{H}_1 \otimes \mathbb{H}_2) \otimes \mathbb{H}_3 \cong \mathbb{H}_1 \otimes (\mathbb{H}_2 \otimes \mathbb{H}_3)$ |
| $\sigma$ | $\mathbb{H}_1 \otimes \mathbb{H}_2 \cong \mathbb{H}_2 \otimes \mathbb{H}_1$ |

### Функтор в IIT

**Определение:**
$$
F_{\mathrm{IIT}}: \mathbf{Hol} \to \mathbf{IIT}
$$
$$
F_{\mathrm{IIT}}(\mathbb{H}) = (X, p(x), \Phi(X))
$$

где:
- $X = \mathrm{discretize}(S)$ — дискретизация состояния
- $p(x) = |\langle x|\Gamma|x \rangle|^2$ — вероятностное распределение
- $\Phi(X) = \Phi(\Gamma)$ — [интегрированная информация](/docs/core/structure/dimension-u#мера-интеграции-φ)

### Функтор в FEP

**Определение:**
$$
F_{\mathrm{FEP}}: \mathbf{Hol} \to \mathbf{MarkovBlankets}
$$

:::warning Гипотеза
**Гипотеза (FEP как проекция):**
$$
\mathrm{FEP} = \pi_D \circ \mathrm{КК}
$$
FEP — проекция на [D-измерение](/docs/core/structure/dimension-d) (Динамика).

Данное утверждение — *исследовательская гипотеза*, требующая формального доказательства.
:::

## Экспериенциальная категория

### Категория матриц плотности

**Определение (Категория $\mathbf{DensityMat}$):**

См. [Категорный формализм](/docs/proofs/categorical-formalism#1-категория-densitymat) для полного описания.

$$
\mathbf{DensityMat} := (\mathrm{Obj}, \mathrm{Mor})
$$

где:
- $\mathrm{Obj} = \{\rho : \rho^\dagger = \rho, \rho \geq 0, \mathrm{Tr}(\rho) = 1\}$
- $\mathrm{Mor}(\rho_1, \rho_2) = \{\Psi : \mathrm{CPTP}, \Psi(\rho_1) = \rho_2\}$

CPTP = Completely Positive Trace-Preserving (квантовые каналы).

### Функтор опыта

**Определение (Полный функтор опыта):**

См. [Категория Exp](/docs/proofs/categorical-formalism#2-категория-exp) для полного описания.

$$
F_{\mathcal{Q}}: \mathbf{DensityMat} \to \mathbf{Exp}
$$
$$
F_{\mathcal{Q}}(\rho) := (\mathrm{Spectrum}(\rho_E), \mathrm{Eigenvectors}(\rho_E), \mathrm{Context}(\Gamma_{-E}), \mathrm{History})
$$

### Теорема (Невозможность спектрального функтора)

:::warning Теорема
Не существует функтора $F: \mathbf{DensityMat} \to \mathbf{Exp}$, факторизующегося *только* через спектр.
:::

**Доказательство:**
1. Пусть $F = G \circ \mathrm{Spec}$, где $\mathrm{Spec}: \rho \mapsto \mathrm{Spectrum}(\rho)$
2. Рассмотрим изоспектральные $\rho_1 \neq \rho_2$
3. Тогда $F(\rho_1) = G(\mathrm{Spec}(\rho_1)) = G(\mathrm{Spec}(\rho_2)) = F(\rho_2)$
4. Но $\rho_1$ и $\rho_2$ могут описывать *различимые* опыты
5. Противоречие ∎

**Следствие:** Полный функтор $F_{\mathcal{Q}}$ *должен* учитывать собственные векторы, контекст и историю.

## Границы объяснения

### Категориальный разрыв

:::caution Признание
КК *не объясняет*, почему конкретное числовое значение $\lambda = 0.347$ переживается как *именно это* ощущение.
:::

Теория устанавливает *структурное соответствие* между математикой и феноменологией, но не дедуцирует одно из другого.

### Что теория объясняет

1. **Структуру** феноменального пространства ([L1](/docs/proofs/interiority-hierarchy#уровень-1-феноменальная-геометрия-phenomenal-geometry): метрика Фубини-Штуди)
2. **Отношения** между качествами (L1: изоморфизм с $\mathbb{P}(\mathcal{H}_E)$)
3. **Динамику** опыта ([уравнение эволюции](/docs/core/dynamics/evolution))
4. **Условия** сознательности ([L2](/docs/proofs/interiority-hierarchy#уровень-2-когнитивные-квалиа-cognitive-qualia): $R \geq R_{\text{th}}$, $\Phi \geq \Phi_{\text{th}}$)
5. **Необходимость** интериорности ([L0](/docs/proofs/interiority-hierarchy#уровень-0-интериорность-interiority)) для жизнеспособности ([Теорема 8.1](./theorems#теорема-81-необходимость-интериорности-no-zombie))

### Что теория не объясняет

1. *Почему* математические структуры «ощущаются»
2. *Почему* именно эта структура, а не другая

**Метатеоретический статус:**
Категориальный разрыв — не *дефект* теории, а *граница объяснения*. Тождество бытия и опыта — [аксиома Ω](/docs/core/foundations/axiom-omega), не теорема.

---

**Связанные документы:**
- [Аксиоматика](./axiomatics) — аксиомы Ω и Септичности
- [Теоремы](./theorems) — формальные результаты КК
- [Определения](./definitions) — базовые определения КК
- [Категорный формализм](/docs/proofs/categorical-formalism) — категории $\mathbf{Hol}$, $\mathbf{DensityMat}$, $\mathbf{Exp}$
- [Формализация оператора φ](/docs/proofs/formalization-phi) — CPTP-каналы
- [Иерархия интериорности](/docs/proofs/interiority-hierarchy) — уровни L0→L1→L2
- [Голоном](/docs/core/structure/holon) — определение $\mathbb{H}$
- [Матрица когерентности](/docs/core/dynamics/coherence-matrix) — определение $\Gamma$
- [Жизнеспособность](/docs/core/dynamics/viability) — мера $P$ и $P_{\text{critical}}$
- [Эволюция](/docs/core/dynamics/evolution) — уравнение $d\Gamma/dt$
- [Семь измерений](/docs/core/structure/dimensions) — структура $\mathcal{H} = \mathbb{C}^7$
- [Глоссарий](/docs/reference/glossary) — терминология и связанные теории
