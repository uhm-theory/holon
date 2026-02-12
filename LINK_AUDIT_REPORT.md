# АУДИТ ССЫЛОК: /website/docs/core/structure/

## Резюме
- **Внешние URL (https://, http://)**: НЕ НАЙДЕНЫ ✓
- **Версии документов (version, v1.0, etc.)**: НЕ НАЙДЕНЫ ✓
- **Проблемные ссылки**: НАЙДЕНЫ ⚠️

---

## ПРОБЛЕМА: Ссылки на несуществующие документы

Все 9 файлов в папке `/website/docs/core/structure/` содержат ссылки на документы, которых нет в репозитории.

### Несуществующие целевые документы:

| Целевой документ | Количество ссылок | Файлы |
|---|---|---|
| `../../proofs/emergent-time` | 8+ | dimension-d.md, dimension-s.md, holon.md, dimensions.md, dimension-o.md |
| `../../proofs/theorem-minimality-7` | 7+ | dimension-a.md, dimension-d.md, dimension-e.md, dimension-l.md, dimension-o.md, dimension-s.md, dimension-u.md, dimensions.md |
| `../../proofs/interiority-hierarchy` | 3+ | dimension-e.md, dimension-u.md |
| `../../formal/specification` | 4+ | dimension-o.md, dimension-u.md |
| `../foundations/axiom-septicity` | 6+ | holon.md, dimensions.md, dimension-e.md, dimension-u.md |
| `../foundations/axiom-omega` | 3+ | dimensions.md, holon.md, dimension-l.md |
| `../foundations/consequences` | 2+ | holon.md, dimensions.md |
| `../dynamics/evolution` | 3+ | dimension-d.md, dimension-l.md, dimension-o.md |
| `../dynamics/viability` | 2+ | dimension-d.md, dimension-o.md, dimension-u.md |
| `../dynamics/coherence-matrix` | 1 | dimension-e.md |
| `../../proofs/categorical-formalism` | 1 | dimension-l.md |
| `../../applied/research/measurement-protocol` | 1 | dimension-l.md |
| `../consciousness/self-observation` | 2 | dimension-e.md, dimension-u.md |
| `../consciousness/interiority` | 1 | dimension-e.md |
| `../cosmology/spacetime` | 2 | dimension-d.md, dimension-o.md |
| `../cosmology/origin` | 1 | dimension-o.md |
| `../../reference/glossary` | 2 | holon.md, dimension-l.md |

---

## Детальный список по файлам:

### 1. dimension-a.md (2 ссылки)
- ❌ `../../proofs/theorem-minimality-7#случай-n--0-удаление-артикуляции-a` (линия 22)
- ❌ `../../proofs/theorem-minimality-7` (линия 119)

### 2. dimension-d.md (12 ссылок)
- ❌ `../../proofs/emergent-time` (линии 18, 29, 38, 45)
- ❌ `../../proofs/theorem-minimality-7#случай-n--2-удаление-динамики-d` (линия 26)
- ❌ `../cosmology/spacetime` (неявно ссылается)

### 3. dimension-e.md (8 ссылок)
- ❌ `../../proofs/interiority-hierarchy` (линии 15, 69)
- ❌ `../../proofs/theorem-minimality-7#случай-n--5-удаление-опыта-e` (линия 22)
- ❌ `../dynamics/coherence-matrix#два-уровня-формализации` (линия 43)
- ❌ `../consciousness/self-observation#мера-рефлексии-r` (линия 194)

### 4. dimension-l.md (9 ссылок)
- ❌ `../../proofs/theorem-minimality-7#случай-n--3-удаление-логики-l` (линии 85, 301)
- ❌ `../../applied/research/measurement-protocol` (линия 140)
- ❌ `../../proofs/emergent-time` (линия 211)
- ❌ `../foundations/consequences#10-теоремы-гёделя-и-полнота-угм` (линия 294)

### 5. dimension-o.md (21 ссылка)
- ❌ `../../proofs/emergent-time` (линии 18)
- ❌ `../../proofs/theorem-minimality-7#случай-n--4-удаление-основания-o` (линия 28)
- ❌ `../../formal/specification#гамильтониан` (линия 39)
- ❌ `../../formal/specification#уравнение-эволюции` (линия 55)
- ❌ `../cosmology/origin` (неявно ссылается)
- ❌ `../dynamics/evolution` (неявно ссылается)

### 6. dimension-s.md (4 ссылки)
- ❌ `../../proofs/theorem-minimality-7#случай-n--1-удаление-структуры-s` (линия 22)
- ❌ `../../proofs/emergent-time` (линии 101, 122)

### 7. dimension-u.md (11 ссылок)
- ❌ `../../proofs/theorem-minimality-7#случай-n--6-удаление-единства-u` (линия 22)
- ❌ `../../formal/specification#матрица-когерентности` (линия 29)
- ❌ `../../proofs/interiority-hierarchy#уровень-2-когнитивные-квалиа-cognitive-qualia` (линия 69)
- ❌ `../../proofs/interiority-hierarchy#36-мера-сознательности-c` (линия 154)

### 8. dimensions.md (12 ссылок)
- ❌ `/docs/core/foundations/axiom-omega#аксиоматика` (линия 15) — НЕПРАВИЛЬНЫЙ ФОРМАТ ССЫЛКИ
- ❌ `../../proofs/theorem-minimality-7` (линии 15, 19)
- ❌ `../../proofs/emergent-time` (линия 73)

### 9. holon.md (20 ссылок)
- ❌ `../../reference/glossary#категорные-термины` (линия 116)
- ❌ `../../proofs/theorem-purity-critical` (неявно ссылается)
- ❌ `../foundations/axiom-septicity` (линии 49, 100)
- ❌ `../foundations/axiom-omega` (линия 35)
- ❌ `../foundations/consequences` (неявно ссылается)

---

## Проблемная ссылка особого формата:

В `dimensions.md` (линия 15):
```
Число 7 — **аксиома** ([Аксиома 3](/docs/core/foundations/axiom-omega#аксиоматика))
```
Это **абсолютная ссылка** (начинается с `/docs/`), в то время как остальные используют **относительные ссылки** (начинаются с `./`, `../`).

---

## РЕКОМЕНДАЦИИ:

1. **Приоритет 1**: Создать недостающие файлы в соответствующих папках:
   - `/website/docs/proofs/emergent-time.md`
   - `/website/docs/proofs/theorem-minimality-7.md`
   - `/website/docs/proofs/interiority-hierarchy.md`
   - `/website/docs/proofs/categorical-formalism.md`
   - `/website/docs/proofs/theorem-purity-critical.md`
   - `/website/docs/formal/specification.md`
   - `/website/docs/reference/glossary.md`
   - Другие документы из таблицы выше

2. **Приоритет 2**: Унифицировать формат ссылок в `dimensions.md`:
   - Изменить `/docs/core/foundations/axiom-omega#аксиоматика` на `../foundations/axiom-omega#аксиоматика`

3. **Приоритет 3**: Добавить документы в папки:
   - `/website/docs/core/dynamics/` (evolution, viability, coherence-matrix)
   - `/website/docs/core/consciousness/` (self-observation, interiority)
   - `/website/docs/core/cosmology/` (spacetime, origin)
   - `/website/docs/core/foundations/` (axiom-omega, axiom-septicity, consequences)

