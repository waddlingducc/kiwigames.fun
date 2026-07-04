(function () {
  var KEY = 'kiwi:cookie-consent';
  try { if (localStorage.getItem(KEY)) return; } catch (e) {}

  function build() {
    if (document.getElementById('kiwi-cookie-banner')) return;

    var style = document.createElement('style');
    style.textContent = [
      '#kiwi-cookie-banner{',
      '  position:fixed;left:16px;right:16px;bottom:16px;z-index:100000;',
      '  max-width:420px;margin:0 auto 0 0;',
      '  background:rgba(8,18,8,0.94);color:#e8ffe0;',
      '  border:1px solid rgba(48,255,0,0.35);border-radius:12px;padding:16px 18px;',
      '  box-shadow:0 10px 40px rgba(0,0,0,0.55),0 0 18px rgba(48,255,0,0.15);',
      '  font:400 13px/1.55 "Inter",system-ui,sans-serif;',
      '  backdrop-filter:blur(18px) saturate(1.4);-webkit-backdrop-filter:blur(18px) saturate(1.4);',
      '  transform:translateY(160%);transition:transform .35s ease;',
      '}',
      '#kiwi-cookie-banner.show{transform:translateY(0)}',
      '#kiwi-cookie-banner p{margin:0 0 12px}',
      '#kiwi-cookie-banner a{color:#30FF00;text-decoration:none}',
      '#kiwi-cookie-banner a:hover{text-decoration:underline}',
      '#kiwi-cookie-banner .kiwi-cc-actions{display:flex;gap:10px;justify-content:flex-end}',
      '#kiwi-cookie-banner button{',
      '  appearance:none;cursor:pointer;font:600 12px/1 "Inter",sans-serif;',
      '  padding:9px 16px;border-radius:8px;border:1px solid rgba(48,255,0,0.4);',
      '  background:rgba(48,255,0,0.14);color:#cfffc0;',
      '  transition:background .15s ease,color .15s ease;',
      '}',
      '#kiwi-cookie-banner button:hover{background:rgba(48,255,0,0.28);color:#fff}',
      '@media (max-width:600px){#kiwi-cookie-banner{left:10px;right:10px;bottom:10px;max-width:none}}'
    ].join('');
    document.head.appendChild(style);

    var el = document.createElement('div');
    el.id = 'kiwi-cookie-banner';
    el.setAttribute('role', 'dialog');
    el.setAttribute('aria-label', 'Cookie notice');
    el.innerHTML =
      '<p>kiwi uses cookies and local storage for basic functionality, analytics, and, where applicable, advertising. ' +
      'By continuing to use the site you agree to this. Read our <a href="/$/privacy/">Privacy Policy</a>.</p>' +
      '<div class="kiwi-cc-actions"><button type="button" id="kiwi-cc-ok">Got it</button></div>';
    document.body.appendChild(el);

    requestAnimationFrame(function () { el.classList.add('show'); });

    document.getElementById('kiwi-cc-ok').addEventListener('click', function () {
      try { localStorage.setItem(KEY, '1'); } catch (e) {}
      el.classList.remove('show');
      setTimeout(function () { if (el.parentNode) el.parentNode.removeChild(el); }, 350);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', build);
  } else {
    build();
  }
})();
