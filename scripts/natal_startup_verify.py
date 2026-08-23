#!/usr/bin/env python3
# =============================================================================
# natal_startup_verify.py — T-NATAL-START (candidate): the information
# price of universally learning one's own Gamma in D(C^d) COLLAPSES
# onto the classical startup family at m = d^2.
#
# The algebra (exact, no approximations):
#   Sommers-Zyczkowski Bures volume:
#       V_B(d) = 2^{1-d^2} * pi^{d^2/2} / Gamma(d^2/2).
#   Our canon convention «Bures = 1/4 Fisher» gives the SLD-Jeffreys
#   density sqrt(det J) = 2^{d^2-1} * sqrt(det g_B), hence
#       INT sqrt(det J) = 2^{d^2-1} * V_B(d) = pi^{d^2/2}/Gamma(d^2/2)
#   — the powers of two cancel IDENTICALLY, and the quantum
#   Clarke-Barron-type constant
#       C_Q(d) = -((d^2-1)/2) log2(2*pi) + log2 INT sqrt(det J)
#   equals the CLASSICAL identified family (c0_family_verify.py, omega)
#       C(m) = (m/2) log2 pi - ((m-1)/2) log2(2*pi) - log2 Gamma(m/2)
#   at m = d^2: a quantum state of dimension d starts, informationally,
#   as a classical d^2-faced die. For d=7 (the organism's Gamma):
#   dimension term = 24*log2 n  (48 = d^2-1 [T], the §84 readout),
#   constant C_Q(7) = C(49).
#
# STATUS HONESTY: the volume identity and the family collapse are
# [T-vykladka] (pure algebra, verified below); the dimension term
# ((d^2-1)/2) log2 n for mixed-state universal coding is [T-cit];
# the OPERATIONAL constant (achievability by adaptive tomography)
# is [P] — the named open court of the candidate.
#
# Courts:
#   [V2] the known closed qubit volume: V_B(2) = pi^2/8 exactly;
#   [ID] the cancellation identity 2^{d^2-1} V_B(d) ==
#        pi^{d^2/2}/Gamma(d^2/2) for d=2..7 (to 1e-12 in log2);
#   [CQ] C_Q(d) == C(d^2) for d=2..7 (to 1e-12) — the collapse;
#   [N7] the natal table printed: d=7 constant and the price of the
#        first n self-samples 24*log2(n) + C(49).
# =============================================================================
import math

PASS = []
def check(name, ok, detail):
    print(f"[{'PASS' if ok else 'FAIL'}] {name}: {detail}")
    PASS.append(ok)

LG2 = math.log(2)
def C_classical(m):
    return (m / 2) * math.log2(math.pi) \
        - ((m - 1) / 2) * math.log2(2 * math.pi) \
        - math.lgamma(m / 2) / LG2

def log2_VB(d):
    n2 = d * d
    return (1 - n2) + (n2 / 2) * math.log2(math.pi) \
        - math.lgamma(n2 / 2) / LG2

# --- [V2] the qubit volume in closed form -------------------------------
v2 = 2 ** log2_VB(2)
check("V2.qubit", abs(v2 - math.pi ** 2 / 8) < 1e-12,
      f"V_B(2) = {v2:.12f} == pi^2/8 = {math.pi**2/8:.12f} (Sommers-Zyczkowski closed form pinned)")

# --- [ID] the quarter-Fisher cancellation -------------------------------
ok_id = True
for d in range(2, 8):
    n2 = d * d
    lhs = (n2 - 1) + log2_VB(d)
    rhs = (n2 / 2) * math.log2(math.pi) \
        - math.lgamma(n2 / 2) / LG2
    ok_id &= abs(lhs - rhs) < 1e-12
check("ID.cancel", ok_id,
      "2^(d^2-1) V_B(d) == pi^(d^2/2)/Gamma(d^2/2) for d=2..7 — the Bures-quarter-Fisher convention cancels the dyadic factor IDENTICALLY")

# --- [CQ] the collapse onto the classical family ------------------------
ok_cq = True
print("== C_Q(d) vs C(d^2) ==")
for d in range(2, 8):
    n = d * d - 1
    cq = -(n / 2) * math.log2(2 * math.pi) \
        + (n) + log2_VB(d)
    cc = C_classical(d * d)
    ok_cq &= abs(cq - cc) < 1e-12
    print(f"    d={d}: C_Q={cq:+.4f}, C(d^2)={cc:+.4f}")
check("CQ.collapse", ok_cq,
      "the quantum startup constant equals the classical d^2-die family EXACTLY — a quantum state starts as a classical die with d^2 faces")

# --- [N7] the natal table ------------------------------------------------
c49 = C_classical(49)
print("== [N7] the natal startup of Gamma in D(C^7) ==")
print(f"    dimension term: 24*log2(n)  (48 = d^2-1 [T])")
print(f"    constant: C_Q(7) = C(49) = {c49:.4f} bits")
for n in (49, 490, 4900, 49000):
    print(f"    n={n}: price = {24*math.log2(n) + c49:.1f} bits")
check("N7.table", c49 < 0,
      f"C(49) = {c49:.4f} — the rich-alphabet startup constant is deeply negative (the same monotone law as the classical family: richer alphabets front-load their startup into the dimension term)")

print(f"== TOTAL: {sum(PASS)}/{len(PASS)} PASS ==")
raise SystemExit(0 if all(PASS) else 1)
