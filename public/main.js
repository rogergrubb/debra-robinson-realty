(function () {
  "use strict";
  var yr = document.getElementById("yr");
  if (yr) yr.textContent = new Date().getFullYear();

  var form = document.getElementById("lead-form");
  if (!form) return;
  var statusEl = document.getElementById("form-status");
  var btn = document.getElementById("lead-submit");
  var cfg = window.SITE_CONFIG || {};

  function setStatus(msg, kind) {
    statusEl.textContent = msg;
    statusEl.className = "form-status" + (kind ? " " + kind : "");
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var name = form.name.value.trim();
    if (!name) { setStatus("Please add your name so Debra knows who to reach.", "err"); form.name.focus(); return; }

    var payload = {
      name: name,
      email: form.email.value.trim() || null,
      phone: form.phone.value.trim() || null,
      situation: form.situation.value || null,
      message: form.message.value.trim() || null,
      source: "website",
      page_url: location.href
    };

    btn.disabled = true;
    var original = btn.textContent;
    btn.textContent = "Sending…";
    setStatus("", "");

    var endpoint = cfg.SUPABASE_URL + "/rest/v1/" + (cfg.LEADS_TABLE || "debra_leads");

    fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apikey": cfg.SUPABASE_ANON_KEY,
        "Authorization": "Bearer " + cfg.SUPABASE_ANON_KEY,
        "Prefer": "return=minimal"
      },
      body: JSON.stringify(payload)
    })
      .then(function (res) {
        if (res.ok) {
          form.reset();
          setStatus("Thank you, " + name + "! Debra will reach out personally — usually within one business day.", "ok");
        } else {
          throw new Error("HTTP " + res.status);
        }
      })
      .catch(function () {
        var subject = encodeURIComponent("Website consultation request — " + name);
        var bodyTxt = encodeURIComponent(
          "Name: " + payload.name + "\nPhone: " + (payload.phone || "") +
          "\nEmail: " + (payload.email || "") + "\nAbout: " + (payload.situation || "") +
          "\n\n" + (payload.message || "")
        );
        setStatus("We couldn't submit automatically. Opening your email app so your message still reaches Debra…", "err");
        window.location.href = "mailto:" + (cfg.FALLBACK_EMAIL || "debrashouse@gmail.com") +
          "?subject=" + subject + "&body=" + bodyTxt;
      })
      .finally(function () {
        btn.disabled = false;
        btn.textContent = original;
      });
  });
})();
