/* ===== Agroscope · tiny SVG chart kit ===== */
(function () {
  var uid = 0, INK = "#1c2317", MUT = "#3b4432";
  var SVGNS = "http://www.w3.org/2000/svg";
  function esc(s){ return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;"); }
  function pad(n){ return n<10 ? "0"+n : ""+n; }

  /* ---------- sparkline ---------- */
  function spark(vals, color, h) {
    h = h || 26;
    var w = 100, mn = Math.min.apply(null, vals), mx = Math.max.apply(null, vals), r = (mx - mn) || 1;
    var pts = vals.map(function (v, i) {
      return (i / (vals.length - 1)) * w + "," + (h - 3 - ((v - mn) / r) * (h - 7));
    });
    return '<svg viewBox="0 0 ' + w + ' ' + h + '" preserveAspectRatio="none" aria-hidden="true">' +
      '<polyline points="' + pts.join(" ") + '" fill="none" stroke="' + color + '" stroke-width="1.6" vector-effect="non-scaling-stroke" stroke-linejoin="round"/>' +
      '<circle cx="' + w + '" cy="' + pts[pts.length-1].split(",")[1] + '" r="2" fill="' + color + '"/></svg>';
  }

  /* ---------- line / bar chart ---------- */
  function lineChart(o) {
    var W = 760, H = o.height || 290, L = 48, R = 14, T = 18, B = 36;
    var labels = o.labels || [], series = o.series || [];
    var all = [];
    series.forEach(function (s) { all = all.concat(s.values); });
    var mn = o.min != null ? o.min : Math.min.apply(null, all);
    var mx = o.max != null ? o.max : Math.max.apply(null, all);
    var padv = (mx - mn) * 0.18 || 1; mx += padv; if (o.min == null) mn -= padv * 0.6;
    if (o.zero) mn = 0;
    var iw = W - L - R, ih = H - T - B;
    var X = function (i) { return L + (labels.length < 2 ? iw/2 : (i / (labels.length - 1)) * iw); };
    var Y = function (v) { return T + ih - ((v - mn) / (mx - mn)) * ih; };
    var g = "";

    /* grid + y labels */
    for (var k = 0; k <= 4; k++) {
      var v = mn + (mx - mn) * (k / 4), y = Y(v);
      g += '<line x1="' + L + '" y1="' + y.toFixed(1) + '" x2="' + (W - R) + '" y2="' + y.toFixed(1) + '" stroke="rgba(28,35,23,.12)" stroke-width="1"/>';
      g += '<text x="' + (L - 8) + '" y="' + (y + 4).toFixed(1) + '" text-anchor="end" font-size="11" fill="' + MUT + '" opacity=".8">' + (Math.round(v * 10) / 10) + (o.ySuffix || "") + '</text>';
    }
    /* x labels */
    labels.forEach(function (l, i) {
      if (labels.length > 8 && i % 2) return;
      g += '<text x="' + X(i).toFixed(1) + '" y="' + (H - 12) + '" text-anchor="middle" font-size="11" fill="' + MUT + '" opacity=".8">' + esc(l) + '</text>';
    });

    series.forEach(function (s, si) {
      var id = "g" + (++uid);
      if (s.type === "bar") {
        var bw = Math.max(6, iw / labels.length * 0.55);
        s.values.forEach(function (v, i) {
          var x = X(i) - bw / 2, y = Y(Math.max(v, mn)), hh = Math.max(1, T + ih - y);
          g += '<rect x="' + x.toFixed(1) + '" y="' + y.toFixed(1) + '" width="' + bw.toFixed(1) + '" height="' + hh.toFixed(1) + '" rx="3" fill="' + s.color + '" opacity=".9"><title>' + esc(labels[i] + ": " + v + (o.ySuffix || "")) + '</title></rect>';
        });
      } else {
        var d = s.values.map(function (v, i) { return (i ? "L" : "M") + X(i).toFixed(1) + " " + Y(v).toFixed(1); }).join(" ");
        if (s.area !== false) {
          g += '<defs><linearGradient id="' + id + '" x1="0" y1="0" x2="0" y2="1">' +
            '<stop offset="0" stop-color="' + s.color + '" stop-opacity=".34"/>' +
            '<stop offset="1" stop-color="' + s.color + '" stop-opacity="0"/></linearGradient></defs>';
          g += '<path d="' + d + ' L' + X(s.values.length - 1).toFixed(1) + ' ' + (T + ih) + ' L' + X(0).toFixed(1) + ' ' + (T + ih) + ' Z" fill="url(#' + id + ')"/>';
        }
        g += '<path d="' + d + '" fill="none" stroke="' + s.color + '" stroke-width="2.4" stroke-linejoin="round" stroke-linecap="round"/>';
        s.values.forEach(function (v, i) {
          g += '<circle cx="' + X(i).toFixed(1) + '" cy="' + Y(v).toFixed(1) + '" r="7" fill="transparent"><title>' + esc(labels[i] + ": " + v + (o.ySuffix || "")) + '</title></circle>';
        });
        var li = s.values.length - 1;
        g += '<circle cx="' + X(li).toFixed(1) + '" cy="' + Y(s.values[li]).toFixed(1) + '" r="3.6" fill="' + s.color + '"/>';
      }
    });
    return '<svg viewBox="0 0 ' + W + ' ' + H + '" role="img">' + g + '</svg>';
  }

  /* ---------- radar ---------- */
  function radar(o) {
    var W = 380, H = 300, cx = W / 2, cy = H / 2 - 6, R = 104;
    var labels = o.labels, vals = o.values, n = labels.length, g = "";
    var ang = function (i) { return (Math.PI * 2 * i) / n - Math.PI / 2; };
    var pt = function (i, r) { return (cx + Math.cos(ang(i)) * r).toFixed(1) + " " + (cy + Math.sin(ang(i)) * r).toFixed(1); };
    for (var r = 1; r <= 4; r++) {
      var ring = [];
      for (var i = 0; i < n; i++) ring.push(pt(i, (R * r) / 4));
      g += '<polygon points="' + ring.join(" ") + '" fill="none" stroke="rgba(28,35,23,.14)" stroke-width="1"/>';
    }
    for (var i2 = 0; i2 < n; i2++) {
      g += '<line x1="' + cx + '" y1="' + cy + '" x2="' + Math.cos(ang(i2)) * R + '" y2="' + Math.sin(ang(i2)) * R + '" stroke="rgba(28,35,23,.14)"/>';
      var lr = R + 20, ax = cx + Math.cos(ang(i2)) * lr, ay = cy + Math.sin(ang(i2)) * lr;
      var anch = Math.abs(Math.cos(ang(i2))) < 0.25 ? "middle" : (Math.cos(ang(i2)) > 0 ? "start" : "end");
      g += '<text x="' + ax.toFixed(1) + '" y="' + (ay + 4).toFixed(1) + '" text-anchor="' + anch + '" font-size="11.5" fill="' + MUT + '">' + esc(labels[i2]) + '</text>';
    }
    var poly = vals.map(function (v, i) { return pt(i, (Math.max(4, Math.min(100, v)) / 100) * R); });
    g += '<polygon points="' + poly.join(" ") + '" fill="' + o.color + '" fill-opacity=".26" stroke="' + o.color + '" stroke-width="2.2" stroke-linejoin="round"/>';
    vals.forEach(function (v, i) {
      var p = pt(i, (Math.max(4, Math.min(100, v)) / 100) * R).split(" ");
      g += '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="3.4" fill="' + o.color + '"><title>' + esc(labels[i] + ": " + v) + '</title></circle>';
    });
    return '<svg viewBox="0 0 ' + W + ' ' + H + '" role="img">' + g + '</svg>';
  }

  /* ---------- heat grid (hazard / threat calendar) ---------- */
  var RAMP = ["#efe9d9", "#dfe0b6", "#c9cf8a", "#a8a95a", "#7d8b3d", "#5c6b2c"];
  var RAMP_WARN = ["#efe9d9", "#efd9b6", "#e7bb85", "#d69a58", "#c07a3e", "#9d4b25"];
  function heat(o) {
    var cols = o.cols, rows = o.rows, LW = o.labelW || 150, CW = (760 - LW - 6) / cols.length, CH = o.cell || 26, HH = 22;
    var g = "", ramp = o.warn ? RAMP_WARN : RAMP;
    cols.forEach(function (c, i) {
      g += '<text x="' + (LW + CW * i + CW / 2).toFixed(1) + '" y="14" text-anchor="middle" font-size="10.5" fill="' + MUT + '" opacity=".85">' + esc(c) + '</text>';
    });
    rows.forEach(function (r, ri) {
      var y = HH + ri * (CH + 4);
      g += '<text x="0" y="' + (y + CH / 2 + 4).toFixed(1) + '" font-size="11.5" fill="' + MUT + '">' + esc(r.label) + '</text>';
      r.values.forEach(function (v, ci) {
        var x = LW + ci * CW;
        g += '<rect x="' + x.toFixed(1) + '" y="' + y.toFixed(1) + '" width="' + (CW - 3).toFixed(1) + '" height="' + CH + '" rx="4" fill="' + ramp[Math.max(0, Math.min(5, v)) ] + '"><title>' + esc(r.label + " · " + cols[ci] + " · " + (o.levelText ? o.levelText(v) : v)) + '</title></rect>';
      });
    });
    var H = HH + rows.length * (CH + 4) + 4;
    return '<svg viewBox="0 0 760 ' + H + '" role="img">' + g + '</svg>';
  }

  /* ---------- arc dial ---------- */
  function dial(o) {
    var S = o.size || 120, c = S / 2, r = S / 2 - 12, sw = o.sw || 10;
    var pct = Math.max(0, Math.min(1, o.value / (o.max || 100)));
    var circ = Math.PI * r; /* half circle */
    var g = '<path d="M' + (c - r) + ' ' + c + ' A' + r + ' ' + r + ' 0 0 1 ' + (c + r) + ' ' + c + '" fill="none" stroke="' + (o.track || "#e3dcc6") + '" stroke-width="' + sw + '" stroke-linecap="round"/>';
    g += '<path d="M' + (c - r) + ' ' + c + ' A' + r + ' ' + r + ' 0 0 1 ' + (c + r) + ' ' + c + '" fill="none" stroke="' + o.color + '" stroke-width="' + sw + '" stroke-linecap="round" stroke-dasharray="' + circ + '" stroke-dashoffset="' + (circ * (1 - pct)).toFixed(1) + '"/>';
    g += '<text x="' + c + '" y="' + (c - 4) + '" text-anchor="middle" font-size="' + (S / 4.6) + '" font-family="Fraunces,Georgia,serif" fill="' + INK + '">' + o.label + '</text>';
    if (o.sub) g += '<text x="' + c + '" y="' + (c + 14) + '" text-anchor="middle" font-size="10" fill="' + MUT + '" opacity=".8">' + esc(o.sub) + '</text>';
    return '<svg viewBox="0 0 ' + S + ' ' + (S * 0.66) + '" role="img">' + g + '</svg>';
  }

  /* ---------- small multiples: vertical bars per panel ---------- */
  function panels(o) {
    var PW = 170, PH = 168, PAD = 24, BW = 22, n = o.items.length;
    var g = "", mx = Math.max.apply(null, o.items.map(function (i) { return i.value; })) * 1.12;
    var step = (PW - PAD) / n;
    g += '<line x1="0" y1="' + (PH - 22) + '" x2="' + PW + '" y2="' + (PH - 22) + '" stroke="rgba(28,35,23,.2)"/>';
    o.items.forEach(function (it, i) {
      var h = Math.max(2, (it.value / mx) * (PH - 56));
      var x = PAD / 2 + i * step + (step - BW) / 2, y = PH - 22 - h;
      g += '<rect x="' + x.toFixed(1) + '" y="' + y.toFixed(1) + '" width="' + BW + '" height="' + h.toFixed(1) + '" rx="4" fill="' + it.color + '" opacity=".92"><title>' + esc(it.label + ": " + it.value + (it.unit || "")) + '</title></rect>';
      g += '<text x="' + (x + BW / 2).toFixed(1) + '" y="' + (y - 6).toFixed(1) + '" text-anchor="middle" font-size="10" font-family="Fraunces,Georgia,serif" fill="' + INK + '">' + it.value + '</text>';
      g += '<text x="' + (x + BW / 2).toFixed(1) + '" y="' + (PH - 7) + '" text-anchor="middle" font-size="9.5" fill="' + MUT + '">' + esc(it.label) + '</text>';
    });
    g = '<text x="0" y="12" font-size="10" font-family="Inter,sans-serif" fill="' + MUT + '" letter-spacing="1">' + esc(o.title) + '</text>' + g;
    return '<svg viewBox="0 0 ' + PW + ' ' + PH + '">' + g + '</svg>';
  }

  window.CHART = { spark: spark, lineChart: lineChart, radar: radar, heat: heat, dial: dial, panels: panels, ramp: RAMP, rampWarn: RAMP_WARN };
})();
