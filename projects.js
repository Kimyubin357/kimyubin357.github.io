/*
 * 프로젝트 목록 — 여기에 항목을 추가하면 메인 페이지에 자동으로 나타납니다.
 *
 * featured: true  → 메인 상단 "대표 프로젝트"에 크게 노출 (order 순, 최대 3개)
 * featured: false → 아래 "전체 프로젝트" 목록에만 노출
 * link            → 상세 페이지(예: project-template.html을 복사해 만든 파일). 없으면 github로 연결
 * demo            → 배포된 서비스 주소(선택). 있으면 "라이브 서비스" 버튼이 표시됨
 * demoAccount     → 체험 계정 { id, password }(선택). 비밀번호는 가려진 채로 표시되고 눈 아이콘으로 보기
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
    tagline: '기간별 성능을 확인해, 발주 계획의 검토 기준선을 정했습니다.',
    period: '2026.09.21–09.30',
    team: '3인 팀',
    category: '머신러닝 · 서비스',
    tags: ['Python', 'LSTM', 'FastAPI', 'Dash', 'Gemini', 'Firebase'],
    cover: 'assets/demand-dashboard.png',
    coverAlt: '부품의 예측량과 기존 D+3 계획, 차이와 검토 방향을 함께 확인하는 BatteryFlow 공급망 화면',
    highlights: [
      { label: '문제', text: '최근 패턴과 다른 발주 계획을 어떻게 찾을까?' },
      { label: '내 역할', text: 'ERP 발주 계획량 분석·예측 · AI Copilot · FastAPI·Dash 구현·통합' },
      { label: '핵심 판단', text: '기간별 성능 변동을 확인하고, 예측을 기존 D+3 계획의 검토 기준선으로 사용했습니다.' },
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
    tagline: '거리만이 아니라, 도착했을 때 문이 열려 있는지까지.',
    period: '2026.09 · 보완 2026.10',
    team: '개인 프로젝트',
    category: '데이터 분석 · 공간 분석',
    tags: ['Python', 'pandas', 'SciPy', 'OSM', 'Leaflet'],
    cover: 'assets/busan-night-pharmacy/map-after.jpg',
    coverAlt: '수영우리약국 추가 전후 도로망 접근성 분석에서 새롭게 접근 가능한 수요 격자가 표시된 실제 지도 화면',
    highlights: [
      { label: '문제', text: '공공심야약국 한 곳을 더 지정한다면 어디를 먼저 검토할까?' },
      { label: '내 역할', text: '데이터 선정 · 운영시간 전처리 · 보행거리 기반 분석 기획' },
      { label: '핵심 판단', text: 'NMC로 월요일 결측을 보완하고, 가정에 따른 후보 순위 변화를 함께 제시했습니다.' },
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
    tagline: '기상의 시차를 찾아, 예측 입력의 시간 기준을 검증했습니다.',
    period: '2026.10.02–10.08', team: '점프업 · 3인 팀',
    category: '데이터 분석 · 머신러닝',
    tags: ['Python', 'pandas', 'LightGBM', 'scikit-learn', 'PyTorch'],
    cover: 'assets/power-forecast/06_model_comparison.png',
    coverAlt: '공동 실험의 Q1·Q2·Q3·LSTM 전체 오차와 고전력 오차 비교',
    highlights: [
      { label: '문제', text: '제공 과제의 지정 구간 전력 예측 · 피크 조건 분석 · 가동 조정 제안' },
      { label: '내 역할', text: '제조 데이터·근무 리듬 분석 · 울산 기상 대조·시차 검증 · 팀 결과 비교' },
      { label: '핵심 판단', text: '점심·저녁 전력 리듬을 대조해, 기상과 전력의 시간 기준을 각각 검증했습니다.' },
    ],
    link: 'power-forecast.html', featured: true, order: 3,
  },

];
