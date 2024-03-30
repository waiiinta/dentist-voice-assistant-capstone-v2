import React from "react";
import classes from "./GraphBox.module.css";
import Chart from "react-apexcharts";



const GraphBox = ({
  quadrant,
  series
}) => {
  // console.log(data)
  let options = {
    xaxis: {
      type: "numeric",
      labels: {
        show: false,
      },
    },
    yaxis: {
      max: 15,
      min: -5,
      labels: {
        show: false,
      },
    },
    chart: {
      toolbar: {
        show: false,
      },
      animations: {
        enabled: false,
      },
      zoom: {
        enabled: false,
      },
    },
    tooltip: {
      enabled: false,
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: 1,
    },
    legend: {
      show: false,
    },
    colors: ['#456be7','#d45454','#7a7a7a']
  }
  if([3,4].includes(quadrant)){
    options.yaxis.max = 5
    options.yaxis.min = -15
  }

  return (
    <div className={`${classes.graph_box} ${quadrant >= 3? classes.lower:''}`}>
      {/* {quadrant >= 3 && (
        <div className={classes.empty_box}/>
      )} */}
      <div className={`${classes.left_graph} ${quadrant >= 3? classes.lower:''}`}>
        <Chart
          type="line"
          width={298}
          height={110}
          series={series}
          options={options}
        ></Chart>
      </div>
      <div className={`${classes.right_graph} ${quadrant >= 3? classes.lower:''}`}>
        <Chart
          type="line"
          width={298}
          height={110}
          series={series}
          options={options}
        ></Chart>
      </div>
    </div>
  );
}

export default GraphBox
