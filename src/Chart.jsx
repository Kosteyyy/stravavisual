import React, { useEffect } from "react";
import { CHART_COLORS } from "./constants.js";

export default function Chart({ results, chartColors }) {
  let fillColors = chartColors.colors;
  let borderColors = chartColors.borders;


  useEffect(() => {
    let cx = document.querySelector("canvas").getContext("2d");
    let total = results.reduce((sum, { count }) => sum + count, 0);
    //Start at the top
    let currentAngle = -0.5 * Math.PI;
    for (let i = 0; i < results.length; i++) {
      let sliceAngle = (results[i].count / total) * 2 * Math.PI;
      cx.beginPath();
      // center=100,100, radius=100
      //from current angle, clockwise by slice's angle
      cx.arc(202, 202, 200, currentAngle, currentAngle + sliceAngle);
      currentAngle += sliceAngle;
      cx.lineTo(202, 202);
      cx.fillStyle = fillColors[i];
      cx.fill();
      cx.strokeStyle = borderColors[i];

      cx.stroke();
    }
  }, [results, fillColors, borderColors]);

  return (
    <div id="chart">
      {/* <div>{color}</div> */}
      <canvas width="404" height="404"></canvas>;
    </div>
  )

}

// import { Chart } from "react-google-charts";

// export const data = [
//   ["Task", "Hours per Day"],
//   ["Work", 11],
//   ["Eat", 2],
//   ["Commute", 2],
//   ["Watch TV", 2],
//   ["Sleep", 7],
// ];

// export const options = {
//   title: "My Daily Activities",
//   legend: "none",
//   colors: ["#2176ae","#fbb13c","#57b8ff","#eee5e9","#493b2a","#d64933","#593f62","#684e32","#fe6847"],
//   style: {'stroke-width': 10},
// };

// export default function ChartComponent() {
//   return (
//     <Chart
//       chartType="PieChart"
//       data={data}
//       options={options}

//       width={"100%"}
//       height={"400px"}
//     />
//   );
// }
