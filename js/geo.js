/* Geometry helpers shared by the homepage and detail pages. */
window.MH370GEO = (function () {
  var R = Math.PI / 180;

  // Point at a given angular distance (degrees) and bearing (degrees) from a start point.
  function destination(lat, lng, bearing, dist) {
    var la = lat * R, lo = lng * R, b = bearing * R, d = dist * R;
    var la2 = Math.asin(Math.sin(la) * Math.cos(d) + Math.cos(la) * Math.sin(d) * Math.cos(b));
    var lo2 = lo + Math.atan2(Math.sin(b) * Math.sin(d) * Math.cos(la), Math.cos(d) - Math.sin(la) * Math.sin(la2));
    return [la2 / R, lo2 / R];
  }

  // Angular distance in degrees between two points.
  function angular(lat1, lng1, lat2, lng2) {
    var a = lat1 * R, b = lat2 * R, dl = (lng2 - lng1) * R;
    var c = Math.sin(a) * Math.sin(b) + Math.cos(a) * Math.cos(b) * Math.cos(dl);
    return Math.acos(Math.max(-1, Math.min(1, c))) / R;
  }

  // The 7th arc: a circle of constant range from the Inmarsat-3 F1 sub-satellite point.
  // The radius is calibrated so the arc passes through the CSIRO estimate (35.6°S, 92.8°E).
  var SAT = { lat: 1.5, lng: 64.5 };
  var ARC_RADIUS = angular(SAT.lat, SAT.lng, -35.6, 92.8);

  // Points along the arc, sorted north to south, restricted to a latitude range.
  function arcPoints(radius, latMin, latMax, step) {
    var pts = [];
    for (var b = 60; b <= 200; b += (step || 0.5)) {
      var p = destination(SAT.lat, SAT.lng, b, radius);
      if (p[0] >= latMin && p[0] <= latMax) pts.push(p);
    }
    return pts;
  }

  function seventhArc() {
    return arcPoints(ARC_RADIUS, -45, 12, 0.5);
  }

  // A polygon hugging the arc between two latitudes, `halfWidth` degrees either side.
  function arcBand(latMin, latMax, halfWidth) {
    var inner = arcPoints(ARC_RADIUS - halfWidth, latMin, latMax, 0.5);
    var outer = arcPoints(ARC_RADIUS + halfWidth, latMin, latMax, 0.5).reverse();
    return inner.concat(outer);
  }

  function areaPolygon(area) {
    if (!area) return null;
    if (area.kind === "polygon") return area.coords;
    if (area.kind === "band") return arcBand(area.latMin, area.latMax, area.halfWidth);
    return null;
  }

  // Flight path segments.
  var ROUTE = {
    planned: [[2.7456, 101.7099], [6.9367, 103.585], [7.6, 104.2], [40.0799, 116.6031]],
    radar: [[2.7456, 101.7099], [6.9367, 103.585], [7.05, 103.75], [6.13, 102.29], [5.30, 100.28], [5.6, 99.2], [6.167, 97.583], [6.5, 96.5], [6.58, 96.35]],
    inferred: [[6.58, 96.35], [6.9, 95.3], [5.5, 94.0], [2.0, 93.4], [-10, 93.1], [-25, 93.0], [-35.6, 92.8]]
  };

  function fmtCoord(lat, lng) {
    var ns = lat >= 0 ? "N" : "S", ew = lng >= 0 ? "E" : "W";
    return Math.abs(lat).toFixed(3) + "° " + ns + ", " + Math.abs(lng).toFixed(3) + "° " + ew;
  }

  return { destination: destination, seventhArc: seventhArc, arcBand: arcBand, areaPolygon: areaPolygon, ROUTE: ROUTE, fmtCoord: fmtCoord, SAT: SAT };
})();
