(function () {
  "use strict";
  var cfg = window.SITE_CONFIG || {};
  var doc = document.documentElement;

  // scroll progress
  var bar = document.getElementById("progress");
  var sticky = document.getElementById("stickybar");
  var offer = document.getElementById("offer");
  function onScroll() {
    var h = doc.scrollHeight - doc.clientHeight;
    var p = h > 0 ? (doc.scrollTop || document.body.scrollTop) / h : 0;
    if (bar) bar.style.width = (p * 100).toFixed(1) + "%";
    if (sticky && offer) {
      var past = offer.getBoundingClientRect().top < doc.clientHeight * 0.6;
      var nearEnd = p > 0.97;
      sticky.classList.toggle("show", past && !nearEnd);
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  onScroll();

  // reveal on scroll
  var fx = [].slice.call(document.querySelectorAll(".fx"));
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    fx.forEach(function (el) { io.observe(el); });
  } else {
    fx.forEach(function (el) { el.classList.add("in"); });
  }

  // "Yes" -> log acceptance to Supabase, then open prefilled email to Roger
  function accept(e) {
    if (e) e.preventDefault();
    var mailto = "mailto:roger@grubb.net?subject=" +
      encodeURIComponent("I'm in — let's build my site") +
      "&body=" + encodeURIComponent("Hi Roger, I watched the presentation — I'm in for the $1,000 build. Let's talk.");
    var go = function () { window.location.href = mailto; };
    if (cfg.SUPABASE_URL && cfg.SUPABASE_ANON_KEY) {
      fetch(cfg.SUPABASE_URL + "/rest/v1/" + (cfg.LEADS_TABLE || "debra_leads"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "apikey": cfg.SUPABASE_ANON_KEY,
          "Authorization": "Bearer " + cfg.SUPABASE_ANON_KEY,
          "Prefer": "return=minimal"
        },
        body: JSON.stringify({
          name: "Debra Robinson",
          situation: "ACCEPTED $1,000 build offer",
          message: "Clicked YES on the pitch presentation.",
          source: "pitch-accept",
          page_url: location.href
        })
      }).then(go).catch(go);
    } else { go(); }
  }
  var y1 = document.getElementById("yes-btn");
  if (y1) y1.addEventListener("click", accept);
})();
