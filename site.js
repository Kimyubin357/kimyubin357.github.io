(() => {
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));
  const escapeHtml = (value = '') => String(value).replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  })[c]);
  const arrow = '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12h16M13 5l7 7-7 7"/></svg>';
  const external = '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 18 18 6M6 6h12v12"/></svg>';

  /* ---------- Projects (data from projects.js) ---------- */
  const projects = (window.PORTFOLIO_PROJECTS || []).slice();
  const featured = projects
    .filter((p) => p.featured)
    .sort((a, b) => (a.order ?? 99) - (b.order ?? 99))
    .slice(0, 3);
  const projectHref = (p) => p.link || p.github || '#';
  const isExternal = (href) => /^https?:/.test(href);
  const linkAttrs = (href) => (isExternal(href) ? ' target="_blank" rel="noopener noreferrer"' : '');
  const icons = {
    copy: '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V6a2 2 0 0 1 2-2h9"/></svg>',
    check: '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg>',
    eye: '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/></svg>',
    eyeOff: '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="m3 3 18 18M10.6 5.1Q11.3 5 12 5c6.4 0 10 7 10 7a17 17 0 0 1-3.1 4M6.6 6.6C3.7 8.5 2 12 2 12s3.6 7 10 7a9.6 9.6 0 0 0 5.4-1.6M9.9 9.9a3 3 0 0 0 4.2 4.2"/></svg>',
  };
  const MASK = '••••••••';
  const demoAccount = (account) => `
      <div class="demo-account">
        <p class="demo-title">체험 계정 <span>로그인하면 서비스를 직접 확인할 수 있습니다.</span></p>
        <dl>
          <div class="demo-row"><dt>아이디</dt><dd class="demo-value">${escapeHtml(account.id)}</dd>
            <dd class="demo-tools"><button type="button" class="icon-btn" data-copy="${escapeHtml(account.id)}" aria-label="아이디 복사">${icons.copy}</button></dd></div>
          <div class="demo-row"><dt>비밀번호</dt><dd class="demo-value" data-secret="${escapeHtml(account.password)}">${MASK}</dd>
            <dd class="demo-tools"><button type="button" class="icon-btn" data-reveal-secret aria-pressed="false" aria-label="비밀번호 보기">${icons.eye}</button><button type="button" class="icon-btn" data-copy="${escapeHtml(account.password)}" aria-label="비밀번호 복사">${icons.copy}</button></dd></div>
        </dl>
      </div>`;
  const tags = (list = []) => `<ul class="tag-list">${list.map((t) => `<li>${escapeHtml(t)}</li>`).join('')}</ul>`;

  function renderFeatured() {
    const list = $('#featured-list');
    if (!list || !featured.length) return;
    try {
      const markup = featured.map((p, i) => {
        const href = projectHref(p);
        const meta = [p.period, p.team].filter(Boolean).map(escapeHtml).join(' · ');
        return `
      <article class="feature-card" style="--i:${i}" data-stack data-reveal>
        <div class="feature-inner">
          <a class="feature-media" href="${escapeHtml(href)}"${linkAttrs(href)} tabindex="-1" aria-hidden="true">
            ${p.cover ? `<img src="${escapeHtml(p.cover)}" alt="${escapeHtml(p.coverAlt || '')}" loading="lazy">` : ''}
          </a>
          <div class="feature-body">
            <div class="feature-meta">
              <span class="feature-num">${String(i + 1).padStart(2, '0')}</span>
              ${p.category ? `<span class="feature-category">${escapeHtml(p.category)}</span>` : ''}
              ${meta ? `<span>${meta}</span>` : ''}
            </div>
            <h3><a href="${escapeHtml(href)}"${linkAttrs(href)}>${p.titleLines?.length ? p.titleLines.map(line => `<span class="project-title-line">${escapeHtml(line)}</span>`).join(' ') : escapeHtml(p.title)}</a></h3>
            ${p.tagline ? `<p class="feature-tagline">${escapeHtml(p.tagline)}</p>` : ''}
            ${p.highlights?.length ? `<dl class="feature-highlights">${p.highlights.map((h) => `<div><dt>${escapeHtml(h.label)}</dt><dd>${escapeHtml(h.text)}</dd></div>`).join('')}</dl>` : ''}
            ${tags(p.tags)}
            <div class="feature-actions">
              <a class="button" href="${escapeHtml(href)}"${linkAttrs(href)}>프로젝트 자세히 보기 ${arrow}</a>
              ${p.demo ? `<a class="button ghost" href="${escapeHtml(p.demo)}" target="_blank" rel="noopener noreferrer">라이브 서비스 ${external}</a>` : ''}
              ${p.github && p.github !== href ? `<a class="text-link ink" href="${escapeHtml(p.github)}" target="_blank" rel="noopener noreferrer">GitHub ${external}</a>` : ''}
            </div>
            ${p.demoAccount ? demoAccount(p.demoAccount) : ''}
          </div>
        </div>
      </article>`;
      }).join('');
      // Replace the static link only after all cards have been built successfully.
      list.innerHTML = markup;
    } catch (error) {
      console.warn('대표 프로젝트 카드를 표시하지 못해 기본 링크를 유지합니다.', error);
    }
  }

  function renderArchive() {
    const section = $('#archive');
    if (!section || projects.length <= featured.length) return;
    section.hidden = false;
    const grid = $('#archive-grid');
    const filters = $('#archive-filters');
    $('#archive-count').textContent = projects.length;

    grid.innerHTML = projects.map((p) => {
      const href = projectHref(p);
      return `
      <a class="archive-card" href="${escapeHtml(href)}"${linkAttrs(href)} data-category="${escapeHtml(p.category || '')}" data-reveal>
        <div class="archive-thumb">${p.cover ? `<img src="${escapeHtml(p.cover)}" alt="" loading="lazy">` : ''}</div>
        <div class="archive-body">
          <div class="archive-meta"><span>${escapeHtml(p.category || '')}</span><span>${escapeHtml(p.period || '')}</span></div>
          <h3>${escapeHtml(p.title)} ${isExternal(href) ? external : arrow}</h3>
          ${p.tagline ? `<p>${escapeHtml(p.tagline)}</p>` : ''}
          ${tags(p.tags)}
        </div>
      </a>`;
    }).join('');

    const categories = [...new Set(projects.map((p) => p.category).filter(Boolean))];
    if (categories.length < 2) return;
    filters.innerHTML = ['전체', ...categories]
      .map((c, i) => `<button type="button" class="filter${i === 0 ? ' is-active' : ''}" aria-pressed="${i === 0}" data-filter="${escapeHtml(i === 0 ? '' : c)}">${escapeHtml(c)}</button>`)
      .join('');
    filters.addEventListener('click', (event) => {
      const button = event.target.closest('.filter');
      if (!button) return;
      $$('.filter', filters).forEach((b) => {
        b.classList.toggle('is-active', b === button);
        b.setAttribute('aria-pressed', String(b === button));
      });
      const value = button.dataset.filter;
      $$('.archive-card', grid).forEach((card) => {
        card.hidden = Boolean(value) && card.dataset.category !== value;
      });
    });
  }

  renderFeatured();
  renderArchive();

  /* ---------- Demo account (password toggle + copy) ---------- */
  $$('[data-demo-account]').forEach((el) => {
    const project = projects.find((p) => p.id === el.dataset.demoAccount);
    if (project?.demoAccount) el.outerHTML = demoAccount(project.demoAccount);
  });
  document.addEventListener('click', (event) => {
    const toggle = event.target.closest('[data-reveal-secret]');
    if (toggle) {
      const value = $('[data-secret]', toggle.closest('.demo-row'));
      const show = toggle.getAttribute('aria-pressed') !== 'true';
      value.textContent = show ? value.dataset.secret : MASK;
      toggle.setAttribute('aria-pressed', String(show));
      toggle.setAttribute('aria-label', show ? '비밀번호 숨기기' : '비밀번호 보기');
      toggle.innerHTML = show ? icons.eyeOff : icons.eye;
      return;
    }
    const copy = event.target.closest('[data-copy]');
    if (!copy || !navigator.clipboard) return;
    navigator.clipboard.writeText(copy.dataset.copy).then(() => {
      const label = copy.getAttribute('aria-label');
      copy.innerHTML = icons.check;
      copy.classList.add('is-done');
      copy.setAttribute('aria-label', '복사했습니다');
      window.setTimeout(() => {
        copy.innerHTML = icons.copy;
        copy.classList.remove('is-done');
        copy.setAttribute('aria-label', label);
      }, 1600);
    }).catch(() => {});
  });

  /* ---------- Reveal on scroll ---------- */
  const revealTargets = $$('[data-reveal]');
  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealTargets.forEach((el) => el.classList.add('is-visible'));
  } else {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        el.classList.add('is-visible');
        revealObserver.unobserve(el);
        // Hand transitions back to the element's own hover styles once revealed.
        window.setTimeout(() => {
          el.removeAttribute('data-reveal');
          el.removeAttribute('data-delay');
          el.classList.remove('is-visible');
        }, 1500);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
    revealTargets.forEach((el) => revealObserver.observe(el));
  }
  requestAnimationFrame(() => document.documentElement.classList.add('is-loaded'));
  // The inline head script un-hides everything if this flag never gets set.
  window.__siteReady = true;

  /* ---------- Scroll-linked effects ---------- */
  const header = $('.site-header');
  const progress = $('.scroll-progress');
  const parallaxItems = $$('[data-parallax]');
  const videoScale = $('[data-video-scale]');
  const stackCards = $$('[data-stack]');
  let ticking = false;

  function onScroll() {
    ticking = false;
    const y = window.scrollY;
    const vh = window.innerHeight;
    const max = document.documentElement.scrollHeight - vh;
    header?.classList.toggle('is-scrolled', y > 8);
    if (progress) progress.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
    if (reduceMotion) return;

    parallaxItems.forEach((el) => {
      const rect = el.getBoundingClientRect();
      const offset = (rect.top + rect.height / 2 - vh / 2) * Number(el.dataset.parallax || 0);
      el.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
    });

    if (videoScale) {
      const rect = videoScale.getBoundingClientRect();
      // 0 when the video's top enters the viewport bottom, 1 when it reaches 25% from the top.
      const p = clamp((vh - rect.top) / (vh * 0.75));
      videoScale.style.setProperty('--vp', p.toFixed(3));
    }

    stackCards.forEach((card, i) => {
      const next = stackCards[i + 1];
      if (!next) return;
      const p = clamp(1 - (next.getBoundingClientRect().top - 120) / (vh * 0.7));
      card.style.setProperty('--stack', p.toFixed(3));
    });
  }
  const requestTick = () => {
    if (!ticking) { ticking = true; requestAnimationFrame(onScroll); }
  };
  window.addEventListener('scroll', requestTick, { passive: true });
  window.addEventListener('resize', requestTick);
  onScroll();

  /* ---------- Active nav link ---------- */
  const navLinks = $$('nav a[href^="#"]');
  if (navLinks.length && 'IntersectionObserver' in window) {
    const sections = navLinks.map((a) => $(a.getAttribute('href'))).filter(Boolean);
    const navObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((a) => a.classList.toggle('is-active', a.getAttribute('href') === `#${entry.target.id}`));
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach((s) => navObserver.observe(s));
  }

  /* ---------- Interview video ---------- */
  const frame = $('#interview-player');
  if (!frame) return;
  const cover = $('#play-interview');
  const soundButton = $('#sound-toggle');
  const videoId = frame.dataset.videoId;
  const start = Number(frame.dataset.start || 0);
  const end = Number(frame.dataset.end || 0);
  const watchUrl = `https://www.youtube.com/watch?v=${videoId}&t=${start}s`;
  // YouTube refuses embeds without an http(s) origin (e.g. opening index.html directly).
  const canEmbed = /^https?:$/.test(location.protocol);
  let player = null;
  let inView = false;
  let autoMode = !reduceMotion;
  let apiPromise = null;
  let creating = false;
  let playerReady = false;
  let pendingUserPlay = false;
  let gaveUp = false;
  let fallbackTimer = null;
  let loopTimer = null;

  function useFallbackLink() {
    if (gaveUp) return;
    gaveUp = true;
    creating = false;
    playerReady = false;
    pendingUserPlay = false;
    window.clearTimeout(fallbackTimer);
    window.clearInterval(loopTimer);
    loopTimer = null;
    if (player) { try { player.destroy(); } catch (_) { /* ignore */ } player = null; }
    frame.classList.remove('is-loading', 'is-playing', 'is-ready');
    soundButton.hidden = true;
    const link = document.createElement('a');
    link.className = 'video-cover';
    link.href = watchUrl;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.setAttribute('aria-label', 'YouTube에서 SBS 인터뷰 35초부터 보기');
    link.innerHTML = cover.innerHTML;
    $('.video-subtitle', link).textContent = 'YouTube에서 출연 구간 보기';
    const current = $('.video-cover', frame);
    current?.replaceWith(link);
    const note = $('.interview figcaption > span');
    if (note) note.lastChild.textContent = '김유빈 출연 구간 00:35–00:59';
  }

  function loadApi() {
    if (apiPromise) return apiPromise;
    apiPromise = new Promise((resolve, reject) => {
      if (window.YT?.Player) { resolve(window.YT); return; }
      const previous = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => { previous?.(); resolve(window.YT); };
      const script = document.createElement('script');
      script.src = 'https://www.youtube.com/iframe_api';
      script.onerror = reject;
      document.head.append(script);
    });
    return apiPromise;
  }

  function watchClipEnd() {
    window.clearInterval(loopTimer);
    loopTimer = window.setInterval(() => {
      if (gaveUp || !playerReady || !player?.getCurrentTime) return;
      if (player.getCurrentTime() >= end - 0.2) {
        player.seekTo(start, true);
        if (autoMode && inView && player.isMuted()) {
          player.playVideo();
        } else {
          player.pauseVideo();
        }
      }
    }, 250);
  }

  function playFromStart() {
    if (gaveUp || !playerReady) return;
    pendingUserPlay = false;
    player.unMute();
    player.setVolume(100);
    player.seekTo(start, true);
    player.playVideo();
    soundButton.hidden = true;
  }

  function requestUserPlay() {
    if (gaveUp) return;
    autoMode = false;
    pendingUserPlay = true;
    if (playerReady) playFromStart();
    else createPlayer(false);
  }

  function createPlayer(muted) {
    if (player || creating || gaveUp) return;
    creating = true;
    frame.classList.add('is-loading');
    fallbackTimer = window.setTimeout(useFallbackLink, 10000);
    loadApi().then((YT) => {
      // The 10s fallback may already have replaced the player with a link.
      if (gaveUp) return;
      player = new YT.Player('interview-yt', {
        videoId,
        playerVars: {
          start, end, autoplay: 0, mute: muted ? 1 : 0, playsinline: 1, rel: 0,
          controls: 1, modestbranding: 1, origin: location.origin,
        },
        events: {
          onReady(event) {
            if (gaveUp) return;
            window.clearTimeout(fallbackTimer);
            creating = false;
            playerReady = true;
            frame.classList.remove('is-loading');
            frame.classList.add('is-ready');
            const iframe = event.target.getIframe();
            iframe.title = 'SBS 8뉴스 — 김유빈 부트캠프 인터뷰 (35초–59초)';
            if (pendingUserPlay) {
              playFromStart();
            } else if (autoMode) {
              event.target.mute();
              soundButton.hidden = false;
              if (inView) event.target.playVideo();
            }
          },
          onStateChange(event) {
            if (gaveUp || !playerReady) return;
            if (event.data === YT.PlayerState.PLAYING) {
              if (autoMode && !inView) {
                event.target.pauseVideo();
                return;
              }
              frame.classList.add('is-playing');
              watchClipEnd();
            } else {
              window.clearInterval(loopTimer);
              loopTimer = null;
              if (event.data === YT.PlayerState.ENDED) {
                event.target.seekTo(start, true);
                if (autoMode && inView && event.target.isMuted()) event.target.playVideo();
                else event.target.pauseVideo();
              }
            }
          },
          onError() {
            if (gaveUp) return;
            useFallbackLink();
          },
        },
      });
    }).catch(() => {
      useFallbackLink();
    });
  }

  if (!canEmbed) {
    useFallbackLink();
    return;
  }

  if (reduceMotion) {
    const note = $('.interview figcaption > span');
    if (note) note.lastChild.textContent = '김유빈 출연 구간 00:35–00:59';
  }

  cover.addEventListener('click', requestUserPlay);
  soundButton.addEventListener('click', requestUserPlay);

  if ('IntersectionObserver' in window) {
    new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        inView = entry.isIntersecting && entry.intersectionRatio >= 0.45;
        if (inView && autoMode) {
          if (!player) createPlayer(true);
          else if (playerReady) player.playVideo();
        } else if (!inView && playerReady) {
          player.pauseVideo();
        }
      });
    }, { threshold: [0, 0.45] }).observe(frame);
  }
})();
