# MH370 Tracker

A static website about Malaysia Airlines Flight 370: an interactive map of the flight route, search areas, potential final positions and debris finds, a detail page for every data point, a timeline, and a live counter showing how long the aircraft has been missing.

## Running it

There is no build step. Open `index.html` in a browser, or serve the folder with any static server:

```
python3 -m http.server 8000
```

then visit http://localhost:8000. The site also works as-is on GitHub Pages.

## Structure

| File | Purpose |
| --- | --- |
| `index.html` | Homepage: counter, map, data-point cards, timeline |
| `point.html` | Detail page, rendered from `?id=<point id>` |
| `js/data.js` | All data points, the timeline and category definitions |
| `js/geo.js` | 7th-arc geometry, flight-path segments, coordinate formatting |
| `js/app.js` | Homepage logic (counter, Leaflet map, cards, timeline) |
| `js/detail.js` | Detail-page rendering and mini map |
| `css/style.css` | Blue-and-black theme |

## Editing the data

Add or change entries in `js/data.js`. Each entry needs an `id`, `type` (`route`, `search`, `position` or `debris`), `name`, `lat`, `lng`, `dateLabel`, `summary`, `details` and `sources`. Search areas can also carry an `area`, either an explicit `polygon` or a `band` that hugs the 7th arc between two latitudes. New entries appear automatically on the map, in the card list and as a detail page.

## Data notes

Positions come from the ATSB operational search report, the Malaysian Safety Investigation report, Inmarsat's Journal of Navigation paper, CSIRO's drift analysis, DSTG's Bayesian analysis and public reporting. Radar-track positions, search-zone outlines and several debris-find coordinates are approximate and are flagged as such on their pages. The 2025–26 Ocean Infinity search entry describes the status as of the last update to this site; update it in `js/data.js` when news changes.
