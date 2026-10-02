(() => {
  const buddy = document.querySelector('.buddy');
  const farewell = document.querySelector('.farewell');
  if (!buddy || !farewell) return;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const sections = [
    ['home', 'wave'], ['about', 'code'], ['work', 'code'], ['learning', 'read'],
    ['journey', 'graduate'], ['stories', 'film'], ['contact', 'contact']
  ].map(([id, activity]) => ({ id, activity, element: document.getElementById(id) })).filter(section => section.element);

  let point = null;
  let movementFrame = 0;
  let scrollFrame = 0;
  let settleTimer;
  let obstacles = [];
  let atEnd = false;
  let goodbyePlayed = false;
  let routeVersion = 0;
  let currentIndex = 0;

  const size = () => ({ width: buddy.offsetWidth, height: buddy.offsetHeight });
  const viewportWidth = () => document.documentElement.clientWidth;
  function place(next) {
    point = next;
    buddy.style.transform = `translate(${next.x}px, ${next.y}px)`;
  }
  function stop() {
    routeVersion++;
    cancelAnimationFrame(movementFrame);
    movementFrame = 0;
    buddy.classList.remove('is-walking');
  }
  function measureContent() {
    const boxes = [];
    const add = rect => {
      if (rect.width && rect.height && rect.bottom > 0 && rect.top < innerHeight) boxes.push(rect);
    };
    // Text-line rectangles preserve empty margins without covering the actual words.
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    let node;
    while ((node = walker.nextNode())) {
      if (!node.textContent.trim() || node.parentElement.closest('script, style, .buddy, .farewell, .sr-only, [aria-hidden="true"]')) continue;
      const range = document.createRange();
      range.selectNodeContents(node);
      [...range.getClientRects()].forEach(add);
    }
    document.querySelectorAll('a, button, input, textarea, select, main img, .skills-panel, .learning-icon').forEach(element => {
      if (!element.closest('.buddy, .farewell')) add(element.getBoundingClientRect());
    });
    return boxes;
  }
  function isClear(candidate) {
    const { width, height } = size();
    const pad = 5;
    if (candidate.x < 2 || candidate.y < 2 || candidate.x + width > viewportWidth() - 2 || candidate.y + height > innerHeight - 2) return false;
    return !obstacles.some(rect => candidate.x < rect.right + pad && candidate.x + width > rect.left - pad && candidate.y < rect.bottom + pad && candidate.y + height > rect.top - pad);
  }
  function safeCorner(index) {
    const { width, height } = size();
    const header = document.querySelector('.site-header').getBoundingClientRect();
    const top = Math.max(8, Math.min(innerHeight / 2, header.bottom + 12));
    const bottom = innerHeight - height - 12;
    const preferRight = index % 2 === 0;
    const preferBottom = index % 4 === 1 || index % 4 === 2;
    const sides = preferRight ? [viewportWidth() - width - 8, 8] : [8, viewportWidth() - width - 8];
    const heights = [];
    for (let y = top; y <= bottom; y += 16) heights.push(y);
    if (preferBottom) heights.reverse();
    for (const x of sides) {
      for (const y of heights) { if (isClear({ x, y })) return { x, y }; }
    }
    return null;
  }
  function travel(destination, { drop = false, goodbye = false } = {}) {
    stop();
    const token = routeVersion;
    const origin = point || { x: destination.x, y: -size().height };
    const distance = Math.hypot(destination.x - origin.x, destination.y - origin.y);
    if (reducedMotion.matches || distance < 3) {
      place(destination);
      buddy.classList.toggle('is-visible', goodbye || isClear(destination));
      finish(goodbye);
      return;
    }
    const duration = drop ? 1000 : Math.min(2300, Math.max(800, distance * 3));
    const started = performance.now();
    buddy.classList.add('is-walking');
    function tick(now) {
      if (token !== routeVersion || document.hidden) return;
      const progress = Math.min(1, (now - started) / duration);
      const eased = progress * progress * (3 - 2 * progress);
      let y = origin.y + (destination.y - origin.y) * eased;
      if (drop && progress > .75) y -= Math.sin((progress - .75) * 4 * Math.PI) * 10;
      const next = { x: origin.x + (destination.x - origin.x) * eased, y };
      place(next);
      // Passing behind content is invisible and never takes pointer or keyboard input.
      buddy.classList.toggle('is-visible', goodbye || isClear(next));
      if (progress < 1) movementFrame = requestAnimationFrame(tick);
      else { movementFrame = 0; buddy.classList.remove('is-walking'); finish(goodbye); }
    }
    movementFrame = requestAnimationFrame(tick);
  }
  function finish(goodbye) {
    if (!goodbye) return;
    buddy.dataset.activity = 'wave';
    farewell.classList.add('is-arrived');
    goodbyePlayed = true;
  }
  function sayGoodbye() {
    const rect = farewell.querySelector('.farewell-spot').getBoundingClientRect();
    const { width, height } = size();
    const destination = { x: rect.left + rect.width / 2 - width / 2, y: Math.min(innerHeight - height - 8, rect.bottom - height) };
    if (atEnd) {
      if (!movementFrame) {
        place(destination);
        buddy.classList.add('is-visible');
        finish(true);
      }
      return;
    }
    atEnd = true;
    stop();
    buddy.dataset.section = 'farewell';
    buddy.dataset.activity = 'wave';
    if (goodbyePlayed || reducedMotion.matches) {
      place(destination);
      buddy.classList.add('is-visible');
      finish(true);
      return;
    }
    // The final walk stays entirely inside the empty footer scene.
    const fromRight = currentIndex % 2 === 0;
    place({ x: fromRight ? viewportWidth() - width - 12 : 12, y: destination.y });
    buddy.classList.add('is-visible');
    travel(destination, { goodbye: true });
  }
  function update() {
    if (document.hidden) return;
    obstacles = measureContent();
    const remaining = document.documentElement.scrollHeight - innerHeight - scrollY;
    if (remaining <= 8 && farewell.getBoundingClientRect().top >= 0) { sayGoodbye(); return; }
    atEnd = false;
    const readingLine = innerHeight * .45;
    let index = 0;
    sections.forEach((section, i) => { if (section.element.getBoundingClientRect().top <= readingLine) index = i; });
    const changed = currentIndex !== index || buddy.dataset.section !== sections[index].id;
    currentIndex = index;
    buddy.dataset.section = sections[index].id;
    buddy.dataset.activity = sections[index].activity;
    if (!changed && point && isClear(point)) {
      buddy.classList.add('is-visible');
      return;
    }
    const destination = safeCorner(index);
    if (!destination) { stop(); buddy.classList.remove('is-visible'); return; }
    travel(destination, { drop: point === null });
  }
  function onScroll() {
    clearTimeout(settleTimer);
    if (!scrollFrame) scrollFrame = requestAnimationFrame(() => {
      scrollFrame = 0;
      stop();
      obstacles = measureContent();
      // Re-check immediately as page text moves underneath the fixed character.
      buddy.classList.toggle('is-visible', !!point && isClear(point));
      settleTimer = setTimeout(update, 120);
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', () => {
    atEnd = false;
    stop();
    buddy.classList.remove('is-visible');
    clearTimeout(settleTimer);
    settleTimer = setTimeout(update, 120);
  });
  document.addEventListener('visibilitychange', () => {
    stop();
    clearTimeout(settleTimer);
    if (document.hidden) buddy.classList.remove('is-visible');
    else { atEnd = false; update(); }
  });
  reducedMotion.addEventListener('change', () => {
    stop();
    atEnd = false;
    update();
  });
  document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', onScroll));
  buddy.hidden = false;
  document.documentElement.classList.add('buddy-enabled');
  update();
  document.fonts?.ready.then(update);
})();
