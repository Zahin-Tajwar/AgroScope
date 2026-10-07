/* ===== Agroscope · app ===== */
(function () {
  var S = {
    lang: "en",
    prios: new Set(["soil", "profit"]),
    crop: "Boro rice",
    rot: "r3",
    cropSel: "boro",
    riskSel: "climate",
    layer: "live",
    eo: "ndvi",
    clim: "temp",
    located: false,
    analyzed: false
  };

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  window.__AG = S;

  function months() { return window.LANG === "bn" ? window.DATA.monthsBn : window.DATA.months; }
  function nfmt(v, d) {
    var s = Number(v).toFixed(d == null ? 0 : d);
    if (window.LANG === "bn") s = s.replace(/[0-9]/g, function (c) { return "০১২৩৪৫৬৭৮৯"[+c]; });
    return s;
  }
  window.__fmt = nfmt;

  function toast(msg) {
    var el = $("#toast"); el.textContent = msg; el.hidden = false;
    clearTimeout(el._t); el._t = setTimeout(function () { el.hidden = true; }, 2600);
  }

  /* ---------- i18n ---------- */
  function applyI18n() {
    window.LANG = S.lang;
    document.documentElement.lang = S.lang === "bn" ? "bn" : "en";
    document.body.classList.toggle("bn", S.lang === "bn");
    $$("[data-i18n]").forEach(function (el) { el.textContent = window.t(el.getAttribute("data-i18n")); });
    $$("[data-i18n-ph]").forEach(function (el) { el.placeholder = window.t(el.getAttribute("data-i18n-ph")); });
    if (S.located && window.DATA.field.coord) {
      /* keep the chosen point on the pin card across language switches */
      $("#pinLoc").textContent = window.T(window.DATA.field.name);
      $("#pinCoord").textContent = window.DATA.field.coord + " · " + areaLabel();
    }
    buildGeo();
    $$(".lang button").forEach(function (b) { b.classList.toggle("on", b.getAttribute("data-lang") === S.lang); });
    buildChips();
    if (window.renderAll) window.renderAll();
    if (window.MAP) window.MAP.setLayer(S.layer, S.eo);
  }
  window.__applyI18n = applyI18n;

  function setLang(l) {
    S.lang = l; window.LANG = l;
    try { localStorage.setItem("agroscope-lang", l); } catch (e) {}
    applyI18n();
  }

  /* ---------- nav + scroll ---------- */
  function wireNav() {
    $$("[data-goto]").forEach(function (b) {
      b.addEventListener("click", function () {
        var el = document.getElementById(b.getAttribute("data-goto"));
        if (el && el.classList.contains("is-locked")) { gotoInputs(); return; }
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
    var secs = $$("section[id]");
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        var id = e.target.id;
        $$("#jumpnav button").forEach(function (b) { b.classList.toggle("on", b.getAttribute("data-goto") === id); });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    secs.forEach(function (s) { io.observe(s); });

    var bar = $("#progressBar");
    var onScroll = function () {
      var h = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = (h > 0 ? (window.scrollY / h) * 100 : 0) + "%";
    };
    window.addEventListener("scroll", onScroll, { passive: true }); onScroll();

    var rv = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); rv.unobserve(e.target); } });
    }, { rootMargin: "0px 0px -8% 0px" });
    $$(".sec-head, .form, .map-wrap, .climate, .soil, .crop-split, .risk-domains, .risk-cal, .threats, .rot-compare, .rot-table, .reco-window, .reco-others, .help-grid")
      .forEach(function (el) { el.classList.add("rv"); rv.observe(el); });
  }

  /* ---------- priorities ---------- */
  var PRIO = ["disaster", "yield", "pest", "water", "cost", "early", "soil", "profit", "longer"];
  window.__PRIO = PRIO;
  function buildChips() {
    var box = $("#prioChips"); box.innerHTML = "";
    PRIO.forEach(function (k) {
      var b = document.createElement("button");
      b.className = "chip" + (S.prios.has(k) ? " on" : "");
      b.innerHTML = '<span class="tick"></span><span>' + window.t("prio." + k) + '</span>';
      b.addEventListener("click", function () {
        if (S.prios.has(k)) { if (S.prios.size > 1) S.prios.delete(k); }
        else S.prios.add(k);
        buildChips(); countPrio(); markDirty();
        if (window.renderRotations) { window.renderRotations(); window.renderReco(); window.renderDrawer(S.rot, true); }
      });
      box.appendChild(b);
    });
    countPrio();
  }
  function countPrio() { $("#prioCount").textContent = nfmt(S.prios.size); }
  window.__buildChips = buildChips;

  /* ---------- results gate: outputs stay hidden until "Analyse" is run ---------- */
  var LOCK_SEL = ["#eoStrip", "#geography .climate", "#geography .soil",
                  "#suitability", "#risk", "#rotations", "#recommend", "#help"];
  var LOCK_HTML =
    '<div class="lock">' +
      '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round">' +
        '<path d="M4 19h16"/><path d="M6.6 15.4l4-4.6 3.2 3 4.2-6"/><circle cx="18" cy="7.4" r="1.6" fill="currentColor" stroke="none"/>' +
      "</svg>" +
      '<p class="lock-msg" data-i18n="ui.lockMsg">Results appear here after you run the analysis in step 01.</p>' +
      '<button type="button" class="btn primary lock-go" data-i18n="f.run">Analyse this field</button>' +
    "</div>";

  function lockEls() { return LOCK_SEL.map(function (s) { return $(s); }).filter(Boolean); }

  function buildLocks() {
    lockEls().forEach(function (el) {
      if (!$(".lock", el)) {
        el.insertAdjacentHTML("beforeend", LOCK_HTML);
        /* a freshly built panel must follow the current language */
        $$("[data-i18n]", el).forEach(function (n) { n.textContent = window.t(n.getAttribute("data-i18n")); });
      }
      if (!S.analyzed) el.classList.add("is-locked");
      var b = $(".lock-go", el);
      if (b && !b._wired) { b._wired = 1; b.addEventListener("click", gotoInputs); }
    });
  }
  function lockResults() {
    S.analyzed = false;
    lockEls().forEach(function (el) { el.classList.add("is-locked"); });
  }
  function unlockResults() {
    S.analyzed = true;
    lockEls().forEach(function (el) { el.classList.remove("is-locked"); });
    /* content was display:none, so nudge the reveal observer for blocks already in view */
    setTimeout(function () {
      $$(".rv:not(.in)").forEach(function (el) {
        var r = el.getBoundingClientRect();
        if (r.top < window.innerHeight && r.bottom > 0) el.classList.add("in");
      });
    }, 90);
  }
  function gotoInputs() {
    var sec = document.getElementById("input");
    if (sec) sec.scrollIntoView({ behavior: "smooth", block: "start" });
    var b = $("#runBtn");
    if (b) {
      b.classList.remove("pulse"); void b.offsetWidth; b.classList.add("pulse");
      setTimeout(function () { b.classList.remove("pulse"); }, 2600);
    }
  }
  /* any input change invalidates the last run → outputs lock again */
  function markDirty() {
    if (!S.analyzed) return;
    lockResults();
    toast(window.t("ui.dirty"));
  }
  window.__markDirty = markDirty;

  function matchOf(rot) {
    var keys = S.prios.size ? Array.from(S.prios) : PRIO, sum = 0;
    keys.forEach(function (k) { sum += rot.scores[k] || 50; });
    return Math.round(sum / keys.length);
  }
  window.__matchOf = matchOf;

  /* ---------- form ---------- */
  function startPick() {
    if (!window.MAP || !window.MAP.state || !window.MAP.state().cesium) { toast(window.t("ui.locNone")); return; }
    var sec = document.getElementById("geography");
    if (sec) sec.scrollIntoView({ behavior: "smooth", block: "start" });
    window.MAP.pickMode(true);
  }
  /* ---------- geography pickers (8 divisions / 64 districts) + land size ---------- */
  function areaLabel() { return nfmt(window.DATA.field.area, 1) + " " + window.t("ui.ha"); }

  function fillDistricts(di) {
    var bd = window.DATA.bd, ds = $("#distSel");
    if (!bd || !ds) return;
    var list = bd.districts.map(function (x, i) { return { x: x, i: i }; })
      .filter(function (o) { return o.x.d === +di; });
    ds.innerHTML = list.map(function (o) {
      return '<option value="' + o.i + '">' + window.T(o.x.n) + "</option>";
    }).join("");
  }
  function buildGeo() {
    var bd = window.DATA.bd, dv = $("#divSel"), ds = $("#distSel");
    if (!bd || !dv || !ds) return;
    var keepDiv = dv.value, keepDist = ds.value;
    dv.innerHTML = bd.divisions.map(function (d, i) {
      return '<option value="' + i + '">' + window.T(d.n) + "</option>";
    }).join("");
    fillDistricts(keepDiv === "" ? 0 : keepDiv);
    if (keepDiv !== "") dv.value = keepDiv;
    if (keepDist !== "") ds.value = keepDist;

    var names = bd.divisions.map(function (d) { return window.T(d.n); })
      .concat(bd.districts.map(function (x) { return window.T(x.n); }));
    var seen = {}, uniq = names.filter(function (n) { if (seen[n]) return false; seen[n] = 1; return true; });
    var dl = $("#places");
    if (dl) dl.innerHTML = uniq.map(function (n) { return '<option value="' + n + '"></option>'; }).join("");
  }
  function armPin() { if (window.MAP && window.MAP.state().cesium) window.MAP.pickMode(true); }
  function goToDistrict(i) {
    var x = window.DATA.bd.districts[i]; if (!x) return;
    if (window.MAP && window.MAP.goTo) window.MAP.goTo(x.pos[0], x.pos[1], 46000);
    armPin();
  }
  function matchPlace(v) {
    var bd = window.DATA.bd, key = String(v || "").split(",")[0].trim().toLowerCase();
    if (!key || !bd) return null;
    var i;
    for (i = 0; i < bd.districts.length; i++)
      if (window.T(bd.districts[i].n).toLowerCase() === key) return { dist: i };
    for (i = 0; i < bd.divisions.length; i++)
      if (window.T(bd.divisions[i].n).toLowerCase() === key) return { div: i };
    return null;
  }
  function setArea(v) {
    var n = parseFloat(String(v).replace(/[০-৯]/g, function (c) { return "০১২৩৪৫৬৭৮৯".indexOf(c); }));
    if (!isFinite(n) || n <= 0) return false;
    window.DATA.field.area = Math.round(n * 100) / 100;
    if (window.MAP && window.MAP.refresh) window.MAP.refresh();
    if (S.located) $("#pinCoord").textContent = window.DATA.field.coord + " · " + areaLabel();
    return true;
  }

  function wireLocation() {
    if ($("#pickLoc")) $("#pickLoc").addEventListener("click", startPick);
    if ($("#pickBtn1")) $("#pickBtn1").addEventListener("click", startPick);

    if ($("#divSel")) $("#divSel").addEventListener("change", function () {
      fillDistricts(this.value);
      var dv = window.DATA.bd.divisions[+this.value];
      if (dv && window.MAP && window.MAP.goTo) window.MAP.goTo(dv.pos[0], dv.pos[1], 170000);
      markDirty();
    });
    if ($("#distSel")) $("#distSel").addEventListener("change", function () {
      goToDistrict(+this.value);
      markDirty();
    });
    if ($("#areaInput")) $("#areaInput").addEventListener("input", function () { setArea(this.value); markDirty(); });

    document.addEventListener("agro:location", function (e) {
      var lat = e.detail.lat, lng = e.detail.lng;
      var coord = window.DATA.field.coord || (lat.toFixed(3) + "°N " + lng.toFixed(3) + "°E");
      S.located = true;
      $("#locInput").value = lat.toFixed(4) + ", " + lng.toFixed(4);
      $("#pinLoc").textContent = window.T(window.DATA.field.name);
      $("#pinCoord").textContent = coord + " · " + areaLabel();
      toast(window.t("map.set"));
      markDirty();
    });
    document.addEventListener("agro:pickfail", function () { toast(window.t("map.outside")); });
  }

  function wireForm() {
    wireLocation();
    $("#locInput").addEventListener("change", function () {
      var v = this.value.split(",")[0].trim();
      if (!v) return;
      markDirty();
      $("#pinLoc").textContent = v;
      var co = window.DATA.field.coord;
      $("#pinCoord").textContent = (co ? co + " · " : "") + areaLabel();
      var m = matchPlace(v);
      if (!m) return;
      if (m.dist != null) {
        var x = window.DATA.bd.districts[m.dist];
        $("#divSel").value = x.d; fillDistricts(x.d); $("#distSel").value = m.dist;
        goToDistrict(m.dist);
      } else {
        var dv = window.DATA.bd.divisions[m.div];
        $("#divSel").value = m.div; fillDistricts(m.div);
        if (dv && window.MAP && window.MAP.goTo) window.MAP.goTo(dv.pos[0], dv.pos[1], 170000);
      }
    });
    $("#cropInput").addEventListener("change", function () {
      S.crop = this.value || S.crop;
      if (window.renderCrops) window.renderCrops();
      markDirty();
    });
    ["#soilType", "#soilTexture", "#soilPh", "#soilOm"].forEach(function (sel) {
      var el = $(sel); if (el) el.addEventListener("change", markDirty);
    });
    $("#geoBtn").addEventListener("click", function () {
      if (!navigator.geolocation) { toast(window.t("ui.locNone")); return; }
      toast(window.t("ui.analysing"));
      navigator.geolocation.getCurrentPosition(function (p) {
        var lat = p.coords.latitude, lng = p.coords.longitude;
        $("#locInput").value = lat.toFixed(4) + ", " + lng.toFixed(4);
        if (window.MAP && window.MAP.setLocation) {
          /* map takes over: it validates the country and fires agro:location */
          window.MAP.setLocation(lat, lng);
        } else {
          S.located = true;
          $("#pinLoc").textContent = window.T(window.DATA.field.name);
          $("#pinCoord").textContent = lat.toFixed(3) + "°N " + lng.toFixed(3) + "°E · " + areaLabel();
          toast(window.t("ui.locSet"));
          markDirty();
        }
      }, function () { toast(window.t("ui.locNone")); }, { timeout: 6000 });
    });
    $("#camBtn").addEventListener("click", function () { $("#cropCam").click(); });
    $("#cropCam").addEventListener("change", function () {
      var f = this.files && this.files[0]; if (!f) return;
      var url = URL.createObjectURL(f);
      $("#detectImg").src = url;
      var names = ["Boro rice", "Maize", "Mustard", "Wheat", "Mung bean", "Potato"];
      var h = 0; for (var i = 0; i < f.name.length; i++) h = (h * 31 + f.name.charCodeAt(i)) % 997;
      var pick = names[h % names.length];
      $("#detectName").textContent = pick;
      $("#detectConf").textContent = nfmt(89 + (h % 9)) + "% " + window.t("ui.conf");
      $("#detectBox").hidden = false;
      $("#cropInput").value = pick; S.crop = pick;
      if (window.renderCrops) window.renderCrops();
      markDirty();
    });
    $("#detectClear").addEventListener("click", function () {
      $("#detectBox").hidden = true; $("#cropCam").value = ""; $("#cropInput").value = "";
      markDirty();
    });
    $("#soilSkip").addEventListener("click", function () {
      $("#soilType").value = ""; $("#soilTexture").value = ""; $("#soilPh").value = ""; $("#soilOm").value = "";
      toast(window.t("geo.soilSrc"));
      markDirty();
    });
    $("#runBtn").addEventListener("click", runAnalysis);
  }

  function runAnalysis() {
    if (!S.prios.size) { toast(window.t("ui.needPrio")); return; }
    if (!$("#cropInput").value.trim()) { toast(window.t("ui.needCrop")); return; }
    S.crop = $("#cropInput").value.trim();
    var steps = ["load.s1", "load.s2", "load.s3", "load.s4", "load.s5"];
    var box = $("#loadSteps"); box.innerHTML = "";
    steps.forEach(function (k) { var li = document.createElement("li"); li.textContent = window.t(k); box.appendChild(li); });
    var loader = $("#loader"); loader.hidden = false;
    var i = 0, bar = $("#loadBar");
    var tick = function () {
      var items = $$("#loadSteps li");
      items.forEach(function (li, ix) { li.classList.toggle("on", ix === i); li.classList.toggle("done", ix < i); });
      bar.style.width = ((i + 1) / steps.length) * 100 + "%";
      i++;
      if (i <= steps.length) setTimeout(tick, 340);
      else setTimeout(function () {
        loader.hidden = true; bar.style.width = "0%";
        unlockResults(); renderAll();
        document.getElementById("geography").scrollIntoView({ behavior: "smooth" });
      }, 420);
    };
    tick();
  }

  /* ---------- map / climate tabs ---------- */
  function wireTabs() {
    $$("#mapSeg button").forEach(function (b) {
      b.addEventListener("click", function () {
        $$("#mapSeg button").forEach(function (x) { x.classList.remove("on"); });
        b.classList.add("on"); S.layer = b.getAttribute("data-layer");
        $("#eoSeg").style.display = S.layer === "eo" ? "" : "none";
        window.MAP.setLayer(S.layer, S.eo);
      });
    });
    $$("#eoSeg button").forEach(function (b) {
      b.addEventListener("click", function () {
        $$("#eoSeg button").forEach(function (x) { x.classList.remove("on"); });
        b.classList.add("on"); S.eo = b.getAttribute("data-eo");
        window.MAP.setLayer("eo", S.eo);
      });
    });
    $("#eoSeg").style.display = "none";
    $$("#climSeg button").forEach(function (b) {
      b.addEventListener("click", function () {
        $$("#climSeg button").forEach(function (x) { x.classList.remove("on"); });
        b.classList.add("on"); S.clim = b.getAttribute("data-c");
        if (window.renderClimate) window.renderClimate();
      });
    });
  }

  /* ---------- boot ---------- */
  document.addEventListener("DOMContentLoaded", function () {
    try { var saved = localStorage.getItem("agroscope-lang"); if (saved === "bn" || saved === "en") S.lang = saved; } catch (e) {}
    window.LANG = S.lang;
    $$(".lang button").forEach(function (b) {
      b.addEventListener("click", function () { setLang(b.getAttribute("data-lang")); });
    });
    wireNav(); wireForm(); wireTabs(); buildChips();
    buildLocks();
    applyI18n();
    if (window.MAP) window.MAP.init($("#map"), $("#mapLegend"));
    if (window.renderRotations) window.renderRotations();
    window.addEventListener("resize", debounce(function () { if (window.renderAll) window.renderAll(); }, 250));
  });

  function debounce(fn, ms) { var id; return function () { clearTimeout(id); id = setTimeout(fn, ms); }; }

  /* ================= RENDER A · geography / soil / crops ================= */
  function renderEO() {
    var box = $("#eoStrip"); if (!box) return;
    box.innerHTML = window.DATA.eo.map(function (m) {
      var up = m.up >= 0;
      return '<div class="eo-item"><div class="k">' + m.k + '</div>' +
        '<div class="v">' + nfmt(m.v, m.d) + (m.u ? '<small>' + m.u + '</small>' : '') + '</div>' +
        window.CHART.spark(m.s, m.color) +
        '<div class="trend' + (up ? '' : ' down') + '">' + (up ? '▲' : '▼') + ' ' + nfmt(Math.abs(m.up)) + '% · ' + window.T(m.name) + '</div></div>';
    }).join("");
  }

  function renderClimate() {
    var d = window.DATA, C = d.climate, mode = S.clim, ySuf = "", series = [];
    if (mode === "temp") { ySuf = "°C"; series = [{ name: t("geo.temp"), values: C.temp, color: "#c07a3e" }]; }
    else if (mode === "hum") { ySuf = "%"; series = [{ name: t("geo.hum"), values: C.hum, color: "#5f8fa0" }]; }
    else { ySuf = "mm"; series = [{ name: t("geo.rain"), values: C.rain, color: "#3f7768", type: "bar" }]; }
    var host = $("#climateChart");
    if (host) host.innerHTML = window.CHART.lineChart({ labels: months(), series: series, ySuffix: ySuf, height: 300, zero: mode === "rain" });

    var ro = $("#climReadout");
    if (ro) {
      var R = C.readout, f = nfmt;
      ro.innerHTML =
        '<div><div class="k">' + t("clim.max") + '</div><div class="v">' + f(R.max, 1) + '<small>°C</small></div></div>' +
        '<div><div class="k">' + t("clim.min") + '</div><div class="v">' + f(R.min, 1) + '<small>°C</small></div></div>' +
        '<div><div class="k">' + t("clim.rain") + '</div><div class="v">' + f(R.annual) + '<small>' + t("clim.unitR") + '</small></div></div>' +
        '<div><div class="k">' + t("clim.hum") + '</div><div class="v">' + f(R.humMean) + '<small>%</small></div></div>';
    }
    var hg = $("#hazardGrid");
    if (hg) {
      var rows = d.hazard.rows.map(function (r) { return { label: window.LANG === "bn" ? r.bn : r.k, values: r.v }; });
      var lv = ["—", t("ui.low"), t("ui.med"), t("ui.high"), t("ui.high") + "+"];
      hg.innerHTML = window.CHART.heat({ cols: months(), rows: rows, cell: 24, labelW: 150, warn: true,
        levelText: function (v) { return lv[v]; } });
    }
  }

  function renderSoil() {
    var sd = window.DATA.soil, f = nfmt;
    var p = $("#soilProfile");
    if (p) {
      var top = 46, H = 232, total = 132, y = top, svg = "";
      svg += '<text x="0" y="16" font-size="11" fill="#3b4432" letter-spacing="1.2">' + t("geo.soil") + '</text>';
      svg += '<text x="0" y="34" font-size="13" font-family="Fraunces,Georgia,serif" fill="#1c2317">' + window.T(window.DATA.field.soilType) + '</text>';
      sd.profile.forEach(function (l) {
        var hh = (l.h / total) * H;
        svg += '<rect x="34" y="' + y.toFixed(1) + '" width="150" height="' + (hh - 2).toFixed(1) + '" fill="' + l.c + '"/>';
        svg += '<text x="42" y="' + (y + 17).toFixed(1) + '" font-size="11" fill="#f4efe0">' + window.T(l.lbl) + '</text>';
        svg += '<text x="28" y="' + (y + 12).toFixed(1) + '" text-anchor="end" font-size="10" fill="#3b4432">' + nfmt(l.d) + '</text>';
        svg += '<line x1="26" y1="' + y.toFixed(1) + '" x2="34" y2="' + y.toFixed(1) + '" stroke="#3b4432" stroke-width="1"/>';
        y += hh;
      });
      svg += '<text x="28" y="' + (y + 6).toFixed(1) + '" text-anchor="end" font-size="10" fill="#3b4432">' + nfmt(total) + '</text>';
      svg += '<text x="194" y="' + (top + 14) + '" font-size="10.5" fill="#3b4432">cm</text>';
      svg += '<g transform="translate(194,' + (top + 58) + ')">' +
        '<rect width="96" height="72" rx="8" fill="rgba(255,255,255,.6)" stroke="rgba(28,35,23,.16)"/>' +
        '<text x="10" y="20" font-size="10" fill="#3b4432">●</text><text x="24" y="20" font-size="10.5" fill="#1c2317">' + window.t("ui.legend") + '</text>' +
        '<rect x="10" y="30" width="76" height="7" rx="3" fill="#5b4a33"/>' +
        '<rect x="10" y="43" width="76" height="7" rx="3" fill="#6d5a3f"/>' +
        '<rect x="10" y="56" width="76" height="7" rx="3" fill="#7d6a4c"/></g>';
      p.innerHTML = '<svg viewBox="0 0 300 ' + (y + 16) + '">' + svg + '</svg>';
    }

    var b = $("#soilBars");
    if (b) {
      b.innerHTML = sd.bars.map(function (r) {
        var val = nfmt(r.v, r.v % 1 ? (r.v < 10 ? 2 : 1) : 0) + (r.u ? " " + r.u : "");
        var cls = r.s === "bad" ? " bad" : r.s === "warn" ? " warn" : "";
        var mark = r.target != null ? '<u style="left:' + r.target + '%"></u>' : '';
        return '<div class="sbar"><div class="top"><span>' + window.T(r.k) + '</span><b>' + val + '</b></div>' +
          '<div class="track"><i class="' + cls.trim() + '" data-w="' + r.pct + '"></i>' + mark + '</div>' +
          '<div class="note">' + window.T(r.note) + '</div></div>';
      }).join("");
      requestAnimationFrame(function () {
        $$("#soilBars .track i").forEach(function (i) { i.style.width = i.getAttribute("data-w") + "%"; });
      });
    }

    var dl = $("#soilDials");
    if (dl) {
      dl.innerHTML = sd.dials.map(function (d) {
        var col = d.v >= 65 ? "#6f7f3c" : d.v >= 50 ? "#c07a3e" : "#9d4b25";
        return '<div class="dial">' + window.CHART.dial({ value: d.v, max: 100, color: col, label: d.k + " " + nfmt(d.v), size: 150 }) +
          '<div class="name">' + window.T(d.name) + ' · ' + d.u + '</div></div>';
      }).join("");
    }
  }

  function renderCrops() {
    var list = $("#cropList2");
    if (list) {
      list.innerHTML = window.DATA.crops.map(function (c, i) {
        return '<button class="crop-row' + (c.id === S.cropSel ? " on" : "") + '" data-crop="' + c.id + '">' +
          '<span class="rk">' + nfmt(i + 1) + '</span>' +
          '<span class="nm">' + window.T(c.name) + '<em>' + window.T(c.season) + '</em></span>' +
          '<span class="sc"><b>' + nfmt(c.sc) + '</b><div class="bar"><i data-w="' + c.sc + '"></i></div></span></button>';
      }).join("");
      requestAnimationFrame(function () {
        $$("#cropList2 .bar i").forEach(function (i) { i.style.width = i.getAttribute("data-w") + "%"; });
      });
      $$("#cropList2 .crop-row").forEach(function (btn) {
        btn.addEventListener("click", function () {
          S.cropSel = btn.getAttribute("data-crop"); renderCrops();
        });
      });
    }
    var det = $("#cropDetail");
    if (!det) return;
    var c = null;
    window.DATA.crops.forEach(function (x) { if (x.id === S.cropSel) c = x; });
    if (!c) c = window.DATA.crops[0];
    det.innerHTML =
      '<div class="cd-head"><div><h3>' + window.T(c.name) + '</h3><p class="why">' + t("ui.why") + ' — ' + window.T(c.why) + '</p></div>' +
      '<div class="bigscore">' + nfmt(c.sc) + '<em>' + t("ui.suit") + '</em></div></div>' +
      '<div class="cd-body">' +
      '<div class="pc pro"><h4>' + t("ui.pros") + '</h4><ul>' + c.pro[window.LANG].map(function (x) { return "<li>" + x + "</li>"; }).join("") + '</ul></div>' +
      '<div class="pc con"><h4>' + t("ui.cons") + '</h4><ul>' + c.con[window.LANG].map(function (x) { return "<li>" + x + "</li>"; }).join("") + '</ul></div>' +
      '</div><div class="cd-factors"><div class="lbl">' + t("ui.factors") + '</div>' +
      window.CHART.radar({
        labels: window.DATA.factorLabels.map(function (l) { return window.T(l); }),
        values: c.f, color: "#4d5a2b"
      }) + '</div>';
  }

  /* ================= RENDER B · risk / rotations / reco / help ================= */
  var ROT_COLORS = { r1: "#6f7f3c", r2: "#5f8fa0", r3: "#4d7c2f", r4: "#c07a3e" };
  function rotById(id) { var r = null; window.DATA.rotations.forEach(function (x) { if (x.id === id) r = x; }); return r || window.DATA.rotations[0]; }
  window.__rotById = rotById;
  function sevColor(v) { return v >= 70 ? "#9d4b25" : v >= 50 ? "#c07a3e" : "#6f7f3c"; }

  function renderRisk() {
    var box = $("#riskDomains");
    if (box) {
      box.innerHTML = window.DATA.risk.domains.map(function (d) {
        return '<div class="rd' + (d.k === S.riskSel ? " on" : "") + '" data-r="' + d.k + '">' +
          '<div class="nm">' + window.T(d.name) + '</div>' +
          '<div class="lv">' + nfmt(d.lv) + '<small>/100</small></div>' +
          '<div class="meter"><i data-w="' + d.lv + '" style="background:' + sevColor(d.lv) + '"></i></div>' +
          '<div class="say">' + window.T(d.say) + '</div></div>';
      }).join("");
      requestAnimationFrame(function () {
        $$("#riskDomains .meter i").forEach(function (i) { i.style.width = i.getAttribute("data-w") + "%"; });
      });
      $$("#riskDomains .rd").forEach(function (el) {
        el.addEventListener("click", function () { S.riskSel = el.getAttribute("data-r"); renderRisk(); });
      });
    }
    var cal = $("#riskCalendar");
    if (cal) {
      var rows = window.DATA.risk.domains.map(function (d) { return { label: window.T(d.name), values: d.m }; });
      cal.innerHTML = window.CHART.heat({
        cols: months(), rows: rows, cell: 24, labelW: 150, warn: true,
        levelText: function (v) { return ["", t("ui.low"), t("ui.low"), t("ui.med"), t("ui.high")][v]; }
      });
    }
    var th = $("#threats");
    if (th) {
      th.innerHTML = window.DATA.risk.threats.map(function (x) {
        var c = x.sev === "high" ? "#9d4b25" : x.sev === "mid" ? "#c07a3e" : "#6f7f3c";
        return '<div class="threat"><div class="t"><span class="dot" style="background:' + c + '"></span>' + window.T(x.k) + '</div>' +
          '<div class="w">' + window.T(x.when) + ' · ' + (x.sev === "high" ? t("ui.high") : x.sev === "mid" ? t("ui.med") : t("ui.low")) + '</div>' +
          '<p>' + window.T(x.d) + '</p></div>';
      }).join("");
    }
  }

  function seqHTML(seq, cls) {
    return seq.map(function (c, i) {
      return (i ? '<i class="arr">→</i>' : "") + '<span class="' + cls + '">' + window.T(c) + '</span>';
    }).join("");
  }

  function renderRotations() {
    var cmp = $("#rotCompare");
    if (cmp) {
      var R = window.DATA.rotations, f = nfmt;
      var defs = [
        { t: t("ui.sustain"), get: function (r) { return r.sustain; }, col: "#6f7f3c" },
        { t: t("ui.match"), get: function (r) { return matchOf(r); }, col: "#4d7c2f" },
        { t: t("ui.risk"), get: function (r) { return r.risk; }, col: "#9d4b25" },
        { t: t("ui.profit"), get: function (r) { return r.profit; }, col: "#c07a3e" }
      ];
      var legend = '<div style="display:flex;flex-wrap:wrap;gap:14px;font-size:.74rem;margin-bottom:12px">' +
        R.map(function (r, i) {
          return '<span style="display:inline-flex;align-items:center;gap:6px"><i style="width:11px;height:11px;border-radius:3px;background:' + ROT_COLORS[r.id] + ';display:inline-block"></i>' + nfmt(i + 1) + '. ' + window.T(r.name) + '</span>';
        }).join("") + '</div>';
      var html = legend + '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(170px,1fr));gap:14px">';
      defs.forEach(function (d) {
        html += '<div>' + window.CHART.panels({
          title: d.t,
          items: R.map(function (r) { return { label: "R" + nfmt(R.indexOf(r) + 1), value: d.get(r), color: ROT_COLORS[r.id], unit: d.t === t("ui.profit") ? "k" : "" }; })
        }) + '</div>';
      });
      cmp.innerHTML = html + '</div>';
    }
    var tb = $("#rotTable");
    if (!tb) return;
    var head = '<div class="rot-row head"><span>' + t("nav.rot") + '</span><span>' + t("ui.sustain") + '</span>' +
      '<span>' + t("ui.match") + '</span><span>' + t("ui.riskLv") + '</span><span>' + t("ui.profit") + '</span><span></span></div>';
    tb.innerHTML = head + window.DATA.rotations.map(function (r, i) {
      var m = matchOf(r);
      var riskWord = r.risk < 35 ? t("ui.low") : r.risk < 50 ? t("ui.med") : t("ui.high");
      return '<button class="rot-row" data-rot="' + r.id + '">' +
        '<span class="rot-seq" style="display:block"><span style="font-family:var(--disp);font-size:1.05rem">' + window.T(r.name) + '</span>' +
        '<em style="display:block;font-size:.76rem;opacity:.7;margin-top:.25rem">' + r.seq.map(function (c) { return window.T(c); }).join(" → ") + '</em></span>' +
        '<span class="metric"><span class="v">' + nfmt(r.sustain) + '</span><div class="bar"><i data-w="' + r.sustain + '"></i></div><span class="cap">' + window.T(r.tag) + '</span></span>' +
        '<span class="metric"><span class="v">' + nfmt(m) + '%</span><div class="bar"><i data-w="' + m + '"></i></div><span class="cap">' + nfmt(S.prios.size) + ' ' + t("ui.matched") + '</span></span>' +
        '<span class="metric"><span class="v">' + riskWord + '</span><div class="bar"><i class="risk" data-w="' + r.risk + '"></i></div><span class="cap">' + nfmt(r.risk) + '/100</span></span>' +
        '<span class="metric"><span class="v">৳' + nfmt(r.profit) + 'k</span><div class="bar"><i data-w="' + Math.round(r.profit / 2.6) + '"></i></div><span class="cap">+' + nfmt(r.change) + '% ' + t("ui.vs") + '</span></span>' +
        '<span class="open-tag">' + t("ui.open") + ' →</span></button>';
    }).join("");
    requestAnimationFrame(function () {
      $$("#rotTable .bar i").forEach(function (i) { i.style.width = i.getAttribute("data-w") + "%"; });
    });
    $$("#rotTable .rot-row[data-rot]").forEach(function (b) {
      b.addEventListener("click", function () { openDrawer(b.getAttribute("data-rot")); });
    });
  }

  function renderReco() {
    var rc = window.DATA.reco, main = rotById(rc.main.id);
    var w = $("#recoWindow");
    if (w) {
      var m = matchOf(main);
      w.innerHTML = '<span class="reco-tag">' + window.T(rc.main.tag) + '</span>' +
        '<div class="reco-seq">' + seqHTML(main.seq, "crop") + '</div>' +
        '<div class="reco-stats">' +
        '<div><div class="k">' + t("ui.match") + '</div><div class="v">' + nfmt(m) + '<small>%</small></div></div>' +
        '<div><div class="k">' + t("ui.riskLv") + '</div><div class="v">' + window.T(rc.main.riskLv) + '</div></div>' +
        '<div><div class="k">' + t("ui.profit") + '</div><div class="v">৳' + nfmt(main.profit) + '<small>k/ha</small></div></div>' +
        '<div><div class="k">' + t("ui.output") + '</div><div class="v">' + nfmt(main.yield, 1) + '<small>t/ha</small></div></div>' +
        '</div><p class="reco-why">' + window.T(rc.main.why) + ' — ' + t("ui.openPlan") + '.</p>';
      w.onclick = function () { openDrawer(main.id); };
    }
    var o = $("#recoOthers");
    if (o) {
      o.innerHTML = [rc.alt1, rc.alt2].map(function (a) {
        var r = rotById(a.id);
        return '<div class="reco-alt" data-rot="' + a.id + '"><div class="k">' + window.T(a.k) + '</div>' +
          '<div class="s">' + window.T(r.name) + '</div><div class="q">' + window.T(a.s) + ' — ' + window.T(a.q) + '</div></div>';
      }).join("");
      $$("#recoOthers .reco-alt").forEach(function (el) {
        el.addEventListener("click", function () { openDrawer(el.getAttribute("data-rot")); });
      });
    }
  }

  function renderHelp() {
    var H = window.DATA.help, g = $("#helpGrid");
    if (!g) return;
    var mx = Math.max.apply(null, H.irr.map(function (i) { return i.v; }));
    g.innerHTML =
      '<div><div class="water">' +
      '<div class="cap" style="min-width:150px">' + window.CHART.dial({ value: H.water.need, max: 700, color: "#3f7768", label: nfmt(H.water.need) + " " + t("clim.unitR"), size: 150, sub: t("ui.waterNeed") }) + '</div>' +
      '<div><b style="font-family:var(--disp);font-size:1.4rem">-' + nfmt(H.water.save) + '%</b>' +
      '<p style="font-size:.84rem;color:var(--ink-2);max-width:34ch">' + t("ui.deficit") + ' · ' + window.T(H.water.note) + '</p></div></div>' +
      '<div class="lbl">' + t("ui.irrigation") + '</div><div class="irr-rows">' +
      H.irr.map(function (r) {
        return '<div class="irr"><span class="m">' + months()[r.m] + '</span><div class="bar"><i data-w="' + Math.round(r.v / mx * 100) + '"></i></div><span class="v">' + nfmt(r.v) + ' mm</span></div>';
      }).join("") + '</div>' +
      '<div style="margin-top:2rem"><h3>' + t("ui.soilTips") + '</h3><ul class="tip-list">' +
      H.soilTips.map(function (x) { return '<li><b>' + window.T(x.t) + '</b> — ' + window.T(x.d) + '</li>'; }).join("") + '</ul></div></div>' +
      '<div><h3 style="font-size:1.3rem;margin-bottom:.9rem">' + t("ui.general") + '</h3><ul class="tip-list">' +
      H.genTips.map(function (x) { return '<li><b>' + window.T(x.t) + '</b> — ' + window.T(x.d) + '</li>'; }).join("") + '</ul>' +
      '<div class="help-links">' +
      '<button class="ghost">' + t("ui.support") + '</button><button class="ghost">' + t("ui.docs") + '</button><button class="ghost">' + t("ui.feedback") + '</button></div></div>';
    requestAnimationFrame(function () {
      $$("#helpGrid .bar i").forEach(function (i) { i.style.width = i.getAttribute("data-w") + "%"; });
    });
  }

  /* ---------- drawer ---------- */
  function openDrawer(id) {
    S.rot = id; S.drawerRot = id;
    var d = $("#drawer"); d.hidden = false;
    document.body.style.overflow = "hidden";
    renderDrawer(id);
  }
  function closeDrawer() {
    $("#drawer").hidden = true; S.drawerRot = null; document.body.style.overflow = "";
  }
  window.__closeDrawer = closeDrawer;

  function renderDrawer(id) {
    var p = $("#drawerPanel"); if (!p || $("#drawer").hidden) return;
    var r = rotById(id), base = rotById("r1"), f = nfmt;
    var econ = [
      { k: t("ui.cost"), v: r.cost, u: "k", d: r.cost - base.cost, suf: "k" },
      { k: t("ui.output"), v: r.yield, u: "t/ha", d: +(r.yield - base.yield).toFixed(1), suf: "t" },
      { k: t("ui.profit"), v: r.profit, u: "k", d: r.profit - base.profit, suf: "k" }
    ];
    var html =
      '<button class="drawer-close" id="dwClose">' + t("ui.close") + ' ✕</button>' +
      '<div class="dw-head"><div><h3>' + window.T(r.name) + '</h3><div class="sub">' + window.T(r.tag) + ' · ' + window.T(r.why) + '</div>' +
      '<div class="dw-seq">' + seqHTML(r.seq, "") + '</div></div></div>' +
      '<div class="badges">' +
      '<span class="badge good">' + t("ui.match") + ' ' + nfmt(matchOf(r)) + '%</span>' +
      '<span class="badge ' + (r.risk < 35 ? "good" : "warn") + '">' + t("ui.riskLv") + ' ' + (r.risk < 35 ? t("ui.low") : r.risk < 50 ? t("ui.med") : t("ui.high")) + '</span>' +
      '<span class="badge">' + t("ui.sustain") + ' ' + nfmt(r.sustain) + '/100</span>' +
      '<span class="badge">+' + nfmt(r.change) + '% ' + t("ui.vs") + '</span></div>' +

      '<div class="dw-sec"><h4>' + t("ui.econ") + ' <em>' + t("ui.perHa") + '</em></h4>' +
      '<div class="econ">' + econ.map(function (e) {
        var s = (e.d > 0 ? "+" : "") + (e.suf === "t" ? f(e.d, 1) : f(e.d)) + " " + e.suf;
        return '<div><div class="k">' + e.k + '</div><div class="v">' + f(e.v, e.suf === "t" ? 1 : 0) + '<small>' + (e.suf === "t" ? " t/ha" : "k") + '</small></div>' +
          '<div class="d' + (e.d < 0 ? " neg" : '') + '">' + s + ' ' + t("ui.vs") + '</div></div>';
      }).join("") + '</div>' +
      '<div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-top:14px">' +
      '<div>' + window.CHART.panels({ title: t("ui.cost") + " · " + t("ui.profit"), items: [
        { label: t("ui.cost"), value: base.cost, color: "#a8a97a" }, { label: t("ui.profit"), value: base.profit, color: "#6f7f3c" }] }) + '</div>' +
      '<div>' + window.CHART.panels({ title: window.T(r.name), items: [
        { label: t("ui.cost"), value: r.cost, color: "#c07a3e" }, { label: t("ui.profit"), value: r.profit, color: "#4d7c2f" }] }) + '</div></div>' +
      '</div>' +

      '<div class="dw-sec"><h4>' + t("ui.matchTitle") + ' <em>' + t("ui.matchNote") + '</em></h4><div class="prio-match">' +
      window.__PRIO.map(function (k) {
        var v = r.scores[k], sel = S.prios.has(k), cl = v >= 75 ? "" : v >= 60 ? " mid" : " low";
        return '<div class="pm' + (sel ? "" : " off") + '"><span>' + t("prio." + k) + '</span><span class="pct">' + nfmt(v) + '%</span>' +
          '<div class="bar"><i class="' + cl.trim() + '" data-w="' + v + '"></i></div></div>';
      }).join("") + '</div></div>' +

      '<div class="dw-sec"><div class="dw-cols">' +
      '<div class="pc pro"><h4>' + t("ui.benefits") + '</h4><ul>' + r.pro[window.LANG].map(function (x) { return "<li>" + x + "</li>"; }).join("") + '</ul></div>' +
      '<div class="pc con"><h4>' + t("ui.risk") + '</h4><ul>' + r.con[window.LANG].map(function (x) { return "<li>" + x + "</li>"; }).join("") + '</ul></div>' +
      '</div></div>' +

      '<div class="dw-sec" style="border-bottom:0"><h4>' + t("ui.calendar") + '</h4><div class="cal">' +
      r.cal.map(function (row) {
        var l = (row.s / 12) * 100, w = ((row.e - row.s + 1) / 12) * 100;
        return '<div class="cal-row"><span class="nm">' + window.T(row.c) + '</span>' +
          '<div class="cal-track"><span class="cal-seg" style="left:' + l + '%;width:' + w + '%;background:' + row.col + '" title="' +
          months()[row.s] + ' – ' + months()[row.e] + '"></span></div></div>';
      }).join("") +
      '<div class="cal-months"><span></span><div class="ms">' + months().map(function (m) { return "<span>" + m + "</span>"; }).join("") + '</div></div>' +
      '</div></div>';
    p.innerHTML = html;
    requestAnimationFrame(function () {
      $$("#drawerPanel .bar i").forEach(function (i) { i.style.width = i.getAttribute("data-w") + "%"; });
    });
    $("#dwClose").addEventListener("click", closeDrawer);
    p.scrollTop = 0;
  }

  function renderAll() {
    renderEO(); renderClimate(); renderSoil(); renderCrops();
    renderRisk(); renderRotations(); renderReco(); renderHelp();
    if (S.drawerRot) renderDrawer(S.drawerRot);
    buildLocks();   /* renderEO() rebuilds #eoStrip — restore its lock panel */
  }
  window.renderAll = renderAll;

  document.addEventListener("click", function (e) {
    if (e.target && e.target.hasAttribute && e.target.hasAttribute("data-close")) closeDrawer();
  });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeDrawer(); });
})();
