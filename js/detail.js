/* Detail page: renders one point from data.js based on ?id=... */
(function () {
  var D = window.MH370, G = window.MH370GEO;
  var id = new URLSearchParams(window.location.search).get("id");
  var p = D.byId(id);
  var root = document.getElementById("detail");

  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }

  if (!p) {
    root.innerHTML = "<div class='container notfound'><h1>Point not found</h1><p>No data point matches this address.</p><p><a href='index.html'>← Back to the map</a></p></div>";
    return;
  }

  document.title = p.name + " — MH370";
  var T = D.TYPES[p.type];

  var badges = "<span class='badge'><span class='swatch' style='background:" + T.color + "'></span>" + T.label + "</span>";
  if (p.status) badges += "<span class='badge status'>" + esc(p.status) + "</span>";
  if (p.approximate) badges += "<span class='badge approx'>Approximate location</span>";

  var facts = "<div><dt>Date</dt><dd>" + esc(p.dateLabel) + "</dd></div>" +
    "<div><dt>Coordinates</dt><dd class='mono'>" + G.fmtCoord(p.lat, p.lng) + "</dd></div>";
  (p.facts || []).forEach(function (f) { facts += "<div><dt>" + esc(f.label) + "</dt><dd>" + esc(f.value) + "</dd></div>"; });

  var sources = "";
  (p.sources || []).forEach(function (s) { sources += "<li><a href='" + s.url + "' target='_blank' rel='noopener'>" + esc(s.label) + "</a></li>"; });

  var prose = "";
  (p.details || []).forEach(function (para) { prose += "<p>" + esc(para) + "</p>"; });

  // Prev / next within the same category
  var siblings = D.points.filter(function (x) { return x.type === p.type; });
  var idx = siblings.indexOf(p);
  var prev = siblings[(idx - 1 + siblings.length) % siblings.length];
  var next = siblings[(idx + 1) % siblings.length];

  root.innerHTML =
    "<section class='detail-hero container'>" +
      "<div class='crumbs'><a href='index.html'>Home</a> / <a href='index.html#group-" + p.type + "'>" + T.plural + "</a></div>" +
      badges +
      "<h1>" + esc(p.name) + "</h1>" +
      "<p class='summary'>" + esc(p.summary) + "</p>" +
    "</section>" +
    "<section class='container detail-grid'>" +
      "<div><div class='prose'>" + prose + "</div>" +
        "<div class='pager'>" +
          "<a href='point.html?id=" + prev.id + "'><span>← Previous " + T.label.toLowerCase() + "</span>" + esc(prev.name) + "</a>" +
          "<a class='next' href='point.html?id=" + next.id + "'><span>Next " + T.label.toLowerCase() + " →</span>" + esc(next.name) + "</a>" +
        "</div>" +
      "</div>" +
      "<aside class='aside'>" +
        "<div id='detail-map'></div>" +
        "<div class='panel'><h3>Key facts</h3><dl class='facts'>" + facts + "</dl></div>" +
        "<div class='panel'><h3>Sources</h3><ul class='sources'>" + sources + "</ul></div>" +
        "<div class='panel'><a href='index.html#map'>← Back to the full map</a></div>" +
      "</aside>" +
    "</section>";

  // Mini map
  var map = L.map("detail-map", { zoomControl: false, attributionControl: true, scrollWheelZoom: false });
  G.addLandFallback(map);
  G.addBasemap(map);
  L.polyline(G.seventhArc(), { color: "#7fb3ff", weight: 1.5, opacity: .6, dashArray: "6 6" }).addTo(map);
  L.polyline(G.ROUTE.radar, { color: "#4f8dff", weight: 2, opacity: .6 }).addTo(map);
  L.polyline(G.ROUTE.inferred, { color: "#4f8dff", weight: 1.5, opacity: .5, dashArray: "8 8" }).addTo(map);

  var poly = p.area ? G.areaPolygon(p.area) : null;
  if (poly) {
    var shape = L.polygon(poly, { color: "#22b8e6", weight: 1.5, fillColor: "#22b8e6", fillOpacity: .18 }).addTo(map);
    map.fitBounds(shape.getBounds().pad(0.4));
  } else {
    map.setView([p.lat, p.lng], p.type === "route" ? 6 : 5);
  }
  L.marker([p.lat, p.lng], { icon: L.divIcon({ className: "pin " + p.type + " pulse", iconSize: [14, 14], iconAnchor: [7, 7] }) }).addTo(map);
})();
