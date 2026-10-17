/* BatteryFlow 라이브 서비스 중간 로딩: 서버(Cloud Run)를 깨우고 응답이 오면 로그인 화면으로 이동한다. */
(() => {
  const root = document.querySelector('[data-wake]');
  if (!root) return;
  const target = root.dataset.target;
  const slowAfter = Number(root.dataset.slowAfter || 60);
  const ATTEMPT_TIMEOUT = 45000; // 한 번의 요청이 이보다 오래 걸리면 다시 요청
  const RETRY_DELAY = 2000;
  const COUNTDOWN = 3;
  const steps = Array.from(root.querySelectorAll('.wake-steps li'));
  const secEls = root.querySelectorAll('[data-sec]');
  const countEl = root.querySelector('[data-count]');
  const countdownText = root.querySelector('[data-countdown-text]');
  const pausedText = root.querySelector('[data-paused-text]');
  const startedAt = Date.now();
  let state = 'wait';
  let ready = false;
  let attempt = 0;
  let countdownTimer = null;
  let countdownPaused = false;
  let readyAt = 0;
  let slowBase = 0; // '다시 확인하기'를 누르면 느림 판정 시간을 다시 센다

  const elapsed = () => (Date.now() - startedAt) / 1000;

  function setStep(done) {
    steps.forEach((li, i) => {
      li.classList.toggle('is-done', i < done);
      li.classList.toggle('is-now', i === done);
    });
  }

  function setState(next) {
    state = next;
    root.classList.toggle('is-ready', next === 'ready');
    root.classList.toggle('is-slow', next === 'slow');
  }

  function tick() {
    const t = elapsed();
    secEls.forEach((el) => { el.textContent = Math.floor(ready ? readyAt : t); });
    if (ready) return;
    // 서버 응답 전에는 92%까지만 천천히 차오른다.
    const p = Math.min(92, 92 * (1 - Math.exp(-t / 12)));
    root.style.setProperty('--p', `${p.toFixed(1)}%`);
    if (t - slowBase >= slowAfter && state === 'wait') setState('slow');
  }

  function go() { window.location.href = target; }

  function onReady() {
    if (ready) return;
    ready = true;
    readyAt = elapsed();
    root.style.setProperty('--p', '100%');
    setState('ready');
    setStep(2);
    tick();
    let left = COUNTDOWN;
    if (countEl) countEl.textContent = left;
    countdownTimer = window.setInterval(() => {
      if (countdownPaused) return;
      left -= 1;
      if (countEl) countEl.textContent = Math.max(left, 0);
      if (left <= 0) {
        window.clearInterval(countdownTimer);
        setStep(3);
        go();
      }
    }, 1000);
  }

  // 체험 계정을 복사·확인하는 동안에는 자동 이동을 멈춘다.
  root.addEventListener('click', (event) => {
    if (!ready || countdownPaused) return;
    if (event.target.closest('.demo-account')) {
      countdownPaused = true;
      if (countdownText) countdownText.hidden = true;
      if (pausedText) pausedText.hidden = false;
    }
  });

  function check() {
    if (ready) return;
    attempt += 1;
    const controller = 'AbortController' in window ? new AbortController() : null;
    const timer = window.setTimeout(() => controller?.abort(), ATTEMPT_TIMEOUT);
    // no-cors 요청은 내용을 읽을 수 없지만, 서버가 응답을 보내면 완료된다(= 인스턴스가 켜짐).
    fetch(`${target}${target.includes('?') ? '&' : '?'}wake=${Date.now()}`, {
      mode: 'no-cors', cache: 'no-store', credentials: 'omit', signal: controller?.signal,
    }).then(() => {
      window.clearTimeout(timer);
      onReady();
    }).catch(() => {
      window.clearTimeout(timer);
      if (!ready) window.setTimeout(check, RETRY_DELAY);
    });
  }

  root.querySelector('[data-retry]')?.addEventListener('click', () => {
    if (ready) return;
    slowBase = elapsed();
    setState('wait');
    check();
  });

  setStep(0);
  window.setTimeout(() => { if (!ready) setStep(1); }, 400);
  window.setInterval(tick, 500);
  tick();
  check();
})();
