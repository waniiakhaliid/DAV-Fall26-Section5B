// ============================================================
// Data Analysis and Visualization - Lab 13 (Observable Notebook)
// Task 6 + Task 7: City Air Quality Dashboard
// Roll No: 24I-2608
// Cells are listed IN ORDER. Each "// ---- Cell N ----" block is one
// Observable cell. Attach air_quality.csv to the notebook first.
// ============================================================


// ---- Cell 1 (Markdown) ----
md`# City Air Quality Dashboard
**Roll No:** 24I-2608 &nbsp;|&nbsp; Data: air_quality.csv (Aug - Oct 2026, 3 stations)`


// ---- Cell 2: load the data ----
data = FileAttachment("air_quality.csv").csv({typed: true})


// ---- Cell 3: load vega-embed (with matching vega + vega-lite versions) ----
embed = require.alias({
  "vega": "vega@5",
  "vega-lite": "vega-lite@5"
})("vega-embed@6")


// ---- Cell 4: helper - make a date into text like 2026-08-01 ----
dateText = d => new Date(d).toISOString().slice(0, 10)


// ---- Cell 5: station dropdown ----
viewof station = Inputs.select(
  ["Industrial Zone", "City Center", "Green Park"],
  {label: "Station", value: "Industrial Zone"}
)


// ---- Cell 6: alert-limit slider (30 to 150, starts at 75) ----
viewof limit = Inputs.range([30, 150], {label: "Alert limit", value: 75, step: 1})


// ---- Cell 7: rows with a valid pm25 for the chosen station ----
selected = data.filter(d => d.station === station && d.pm25 != null)


// ---- Cell 8: line chart (updates with BOTH controls) ----
chart = {
  const spec = {
    $schema: "https://vega.github.io/schema/vega-lite/v5.json",
    title: `Daily PM2.5 - ${station} (alert limit ${limit})`,
    width: 700,
    height: 300,
    data: {values: selected.map(d => ({date: dateText(d.date), pm25: d.pm25}))},
    layer: [
      {
        mark: {type: "line", point: {size: 25}, color: "steelblue"},
        encoding: {
          x: {field: "date", type: "temporal", title: "Date"},
          y: {field: "pm25", type: "quantitative", title: "PM2.5"},
          tooltip: [
            {field: "date", type: "temporal", title: "Date"},
            {field: "pm25", type: "quantitative", title: "PM2.5"}
          ]
        }
      },
      {
        data: {values: [{limit: limit}]},
        mark: {type: "rule", color: "red", strokeDash: [6, 4], strokeWidth: 2},
        encoding: {
          y: {field: "limit", type: "quantitative"},
          tooltip: [{field: "limit", type: "quantitative", title: "Alert limit"}]
        }
      }
    ]
  };
  const div = document.createElement("div");
  await embed(div, spec, {actions: false});
  return div;
}


// ---- Cell 9: days above the selected limit ----
daysAbove = selected.filter(d => d.pm25 > limit)


// ---- Cell 10: the number of days above the limit ----
md`### Days above ${limit} at ${station}: **${daysAbove.length}** (out of ${selected.length} valid days)`


// ---- Cell 11: table of those days ----
Inputs.table(
  daysAbove.map(d => ({
    date: dateText(d.date),
    pm25: d.pm25,
    temperature_c: d.temperature_c,
    wind_speed_kmh: d.wind_speed_kmh
  })),
  {rows: 12}
)


// ---- Cell 12: table of missing readings for the selected station ----
missingRows = data
  .filter(d => d.station === station && d.pm25 == null)
  .map(d => ({
    date: dateText(d.date),
    station: d.station,
    pm25: "missing",
    temperature_c: d.temperature_c,
    wind_speed_kmh: d.wind_speed_kmh
  }))


// ---- Cell 13: show the missing-readings table with a heading ----
md`### Missing PM2.5 readings at ${station}: **${missingRows.length}**`


// ---- Cell 14 ----
Inputs.table(missingRows)


// ---- Cell 15 (Markdown): Task 7 - Recommend action ----
md`## Task 7: Recommendation

1. **Industrial Zone needs action first.**
2. **Evidence:** its average PM2.5 is the highest (about 95.3, against 76.7 for City Center and 49.0 for Green Park), and it is above the alert limit of 75 on 74 of its 86 valid days.
3. **Trend:** all three stations got worse each month from August to October, and the Industrial Zone rose from about 78 to about 113, so waiting will make it worse; City Center (about 95 in October) should be next.
4. **Limitation:** 12 pm25 readings are missing (6 of them at the Industrial Zone), and wind and temperature change together with the season, so this data alone cannot show what is causing the rise.`
