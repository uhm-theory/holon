---
sidebar_position: 2
title: "Категория Exp"
description: "Экспериенциальное пространство как категория"
---

# Категория Exp

:::info DRY: Мастер-определение
Полная спецификация категории Exp, включая топосную структуру и метрическое обогащение — в [Категорном формализме](/docs/proofs/categorical/categorical-formalism#2-категория-exp).
:::

## Определение

**Определение (Экспериенциальное пространство).** Базовое экспериенциальное пространство (объекты категории $\mathbf{Exp}$):

$$
\mathcal{E}_0 := \Delta^{N-1} \times_{\text{Spec}} \mathbb{P}(\mathcal{H}_E)^N \times \mathcal{C}
$$

Полное экспериенциальное пространство (с эмерджентной историей):

$$
\mathcal{E} := \mathcal{E}_0 \times \Pi_1(\mathcal{E}_0)
$$

где:
- $\Delta^{N-1}$ — $(N-1)$-симплекс (спектры)
- $\mathbb{P}(\mathcal{H}_E)$ — проективное пространство [измерения Опыта](/docs/core/structure/dimension-e)
- $\mathcal{C}$ — пространство контекстов
- $\Pi_1(\mathcal{E}_0)$ — фундаментальный группоид (история)

## Морфизмы

Морфизмы $\mathbf{Exp}$ — тройки преобразований:

$$
(f, g, h): \mathcal{E}_1 \to \mathcal{E}_2
$$

где $f$ — преобразование спектров, $g$ — качеств, $h$ — контекстов.

## Ключевые свойства

- **Exp не является топосом** — не имеет классификатора подобъектов ([§6](/docs/proofs/categorical/categorical-formalism#6-топосная-структура))
- **Расслоенная структура:** $\mathbf{Exp}$ — расслоение (fibration) над $\Delta^{N-1}$
- **Метрическое обогащение:** через метрику Бурес и Фубини-Штуди
- **∞-расширение:** $\mathbf{Exp}_\infty$ — ∞-группоид с [эмерджентным временем](/docs/core/operators/emergent-time)

## Связи

- **Отображается из:** [DensityMat](/docs/core/categories/category-hol) через [функтор F](/docs/core/categories/functor-f)
- **Связана с:** [Иерархия интериорности](/docs/proofs/consciousness/interiority-hierarchy) — уровни L0-L4 определяются в Exp
- **Полная спецификация:** [Категорный формализм §2](/docs/proofs/categorical/categorical-formalism#2-категория-exp)
