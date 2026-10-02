// The phone menu is progressive: navigation stays visible without JavaScript.
const siteHeader = document.querySelector('.site-header');
const menuToggle = document.querySelector('.menu-toggle');
const siteMenu = document.querySelector('#site-menu');
const desktopNavigation = window.matchMedia('(min-width: 768px)');

if (siteHeader && menuToggle && siteMenu) {
  const menuLabel = menuToggle.querySelector('.menu-label');
  function setMenu(open) {
    menuToggle.setAttribute('aria-expanded', String(open));
    siteMenu.classList.toggle('is-open', open);
    menuLabel.textContent = open ? 'Close' : 'Menu';
  }
  menuToggle.hidden = false;
  siteHeader.classList.add('nav-ready');
  menuToggle.addEventListener('click', () => {
    setMenu(menuToggle.getAttribute('aria-expanded') !== 'true');
  });
  siteMenu.addEventListener('click', event => {
    if (event.target.closest('a')) setMenu(false);
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
      setMenu(false);
      menuToggle.focus();
    }
  });
  document.addEventListener('click', event => {
    if (!siteHeader.contains(event.target)) setMenu(false);
  });
  desktopNavigation.addEventListener('change', () => {
    const focusedElement = document.activeElement;
    setMenu(false);
    if (!desktopNavigation.matches && siteMenu.contains(focusedElement)) menuToggle.focus();
    if (desktopNavigation.matches && focusedElement === menuToggle) siteMenu.querySelector('a').focus();
  });
  // Anchor positions account for the actual header height, including wrapped text.
  if ('ResizeObserver' in window) {
    new ResizeObserver(() => {
      document.documentElement.style.setProperty('--header-offset', `${siteHeader.offsetHeight + 16}px`);
    }).observe(siteHeader);
  }
}

// Project filtering is progressive: all projects remain visible without JavaScript.
const projectToolbar = document.querySelector('.project-toolbar');
const projectFilters = document.querySelectorAll('[data-filter]');
const projectCards = document.querySelectorAll('[data-category]');
const projectCount = document.querySelector('.project-count');
const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');

function showGently(element, delay = 0) {
  if (motionPreference.matches || typeof element.animate !== 'function') return;
  element.animate(
    [{ opacity: 0.35, translate: '0 16px' }, { opacity: 1, translate: '0 0' }],
    { duration: 500, delay, easing: 'ease-out' }
  );
}

if (projectToolbar && projectCount) {
  projectToolbar.hidden = false;
  projectFilters.forEach(button => {
    button.addEventListener('click', () => {
      const category = button.dataset.filter;
      let visibleCount = 0;
      projectCards.forEach(card => {
        card.hidden = category !== 'all' && card.dataset.category !== category;
        if (!card.hidden) {
          showGently(card, visibleCount * 45);
          visibleCount++;
        }
      });
      projectFilters.forEach(filter => {
        const selected = filter === button;
        filter.setAttribute('aria-pressed', String(selected));
        filter.classList.toggle('active', selected);
      });
      projectCount.textContent = `${visibleCount} ${visibleCount === 1 ? 'project' : 'projects'}`;
    });
  });
}

// Content is visible by default, including when JavaScript is unavailable.
if ('IntersectionObserver' in window) {
  const entranceObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      showGently(entry.target);
      entry.target.classList.add('has-entered');
      entranceObserver.unobserve(entry.target);
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.section-heading, .about-copy, .skills-panel, .project-card, .private-project, .learning-card, .journey-card, .education-item, .creator-copy').forEach(element => {
    entranceObserver.observe(element);
  });
}

// Stop active entrance animations if the visitor changes their motion preference.
motionPreference.addEventListener('change', () => {
  if (motionPreference.matches) document.getAnimations().forEach(animation => animation.cancel());
});

const readingProgress = document.querySelector('.reading-progress');
if (readingProgress) {
  let scheduled = false;
  function updateProgress() {
    const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollableHeight > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollableHeight)) : 0;
    readingProgress.style.transform = `scaleX(${progress})`;
    scheduled = false;
  }
  function scheduleProgress() {
    if (scheduled) return;
    scheduled = true;
    window.requestAnimationFrame(updateProgress);
  }
  window.addEventListener('scroll', scheduleProgress, { passive: true });
  window.addEventListener('resize', scheduleProgress);
  projectFilters.forEach(button => button.addEventListener('click', scheduleProgress));
  updateProgress();
}
