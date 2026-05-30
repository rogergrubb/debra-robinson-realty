(function () {
  "use strict";
  var c = window.SITE_CONFIG || {};
  if (!c.SUPABASE_URL || !c.SUPABASE_ANON_KEY) return;
  var path = location.pathname || "/";
  if (path.indexOf("/dashboard") === 0) return; // never log the dashboard itself
  var page = path.indexOf("/preview") === 0 ? "preview" : "pitch";

  function insert(geo) {
    var g = geo || {};
    var row = {
      ip: g.ip || null,
      city: g.city || null,
      region: g.region || g.region_code || g.state || null,
      country: g.country || g.country_name || g.country_code || null,
      lat: (typeof g.latitude === "number" ? g.latitude : (g.lat || null)),
      lng: (typeof g.longitude === "number" ? g.longitude : (g.lon || g.lng || null)),
      page: page,
      user_agent: navigator.userAgent
    };
    fetch(c.SUPABASE_URL + "/rest/v1/" + "debra_visits", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apikey": c.SUPABASE_ANON_KEY,
        "Authorization": "Bearer " + c.SUPABASE_ANON_KEY,
        "Prefer": "return=minimal"
      },
      body: JSON.stringify(row)
    }).catch(function () {});
  }

  // geolocate the visitor by IP, with a fallback provider, then log
  fetch("https://ipwho.is/")
    .then(function (r) { return r.json(); })
    .then(function (g) { if (g && g.success !== false && g.ip) insert(g); else throw 0; })
    .catch(function () {
      fetch("https://ipapi.co/json/")
        .then(function (r) { return r.json(); })
        .then(function (g) { insert(g); })
        .catch(function () { insert(null); });
    });
})();
