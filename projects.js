/*
 * 프로젝트 목록 — 여기에 항목을 추가하면 아래 "전체 프로젝트"에 자동으로 나타납니다.
 *
 * link            → 상세 페이지(예: project-template.html을 복사해 만든 파일). 없으면 github로 연결
 * demo            → 배포된 서비스 주소(선택). 메인 카드에는 표시하지 않음 — 상세 페이지의 "라이브 서비스 열기" 버튼에 직접 넣는다
 * demoAccount     → 체험 계정 { id, password }(선택). 상세 페이지의 <div data-demo-account="id">에만 표시 (메인 카드에는 표시 안 함)
 * 메인 카드에는 "프로젝트 자세히 보기" 버튼 하나만 표시된다.
 *
 * 대표 프로젝트는 아래 PORTFOLIO_TRACKS(직무 트랙 탭)에서 고른다. 트랙마다 프로젝트 3개와
 * 카드 문구(tagline·highlights)를 따로 줄 수 있고, 주지 않으면 이 목록의 값을 쓴다.
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
 * },
 */
window.PORTFOLIO_PROJECTS = [
  {
    id: 'instadatemap',
    title: 'InstaDateMap',
    tagline: '인스타 링크 하나를, 둘이 함께 쓰는 지도의 핀으로 만들었습니다.',
    period: '2026.10.21 – 운영 중',
    team: '개인 프로젝트',
    category: '웹 서비스',
    tags: ['Next.js', 'React', 'TypeScript', 'Supabase', 'Gemini', 'Vercel'],
    cover: 'assets/instadatemap/cover.jpg',
    coverAlt: 'Gemini가 게시물에서 찾은 장소를 확인하는 화면, 서울을 구 단위로 묶은 지도, 장소 상세와 상태 4종을 보여 주는 InstaDateMap 휴대폰 화면 세 장',
    highlights: [
      { label: '문제', text: 'DM으로 주고받은 가게 링크가 대화 속에 쌓이기만 했다' },
      { label: '내 역할', text: '기획 · 설계 · 구현 · 배포 · 운영 (구현은 AI 코딩 도구)' },
      { label: '결과', text: '3일 만에 운영 배포 · 두 사람이 47곳을 모아 쓰는 중 · 자동화 테스트 533개' },
    ],
    link: 'instadatemap.html',
    github: 'https://github.com/Kimyubin357/InstaDateMap',
  },
  {
    id: 'batteryflow',
    title: 'BatteryFlow AI',
    tagline: '9가지 방법을 비교하고, 원본을 다시 대조해 처음 결론을 바로잡은 뒤 계획 검토 서비스로 만들었습니다.',
    period: '2026.09.21–09.30',
    team: '3인 팀',
    category: '머신러닝 · 서비스',
    tags: ['Python', 'XGBoost', 'FastAPI', 'Dash', 'Gemini', 'Firebase'],
    cover: 'assets/demand-dashboard-v3.png',
    coverAlt: '부품의 예측량과 기존 D+3 계획, 차이와 검토 방향을 함께 확인하는 BatteryFlow 공급망 화면',
    highlights: [
      { label: '문제', text: '최근 패턴과 다른 발주 계획을 어떻게 찾을까?' },
      { label: '내 역할', text: '발주량 예측 · FastAPI·Dash 서비스 · AI Copilot' },
      { label: '결과', text: '이월 의심일 17일을 보정해 처음 결론을 철회 · XGBoost 예측과 기존 계획을 한 화면에' },
    ],
    link: 'batteryflow.html',
    github: 'https://github.com/Kimyubin357/Batteryflow-ML-Platform',
    demo: 'https://batteryflow-u6lb5fm2vq-du.a.run.app/login',
    demoAccount: { id: 'admin@gmail.com', password: 'admin1234' },
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
  },
  {
    id: 'power-forecast',
    title: '제조 전력 예측과 피크 사전경보',
    titleLines: ['제조 전력 예측과', '피크 사전경보'],
    tagline: '기상 데이터의 1시간 어긋남을 찾아, 예측에 미래 정보가 섞이는 것을 막았습니다.',
    period: '2026.10.02–10.08', team: '경진대회 · 3인 팀',
    category: '데이터 분석 · 머신러닝',
    tags: ['Python', 'pandas', 'LightGBM', 'scikit-learn', 'PyTorch'],
    cover: 'assets/power-forecast/06_model_comparison.png',
    coverAlt: '9월 평가에서 기준·제출·피크 특화·LSTM 모델의 전체 오차와 피크 구간 오차 막대 비교. 전체 오차는 제출 모델 5.99, 피크 구간 오차는 피크 특화 모델 7.11이 가장 낮음',
    highlights: [
      { label: '문제', text: '공장 전력을 15분 단위로 예측하고 피크 전에 경보하기 (경진대회 과제)' },
      { label: '내 역할', text: '팀장 · 데이터 검증 · 평가 기준 설계' },
      { label: '결과', text: '기상을 공식 관측과 99.84% 대조해 입력 수정 · 팀 제출 모델 전체 오차 5.1% 감소 · 위험 피크 56건 모두 사전 경보' },
    ],
    link: 'power-forecast.html',
  },
  {
    id: 'xmen',
    title: 'X-MEN 동물 X-ray 자세 판별',
    titleLines: ['X-MEN', '동물 X-ray 자세 판별'],
    tagline: '흉골과 척추를 헷갈리던 오탐을, 라벨 방식을 바꿔 줄였습니다.',
    period: '2024.09–12',
    team: '수업 3인 팀 · 수의학과 협력',
    category: '컴퓨터 비전',
    tags: ['Python', 'YOLOv8', 'YOLO11', 'OpenCV', 'labelme'],
    cover: 'assets/xmen/cover.jpg',
    coverAlt: '정상 X-ray 사진에서 바운딩박스 모델은 척추를 T2로 잘못 잡고, 척추 클래스를 추가한 세그멘테이션 모델은 척추만 잡는 단계별 비교',
    highlights: [
      { label: '문제', text: '정상 사진에서도 척추를 흉골 정렬 이상(T2)으로 잡았다' },
      { label: '내 역할', text: 'T2 탐지 모델 · 세그멘테이션 라벨 제작 · 학습과 실험' },
      { label: '결과', text: '척추를 별도 클래스로 분리 → T2 Precision 0.863 → 0.963, mAP50-95 0.32 → 0.55' },
    ],
    link: 'xmen.html',
  },
];

/*
 * 직무 트랙 탭 — 메인 "대표 프로젝트"를 트랙별로 보여 준다.
 * 주소에 ?track=<id>를 붙이면 그 탭이 먼저 열린다(지원처마다 다른 링크를 쓸 수 있음). 없으면 첫 트랙.
 *
 * role, intro  → 표지의 직함 줄과 소개 문장(트랙을 바꾸면 함께 바뀜)
 * note         → 대표 프로젝트 제목 아래 한 줄
 * evidence     → 요구 역량 → 근거 줄. href가 있으면 상세 페이지의 해당 위치로 연결
 * projects     → { id, tagline?, highlights? } 3개. 문구를 주지 않으면 PORTFOLIO_PROJECTS 값을 쓴다
 */
window.PORTFOLIO_TRACKS = [
  {
    id: 'dev',
    label: '서비스 개발 · 운영',
    role: '웹 서비스 개발 · 운영',
    intro: '요구사항을 정리해 Next.js·FastAPI·SQL로 구현하고,<br class="desktop-break"> 배포한 서비스를 운영하며 생긴 문제를 고칩니다.',
    note: '기획하고, 만들어 배포한 뒤, 운영하며 고쳐 온 서비스입니다.',
    evidence: [
      { need: '기획부터 개발·배포·운영까지', proof: 'InstaDateMap을 혼자 기획해 3일 만에 배포하고 4주째 운영', href: 'instadatemap.html#overview' },
      { need: '프론트엔드 UI와 백엔드 API 연동', proof: 'Next.js 화면과 API 라우트 20개 · FastAPI·Dash 대시보드', href: 'instadatemap.html#pipeline' },
      { need: 'SQL과 데이터베이스 설계', proof: 'PostgreSQL 마이그레이션 10단계 · SQL 함수 트랜잭션 · 모든 테이블 행 단위 접근제어', href: 'instadatemap.html#data' },
      { need: '오류 분석과 트러블슈팅', proof: '지도 카드 무반응, Copilot 순위 누락을 원인부터 찾아 수정', href: 'instadatemap.html#trouble' },
      { need: '생성형 AI와 AI 코딩 도구 활용', proof: 'LLM 장소 추출 · RAG Copilot. 구현은 AI 도구, 명세와 검증은 직접', href: 'batteryflow.html#copilot-title' },
    ],
    projects: [
      { id: 'instadatemap' },
      {
        id: 'batteryflow',
        tagline: 'AI Copilot의 순위 오류를 서버 규칙으로 고정하고, 예측 API와 대시보드를 배포했습니다.',
        highlights: [
          { label: '문제', text: 'LLM에 순위를 맡기자 계획보다 크게 줄어든 부품을 빠뜨렸다' },
          { label: '내 역할', text: 'FastAPI·Dash 서비스 · AI Copilot 구현과 통합 · Cloud Run 배포' },
          { label: '결과', text: '순위와 수치는 서버가 확정하고 LLM은 설명만 · 대시보드와 Copilot이 같은 정렬 함수 사용' },
        ],
      },
      {
        id: 'busan-night-pharmacy',
        tagline: '공간 분석 결과를, 시민이 지금 열린 약국을 찾는 화면으로 배포했습니다.',
        highlights: [
          { label: '문제', text: '밤에 지금 열려 있는 약국을 어떻게 찾고, 어디를 더 지정할까?' },
          { label: '내 역할', text: '개인 프로젝트 · 데이터 전처리 · 분석 기획 · 시민용 화면 배포' },
          { label: '결과', text: '1,716곳을 지역·영업 중·심야로 거르는 모바일 화면 · 첫 화면 필수 파일 88% 감소' },
        ],
      },
    ],
  },
  {
    id: 'data',
    label: '데이터 분석 · AI',
    role: '데이터 분석 · 머신러닝',
    intro: '데이터가 맞는지 먼저 확인하고 모델을 비교해,<br class="desktop-break"> 결과를 활용할 수 있는 API와 대시보드까지 구현합니다.',
    note: '문제에 맞는 데이터와 방법을 선택하고, 결과를 활용할 수 있는 화면으로 연결했습니다.',
    evidence: [
      { need: '평가 데이터 검증', proof: '휴일 이월 의심일 17일을 찾아 재평가하고 처음 결론을 철회', href: 'batteryflow.html#model-title' },
      { need: '모델 비교와 시간순 검증', proof: '9가지 예측 방법을 같은 시간순 교차검증 범위에서 비교', href: 'batteryflow.html#model-title' },
      { need: '입력 데이터 정합성', proof: '기상 자료를 공식 관측과 대조해 1시간 밀림(미래 정보 누수) 수정', href: 'power-forecast.html' },
      { need: 'LLM과 RAG', proof: '근거 문서는 벡터 검색, 순위와 수치는 서버 규칙으로 확정', href: 'batteryflow.html#copilot-title' },
      { need: '컴퓨터 비전', proof: '세그멘테이션 라벨을 직접 만들고 척추를 별도 클래스로 분리', href: 'xmen.html#labels' },
    ],
    projects: [
      { id: 'batteryflow' },
      { id: 'power-forecast' },
      { id: 'xmen' },
    ],
  },
];
