/*
 * 프로젝트 목록 — 여기에 항목을 추가하면 메인 페이지에 자동으로 나타납니다.
 *
 * featured: true  → 메인 상단 "대표 프로젝트"에 크게 노출 (order 순, 최대 3개)
 * featured: false → 아래 "전체 프로젝트" 목록에만 노출
 * link            → 상세 페이지(예: project-template.html을 복사해 만든 파일). 없으면 github로 연결
 * demo            → 배포된 서비스 주소(선택). 메인 카드에는 표시하지 않음 — 상세 페이지의 "라이브 서비스 열기" 버튼에 직접 넣는다
 * demoAccount     → 체험 계정 { id, password }(선택). 상세 페이지의 <div data-demo-account="id">에만 표시 (메인 카드에는 표시 안 함)
 * 메인 카드에는 "프로젝트 자세히 보기" 버튼 하나만 표시된다.
 *
 * 새 프로젝트 예시:
 * {
 *   id: 'new-project',
 *   title: '프로젝트 이름',
 *   tagline: '한 줄 소개',
 *   period: '2026.11', team: '개인', category: '데이터 분석',
 *   tags: ['Python', 'pandas'],
 *   cover: 'assets/new-project.png', coverAlt: '화면 설명',
 *   highlights: [
 *     { label: '문제', text: '...' },
 *     { label: '내 역할', text: '...' },
 *     { label: '결과', text: '...' },
 *   ],
 *   link: 'new-project.html', github: 'https://github.com/...',
 *   featured: true, order: 2,
 * },
 */
window.PORTFOLIO_PROJECTS = [
  {
    id: 'batteryflow',
    title: 'BatteryFlow AI',
    tagline: '9가지 방법을 비교해 발주 계획보다 오차가 낮은 기준선을 찾고, 계획 검토 서비스로 만들었습니다.',
    period: '2026.09.21–09.30',
    team: '3인 팀',
    category: '머신러닝 · 서비스',
    tags: ['Python', 'LSTM', 'FastAPI', 'Dash', 'Gemini', 'Firebase'],
    cover: 'assets/demand-dashboard.png',
    coverAlt: '부품의 예측량과 기존 D+3 계획, 차이와 검토 방향을 함께 확인하는 BatteryFlow 공급망 화면',
    highlights: [
      { label: '문제', text: '최근 패턴과 다른 발주 계획을 어떻게 찾을까?' },
      { label: '내 역할', text: '발주량 예측 · FastAPI·Dash 서비스 · AI Copilot' },
      { label: '결과', text: '9가지 방법 중 최저 오차 · 평균 오차 54.8개(기존 계획) → 34.7개, 예측·계획·차이를 한 화면에' },
    ],
    link: 'batteryflow.html',
    github: 'https://github.com/Kimyubin357/Batteryflow-ML-Platform',
    demo: 'https://batteryflow-u6lb5fm2vq-du.a.run.app/login',
    demoAccount: { id: 'admin@gmail.com', password: 'admin1234' },
    featured: true,
    order: 1,
  },
  {
    id: 'busan-night-pharmacy',
    title: '부산 심야약국 보행 접근성 지도',
    titleLines: ['부산 심야약국', '보행 접근성 지도'],
    tagline: '도착 시각에 열려 있는 약국까지 따져, 심야약국 추가 지정 후보를 찾았습니다.',
    period: '2026.09 · 보완 2026.10',
    team: '개인 프로젝트',
    category: '데이터 분석 · 공간 분석',
    tags: ['Python', 'pandas', 'SciPy', 'OSM', 'Leaflet'],
    cover: 'assets/busan-night-pharmacy/map-after.jpg',
    coverAlt: '수영우리약국 추가 전후 도로망 접근성 분석에서 새롭게 접근 가능한 수요 격자가 표시된 실제 지도 화면',
    highlights: [
      { label: '문제', text: '공공심야약국 한 곳을 더 지정한다면 어디를 먼저 검토할까?' },
      { label: '내 역할', text: '개인 프로젝트 · 데이터 선정·전처리 · 공간 분석 기획' },
      { label: '결과', text: '비어 있던 월요일 운영시간 1,679곳 보완 → 수영구 후보군 도출, 시민용 약국 찾기 화면까지 배포' },
    ],
    link: 'busan-night-pharmacy.html',
    demo: 'https://busan-night-pharmacy-map-768810209035.asia-east1.run.app/',
    github: 'https://github.com/Kimyubin357/busan-night-pharmacy-map',
    featured: true,
    order: 2,
  },
  {
    id: 'power-forecast',
    title: '제조 전력 예측과 피크 사전경보',
    titleLines: ['제조 전력 예측과', '피크 사전경보'],
    tagline: '기상 데이터의 1시간 어긋남을 찾아, 예측에 미래 정보가 섞이는 것을 막았습니다.',
    period: '2026.10.02–10.08', team: '점프업 · 3인 팀',
    category: '데이터 분석 · 머신러닝',
    tags: ['Python', 'pandas', 'LightGBM', 'scikit-learn', 'PyTorch'],
    cover: 'assets/power-forecast/06_model_comparison.png',
    coverAlt: '공동 실험의 Q1·Q2·Q3·LSTM 전체 오차와 고전력 오차 비교',
    highlights: [
      { label: '문제', text: '공장 전력을 15분 단위로 예측하고 피크 전에 경보하기 (경진대회 과제)' },
      { label: '내 역할', text: '팀장 · 데이터 검증 · 평가 기준 설계' },
      { label: '결과', text: '기상을 공식 관측과 99.84% 대조해 입력 수정 · 팀 제출 모델 전체 오차 5.1% 감소 · 위험 피크 56건 모두 사전 경보' },
    ],
    link: 'power-forecast.html', featured: true, order: 3,
  },

];
