// Mobile nav, reveal-on-scroll, footer year, quote form handling
(function(){
  document.documentElement.classList.remove('no-js');
  var t=document.querySelector('.nav-toggle'),m=document.getElementById('nav-menu');
  if(t&&m){
    t.addEventListener('click',function(){var o=m.classList.toggle('open');t.setAttribute('aria-expanded',o);t.setAttribute('aria-label',o?'Close menu':'Open menu');});
    m.addEventListener('click',function(e){if(e.target.tagName==='A'){m.classList.remove('open');t.setAttribute('aria-expanded','false');}});
    document.addEventListener('keydown',function(e){if(e.key==='Escape'&&m.classList.contains('open')){m.classList.remove('open');t.setAttribute('aria-expanded','false');t.focus();}});
  }
  var y=document.querySelectorAll('[data-year]');y.forEach(function(n){n.textContent=new Date().getFullYear();});
  var els=document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});},{threshold:.12});
    els.forEach(function(el){io.observe(el);});
  } else els.forEach(function(el){el.classList.add('in');});

  // Quote form posts natively to FormSubmit.co (keeps its captcha); show success after redirect back with ?sent=1.
  if(/[?&]sent=1/.test(location.search)){
    var st=document.getElementById('form-status');
    if(st){st.textContent='Thanks \u2014 your request is in. We\u2019ll reply within one business day.';st.classList.add('show');}
  }
})();
