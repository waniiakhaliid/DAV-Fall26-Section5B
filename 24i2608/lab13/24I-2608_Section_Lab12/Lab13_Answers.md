# Lab 13 - Data Analysis and Visualization: City Air Quality Monitoring

**Roll No:** 24I-2608
**Dataset:** air_quality.csv (Aug 1 - Oct 31, 2026; 3 stations; 92 days each)

---

## Part A: Vega-Lite

### Task 1: Check the data  (`task1_check_data.vl.json`)
- **Total rows:** 276 (92 days x 3 stations)
- **Missing pm25 readings:** 12
  - Industrial Zone: 6, Green Park: 4, City Center: 2
- Valid readings left after `isValid(datum.pm25)`: 264
- All later charts use the filter `{"filter": "isValid(datum.pm25)"}`.

### Task 2: Compare areas  (`task2_station_average.vl.json`)
| Station | Average PM2.5 |
|---|---|
| Industrial Zone | 95.3 |
| City Center | 76.7 |
| Green Park | 49.0 |

**Worst station: Industrial Zone.**

### Task 3: Study the trend  (`task3_daily_trend.vl.json`)
- Daily PM2.5 rises for all three stations from August to October.
- Industrial Zone is almost always the highest line and is above the 75 limit on 74 of 86 days.
- City Center crosses the limit more and more often from September (51 of 90 days above).
- Green Park stays mostly below 75 (only 8 of 88 days above, mostly in late October).
- The red dashed line is the alert limit (75); tooltips show date, station and PM2.5.

### Task 4: Compare months  (`task4_monthly_grouped.vl.json`)
| Month | Industrial Zone | City Center | Green Park |
|---|---|---|---|
| Aug | 78.2 | 57.8 | 30.4 |
| Sep | 96.0 | 77.5 | 49.0 |
| Oct | 112.9 | 94.8 | 67.5 |

**How did pollution change?** It got worse every month at every station. From August to October, PM2.5 rose by about 35 at Industrial Zone, about 37 at City Center and about 37 at Green Park. The order of the stations stayed the same.

### Task 5: Explore a relationship  (`task5_wind_scatter.vl.json`)
- **Pattern:** a clear downward (negative) pattern. When wind speed is low, PM2.5 is high; when wind is strong, PM2.5 is low. The correlation is about -0.76 (City Center), -0.79 (Green Park) and -0.80 (Industrial Zone).
- **Does it prove wind causes the change? No.** A scatter plot only shows that two things move together. Here, wind speed also fell over the season (daily average about 11.1 km/h in August, 8.9 in September, 6.8 in October) while temperature fell and PM2.5 rose, so the season/time may be affecting all of them. Wind may help clear pollution, but we would need more evidence (for example, comparing days in the same month, or data on pollution sources) to claim cause.

---

## Part B: Observable

### Task 6: Dashboard  (`observable_notebook.js`)
The notebook has: a station dropdown, an alert-limit slider (30 to 150, starts at 75), a line chart that updates with both controls, the count of days above the limit, a table of those days, and a table of missing readings for the selected station.

**Notebook link:** (paste your Observable notebook link here in the GCR submission comment)

### Task 7: Recommend action
1. **Industrial Zone needs action first.**
2. **Evidence:** it has the highest average PM2.5 (95.3, against 76.7 for City Center and 49.0 for Green Park) and is above the alert limit of 75 on 74 of its 86 valid days.
3. **Trend:** all stations got worse each month from August to October; Industrial Zone rose from about 78 to about 113. City Center (about 95 in October) should be next.
4. **Limitation:** 12 pm25 readings are missing (6 at Industrial Zone), and wind and temperature change together with the season, so this data alone cannot show what is causing the rise.
