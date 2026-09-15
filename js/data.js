/* MH370 dataset.
 * Every entry is a pin on the map and a page on the site.
 * Coordinates are approximate unless stated otherwise; sources are listed per entry.
 * Types: route | search | position | debris
 */
window.MH370 = (function () {
  // 01:21 MYT, 8 March 2014 — the moment the transponder stopped (UTC+8 => 17:21 UTC, 7 March).
  var MISSING_AT_UTC = Date.UTC(2014, 2, 7, 17, 21, 0);

  var SRC = {
    atsb: { label: "ATSB — The Operational Search for MH370 (final report, 2017)", url: "https://www.atsb.gov.au/publications/investigation_reports/2014/aair/ae-2014-054" },
    msi: { label: "Malaysian ICAO Annex 13 Safety Investigation Report (2018)", url: "https://mh370.gov.my/" },
    inmarsat: { label: "Ashton et al., 'The Search for MH370', Journal of Navigation (2014)", url: "https://www.cambridge.org/core/journals/journal-of-navigation/article/search-for-mh370/" },
    csiro: { label: "CSIRO — The search for MH370 and ocean surface drift (2017)", url: "https://www.csiro.au/en/research/natural-environment/oceans/mh370" },
    dstg: { label: "DSTG — Bayesian Methods in the Search for MH370 (2016)", url: "https://www.dst.defence.gov.au/publication/bayesian-methods-search-mh370" },
    wiki: { label: "Wikipedia — Malaysia Airlines Flight 370", url: "https://en.wikipedia.org/wiki/Malaysia_Airlines_Flight_370" },
    wikiSearch: { label: "Wikipedia — Search for Malaysia Airlines Flight 370", url: "https://en.wikipedia.org/wiki/Search_for_Malaysia_Airlines_Flight_370" },
    oi: { label: "Ocean Infinity", url: "https://oceaninfinity.com/" },
    godfrey: { label: "Richard Godfrey — MH370 WSPR analysis", url: "https://www.mh370search.com/" }
  };

  var points = [
    /* ------------------------------------------------------------------ */
    /* ROUTE                                                              */
    /* ------------------------------------------------------------------ */
    {
      id: "klia-departure",
      type: "route",
      name: "Departure — Kuala Lumpur International Airport",
      lat: 2.7456, lng: 101.7099,
      date: "2014-03-08",
      dateLabel: "8 March 2014, 00:41 MYT (16:41 UTC, 7 March)",
      summary: "MH370 takes off from runway 32R bound for Beijing with 239 people on board.",
      details: [
        "Malaysia Airlines Flight 370, a Boeing 777-200ER registered 9M-MRO, departed Kuala Lumpur International Airport at 00:41 local time on 8 March 2014. It was a scheduled overnight flight to Beijing Capital International Airport, due to land at 06:30 Beijing time.",
        "On board were 227 passengers and 12 crew. The flight was commanded by Captain Zaharie Ahmad Shah, with First Officer Fariq Abdul Hamid as co-pilot.",
        "The aircraft climbed to its cruising altitude of 35,000 ft and flew north-east over the Malay Peninsula towards the South China Sea, following the planned airway towards waypoint IGARI on the boundary between Malaysian and Vietnamese airspace."
      ],
      facts: [
        { label: "Aircraft", value: "Boeing 777-200ER, 9M-MRO" },
        { label: "People on board", value: "239 (227 passengers, 12 crew)" },
        { label: "Destination", value: "Beijing Capital International Airport" },
        { label: "Scheduled arrival", value: "06:30 CST, 8 March 2014" }
      ],
      sources: [SRC.msi, SRC.wiki]
    },
    {
      id: "igari-last-contact",
      type: "route",
      name: "Waypoint IGARI — last transponder signal",
      lat: 6.9367, lng: 103.585,
      date: "2014-03-08",
      dateLabel: "8 March 2014, 01:21 MYT (17:21 UTC, 7 March)",
      summary: "The last voice contact ('Good night, Malaysian three seven zero') and, two minutes later, the transponder stops.",
      details: [
        "At 01:19 MYT, as the aircraft approached IGARI, Kuala Lumpur air traffic control instructed MH370 to contact Ho Chi Minh control. The reply from the cockpit — 'Good night, Malaysian three seven zero' — was the final voice transmission from the flight.",
        "At 01:21 MYT, seconds after passing IGARI, the aircraft's transponder stopped transmitting and the flight disappeared from the secondary surveillance radar screens of air traffic control. The handover to Vietnamese control never happened.",
        "The last ACARS (Aircraft Communications Addressing and Reporting System) data transmission had been sent at 01:07 MYT. The next scheduled transmission at 01:37 never arrived.",
        "This is the moment used by this website as the point at which MH370 'went missing', and the moment from which the counter on the homepage runs."
      ],
      facts: [
        { label: "Last ACARS transmission", value: "01:07 MYT" },
        { label: "Last voice contact", value: "01:19 MYT" },
        { label: "Transponder lost", value: "01:21 MYT" },
        { label: "Waypoint", value: "IGARI (6°56′N 103°35′E)" }
      ],
      sources: [SRC.msi, SRC.wiki]
    },
    {
      id: "turnback-kota-bharu",
      type: "route",
      name: "Turn-back across the Malay Peninsula",
      lat: 6.13, lng: 102.29,
      date: "2014-03-08",
      dateLabel: "8 March 2014, approx. 01:30–01:40 MYT",
      summary: "Military primary radar tracks an unidentified aircraft turning sharply back south-west and crossing the peninsula near Kota Bharu.",
      approximate: true,
      details: [
        "Shortly after the transponder stopped, Malaysian military primary radar recorded an aircraft making a sharp turn to the south-west. The track then crossed back over the Malay Peninsula, passing close to Kota Bharu on the east coast.",
        "Because the transponder was off, air traffic controllers did not see this. The radar data was only pieced together in the days after the disappearance, which is why the initial search was focused on the South China Sea.",
        "Investigators concluded the turn was made under manual control rather than by the autopilot, but could not determine who was flying the aircraft."
      ],
      facts: [
        { label: "Data source", value: "Malaysian military primary radar" },
        { label: "Heading", value: "South-west, then west" }
      ],
      sources: [SRC.msi, SRC.atsb]
    },
    {
      id: "penang",
      type: "route",
      name: "Passing south of Penang",
      lat: 5.30, lng: 100.28,
      date: "2014-03-08",
      dateLabel: "8 March 2014, approx. 01:52 MYT",
      summary: "The radar track passes just south of Penang Island before turning north-west up the Strait of Malacca.",
      approximate: true,
      details: [
        "After crossing the peninsula, the radar track continued west and passed south of Penang Island at about 01:52 MYT, then turned north-west to follow airway N571 out over the Strait of Malacca.",
        "Malaysian police later reported that the first officer's mobile phone briefly connected to a cell tower on Penang around this time — consistent with the aircraft's position, though no call was made."
      ],
      facts: [
        { label: "Data source", value: "Malaysian military primary radar" },
        { label: "Next airway", value: "N571 towards VAMPI and MEKAR" }
      ],
      sources: [SRC.msi, SRC.wiki]
    },
    {
      id: "mekar-last-radar",
      type: "route",
      name: "Last primary radar contact, past waypoint MEKAR",
      lat: 6.58, lng: 96.35,
      date: "2014-03-08",
      dateLabel: "8 March 2014, 02:22 MYT (18:22 UTC, 7 March)",
      summary: "The final radar return, about 10 nautical miles beyond MEKAR and roughly 200 nautical miles north-west of Penang.",
      approximate: true,
      details: [
        "The last primary radar return from MH370 was recorded at 02:22 MYT, around 10 nautical miles past waypoint MEKAR on airway N571, heading north-west over the Andaman Sea.",
        "Three minutes later, at 02:25 MYT (18:25 UTC), the aircraft's satellite data unit sent a log-on request to the Inmarsat-3 F1 satellite. From this point on the only record of the flight is a series of hourly 'handshakes' between the aircraft and the satellite ground station in Perth.",
        "Two calls placed to the aircraft from the ground (at 02:39 and 07:13 MYT) went unanswered but were acknowledged by the aircraft's satellite terminal, proving the aircraft was still powered and flying."
      ],
      facts: [
        { label: "Time", value: "02:22 MYT" },
        { label: "Distance from Penang", value: "~200 nautical miles" },
        { label: "Satellite log-on", value: "02:25 MYT (18:25 UTC)" }
      ],
      sources: [SRC.atsb, SRC.msi, SRC.inmarsat]
    },
    {
      id: "final-major-turn",
      type: "route",
      name: "Final major turn to the south (inferred)",
      lat: 5.5, lng: 94.0,
      date: "2014-03-08",
      dateLabel: "8 March 2014, between approx. 02:28 and 02:40 MYT",
      summary: "Satellite data analysis indicates the aircraft turned south somewhere north-west of Sumatra and flew for nearly six more hours.",
      approximate: true,
      details: [
        "There is no radar coverage of MH370 after 02:22 MYT. Analysis of the satellite handshake timings (burst timing offset) and frequency shifts (burst frequency offset) shows that, some time between about 02:28 and 02:40 MYT, the aircraft turned from its north-westerly heading onto a southerly track.",
        "The exact location of this 'final major turn' is unknown. Most reconstructions place it north-west of the tip of Sumatra. The position shown here is an approximate centre of the plausible turn region, not a measured location.",
        "From here the aircraft is believed to have flown almost due south, at cruising altitude and speed, for the remainder of its fuel — ending in the southern Indian Ocean."
      ],
      facts: [
        { label: "Basis", value: "Inmarsat BTO/BFO analysis" },
        { label: "Time window", value: "18:28–18:40 UTC" },
        { label: "Certainty", value: "Inferred, not observed" }
      ],
      sources: [SRC.atsb, SRC.inmarsat, SRC.dstg]
    },
    {
      id: "seventh-arc",
      type: "route",
      name: "The 7th arc — final satellite handshake",
      lat: -30.0, lng: 98.8,
      date: "2014-03-08",
      dateLabel: "8 March 2014, 08:19 MYT (00:19 UTC)",
      summary: "The last signal from MH370: a log-on request consistent with fuel exhaustion, placing the aircraft somewhere on a long arc across the Indian Ocean.",
      approximate: true,
      details: [
        "Each satellite handshake fixed the distance between the aircraft and the Inmarsat-3 F1 satellite, which describes a circle (an 'arc') on the Earth's surface. The seventh and final handshake, at 00:19 UTC (08:19 MYT), was a log-on request initiated by the aircraft — the behaviour expected when the engines flame out and the auxiliary power unit restarts the electrical system.",
        "The 7th arc is therefore the best available constraint on where MH370 ended its flight. Doppler analysis rules out the northern half of the arc, leaving the southern portion across the Indian Ocean, west of Australia.",
        "The pin marks a representative point on the arc. The full arc is drawn on the map as a blue line; every underwater search since 2014 has been conducted along it."
      ],
      facts: [
        { label: "Time of last handshake", value: "00:19:29 UTC" },
        { label: "Expected impact", value: "Within tens of km of the arc" },
        { label: "Interpretation", value: "Fuel exhaustion and uncontrolled descent" }
      ],
      sources: [SRC.atsb, SRC.inmarsat, SRC.dstg]
    },

    /* ------------------------------------------------------------------ */
    /* SEARCH AREAS                                                       */
    /* ------------------------------------------------------------------ */
    {
      id: "search-south-china-sea",
      type: "search",
      name: "Initial search — South China Sea and Gulf of Thailand",
      lat: 7.4, lng: 104.6,
      date: "2014-03-08",
      dateLabel: "8–15 March 2014",
      summary: "The first week of searching focused on the area where the transponder stopped, before radar data revealed the turn-back.",
      area: { kind: "polygon", coords: [[4.5, 102.6], [9.8, 102.6], [9.8, 106.8], [4.5, 106.8]] },
      details: [
        "Because the flight vanished from air traffic control screens near IGARI, the first search concentrated on the South China Sea and Gulf of Thailand, along the planned route towards Vietnam. Ships and aircraft from Malaysia, Vietnam, China, Thailand, Singapore, the United States and others took part.",
        "Several reported oil slicks and floating objects were investigated but none were linked to the aircraft.",
        "On 15 March 2014, Malaysia's Prime Minister announced that satellite and radar data showed the aircraft had deliberately turned back and flown for hours, and the search in the South China Sea was called off."
      ],
      facts: [
        { label: "Duration", value: "8 days" },
        { label: "Outcome", value: "Nothing found; area ruled out" }
      ],
      sources: [SRC.wikiSearch, SRC.msi]
    },
    {
      id: "search-malacca-andaman",
      type: "search",
      name: "Strait of Malacca and Andaman Sea",
      lat: 7.0, lng: 97.5,
      date: "2014-03-09",
      dateLabel: "9–17 March 2014",
      summary: "As radar evidence of the westward track emerged, the search expanded to the west of the peninsula.",
      area: { kind: "polygon", coords: [[1.5, 101.8], [6.0, 97.3], [10.5, 93.0], [12.5, 95.5], [7.5, 100.5], [3.5, 103.2]] },
      details: [
        "From 9 March, once Malaysian military radar data suggested an aircraft had turned back, search assets were also deployed to the Strait of Malacca and, later, the Andaman Sea and Bay of Bengal.",
        "The Inmarsat analysis released on 15 March defined two possible 'corridors' — one to the north across Asia and one to the south into the Indian Ocean. Within days the northern corridor was ruled out and the effort shifted to the southern Indian Ocean."
      ],
      facts: [
        { label: "Duration", value: "9 days" },
        { label: "Outcome", value: "Nothing found; superseded by satellite analysis" }
      ],
      sources: [SRC.wikiSearch, SRC.inmarsat]
    },
    {
      id: "search-sio-initial",
      type: "search",
      name: "Southern Indian Ocean surface search — initial zone",
      lat: -44.0, lng: 90.0,
      date: "2014-03-18",
      dateLabel: "18–27 March 2014",
      summary: "The first Australian-led surface search, about 2,500 km south-west of Perth, based on early satellite-data flight path models.",
      area: { kind: "polygon", coords: [[-41.0, 85.0], [-41.0, 95.0], [-47.0, 95.0], [-47.0, 85.0]] },
      details: [
        "On 17 March 2014 Australia took charge of the search in the southern Indian Ocean. The Australian Maritime Safety Authority (AMSA) directed aircraft and ships to a remote area roughly 2,500 km south-west of Perth, derived from the earliest flight-path reconstructions.",
        "Satellite images from several countries showed possible floating objects in this region, and a number of items were spotted from the air, but every object recovered turned out to be unrelated marine debris.",
        "The zone was abandoned on 28 March when refined analysis of the aircraft's likely speed moved the probable end point about 1,100 km to the north-east."
      ],
      facts: [
        { label: "Lead agency", value: "AMSA / JACC" },
        { label: "Distance from Perth", value: "~2,500 km" },
        { label: "Outcome", value: "Nothing found" }
      ],
      sources: [SRC.atsb, SRC.wikiSearch]
    },
    {
      id: "search-sio-shifted",
      type: "search",
      name: "Surface search — revised zone west of Perth",
      lat: -31.0, lng: 97.0,
      date: "2014-03-28",
      dateLabel: "28 March – 28 April 2014",
      summary: "The surface search moved north-east after revised speed analysis; it ended after 52 days with no debris recovered.",
      area: { kind: "polygon", coords: [[-28.0, 94.0], [-28.0, 100.5], [-34.0, 100.5], [-34.0, 94.0]] },
      details: [
        "Refined radar and satellite analysis suggested MH370 had flown faster than first assumed, burning fuel more quickly and travelling less far south. The search area was moved about 1,850 km west of Perth.",
        "Dozens of aircraft and ships from Australia, China, Japan, Korea, Malaysia, New Zealand, the UK and the US searched this zone. Objects were spotted and recovered, but none belonged to the aircraft.",
        "The surface search was formally ended on 28 April 2014. In total it covered around 4.5 million square kilometres of ocean."
      ],
      facts: [
        { label: "Duration", value: "52 days (whole surface search)" },
        { label: "Area covered", value: "~4.5 million km² (whole surface search)" },
        { label: "Outcome", value: "Nothing found" }
      ],
      sources: [SRC.atsb, SRC.wikiSearch]
    },
    {
      id: "search-ocean-shield-pings",
      type: "search",
      name: "Acoustic detections and Bluefin-21 underwater search",
      lat: -21.0, lng: 104.0,
      date: "2014-04-05",
      dateLabel: "5 April – 28 May 2014",
      summary: "Underwater 'pings' detected by Ocean Shield triggered the first seabed search; they turned out not to be from the flight recorders.",
      area: { kind: "polygon", coords: [[-19.8, 102.8], [-19.8, 105.2], [-22.2, 105.2], [-22.2, 102.8]] },
      details: [
        "On 5–8 April 2014, the Australian Defence Vessel Ocean Shield, using a towed pinger locator, detected acoustic signals near the frequency emitted by flight-recorder underwater locator beacons, in water about 4,500 m deep roughly 1,650 km north-west of Perth.",
        "The Bluefin-21 autonomous underwater vehicle then surveyed around 850 km² of seabed around the detections. Nothing was found, and by late May 2014 authorities concluded the signals had not come from MH370's recorders.",
        "The area lies close to the 7th arc, but far north of where later analysis placed the most probable end point."
      ],
      facts: [
        { label: "Vessel", value: "ADV Ocean Shield" },
        { label: "Seabed searched", value: "~850 km² (Bluefin-21)" },
        { label: "Outcome", value: "Detections ruled out" }
      ],
      sources: [SRC.atsb, SRC.wikiSearch]
    },
    {
      id: "search-atsb-priority",
      type: "search",
      name: "ATSB priority underwater search area (120,000 km²)",
      lat: -36.5, lng: 90.7,
      date: "2014-10-06",
      dateLabel: "6 October 2014 – 17 January 2017",
      summary: "The main sonar search: three years, 120,000 km² of seabed along the 7th arc, led by Australia with Malaysia and China.",
      area: { kind: "band", latMin: -39.6, latMax: -32.8, halfWidth: 0.62 },
      details: [
        "After a bathymetric survey mapped the seabed, the Australian Transport Safety Bureau (ATSB) coordinated a deep-water sonar search along the 7th arc. Vessels including GO Phoenix, Fugro Discovery, Fugro Equator and Dong Hai Jiu 101 towed side-scan sonar and deployed autonomous vehicles in water up to 6,000 m deep.",
        "The area was defined using a Bayesian analysis by Australia's Defence Science and Technology Group (DSTG), which combined the satellite data with aircraft performance models. It was extended from 60,000 km² to 120,000 km² in 2015.",
        "The search was suspended on 17 January 2017 by agreement of Malaysia, Australia and China, having found no trace of the aircraft. The ATSB's final report noted that the remaining most-likely area lay just north of the searched zone."
      ],
      facts: [
        { label: "Seabed searched", value: "120,000 km²" },
        { label: "Cost", value: "~A$200 million" },
        { label: "Outcome", value: "Nothing found; suspended January 2017" }
      ],
      sources: [SRC.atsb, SRC.dstg]
    },
    {
      id: "search-first-principles",
      type: "search",
      name: "First Principles Review area (25,000 km²)",
      lat: -34.2, lng: 93.8,
      date: "2016-12-20",
      dateLabel: "Recommended December 2016",
      summary: "An expert review identified a 25,000 km² zone between 32.5°S and 36°S as the most likely remaining location — but it was not searched until 2018.",
      area: { kind: "band", latMin: -36.0, latMax: -32.5, halfWidth: 0.32 },
      details: [
        "In November 2016 the ATSB convened a 'First Principles Review' of all the evidence, including the new drift analysis from debris finds. The experts concluded that the aircraft was unlikely to be in the 120,000 km² area already searched and identified a 25,000 km² zone immediately to the north, between about 32.5°S and 36°S along the 7th arc.",
        "The three governments declined to extend the official search into this area, citing the lack of 'credible new information' pointing to a specific location. It was ultimately covered by Ocean Infinity's 2018 search."
      ],
      facts: [
        { label: "Area", value: "~25,000 km²" },
        { label: "Latitude range", value: "32.5°S – 36°S" },
        { label: "Searched", value: "2018 (Ocean Infinity)" }
      ],
      sources: [SRC.atsb, SRC.csiro]
    },
    {
      id: "search-ocean-infinity-2018",
      type: "search",
      name: "Ocean Infinity search 2018 (112,000 km²)",
      lat: -29.0, lng: 99.4,
      date: "2018-01-22",
      dateLabel: "22 January – 9 June 2018",
      summary: "A 'no find, no fee' private search by Seabed Constructor covered a further 112,000 km², pushing north along the arc to about 25°S.",
      area: { kind: "band", latMin: -36.2, latMax: -25.0, halfWidth: 0.6 },
      details: [
        "The US-based company Ocean Infinity agreed with the Malaysian government to search on a 'no find, no fee' basis. Its vessel Seabed Constructor deployed a fleet of up to eight autonomous underwater vehicles simultaneously, covering seabed far faster than the earlier towed-sonar search.",
        "The search began in the 25,000 km² First Principles Review area and then extended north along the 7th arc to around 25°S, covering roughly 112,000 km² in total.",
        "It ended in June 2018 without locating the wreckage. Malaysia's Safety Investigation Team published its final report the following month."
      ],
      facts: [
        { label: "Vessel", value: "Seabed Constructor" },
        { label: "Seabed searched", value: "~112,000 km²" },
        { label: "Outcome", value: "Nothing found" }
      ],
      sources: [SRC.oi, SRC.wikiSearch, SRC.msi]
    },
    {
      id: "search-ocean-infinity-2025",
      type: "search",
      name: "Ocean Infinity search 2025–2026 (approx. 15,000 km²)",
      lat: -35.9, lng: 92.4,
      date: "2025-02-25",
      dateLabel: "From 25 February 2025 (paused April 2025, resumed 30 December 2025)",
      summary: "A renewed 'no find, no fee' search targeting prioritised hotspots between roughly 33°S and 36°S along the 7th arc.",
      area: { kind: "band", latMin: -36.6, latMax: -33.0, halfWidth: 0.45 },
      details: [
        "In December 2024 Malaysia agreed in principle to a new Ocean Infinity search, again on a 'no find, no fee' basis, with a payment of about US$70 million due only if the wreckage is found. The company's vessel Armada 78 06 began operations in the southern Indian Ocean in late February 2025.",
        "The 2025–26 search focuses on a prioritised set of around 15,000 km² of seabed built from newer analyses, including refined drift modelling, re-examinations of the satellite data and the WSPR radio-signal studies. The target zones lie along the 7th arc between roughly 33°S and 36°S, including some areas previously searched with older sonar coverage gaps.",
        "The search paused in April 2025 because of the southern-hemisphere winter weather and resumed on 30 December 2025 for a planned 55-day campaign. As of this site's last update, no discovery of the wreckage had been confirmed publicly. See the Ocean Infinity and Malaysian Ministry of Transport channels for the latest status."
      ],
      facts: [
        { label: "Vessel", value: "Armada 78 06" },
        { label: "Target area", value: "~15,000 km² of hotspots" },
        { label: "Terms", value: "No find, no fee (US$70m on success)" }
      ],
      sources: [SRC.oi, SRC.wikiSearch]
    },

    /* ------------------------------------------------------------------ */
    /* POTENTIAL FINAL POSITIONS                                          */
    /* ------------------------------------------------------------------ */
    {
      id: "position-inmarsat-2014",
      type: "position",
      name: "Inmarsat 'hotspot' (2014)",
      lat: -34.7, lng: 93.0,
      date: "2014-09",
      dateLabel: "Published September 2014",
      summary: "Inmarsat's own reconstruction of the satellite data pointed to a most-likely end point near 34.7°S, 93.0°E.",
      approximate: true,
      details: [
        "The satellite operator Inmarsat, whose ground station in Perth logged the handshakes, published its analysis in the Journal of Navigation in 2014. Using the burst timing offset (distance from the satellite) and burst frequency offset (Doppler shift, which depends on speed and direction), its engineers reconstructed candidate flight paths.",
        "Their best-fit path ended near 34.7°S, 93.0°E on the 7th arc — a location that was outside the ATSB's initial priority area but was later covered by Ocean Infinity in 2018."
      ],
      facts: [
        { label: "Method", value: "BTO/BFO path reconstruction" },
        { label: "Status", value: "Searched 2018, nothing found" }
      ],
      sources: [SRC.inmarsat, SRC.wikiSearch]
    },
    {
      id: "position-dstg-bayesian",
      type: "position",
      name: "DSTG Bayesian analysis — highest-probability zone",
      lat: -37.5, lng: 89.2,
      date: "2015-12",
      dateLabel: "December 2015",
      summary: "The Defence Science and Technology Group's probability map, which defined the 120,000 km² search, peaked between about 36°S and 39.5°S.",
      approximate: true,
      details: [
        "Australia's DSTG built a full Bayesian model of the flight, combining the satellite measurements with statistical models of how commercial aircraft are flown (speeds, altitudes, turn frequencies). The output was a probability density along the 7th arc.",
        "The highest-probability region lay in the southern part of the arc, roughly between 36°S and 39.5°S, and this defined the core of the ATSB's priority search area. The pin marks an approximate centre of that zone. Independent analysts (the 'Independent Group') had reached a similar conclusion in 2014.",
        "After the 120,000 km² area was searched without success, the drift analysis of recovered debris suggested the true position lay further north."
      ],
      facts: [
        { label: "Method", value: "Bayesian flight-path modelling" },
        { label: "Status", value: "Searched 2014–17, nothing found" }
      ],
      sources: [SRC.dstg, SRC.atsb]
    },
    {
      id: "position-csiro-drift",
      type: "position",
      name: "CSIRO drift analysis (2017)",
      lat: -35.6, lng: 92.8,
      date: "2017-04",
      dateLabel: "April 2017",
      summary: "Modelling of how debris drifted to Africa and Réunion pointed to a crash site near 35.6°S, 92.8°E.",
      details: [
        "Australia's national science agency, CSIRO, modelled the drift of the recovered debris — especially the flaperon — backwards from the beaches where it was found, using ocean current data and field trials with replica flaperons.",
        "Its April 2017 report concluded that the most likely location was 35.6°S, 92.8°E, with the plausible range lying between about 32°S and 36°S. The absence of debris on Australian shores, and the timing of the Réunion find, both fitted this location well.",
        "The position sits just north of the ATSB's searched area and within the zone later covered by Ocean Infinity in 2018."
      ],
      facts: [
        { label: "Method", value: "Ocean drift modelling" },
        { label: "Confidence range", value: "~32°S – 36°S" },
        { label: "Status", value: "Searched 2018; re-targeted 2025" }
      ],
      sources: [SRC.csiro, SRC.atsb]
    },
    {
      id: "position-uwa-drift",
      type: "position",
      name: "University of Western Australia drift model",
      lat: -32.5, lng: 96.5,
      date: "2016",
      dateLabel: "2016 onwards",
      summary: "Independent drift modelling by Prof. Charitha Pattiaratchi's group points to a location near 33°S along the 7th arc.",
      approximate: true,
      details: [
        "Oceanographers at the University of Western Australia ran their own drift simulations after the flaperon was found on Réunion in 2015, and updated them as more debris was found in Mozambique, South Africa, Mauritius, Madagascar and Tanzania.",
        "Their results consistently favoured a crash site along the 7th arc in the low 30s of degrees south — somewhat north of the CSIRO estimate. The pin marks an approximate location; the group's published figures vary slightly between updates."
      ],
      facts: [
        { label: "Method", value: "Ocean drift modelling" },
        { label: "Status", value: "Area partially searched 2018" }
      ],
      sources: [SRC.wikiSearch]
    },
    {
      id: "position-godfrey-wspr",
      type: "position",
      name: "WSPR radio-signal analysis (Godfrey, 2021–2023)",
      lat: -33.177, lng: 95.300,
      date: "2021-11",
      dateLabel: "November 2021, refined 2023",
      summary: "Aerospace engineer Richard Godfrey's controversial analysis of amateur-radio WSPR data proposes a crash site at 33.177°S, 95.300°E.",
      details: [
        "Richard Godfrey proposed that disturbances in the global database of WSPR (Weak Signal Propagation Reporter) amateur-radio transmissions could be used to track aircraft, and used them to reconstruct MH370's flight path.",
        "His analysis, later published jointly with Dr Hannes Coetzee and Prof. Simon Maskell, places the end point at 33.177°S, 95.300°E, about 1,560 km west of Perth, in an area of rugged seabed that received limited coverage in 2018.",
        "The method is disputed by some radio scientists, but the location is among those prioritised in Ocean Infinity's 2025–26 search."
      ],
      facts: [
        { label: "Method", value: "WSPR signal analysis" },
        { label: "Distance from Perth", value: "~1,560 km" },
        { label: "Status", value: "Targeted in 2025–26 search" }
      ],
      sources: [SRC.godfrey, SRC.wikiSearch]
    },
    {
      id: "position-lyne-broken-ridge",
      type: "position",
      name: "Broken Ridge 'deep hole' hypothesis (Lyne, 2024)",
      lat: -33.02, lng: 100.27,
      date: "2024-08",
      dateLabel: "August 2024",
      summary: "Researcher Vincent Lyne argues the pilot deliberately flew to a deep trench at the eastern end of Broken Ridge, at Penang's longitude.",
      approximate: true,
      details: [
        "Vincent Lyne of the University of Tasmania has proposed that MH370 was flown under control to a deliberately chosen hiding place: a 6,000 m deep hole at the eastern end of the Broken Ridge, an underwater plateau in the south-east Indian Ocean.",
        "The location — roughly 33°S at 100.27°E, the longitude of Penang — lies well east of the 7th arc and would require a controlled glide or powered flight beyond fuel exhaustion. It has not been adopted by official search planners but has attracted attention as an alternative hypothesis."
      ],
      facts: [
        { label: "Method", value: "Hypothesis from pilot-intent and bathymetry" },
        { label: "Status", value: "Not searched" }
      ],
      sources: [SRC.wikiSearch]
    },

    /* ------------------------------------------------------------------ */
    /* DEBRIS                                                             */
    /* ------------------------------------------------------------------ */
    {
      id: "debris-reunion-flaperon",
      type: "debris",
      name: "Flaperon — Saint-André, Réunion",
      lat: -20.95, lng: 55.65,
      date: "2015-07-29",
      dateLabel: "29 July 2015",
      summary: "The first confirmed piece of MH370: a right-wing flaperon washed ashore on the French island of Réunion, 16 months after the disappearance.",
      status: "Confirmed",
      details: [
        "A municipal beach-cleaning crew found a 2 m long section of a Boeing 777 wing on the shore at Saint-André, on the east coast of Réunion in the western Indian Ocean. It was identified by its part number as a flaperon, a control surface on the trailing edge of the wing.",
        "French judicial authorities, working with Boeing and Malaysian investigators, confirmed in September 2015 that the flaperon came from 9M-MRO. It was the first physical evidence that the aircraft had crashed in the Indian Ocean.",
        "The barnacle growth and damage pattern on the flaperon became central to drift studies and to debate about whether the aircraft entered the water in a high-speed dive or a controlled ditching."
      ],
      facts: [
        { label: "Part", value: "Right wing flaperon" },
        { label: "Identification", value: "Confirmed (part number and serial plate)" },
        { label: "Found by", value: "Beach cleaning crew" }
      ],
      sources: [SRC.msi, SRC.wiki]
    },
    {
      id: "debris-mozambique-676eb",
      type: "debris",
      name: "Flap track fairing '676EB' — near Xai-Xai, Mozambique",
      lat: -25.1, lng: 33.7,
      date: "2015-12-27",
      dateLabel: "27 December 2015 (reported March 2016)",
      summary: "A South African teenager on holiday found a piece of flap fairing stencilled '676EB' on a beach in southern Mozambique.",
      status: "Almost certain",
      approximate: true,
      details: [
        "Liam Lötter, 18, found a curved fibreglass panel on a beach in southern Mozambique while on holiday in December 2015. Only after reports of another find in Mozambique in March 2016 did his family report it.",
        "The stencil '676EB' matched a Boeing 777 flap track fairing part number. Malaysian investigators assessed the piece as 'almost certainly' from MH370."
      ],
      facts: [
        { label: "Part", value: "Flap track fairing panel" },
        { label: "Identification", value: "Almost certain" },
        { label: "Found by", value: "Liam Lötter" }
      ],
      sources: [SRC.msi, SRC.wiki]
    },
    {
      id: "debris-mozambique-no-step",
      type: "debris",
      name: "'NO STEP' stabiliser panel — Vilankulo, Mozambique",
      lat: -21.95, lng: 35.45,
      date: "2016-02-27",
      dateLabel: "27 February 2016",
      summary: "American debris hunter Blaine Gibson found a triangular panel marked 'NO STEP' on a sandbank off Vilankulo.",
      status: "Almost certain",
      approximate: true,
      details: [
        "Blaine Gibson, a lawyer who devoted himself to searching Indian Ocean shorelines for MH370 debris, found the piece on the Paluma sandbank near Vilankulo on the Mozambique coast, guided by a local boatman.",
        "The panel was identified as part of the right horizontal stabiliser of a Boeing 777. Its fasteners and paint matched Malaysia Airlines' fleet, and investigators assessed it as almost certainly from MH370.",
        "Gibson went on to find or collect the majority of the debris pieces recovered from Madagascar and Mozambique."
      ],
      facts: [
        { label: "Part", value: "Horizontal stabiliser panel" },
        { label: "Identification", value: "Almost certain" },
        { label: "Found by", value: "Blaine Gibson" }
      ],
      sources: [SRC.msi, SRC.wiki]
    },
    {
      id: "debris-south-africa-cowling",
      type: "debris",
      name: "Engine cowling segment — Mossel Bay, South Africa",
      lat: -34.18, lng: 22.15,
      date: "2016-03-21",
      dateLabel: "21 March 2016",
      summary: "A piece of engine cowling bearing part of a Rolls-Royce logo was found by an archaeologist on the South African coast.",
      status: "Almost certain",
      details: [
        "Neels Kruger found the piece on a beach near Mossel Bay, on South Africa's southern coast. The fragment carried the partial stencil of the Rolls-Royce logo used on the Trent 800 engine cowlings of Malaysia Airlines' 777 fleet.",
        "This was the westernmost and southernmost find, showing how far the debris had drifted along the Agulhas current system."
      ],
      facts: [
        { label: "Part", value: "Engine cowling (Rolls-Royce Trent 800)" },
        { label: "Identification", value: "Almost certain" },
        { label: "Found by", value: "Neels Kruger" }
      ],
      sources: [SRC.msi, SRC.wiki]
    },
    {
      id: "debris-rodrigues-panel",
      type: "debris",
      name: "Cabin interior panel — Rodrigues Island, Mauritius",
      lat: -19.71, lng: 63.42,
      date: "2016-03-30",
      dateLabel: "30 March 2016",
      summary: "A piece of interior decorative panelling was found on the remote island of Rodrigues, east of Mauritius.",
      status: "Almost certain",
      details: [
        "The fragment was found by a couple at a beach resort on Rodrigues. It was identified as a section of an interior panel from the aircraft cabin, with a laminate pattern matching Malaysia Airlines' 777 interiors.",
        "It was the first piece of interior debris found, indicating that the fuselage had broken open."
      ],
      facts: [
        { label: "Part", value: "Cabin interior panel" },
        { label: "Identification", value: "Almost certain" }
      ],
      sources: [SRC.msi, SRC.wiki]
    },
    {
      id: "debris-mauritius-flap-fairing",
      type: "debris",
      name: "Flap fairing piece — Gris Gris, Mauritius",
      lat: -20.52, lng: 57.52,
      date: "2016-05-24",
      dateLabel: "24 May 2016",
      summary: "A fragment of wing flap fairing found on the southern coast of Mauritius.",
      status: "Almost certain",
      approximate: true,
      details: [
        "A hotel guest found the piece near Gris Gris on the south coast of Mauritius. Investigators identified it as a section of the right outboard flap's supporting fairing, consistent with the Réunion flaperon and the Pemba flap piece."
      ],
      facts: [
        { label: "Part", value: "Wing flap fairing" },
        { label: "Identification", value: "Almost certain" }
      ],
      sources: [SRC.msi, SRC.wiki]
    },
    {
      id: "debris-madagascar-nosy-boraha",
      type: "debris",
      name: "Multiple fragments — Nosy Boraha and the east coast of Madagascar",
      lat: -17.0, lng: 49.85,
      date: "2016-06-06",
      dateLabel: "June 2016 and later finds through 2022",
      summary: "Blaine Gibson and local residents recovered numerous fragments from Madagascar's east coast, including cabin interior pieces and a suspected landing-gear door.",
      status: "Likely / Almost certain (varies by piece)",
      approximate: true,
      details: [
        "The island of Nosy Boraha (Île Sainte-Marie) and the nearby mainland coast of Madagascar became the richest source of MH370 debris. In June 2016 Blaine Gibson collected several pieces at Riake beach, including fragments of interior panelling and seat-back trim.",
        "Further pieces were handed in by local residents over the following years. In 2022 Gibson and Richard Godfrey reported a piece found at Antsiraka beach in 2017 that they identified as part of a landing-gear door, with damage they argued was consistent with the gear being lowered at impact.",
        "Malaysian investigators classified the Madagascar pieces variously as 'almost certain', 'highly likely' or 'likely' to be from MH370."
      ],
      facts: [
        { label: "Parts", value: "Interior panels, trailing-edge fragments, suspected gear door" },
        { label: "Identification", value: "Likely to almost certain" },
        { label: "Found by", value: "Blaine Gibson and local residents" }
      ],
      sources: [SRC.msi, SRC.wiki]
    },
    {
      id: "debris-pemba-flap",
      type: "debris",
      name: "Outboard flap section — Pemba Island, Tanzania",
      lat: -5.25, lng: 39.85,
      date: "2016-06-20",
      dateLabel: "20 June 2016",
      summary: "A large section of the right outboard wing flap, later confirmed as from MH370, was found by fishermen on Kojani, off Pemba.",
      status: "Confirmed",
      details: [
        "Fishermen found the flap section on the small island of Kojani, off the east coast of Pemba in the Zanzibar archipelago. At about 2 m across it was one of the largest pieces recovered.",
        "Malaysian and Australian investigators confirmed through part and serial numbers that it was the right outboard flap of 9M-MRO. Examination by the ATSB indicated the flap was most likely retracted at the time of separation, which argued against a controlled ditching with flaps extended.",
        "It was the northernmost find, having drifted almost to the equator."
      ],
      facts: [
        { label: "Part", value: "Right outboard flap" },
        { label: "Identification", value: "Confirmed" },
        { label: "Key finding", value: "Flap likely retracted at impact" }
      ],
      sources: [SRC.atsb, SRC.msi, SRC.wiki]
    }
  ];

  var timeline = [
    { date: "8 Mar 2014", text: "MH370 departs Kuala Lumpur at 00:41; last voice contact 01:19; transponder lost at 01:21 near IGARI; last radar contact 02:22; final satellite handshake 08:19.", link: "igari-last-contact" },
    { date: "8–15 Mar 2014", text: "Search in the South China Sea and Gulf of Thailand; on 15 March Malaysia announces the aircraft was deliberately diverted.", link: "search-south-china-sea" },
    { date: "17 Mar 2014", text: "Australia takes over the search in the southern Indian Ocean.", link: "search-sio-initial" },
    { date: "24 Mar 2014", text: "Malaysia's Prime Minister announces that MH370 'ended in the southern Indian Ocean'.", link: "seventh-arc" },
    { date: "5–8 Apr 2014", text: "ADV Ocean Shield detects acoustic 'pings'; Bluefin-21 seabed search finds nothing.", link: "search-ocean-shield-pings" },
    { date: "28 Apr 2014", text: "Surface search ends after 52 days and 4.5 million km².", link: "search-sio-shifted" },
    { date: "6 Oct 2014", text: "Deep-water sonar search begins along the 7th arc.", link: "search-atsb-priority" },
    { date: "29 Jan 2015", text: "Malaysia officially declares the loss an accident and all on board presumed dead." },
    { date: "29 Jul 2015", text: "Flaperon found on Réunion — the first confirmed debris.", link: "debris-reunion-flaperon" },
    { date: "Dec 2015 – Jun 2016", text: "Debris found in Mozambique, South Africa, Rodrigues, Mauritius, Madagascar and Tanzania.", link: "debris-pemba-flap" },
    { date: "17 Jan 2017", text: "The 120,000 km² underwater search is suspended.", link: "search-atsb-priority" },
    { date: "Apr 2017", text: "CSIRO drift analysis points to 35.6°S, 92.8°E.", link: "position-csiro-drift" },
    { date: "22 Jan – 9 Jun 2018", text: "Ocean Infinity searches a further 112,000 km² with no result.", link: "search-ocean-infinity-2018" },
    { date: "30 Jul 2018", text: "Malaysia publishes its 495-page Safety Investigation Report: no cause determined." },
    { date: "Nov 2021", text: "WSPR analysis proposes a crash site at 33.177°S, 95.300°E.", link: "position-godfrey-wspr" },
    { date: "25 Feb 2025", text: "Ocean Infinity resumes searching on a 'no find, no fee' basis; paused in April, resumed 30 December 2025.", link: "search-ocean-infinity-2025" }
  ];

  var TYPES = {
    route: { label: "Flight route", plural: "Flight route", color: "#4f8dff", description: "Known and inferred positions of the aircraft on 8 March 2014." },
    search: { label: "Search area", plural: "Search areas", color: "#22b8e6", description: "Surface and underwater search zones, 2014 to present." },
    position: { label: "Potential final position", plural: "Potential final positions", color: "#c7e6ff", description: "Published estimates of where the flight ended." },
    debris: { label: "Debris find", plural: "Debris finds", color: "#ffffff", description: "Where pieces of the aircraft washed ashore." }
  };

  function byId(id) {
    for (var i = 0; i < points.length; i++) if (points[i].id === id) return points[i];
    return null;
  }

  return { MISSING_AT_UTC: MISSING_AT_UTC, points: points, timeline: timeline, TYPES: TYPES, byId: byId };
})();
