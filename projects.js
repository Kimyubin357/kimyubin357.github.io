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
    tagline: '제조 데이터를, 계획 검토와 의사결정으로.',
    period: '2026.09.21–09.30',
    team: '3인 팀',
    category: '머신러닝 · 서비스',
    tags: ['Python', 'LSTM', 'FastAPI', 'Dash', 'Gemini', 'Firebase'],
    cover: 'assets/demand-dashboard.png',
    coverAlt: '부품의 예측량과 기존 D+3 계획, 차이와 검토 방향을 함께 확인하는 BatteryFlow 공급망 화면',
    highlights: [
      { label: '문제', text: '최근 패턴과 다른 발주 계획을 어떻게 찾을까?' },
      { label: '내 역할', text: '발주량 예측 · AI Copilot · FastAPI · Dash 구현·통합' },
      { label: '핵심 판단', text: '9가지 방법을 비교하고, 계획 검토 기준선을 설계했습니다.' },
    ],
    link: 'batteryflow.html',
    github: 'https://github.com/Kimyubin357/Batteryflow-ML-Platform',
    demo: 'https://batteryflow-u6lb5fm2vq-du.a.run.app/login',
    demoAccount: { id: 'admin@gmail.com', password: 'admin1234' },
    featured: true,
    order: 1,
  },
];
