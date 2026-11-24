(function () {
  'use strict';
  document.documentElement.classList.remove('no-js');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var PHONE = '573041287841';

  var top = document.querySelector('.top');
  var bar = document.querySelector('.progress');
  var layers = document.querySelectorAll('.layer[data-speed]');
  var hero = document.querySelector('.hero');
  var ticking = false;
  function frame() {
    var y = window.scrollY;
    if (top) top.classList.toggle('scrolled', y > 40);
    if (bar) {
      var h = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.setProperty('--p', h > 0 ? (y / h).toFixed(4) : 0);
    }
    if (!reduce && hero && y < hero.offsetHeight) {
      layers.forEach(function (l) { l.style.transform = 'translate3d(0,' + (y * parseFloat(l.dataset.speed)).toFixed(1) + 'px,0)'; });
    }
    ticking = false;
  }
  window.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(frame); } }, { passive: true });
  frame();

  document.querySelectorAll('.mnav nav a').forEach(function (a) {
    a.addEventListener('click', function () { a.closest('details').removeAttribute('open'); });
  });

  // Count-up numbers
  function countUp(el) {
    var target = parseFloat(el.dataset.to);
    var dec = parseInt(el.dataset.dec || '0', 10);
    var suffix = el.dataset.suffix || '';
    var prefix = el.dataset.prefix || '';
    if (reduce) { el.textContent = prefix + target.toLocaleString('es-CO', { minimumFractionDigits: dec, maximumFractionDigits: dec }) + suffix; return; }
    var start = null, dur = 1600;
    function step(t) {
      if (!start) start = t;
      var k = Math.min(1, (t - start) / dur);
      var e = 1 - Math.pow(1 - k, 3);
      el.textContent = prefix + (target * e).toLocaleString('es-CO', { minimumFractionDigits: dec, maximumFractionDigits: dec }) + suffix;
      if (k < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  var items = document.querySelectorAll('.reveal');
  var counters = document.querySelectorAll('[data-to]');
  if ('IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add('in');
        e.target.querySelectorAll('[data-to]').forEach(countUp);
        io.unobserve(e.target);
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.12 });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('in'); });
    counters.forEach(countUp);
  }

  // Contact form -> WhatsApp
  var form = document.getElementById('wa-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = document.getElementById('f-name').value.trim();
      var svc = document.getElementById('f-svc').value;
      var msg = document.getElementById('f-msg').value.trim();
      var text = 'Hola Victor Hugo, te escribo desde la página de Culturalmente.' +
        (name ? '\nMi nombre es ' + name + '.' : '') +
        '\nMe interesa: ' + svc + '.' + (msg ? '\n' + msg : '');
      window.open('https://wa.me/' + PHONE + '?text=' + encodeURIComponent(text), '_blank', 'noopener');
    });
  }

  var y = document.getElementById('y');
  if (y) y.textContent = new Date().getFullYear();
})();
