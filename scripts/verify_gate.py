#!/usr/bin/env python3
# -*- coding: utf-8 -*-
r"""
verify_gate.py — единая дверь корпуса holon: все приборы разом, один код возврата.

Приборов было три, и запускались они порознь: проверить корпус целиком значило
помнить три команды, и ничто не требовало запустить все три. Половинчатая проверка
выглядит как проверка. Этот файл запускает всё и падает, если падает хоть что-нибудь.

Правило 0 дисциплины проверки (карта покрытия math-foundations §7.5b), применённое
к аппарату целиком, а не к отдельному прибору.
"""
import subprocess
import sys
import time
from pathlib import Path

HERE = Path(__file__).resolve().parent
TOOLS = ["check_theorem_refs.py", "check_status_markers.py", "natal_startup_verify.py"]


def main() -> int:
    failed = []
    for name in TOOLS:
        p = HERE / name
        if not p.exists():
            print(f"  {name:28}  НЕТ ФАЙЛА — это дефект, а не пропуск")
            failed.append(name)
            continue
        t0 = time.time()
        r = subprocess.run([sys.executable, str(p)], capture_output=True, text=True)
        print(f"  {name:28}  EXIT={r.returncode}  {time.time() - t0:5.1f} с")
        if r.returncode: failed.append(name)
    print()
    if failed:
        print(f"ВЕНТИЛЬ ЗАКРЫТ: упало приборов {len(failed)} из {len(TOOLS)} — "
              + ", ".join(failed))
        return 1
    print(f"ВЕНТИЛЬ ОТКРЫТ: все {len(TOOLS)} прибора чисты")
    return 0


if __name__ == "__main__":
    sys.exit(main())
