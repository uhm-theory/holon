#!/usr/bin/env python3
# -*- coding: utf-8 -*-
r"""
check_mixed_names.py — имя, написанное сразу в двух алфавитах.

Латинское личное имя перед кириллической фамилией: «Alain Конн», «Arend
Гейтинг», «William Джеймс». Инвариант омоглифов такого не видит: он ищет два
алфавита ВНУТРИ слова, а здесь каждое слово однородно, и потому дефект
проходит мимо всех проверок знаков.

Почему по списку имён, а не по «латиница рядом с кириллицей»: второе даёт
двести с лишним срабатываний на законных «Функтор Hom», «Группа Spin»,
«Хайдеггеровский Ereignis». Список западных личных имён ловит ровно тот класс,
ради которого прибор написан.

Тот же страж стои́т в math-foundations (инвариант 39) и в Diakrisis, где он и
нашёл четыре таких имени. Здесь знаменатель — русские страницы корпуса.

Выход: 0 — чисто; 1 — есть имена в двух алфавитах.
"""
import re
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent.parent
ROOTS = [HERE / "website" / "i18n" / "ru", HERE / "website" / "docs"]

GIVEN_NAMES = set("""
Alain Albert Alfred Andrzej Arend Anthony Antonius Bill Brian Bruno Charles
Christian Daniel David Don Donald Edward Emil Eric Ernst Evan Felix Frank Georg
George Gerhard Gottlob Gregory Hans Harold Heinrich Henri Henry Herbert Jaakko
Jacob James Jean John Joseph Karl Kurt Leopold Louis Ludwig Marc Mark Martin
Michael Nicolas Otto Paul Peter Pierre Ralph Richard Robert Rudolf Samson
Saunders Solomon Stephen Steven Thierry Thomas Vaughan Victor Vittorio William
Wolfgang
""".split())

MIXED = re.compile(r"\b([A-Z][a-z]{2,})[  ]+([А-ЯЁ][а-яё]{2,})")
CYR = re.compile(r"[А-Яа-я]")


def main() -> int:
    bad, seen = [], 0
    for root in ROOTS:
        if not root.exists():
            continue
        for f in sorted(root.rglob("*.md")):
            if "node_modules" in str(f):
                continue
            txt = f.read_text(encoding="utf-8", errors="ignore")
            if not CYR.search(txt):
                continue                      # английская страница — не наш случай
            seen += 1
            txt = re.sub(r"```.*?```", " ", txt, flags=re.S)
            txt = re.sub(r"`[^`\n]*`", " ", txt)
            for i, line in enumerate(txt.split("\n"), 1):
                for m in MIXED.finditer(line):
                    if m.group(1) in GIVEN_NAMES:
                        bad.append((f.relative_to(HERE), i, m.group(0)))
    print(f"русских страниц: {seen}; имён в двух алфавитах: {len(bad)}")
    for path, i, w in bad[:20]:
        print(f"   {path}:{i}  «{w}»")
    if bad:
        print("правило: имя пишется одним алфавитом; оригинал — в скобках целиком")
        return 1
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
