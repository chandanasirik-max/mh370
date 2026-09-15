/* Homepage: counter, map, cards, timeline. */
(function () {
  var D = window.MH370, G = window.MH370GEO;

  /* ---------------- Counter ---------------- */
  function pad(n) { return (n < 10 ? "0" : "") + n; }
  function daysInMonth(y, m) { return new Date(Date.UTC(y, m + 1, 0)).getUTCDate(); }

  function elapsed(startMs, nowMs) {
    var s = new Date(startMs), n = new Date(nowMs);
    var years = n.getUTCFullYear() - s.getUTCFullYear();
    var months = n.getUTCMonth() - s.getUTCMonth();
    var days = n.getUTCDate() - s.getUTCDate();
    var hours = n.getUTCHours() - s.getUTCHours();
    var minutes = n.getUTCMinutes() - s.getUTCMinutes();
    var seconds = n.getUTCSeconds() - s.getUTCSeconds();
    if (seconds < 0) { seconds += 60; minutes--; }
    if (minutes < 0) { minutes += 60; hours--; }
    if (hours < 0) { hours += 24; days--; }
    if (days < 0) {
      var pm = n.getUTCMonth() - 1, py = n.getUTCFullYear();
      if (pm < 0) { pm = 11; py--; }
      days += daysInMonth(py, pm); months--;
    }
    if (months < 0) { months += 12; years--; }
    return { years: years, months: months, days: days, hours: hours, minutes: minutes, seconds: seconds,
             totalDays: Math.floor((nowMs - startMs) / 86400000), totalSeconds: Math.floor((nowMs - startMs) / 1000) };
  }

  function tick() {
    var e = elapsed(D.MISSING_AT_UTC, Date.now());
    var ids = ["years", "months", "days", "hours", "minutes", "seconds"];
    for (var i = 0; i < ids.length; i++) {
      var el = document.getElementById("c-" + ids[i]);
      if (el) el.textContent = ids[i] === "years" ? String(e.years) : pad(e[ids[i]]);
    }
    var inline = document.getElementById("c-inline");
    if (inline) inline.innerHTML = "<strong>" + e.years + ":" + pad(e.months) + ":" + pad(e.days) + ":" + pad(e.hours) + ":" + pad(e.minutes) + ":" + pad(e.seconds) + "</strong>" +
      " &nbsp;·&nbsp; " + e.totalDays.toLocaleString() + " days &nbsp;·&nbsp; " + e.totalSeconds.toLocaleString() + " seconds";
  }
  tick();
  setInterval(tick, 1000);

  /* ---------------- Map ---------------- */
  var map = L.map("map", { worldCopyJump: true, zoomControl: true, attributionControl: true })
    .setView([-12, 85], 3);

  L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: "abcd", maxZoom: 12
  }).addTo(map);

  var layers = { route: L.layerGroup(), search: L.layerGroup(), position: L.layerGroup(), debris: L.layerGroup(), arc: L.layerGroup() };
  for (var k in layers) layers[k].addTo(map);

  // Flight path
  L.polyline(G.ROUTE.planned, { color: "#4f8dff", weight: 1.5, opacity: .5, dashArray: "2 8" })
    .bindTooltip("Planned route to Beijing (never flown beyond IGARI)", { className: "mh-tip", sticky: true }).addTo(layers.route);
  L.polyline(G.ROUTE.radar, { color: "#4f8dff", weight: 3, opacity: .95 })
    .bindTooltip("Radar-tracked path, 00:41–02:22 MYT", { className: "mh-tip", sticky: true }).addTo(layers.route);
  L.polyline(G.ROUTE.inferred, { color: "#4f8dff", weight: 2.5, opacity: .8, dashArray: "8 8" })
    .bindTooltip("Inferred southern path from satellite data", { className: "mh-tip", sticky: true }).addTo(layers.route);

  // 7th arc
  L.polyline(G.seventhArc(), { color: "#7fb3ff", weight: 2, opacity: .85, dashArray: "6 6" })
    .bindTooltip("7th arc — final satellite handshake, 00:19 UTC", { className: "mh-tip", sticky: true }).addTo(layers.arc);

  // Search-area polygons
  D.points.forEach(function (p) {
    if (p.type !== "search" || !p.area) return;
    var poly = G.areaPolygon(p.area);
    if (!poly) return;
    L.polygon(poly, { color: "#22b8e6", weight: 1.2, opacity: .8, fillColor: "#22b8e6", fillOpacity: .12 })
      .bindTooltip("<span class='t'>" + p.name + "</span><span class='d'>" + p.dateLabel + "</span>", { className: "mh-tip", sticky: true })
      .on("click", function () { window.location.href = "point.html?id=" + p.id; })
      .addTo(layers.search);
  });

  // Pins
  function icon(p) {
    var cls = "pin " + p.type + (p.id === "igari-last-contact" ? " pulse" : "");
    return L.divIcon({ className: cls, iconSize: [14, 14], iconAnchor: [7, 7] });
  }
  D.points.forEach(function (p) {
    L.marker([p.lat, p.lng], { icon: icon(p), title: p.name, keyboard: true })
      .bindTooltip("<span class='t'>" + p.name + "</span><span class='d'>" + p.dateLabel + "</span>", { className: "mh-tip", direction: "top", offset: [0, -8] })
      .on("click", function () { window.location.href = "point.html?id=" + p.id; })
      .addTo(layers[p.type]);
  });

  // Layer toggles
  document.querySelectorAll("[data-layer]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var key = btn.getAttribute("data-layer");
      var on = map.hasLayer(layers[key]);
      if (on) map.removeLayer(layers[key]); else map.addLayer(layers[key]);
      btn.classList.toggle("off", on);
    });
  });
  document.getElementById("fit-all").addEventListener("click", function () { map.flyTo([-12, 85], 3); });
  document.getElementById("fit-search").addEventListener("click", function () { map.flyToBounds([[-41, 84], [-22, 106]]); });

  /* ---------------- Cards ---------------- */
  var order = ["route", "search", "position", "debris"];
  var container = document.getElementById("cards");
  order.forEach(function (type) {
    var items = D.points.filter(function (p) { return p.type === type; });
    var group = document.createElement("div");
    group.className = "group";
    group.id = "group-" + type;
    group.innerHTML = "<h3><span class='swatch' style='background:" + D.TYPES[type].color + "'></span>" + D.TYPES[type].plural +
      " <span class='count'>(" + items.length + ")</span></h3><p style='color:var(--muted);margin-top:-6px'>" + D.TYPES[type].description + "</p><div class='cards'></div>";
    var grid = group.querySelector(".cards");
    items.forEach(function (p) {
      var a = document.createElement("a");
      a.className = "card"; a.href = "point.html?id=" + p.id;
      a.innerHTML = "<span class='tag'><span class='swatch' style='width:8px;height:8px;display:inline-block;background:" + D.TYPES[type].color + "'></span>" + D.TYPES[type].label + "</span>" +
        "<h3>" + p.name + "</h3><p>" + p.summary + "</p><span class='meta'>" + p.dateLabel + " · " + G.fmtCoord(p.lat, p.lng) + "</span>";
      grid.appendChild(a);
    });
    container.appendChild(group);
  });

  /* ---------------- Timeline ---------------- */
  var tl = document.getElementById("timeline");
  D.timeline.forEach(function (t) {
    var li = document.createElement("li");
    li.innerHTML = "<div class='when'>" + t.date + "</div><p class='what'>" + t.text +
      (t.link ? "<a href='point.html?id=" + t.link + "'>Details →</a>" : "") + "</p>";
    tl.appendChild(li);
  });

  /* ---------------- Stats ---------------- */
  var counts = { search: 0, position: 0, debris: 0 };
  D.points.forEach(function (p) { if (counts[p.type] !== undefined) counts[p.type]++; });
  document.getElementById("stat-search").textContent = counts.search;
  document.getElementById("stat-position").textContent = counts.position;
  document.getElementById("stat-debris").textContent = counts.debris;
})();
