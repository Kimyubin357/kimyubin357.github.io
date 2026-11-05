# BatteryFlow 재평가 근거 (audited_v3) · 2026-11-05

공개 저장소 [Batteryflow-ML-Platform](https://github.com/Kimyubin357/Batteryflow-ML-Platform) main `2c01a72`에서 바이트 그대로 가져왔다.

| 파일 | 내용 | 저장소 경로 |
|---|---|---|
| [cv_metrics_pooled.csv](cv_metrics_pooled.csv) | 9가지 방법 CV 비교 (7개 목표일·743행) | `발주량 예측 모델/outputs/audited_v3/source_total/cv_metrics_pooled.csv` |
| [final_holdout_metrics.csv](final_holdout_metrics.csv) | 회고 6개 목표일 비교 (643행, 독립 시험 아님) | `.../audited_v3/source_total/final_holdout_metrics.csv` |
| [plan_comparison.json](plan_comparison.json) | 기존 D+3 계획 대비 목표일 단위 판정 (재표본화 4,000회, seed 42) | `.../outputs/audited_v3/plan_comparison.json` |
| [ranking_2021-11-01.json](ranking_2021-11-01.json) | 2021-11-01 Copilot 상위 3개 순위 (XGBoost 기준, 공식 시드 2026-11-05.v5에서 계산) | 서버 순위 규칙으로 계산 |

재평가에서는 직전 관측일과 공통 부품의 90% 이상에서 수량 82개 칸이 같은 17일을 이월 의심일로 분류했다. 날짜 전체에 추정 기준일을 적용해 계획을 다시 읽고 이월일은 정답에서 뺐다. 제공자의 운영 기록으로 확인한 사실이 아닌 자료 기반 보정 가정이다. 10/31은 별도의 로그 누락 보간일이다. 처리 규칙과 전체 결과는 저장소의 `발주량 예측 모델/README.md`에 있다. 상위 폴더의 v2 근거 파일은 철회한 처음 평가의 기록이다.

## 평가 범위 표시

CV MAE는 7일·111개 부품·743건의 행 단위 집계다. 회고 MAE는 6일·109개 부품·643건이며 독립 시험이 아니다. XGBoost의 9/13일 우세와 일별 MAE 차이 -1.114개(95% 구간 -3.0694~+1.0209)는 CV+회고 13일을 합친 날짜 단위 비교다. CV MAE 15.94 대 기존 계획 16.20과 같은 집계로 혼동하지 않는다. 개선은 미확정이다.
