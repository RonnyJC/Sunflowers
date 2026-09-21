(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const rand = (a, b) => a + Math.random() * (b - a);

  /* ---------- Girasol reutilizable ---------- */
  (function buildSunflower() {
    const N = 16;
    let h = '';
    for (let i = 0; i < N; i++) h += `<use href="#petal" fill="url(#gPetalBack)" transform="rotate(${(i * 360 / N).toFixed(2)})"/>`;
    for (let i = 0; i < N; i++) {
      const a = ((i + .5) * 360 / N).toFixed(2);
      h += `<g transform="rotate(${a}) scale(.9)"><use href="#petal" fill="url(#gPetalFront)"/><use href="#vein"/></g>`;
    }
    h += `<circle r="37" fill="#8a5410"/>`;
    h += `<circle r="33" fill="url(#gCenter)"/>`;
    // semillas en espiral (ángulo áureo)
    for (let i = 1; i < 75; i++) {
      const r = 3.5 * Math.sqrt(i), a = i * 137.508 * Math.PI / 180;
      h += `<circle cx="${(r * Math.cos(a)).toFixed(1)}" cy="${(r * Math.sin(a)).toFixed(1)}" r="1.4" fill="#b07a25" opacity=".45"/>`;
    }
    h += `<circle r="36" fill="none" stroke="#d29a2c" stroke-width="1.6" opacity=".45"/>`;
    $('#sf').innerHTML = h;
  })();

  /* ---------- Flores, tallos y hojas ---------- */
  const flowers = [
    // x,  y,   escala, rot, retraso(s), atrás
    [215, 178, .60, 12, 3.95, 1],
    [300, 108, .64, 0, 4.10, 1],
    [388, 172, .60, -14, 4.25, 1],
    [200, 258, .66, 5, 4.40, 1],
    [402, 252, .66, -8, 4.55, 1],
    [262, 322, .40, 20, 4.70, 0],
    [340, 322, .40, -10, 4.80, 0],
    [300, 236, .82, 15, 4.95, 0]
  ];
  let fl = '', st = '';
  flowers.forEach(([x, y, s, r, d, back], i) => {
    const my = (356 + y) / 2;
    st += `<path class="stem" pathLength="1" style="--d:${(d - .35).toFixed(2)}s" d="M300,356 C300,${my + 24} ${x},${my} ${x},${y}" fill="none" stroke="#2e7d32" stroke-width="${back ? 5 : 6}" stroke-linecap="round"/>`;
    fl += `<g transform="translate(${x} ${y})"><g class="bloom ${back ? 'dim' : ''}" style="--d:${d}s"><g class="sway" style="--sd:-${(i * .7).toFixed(1)}s"><use href="#sf" transform="scale(${s}) rotate(${r})"/></g></g></g>`;
  });
  $('#stems').innerHTML = st;
  $('#flowers').innerHTML = fl;

  const leaves = [
    [232, 214, -150, .8, 3.8], [372, 206, -30, .85, 3.9],
    [255, 150, -125, .7, 3.9], [348, 150, -55, .7, 4.0],
    [300, 300, -100, .7, 4.0], [250, 300, -160, .6, 4.1], [352, 300, -20, .6, 4.1]
  ];
  $('#leaves').innerHTML = leaves.map(([x, y, r, s, d]) =>
    `<g class="leaf" style="--d:${d}s"><use href="#leaf" transform="translate(${x} ${y}) rotate(${r}) scale(${s})"/></g>`
  ).join('');

  /* ---------- Pasto ---------- */
  (function buildGrass() {
    const cols = ['#123f1d', '#1e5f2a', '#2e8a3b', '#3aa44a'];
    let g = '';
    const blade = x => {
      const h = rand(70, 190), lean = rand(-34, 34), c = cols[Math.floor(Math.random() * cols.length)];
      const d = `M${x},620 Q${x + lean * .3},${620 - h * .6} ${x + lean},${620 - h}`;
      return `<path class="blade" style="transform-origin:${x}px 620px;--bd:${rand(3, 5.5).toFixed(1)}s;--bdel:-${rand(0, 4).toFixed(1)}s" d="${d}" fill="none" stroke="${c}" stroke-width="${rand(2.4, 4.2).toFixed(1)}" stroke-linecap="round"/>`;
    };
    for (let i = 0; i < 26; i++) g += blade(rand(10, 200));
    for (let i = 0; i < 26; i++) g += blade(rand(400, 590));
    $('#grass').innerHTML = g;
  })();

  /* ---------- Estrellas y mariposas ---------- */
  (function ambience() {
    let s = '';
    for (let i = 0; i < 46; i++) {
      s += `<span class="star" style="left:${rand(0, 100).toFixed(1)}%;top:${rand(0, 100).toFixed(1)}%;--dur:${rand(3, 7).toFixed(1)}s;--del:-${rand(0, 6).toFixed(1)}s;${Math.random() > .8 ? 'width:3px;height:3px;' : ''}"></span>`;
    }
    $('#stars').innerHTML = s;

    let b = '';
    for (let i = 0; i < 14; i++) {
      b += `<span class="bf" style="left:${rand(4, 94).toFixed(1)}%;top:${rand(14, 88).toFixed(1)}%;--sz:${rand(11, 19).toFixed(0)}px;--dx:${rand(-16, 16).toFixed(1)}vw;--dy:${rand(-14, 14).toFixed(1)}vh;--dur:${rand(7, 14).toFixed(1)}s;--del:-${rand(0, 10).toFixed(1)}s"><i></i><i></i></span>`;
    }
    $('#fly').innerHTML = b;
  })();

  /* ---------- Ilustraciones de los gatitos ---------- */
  function cat(x, y, fur, o = {}) {
    const s = o.s || 1, belly = o.belly || fur, ear = o.ear || '#f4b6b6';
    return `<g transform="translate(${x} ${y}) scale(${s})">
      <ellipse cx="0" cy="48" rx="34" ry="30" fill="${fur}"/>
      <ellipse cx="0" cy="54" rx="20" ry="17" fill="${belly}" opacity=".9"/>
      <path d="M-42,-10 Q-44,-50 -34,-54 Q-18,-44 -8,-34 Z" fill="${fur}"/>
      <path d="M42,-10 Q44,-50 34,-54 Q18,-44 8,-34 Z" fill="${fur}"/>
      <path d="M-35,-26 Q-35,-44 -32,-46 Q-24,-40 -18,-34 Z" fill="${ear}"/>
      <path d="M35,-26 Q35,-44 32,-46 Q24,-40 18,-34 Z" fill="${ear}"/>
      <ellipse cx="0" cy="0" rx="46" ry="37" fill="${fur}"/>
      ${o.patch ? `<ellipse cx="${o.patch}" cy="-14" rx="16" ry="12" fill="${o.patchColor || '#fff'}" opacity=".55"/>` : ''}
      <ellipse cx="-17" cy="3" rx="3.8" ry="4.6" fill="#2b2320"/>
      <ellipse cx="17" cy="3" rx="3.8" ry="4.6" fill="#2b2320"/>
      <circle cx="-15.8" cy="1.4" r="1.3" fill="#fff"/><circle cx="18.2" cy="1.4" r="1.3" fill="#fff"/>
      <ellipse cx="-29" cy="13" rx="8" ry="5" fill="#f79aa6" opacity=".55"/>
      <ellipse cx="29" cy="13" rx="8" ry="5" fill="#f79aa6" opacity=".55"/>
      <ellipse cx="0" cy="10" rx="3" ry="2.2" fill="#e58a8a"/>
      <path d="M-5,15 Q-2.5,19 0,15 Q2.5,19 5,15" fill="none" stroke="#5a4640" stroke-width="1.3" stroke-linecap="round"/>
      <ellipse cx="-15" cy="72" rx="10" ry="7" fill="${belly}"/><ellipse cx="15" cy="72" rx="10" ry="7" fill="${belly}"/>
    </g>`;
  }
  const heart = 'M150,208 C112,178 118,138 146,138 C158,138 150,152 150,152 C150,152 142,138 154,138 C182,138 188,178 150,208Z';
  const heartPath = 'M150,206 C106,172 116,128 148,130 C154,130 150,138 150,142 C150,138 146,130 152,130 C184,128 194,172 150,206Z';

  $('#pic1').innerHTML = `<svg viewBox="0 0 300 360" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <rect width="150" height="360" fill="#7dd0f4"/><rect x="150" width="150" height="360" fill="#f7dcdc"/>
    <g class="heart-beat"><path d="${heartPath}" fill="#ee5148"/><path d="M128,150 Q134,142 142,146" stroke="#fff" stroke-opacity=".5" stroke-width="4" fill="none" stroke-linecap="round"/></g>
    <g class="bob">${cat(92, 262, '#948d88', { belly: '#c9c3be', s: .95 })}</g>
    <g class="bob" style="animation-delay:-1.2s">${cat(210, 262, '#ffffff', { belly: '#fff', s: .95 })}</g>
  </svg>`;

  $('#pic2').innerHTML = `<svg viewBox="0 0 300 360" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <rect width="150" height="360" fill="#d9e8ee"/><rect x="150" width="150" height="360" fill="#f7e6e6"/>
    <g class="heart-beat"><path d="${heartPath}" fill="#ee5148"/><path d="M128,150 Q134,142 142,146" stroke="#fff" stroke-opacity=".5" stroke-width="4" fill="none" stroke-linecap="round"/></g>
    <g class="bob">${cat(92, 262, '#bf9f85', { belly: '#e2cdb9', s: .95, patch: -8, patchColor: '#a5836a' })}</g>
    <g class="bob" style="animation-delay:-1.2s">${cat(210, 262, '#fffdf9', { belly: '#fff', s: .95 })}</g>
  </svg>`;

  $('#pic3').innerHTML = `<svg viewBox="0 0 300 360" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <rect width="300" height="360" fill="#f6ecc9"/>
    <ellipse cx="150" cy="330" rx="130" ry="22" fill="#e6d8a8" opacity=".7"/>
    <g class="bob" style="animation-delay:-.6s">${cat(196, 250, '#7d6e6a', { belly: '#a89893', s: .8, ear: '#d9a3a3' })}</g>
    <rect x="178" y="292" width="30" height="46" rx="5" fill="#5fb0e0" stroke="#3b86b5" stroke-width="2"/>
    <rect x="182" y="297" width="22" height="30" rx="2" fill="#bfe6fa"/>
    <g>
      <circle cx="220" cy="150" r="26" fill="#f48fb1"/>
      <path d="M198,146 Q220,132 242,146 M196,158 Q220,144 244,158 M202,170 Q220,158 238,170" fill="none" stroke="#d96b93" stroke-width="2.2" stroke-linecap="round"/>
      <path d="M200,166 C170,200 120,210 96,262" fill="none" stroke="#f48fb1" stroke-width="3" stroke-linecap="round"/>
    </g>
    <g class="bob">${cat(102, 236, '#ffffff', { belly: '#fff', s: 1.05 })}</g>
    <path d="M62,318 Q100,292 146,318 L138,338 Q100,318 70,338 Z" fill="#f48fb1"/>
    <path d="M78,326 Q100,312 128,326" fill="none" stroke="#d96b93" stroke-width="2"/>
  </svg>`;

  /* ---------- Modal + carrusel ---------- */
  const overlay = $('#overlay'), track = $('#track'), viewport = $('#viewport');
  const slides = [...track.children];
  const dotsBox = $('#dots'), prev = $('#prev'), next = $('#next');
  const gift = $('#gift'), closeBtn = $('#close');
  let idx = 0, auto = null, dragStartX = null, dragging = false;

  slides.forEach((_, i) => {
    const d = document.createElement('button');
    d.className = 'dot'; d.type = 'button';
    d.setAttribute('role', 'tab'); d.setAttribute('aria-label', `Mensaje ${i + 1}`);
    d.addEventListener('click', () => { stopAuto(); go(i); });
    dotsBox.appendChild(d);
  });
  const dots = [...dotsBox.children];

  function go(i) {
    idx = Math.max(0, Math.min(slides.length - 1, i));
    track.style.transform = `translateX(${-idx * 100}%)`;
    dots.forEach((d, k) => { d.classList.toggle('on', k === idx); d.setAttribute('aria-selected', k === idx); });
    slides.forEach((s, k) => s.setAttribute('aria-hidden', k !== idx));
    prev.disabled = idx === 0;
    next.disabled = idx === slides.length - 1;
  }
  function startAuto() {
    stopAuto();
    auto = setInterval(() => {
      if (idx >= slides.length - 1) return stopAuto();
      go(idx + 1);
    }, 6500);
  }
  function stopAuto() { clearInterval(auto); auto = null; }

  function openModal() {
    overlay.hidden = false;
    go(0);
    requestAnimationFrame(() => requestAnimationFrame(() => overlay.classList.add('show')));
    startAuto();
    closeBtn.focus();
  }
  function closeModal() {
    overlay.classList.remove('show');
    stopAuto();
    setTimeout(() => { overlay.hidden = true; }, 400);
    gift.focus();
  }

  gift.addEventListener('click', openModal);
  closeBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
  prev.addEventListener('click', () => { stopAuto(); go(idx - 1); });
  next.addEventListener('click', () => { stopAuto(); go(idx + 1); });
  document.addEventListener('keydown', e => {
    if (overlay.hidden) return;
    if (e.key === 'Escape') closeModal();
    if (e.key === 'ArrowRight') { stopAuto(); go(idx + 1); }
    if (e.key === 'ArrowLeft') { stopAuto(); go(idx - 1); }
  });

  // Deslizar con el dedo o el mouse
  viewport.addEventListener('pointerdown', e => {
    dragStartX = e.clientX; dragging = true; stopAuto();
    viewport.setPointerCapture(e.pointerId);
  });
  viewport.addEventListener('pointermove', e => {
    if (!dragging) return;
    const dx = e.clientX - dragStartX;
    track.style.transition = 'none';
    track.style.transform = `translateX(calc(${-idx * 100}% + ${dx}px))`;
  });
  const endDrag = e => {
    if (!dragging) return;
    dragging = false;
    const dx = e.clientX - dragStartX;
    track.style.transition = '';
    if (dx < -50) go(idx + 1);
    else if (dx > 50) go(idx - 1);
    else go(idx);
  };
  viewport.addEventListener('pointerup', endDrag);
  viewport.addEventListener('pointercancel', endDrag);
})();