(() => {
  const image = document.getElementById('accessibility-view');
  const original = document.getElementById('accessibility-original');
  const caption = document.getElementById('accessibility-caption');
  const buttons = Array.from(document.querySelectorAll('[data-map-state]'));
  if (!image || !original || !caption || !buttons.length) return;
  const states = {
    before: {
      src: 'assets/busan-night-pharmacy/map-before.jpg',
      alt: '후보 추가 전: 기존 공급으로 접근하기 어려운 잠재수요가 붉은 격자로 표시된 지도',
      caption: '현재 공급: 붉은 격자는 기존 약국으로 접근하기 어려운 잠재수요입니다.',
    },
    after: {
      src: 'assets/busan-night-pharmacy/map-after.jpg',
      alt: '후보 추가 후: 수영우리약국으로 새롭게 접근 가능한 격자가 초록으로, 기존 미상에서 가정상 접근으로 바뀐 격자가 파랑으로 표시된 지도',
      caption: '후보 1곳 추가 후: 새롭게 접근 가능한 격자가 초록으로 바뀝니다. 파랑은 기존 미상에서 가정상 접근으로 바뀐 격자입니다.',
    },
  };
  buttons.forEach((button) => {
    button.disabled = false;
    button.addEventListener('click', () => {
      const state = states[button.dataset.mapState];
      if (!state) return;
      buttons.forEach((item) => item.setAttribute('aria-pressed', String(item === button)));
      image.src = state.src;
      image.alt = state.alt;
      original.href = state.src;
      caption.textContent = state.caption;
    });
  });
})();
