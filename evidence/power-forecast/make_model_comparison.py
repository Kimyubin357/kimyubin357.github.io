"""Re-draw 06_model_comparison.png with the page's model names.

Values come straight from evidence/power-forecast/model_comparison.csv (mae, high_mae).
Output keeps the original 2560x950 px so the page's width/height attributes stay valid.
"""
import csv, sys
import matplotlib
matplotlib.use("Agg")
from matplotlib import font_manager as fm
import matplotlib.pyplot as plt
from matplotlib.path import Path
from matplotlib.patches import PathPatch

def top_rounded_bar(ax, x0, x1, h, rpx, color):
    """Bar whose data end has rounded corners (rpx device px) and a square baseline."""
    fig = ax.figure
    fig.canvas.draw()
    bb = ax.get_window_extent()
    (xa, xb), (ya, yb) = ax.get_xlim(), ax.get_ylim()
    rx = rpx * (xb - xa) / bb.width
    ry = min(rpx * (yb - ya) / bb.height, h / 2)
    k = 0.5523
    verts = [(x0, 0), (x0, h - ry), (x0, h - ry + k * ry), (x0 + rx - k * rx, h), (x0 + rx, h),
             (x1 - rx, h), (x1 - rx + k * rx, h), (x1, h - ry + k * ry), (x1, h - ry), (x1, 0), (x0, 0)]
    codes = [Path.MOVETO, Path.LINETO, Path.CURVE4, Path.CURVE4, Path.CURVE4,
             Path.LINETO, Path.CURVE4, Path.CURVE4, Path.CURVE4, Path.LINETO, Path.CLOSEPOLY]
    ax.add_patch(PathPatch(Path(verts, codes), facecolor=color, linewidth=0, zorder=3))

CSV, OUT, FONTDIR = sys.argv[1], sys.argv[2], sys.argv[3]
for w in ("Regular", "Bold"):
    fm.fontManager.addfont(f"{FONTDIR}/SUIT-{w}.ttf")
plt.rcParams["font.family"] = "SUIT Static"
plt.rcParams["font.weight"] = 450

rows = {r["alias"].lstrip("﻿"): r for r in csv.DictReader(open(CSV, encoding="utf-8-sig"))}
order = [("Q1", "기준 모델"), ("Q2", "제출 모델"), ("Q3", "피크 특화 모델"), ("LSTM", "LSTM")]
# Fixed categorical order (validated: adjacent CVD ΔE ≥ 9.1, normal ΔE ≥ 22.9). Color follows the model in both panels.
colors = ["#2a78d6", "#eb6834", "#1baf7a", "#eda100"]
INK, INK2, GRID = "#111a2e", "#5a6579", "#e3e7ee"

panels = [
    ("mae", "전체 오차", "MAE · 원자료 단위", 8),
    ("high_mae", "피크 구간 오차", "MAE · 학습값 상위 10% 구간", 12),
]

fig, axes = plt.subplots(1, 2, figsize=(12.8, 4.75), dpi=200)
fig.subplots_adjust(left=0.065, right=0.985, top=0.80, bottom=0.17, wspace=0.22)

for ax, (key, title, ylabel, ymax) in zip(axes, panels):
    vals = [float(rows[a][key]) for a, _ in order]
    ax.set_xlim(-0.6, len(vals) - 0.4)
    ax.set_ylim(0, ymax)
    best = min(range(len(vals)), key=vals.__getitem__)
    width = 0.62
    for i, (v, c) in enumerate(zip(vals, colors)):
        # Bar with 4px-style rounded data end, square at the baseline.
        top_rounded_bar(ax, i - width / 2, i + width / 2, v, 8, c)
        ax.text(i, v + ymax * 0.025, f"{v:.2f}", ha="center", va="bottom", fontsize=15,
                fontweight="bold" if i == best else "normal", color=INK, zorder=4)
        if i == best:
            ax.text(i, v + ymax * 0.135, "가장 낮음", ha="center", va="bottom", fontsize=10.5,
                    fontweight="bold", color=INK2, zorder=4)
    ax.set_xlim(-0.6, len(vals) - 0.4)
    ax.set_ylim(0, ymax)
    ax.set_xticks(range(len(vals)))
    ax.set_xticklabels([n for _, n in order], fontsize=13.5, color=INK)
    ax.tick_params(axis="x", length=0, pad=10)
    ax.tick_params(axis="y", length=0, labelsize=11.5, labelcolor=INK2, pad=8)
    ax.set_yticks(range(0, ymax + 1, 2))
    ax.grid(axis="y", color=GRID, linewidth=1, zorder=0)
    for s in ("top", "right", "left"):
        ax.spines[s].set_visible(False)
    ax.spines["bottom"].set_color("#b9c1cf")
    ax.set_title(title, loc="left", fontsize=17, fontweight="bold", color=INK, pad=30)
    ax.text(0, 1.045, ylabel, transform=ax.transAxes, fontsize=11.5, color=INK2, va="bottom")

fig.text(0.985, 0.03, "9월 회고 평가 · 5,376행 · 낮을수록 좋음 · 팀 공동 실험 결과", ha="right", fontsize=10.5, color=INK2)
fig.savefig(OUT, dpi=200, facecolor="white")
print("saved", OUT)
