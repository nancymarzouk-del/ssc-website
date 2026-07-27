/* Site header — mobile menu toggle. Shared by the homepage and every Journal
   page so the header behaves identically everywhere. Safe no-op if absent. */
(function () {
  var navToggle = document.getElementById('nav-toggle');
  var mobileMenu = document.getElementById('mobile-menu');
  if (!navToggle || !mobileMenu) return;

  navToggle.addEventListener('click', function () {
    var open = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!open));
    navToggle.setAttribute('aria-label', open ? 'Open menu' : 'Close menu');
    mobileMenu.classList.toggle('is-open', !open);
    mobileMenu.setAttribute('aria-hidden', String(open));
    document.body.style.overflow = open ? '' : 'hidden';
  });

  mobileMenu.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () {
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.setAttribute('aria-label', 'Open menu');
      mobileMenu.classList.remove('is-open');
      mobileMenu.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    });
  });
})();
