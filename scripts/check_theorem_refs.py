#!/usr/bin/env python3
"""Проверяет, что каждая ссылка `T-nnn` разрешается строкой реестра статусов.

Корпус — это граф: двести с лишним теорем, и каждая страница ссылается на
чужие номера. Рёбра этого графа не проверял никто, и вот что нашлось при первом
прогоне 2026-07-28:

* **ранние номера** (T-1…T-49) упоминаются в корпусе, но строк в реестре не
  имеют — при первом прогоне их насчитывалось двадцать три, а после того, как
  буква стала частью имени (см. REF_RE), стало **пятьдесят четыре имени и 421
  ссылка**: прежняя редакция считала T-39 и T-39a за один номер, отчего «T-39 —
  129 упоминаний» оказалось суммой двух разных результатов. Реестр при этом
  объявлял себя «Complete registry of all UHM results»;
* три номера внутри его собственного диапазона (T-167, T-168, T-169) не
  присвоены — просто пропуск нумерации. Реестр объявляет это строкой
  «Skipped numbers / Пропущенные номера», которую читает SKIP_RE: без неё
  прибор ловил реестр на его же объявлении, считая единственное упоминание
  «этих номеров нет» за ссылку на несуществующий номер.

Второй прогон, после починки имени (2026-08-25), нашёл в рабочем диапазоне
восемнадцать висячих имён — тринадцать из них были настоящими результатами с
формулировкой и доказательством, но без строки реестра (T-53a–d о времени,
T-98a, T-100a, T-107a–c, T-108a о сенсомоторике, T-221.1–.3 о no-go-теоремах), а
две — опечатками (T-257a и T-301a, у которых нет и никогда не было источника;
одна из ссылок на «T-257a» вела на якорь #t-257). Строки написаны, опечатки
исправлены, рабочий диапазон чист. Найдено это, что важно, ЧУЖИМ прибором:
gateway_lint корпуса math-foundations сообщил, что цитируемая им T-129a реестром
не покрыта, — своему прибору она была невидима по построению.

Восстановить формулировки ранних теорем нельзя: полного источника нет ни в
корпусе, ни в `math-foundations` (там T-42 значится как «G₂ ⊂ SO(7) ⊂ U(7)», а
в корпусе — «Uniqueness Theorem of Holonomic Representation», то есть номера
двух проектов не совпадают). Поэтому инструмент **сообщает**, а не сочиняет:
выдумать строку реестра значило бы подделать ту самую полноту, которой не было.

Что считается ссылкой: `T-nnn`, `T-nnn.k`, `T-nnnb` вне кода, формул и ссылок
Markdown. Маскирование берётся из `check_status_markers`, чтобы правило было
одно на оба инструмента.

Запуск из `website/`:
    python3 ../scripts/check_theorem_refs.py
    python3 ../scripts/check_theorem_refs.py --allow-early   # ранние не в счёт
Выход: 0 — все ссылки разрешаются, 1 — есть висячие.
"""
from __future__ import annotations

import collections
import glob
import re
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from check_status_markers import mask  # noqa: E402

REGISTRY = "docs/reference/status-registry.md"
SOURCES = ["docs/**/*.md*"]
#: Строка реестра: `| T-123 | …` или `| T-123a | …` — возможно, жирная и/или зачёркнутая.
ROW_RE = re.compile(r"^\|\s*\*{0,2}~{0,2}T-(\d+(?:\.\d+|[a-z])?)", re.M)
#: Объявленный пропуск нумерации. Реестр называет номера, которые НЕ присвоены;
#: без такой строки прибор ловил реестр на его же объявлении: единственные
#: «ссылки» на T-167..T-169 — это фраза, сообщающая, что их нет.
SKIP_RE = re.compile(r"^(?:\*\*)?(?:Skipped numbers|Пропущенные номера)[^\n]*", re.M)
#: Объявление раннего диапазона. Пока реестр объявляет его машинно-читаемо,
#: ранние номера — известный и названный пробел, а не дефект: код возврата
#: обязан отличать «объявлено» от «обнаружено». Без этой строки прибор выходил
#: с единицей ВСЕГДА, а код возврата, который никогда не ноль, ничего не значит.
EARLY_RE = re.compile(r"^(?:\*\*)?(?:Early numbers|Ранние номера)[^\n]*", re.M)
#: Объявление опор без формулировки. Реестр вправе признать их открытым долгом —
#: но признать ЯВНО и поимённо, а не молчанием: пока строки нет, прибор красен.
GHOST_RE = re.compile(r"^(?:\*\*)?(?:Unstated supports|Опоры без формулировки)[^\n]*", re.M)
#: Ссылка на теорему: номер с возможным подномером `.k` или буквой.
#: БУКВА — ЧАСТЬ ИМЕНИ, а не украшение. Прежняя редакция брала только цифры
#: (`int(m.group(1))`), и потому T-129a была для неё неотличима от T-129: ссылка
#: на следствие «разрешалась» строкой базовой теоремы, а собственная строка
#: следствия, даже будь она написана, просто повторно добавляла бы 129. Найдено
#: это не здесь, а СНАРУЖИ: gateway_lint соседнего корпуса math-foundations
#: сообщил, что цитируемая им T-129a реестром не покрыта, — своему прибору она
#: была невидима по построению. После починки в рабочем диапазоне открылось
#: двенадцать таких имён (38 ссылок), а «T-39 — 129 упоминаний» из шапки этого
#: файла оказалось суммой T-39 и T-39a, двух разных результатов.
REF_RE = re.compile(r"\bT-(\d{1,3}(?:\.\d+|[a-z])?)\b")
# Кириллическая «Т» неотличима на вид от латинской «T», но не совпадает с ней
# ни в одном сравнении. Ссылок вида «Т-nnn» кириллицей в корпусе было 57 в 29
# файлах — REF_RE их не видел, и потому они не проверялись на разрешимость
# вовсе: указывай такая ссылка на несуществующий номер, прибор бы промолчал.
HOMOGLYPH_RE = re.compile(r"\bТ-(\d{1,3})(?:\.\d+|[a-z])?\b")
#: Ниже этого номера — результаты, полученные до заведения реестра.
EARLY_BELOW = 50


def base(ident: str) -> int:
    """Числовая часть имени: `129a` → 129. Порядок — по ней, имя — целиком."""
    return int(re.match(r"\d+", ident).group())


def declared() -> set[str]:
    text = Path(REGISTRY).read_text(encoding="utf-8")
    return {m.group(1) for m in ROW_RE.finditer(text)}


def skipped() -> set[str]:
    """Номера, которые реестр объявил непри­своенными."""
    text = Path(REGISTRY).read_text(encoding="utf-8")
    out: set[str] = set()
    for line in SKIP_RE.finditer(text):
        out |= {m.group(1) for m in re.finditer(r"T-(\d+(?:\.\d+|[a-z])?)", line.group())}
    return out


HOMOGLYPHS: collections.Counter = collections.Counter()


def registry_only() -> list[tuple[str, int]]:
    """Номера, на которые ссылается САМ реестр, не имея под ними строки и не
    встречаясь больше нигде в корпусе.

    Это иной род пробела, чем «ранний номер»: ранний просто цитируется, а эти
    номера реестр ИСПОЛЬЗУЕТ — повышает на них статусы («Raised to [C at
    T-4.2]»), строит цепи вывода («AP → c>0 → T-41b → T-11 → T-12 → T-13»),
    ссылается на них как на доказанное («[T]+[I]: K = 3 derived from triadic
    decomposition [T-40a, 40b]»). Формулировки под этими метками нет нигде —
    даже на страницах, куда ведут сами ссылки. Опора, которой не видно, хуже
    названного пробела: пробел честен, а опора обещает.
    """
    reg = Path(REGISTRY)
    regt = reg.read_text(encoding="utf-8")
    rows = declared()
    inside: collections.Counter = collections.Counter()
    outside: set[str] = set()
    for pattern in SOURCES:
        for path in glob.glob(pattern, recursive=True):
            text = mask(Path(path).read_text(encoding="utf-8"))
            names = {m.group(1) for m in REF_RE.finditer(text)}
            if Path(path) == reg:
                inside.update(names)
            else:
                outside |= names
    skips = skipped()
    early_decl = {m.group(1) for line in EARLY_RE.finditer(regt)
                  for m in re.finditer(r"T-(\d{1,3}(?:\.\d+|[a-z])?)", line.group())}
    ghosts = [k for k in inside
              if k not in outside and k not in rows and k not in skips
              and k not in early_decl]
    return sorted(((k, inside[k]) for k in ghosts),
                  key=lambda x: (base(x[0]), x[0]))


def referenced() -> tuple[collections.Counter, dict[str, collections.Counter]]:
    counts: collections.Counter = collections.Counter()
    where: dict[str, collections.Counter] = collections.defaultdict(
        collections.Counter)
    for pattern in SOURCES:
        for path in glob.glob(pattern, recursive=True):
            text = mask(Path(path).read_text(encoding="utf-8"))
            for m in REF_RE.finditer(text):
                n = m.group(1)
                counts[n] += 1
                where[n][path] += 1
            for m in HOMOGLYPH_RE.finditer(text):
                HOMOGLYPHS[path] += 1
    return counts, where


def main() -> int:
    allow_early = "--allow-early" in sys.argv
    have = declared()
    skips = skipped()
    early_declared = bool(EARLY_RE.search(Path(REGISTRY).read_text(encoding="utf-8")))
    refs, where = referenced()
    bases = {base(x) for x in have}
    lo, hi = min(bases), max(bases)
    gaps = [n for n in range(lo, hi + 1) if n not in bases]
    ref_bases = {base(x) for x in refs}
    dangling = sorted((x for x in refs if x not in have and x not in skips),
                      key=lambda x: (base(x), x))
    early = [n for n in dangling if base(n) < EARLY_BELOW]
    late = [n for n in dangling if base(n) >= EARLY_BELOW]

    print(f"реестр: {len(have)} строк, T-{lo}..T-{hi}")
    print(f"корпус ссылается на {len(refs)} различных номеров")
    if HOMOGLYPHS:
        total = sum(HOMOGLYPHS.values())
        print(f"\nКИРИЛЛИЧЕСКАЯ «Т» В НОМЕРЕ ТЕОРЕМЫ: {total} в {len(HOMOGLYPHS)} файлах")
        for path, k in HOMOGLYPHS.most_common(10):
            print(f"   {Path(path).name}: {k}")
        print("   такая ссылка НЕ ПРОВЕРЯЕТСЯ: она неотличима на вид и не совпадает")
        print("   с латинской ни в одном сравнении — и потому невидима этой проверке")
    if gaps:
        skip_bases = {base(x) for x in skips}
        unused = [n for n in gaps if n not in ref_bases or n in skip_bases]
        used = [n for n in gaps if n in ref_bases and n not in skip_bases]
        print(f"\nпропуски внутри диапазона: {gaps}")
        print(f"   из них не присвоены (объявлено реестром либо ни разу не упомянуты): {unused}")
        if used:
            print(f"   УПОМЯНУТЫ, но строки нет: {used}")

    if late:
        print(f"\nВИСЯЧИЕ в рабочем диапазоне ({len(late)}) — это дефекты:")
        for n in late:
            top = ", ".join(f"{Path(p).name}×{c}"
                            for p, c in where[n].most_common(3))
            print(f"   T-{n:<7} ссылок {refs[n]:>3}  {top}")

    if early:
        total = sum(refs[n] for n in early)
        print(f"\nРАННИЕ, вне реестра ({len(early)} номеров, {total} ссылок):")
        for n in early:
            top = ", ".join(f"{Path(p).name}×{c}"
                            for p, c in where[n].most_common(2))
            print(f"   T-{n:<7} ссылок {refs[n]:>4}  {top}")
        print("   Формулировки не восстанавливаются: полного источника нет.")
        print("   Инструмент сообщает, а не сочиняет — выдуманная строка")
        print("   реестра подделала бы полноту вместо того, чтобы её закрыть.")

    ghosts = registry_only()
    regtext = Path(REGISTRY).read_text(encoding="utf-8")
    ghost_declared = {m.group(1) for line in GHOST_RE.finditer(regtext)
                      for m in re.finditer(r"T-(\d{1,3}(?:\.\d+|[a-z])?)", line.group())}
    undeclared_ghosts = [g for g in ghosts if g[0] not in ghost_declared]
    if ghosts:
        print(f"\nОПОРА БЕЗ ФОРМУЛИРОВКИ ({len(ghosts)}): реестр ссылается на эти номера,")
        print("   строки под ними не имеет, и нигде в корпусе они больше не встречаются —")
        print("   в том числе на страницах, куда ведут сами ссылки:")
        for k, n in ghosts:
            print(f"   T-{k:<7} упоминаний в реестре {n}")

        if undeclared_ghosts:
            print("   НЕ ОБЪЯВЛЕНЫ реестром: "
                  + ", ".join("T-" + g[0] for g in undeclared_ghosts))
        else:
            print("   все они объявлены реестром как открытый долг")

    if late or undeclared_ghosts:
        return 1
    if early and not (allow_early or early_declared):
        return 1
    if early:
        print("\nранний диапазон объявлен реестром — это названный пробел, не дефект")
    print("все ссылки, кроме объявленного раннего диапазона, разрешаются")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
