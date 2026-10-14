# BatteryFlow 수치 근거 · v0.1.0

2026-10-13에 [공개 GitHub 저장소](https://github.com/Kimyubin357/Batteryflow-ML-Platform)의 커밋 `8753ffd187f8fc9b465755e670efca7b3ab09ba4`에서 원본 자료를 확인했다. 모델 재학습 없이 저장 예측과 평가 결과를 대조했다.

## 파일과 출처

| 파일 | 내용 | 출처 |
|---|---|---|
| [cv_metrics_pooled.csv](cv_metrics_pooled.csv) | 9가지 방법 전체 비교 원본, 바이트 그대로 보존 | [고정 커밋의 CSV](https://github.com/Kimyubin357/Batteryflow-ML-Platform/blob/8753ffd187f8fc9b465755e670efca7b3ab09ba4/%EB%B0%9C%EC%A3%BC%EB%9F%89%20%EC%98%88%EC%B8%A1%20%EB%AA%A8%EB%8D%B8/outputs/audited_v2/source_total/cv_metrics_pooled.csv) |
| [baseline_comparison.json](baseline_comparison.json) | 2026-10-06에 생성된 신뢰구간·구간별·구간 제외 결과 | [GitHub 원본](https://github.com/Kimyubin357/Batteryflow-ML-Platform/blob/8753ffd187f8fc9b465755e670efca7b3ab09ba4/portfolio_notes/evidence/baseline_comparison.json) |
| [ranking_audit.json](ranking_audit.json) | 2026-10-06에 생성된 Copilot 수치·동률·순위 결과 | [GitHub 원본](https://github.com/Kimyubin357/Batteryflow-ML-Platform/blob/8753ffd187f8fc9b465755e670efca7b3ab09ba4/portfolio_notes/evidence/ranking_audit.json) |
| [source_comparison.json](source_comparison.json) | 이번 대조의 원본 경로·커밋·해시·재계산 결과·범위 | 2026-10-13 재확인 기록 |

기존 JSON 두 파일은 GitHub 원본과 모든 값이 같으며 LF/CRLF 줄바꿈만 다르다. 원검증 날짜는 바꾸지 않았다. `source_comparison.json`의 이번 재확인 날짜와 구분한다. CSV의 SHA-256은 `9f2f0aece40261193fe43d2d5182cf215c815ef7930f45db490ebcc81c72374f`다.

## 전체 비교 결과

평가 대상은 **1,289행·112개 부품·12개 목표일·3개 외부 시간순 검증 구간**이다. MAE·RMSE 단위는 개, WAPE 단위는 %다. 아래 표는 원본의 소수 첫째 자리 표시다.

| 방법 | MAE | RMSE | WAPE |
|---|---:|---:|---:|
| 7일 이동평균 | 34.7 | 69.7 | 35.7% |
| LSTM | 35.2 | 70.3 | 36.3% |
| 3일 이동평균 | 35.4 | 79.8 | 36.4% |
| 최근값 | 37.6 | 89.2 | 38.7% |
| XGBoost | 41.0 | 91.8 | 42.2% |
| CatBoost | 47.4 | 110.4 | 48.8% |
| LightGBM | 53.1 | 121.4 | 54.7% |
| 연관 부품 LightGBM | 53.7 | 121.2 | 55.3% |
| 기존 D+3 계획 | 54.8 | 132.2 | 56.4% |

LSTM의 원본 MAE는 `35.19420337531343`이다. 학습형 순위 대상 5개 중 가장 낮지만 전체 9개 중에서는 7일 이동평균이 가장 낮다. 사이트의 역할 설명과 일치한다.

## 재계산 방법과 해석

[저장 CV 예측](https://github.com/Kimyubin357/Batteryflow-ML-Platform/blob/8753ffd187f8fc9b465755e670efca7b3ab09ba4/%EB%B0%9C%EC%A3%BC%EB%9F%89%20%EC%98%88%EC%B8%A1%20%EB%AA%A8%EB%8D%B8/outputs/audited_v2/source_total/cv_predictions.csv)에서 행별 실제값과 예측값을 사용해 9개 방법의 MAE, RMSE, WAPE, 평균 예측 편향, R²를 재계산했다. 중복 부품·목표일 없음, 평가 규모 및 저장 시간 경계도 확인했다.

LSTM·XGBoost의 CSV 문자열을 float64로 바로 읽으면 원본과 아주 작은 차이가 생긴다. 예측값을 float32로 복원한 뒤 float64로 계산하면 원본의 다섯 지표를 재현한다. 직접 읽은 경우에도 최대 지표 차이는 약 `3.53e-7`이고 사이트 표시값에는 영향이 없다.

MA7·기존 계획의 오류를 목표일별로 묶고, seed 42로 목표일 12개를 복원 추출하는 paired cluster bootstrap 20,000회를 재계산했다. 같은 날의 모든 부품과 행 수를 함께 반복하며, 각 표본에서 행 가중 pooled MAE 개선율을 구한 뒤 linear quantile의 2.5%·97.5% 분위수를 사용한다. [기존 재현 스크립트](https://github.com/Kimyubin357/Batteryflow-ML-Platform/blob/8753ffd187f8fc9b465755e670efca7b3ab09ba4/portfolio_notes/evidence/review_portfolio_evidence.py)의 방법 및 입력·스크립트 해시와 일치한다.

- 전체 MAE 개선율: `36.70069039219379%` → 사이트 `36.7%`.
- 95% 구간: `−13.590954274574088%~59.22377097144252%` → 사이트 `−13.6%~59.2%`.
- 첫 구간 제외 개선율: `−16.399495629319482%` → 사이트에서 오차 `16.4%` 증가로 설명.

95% 구간은 0을 포함하며 기간별 성능도 달라, 이동평균을 계획 검토 기준선으로 소개하는 해석을 유지한다. 날짜 간 자기상관과 모델 선택 편향을 보정한 독립 시험 결과로 해석하지 않는다.

Copilot 근거는 GitHub JSON과 동일하며 보존된 상위 7개의 차이 계산·정렬 및 Part 60/66의 정확한 동률을 확인했다. 이번 대조에서는 전체 107개 후보를 백엔드로 다시 생성하거나 원본 17,364행의 전처리를 재수행하지 않았다.


## 제조 전력 분석 · 2026-10-14

[전력 분석 수치·역할 출처](power-forecast/README.md)를 추가했다. 개인 기여·팀원 참고를 구분하고 공식 기상 대응, 작업 리듬과 동일 평가 행의 모델·경보 집계를 공개한다.
