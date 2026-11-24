(function () {
  'use strict';
  document.documentElement.classList.remove('no-js');
  var PHONE = '573041287841';
  var top = document.querySelector('.top');
  function onScroll() { if (top) top.classList.toggle('scrolled', window.scrollY > 40); }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  document.querySelectorAll('.mnav nav a').forEach(function (a) {
    a.addEventListener('click', function () { a.closest('details').removeAttribute('open'); });
  });
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
