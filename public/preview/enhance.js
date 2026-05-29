(function(){
  "use strict";
  // nav depth on scroll
  var nav=document.querySelector(".nav");
  function navShadow(){ if(nav) nav.classList.toggle("scrolled",(window.scrollY||0)>10); }
  window.addEventListener("scroll",navShadow,{passive:true}); navShadow();

  // fail-safe scroll reveals: only hides elements once JS confirms support
  var sel=".section h2, .section .section-intro, .feat, .tier, .step, .sold, .reviews blockquote, .chips, .faq details, .portrait, .stat-line, .creds";
  var els=[].slice.call(document.querySelectorAll(sel));
  var vh=window.innerHeight||document.documentElement.clientHeight;
  if(!("IntersectionObserver" in window)){ return; } // leave fully visible
  var io=new IntersectionObserver(function(ent){
    ent.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add("in"); io.unobserve(e.target); } });
  },{threshold:.12, rootMargin:"0px 0px -8% 0px"});
  els.forEach(function(el){
    var r=el.getBoundingClientRect();
    if(r.top < vh*0.94){ el.classList.add("reveal","in"); }   // already in view: show, no blink
    else { el.classList.add("reveal"); io.observe(el); }       // below fold: hide then reveal
  });
})();
