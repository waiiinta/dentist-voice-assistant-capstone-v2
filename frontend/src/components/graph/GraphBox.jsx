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
      }
    },
    chart: {
      // toolbar: {
      //   show: false,
      // },
      animations: {
        enabled: false,
      },
      zoom: {
        enabled: false,
      },
      sparkline:{
        enabled:true
      }
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
    colors: ['#456be7','#d45454','#7a7a7a'],
    grid:{
      show:false
    }
  }
  if([3,4].includes(quadrant[0])){
    options.yaxis.max = 5
    options.yaxis.min = -15
  }
  console.log(quadrant,series)
  return (
    <div className={`${classes.graph_box} ${quadrant[0] >= 3? classes.lower:''}`}>
      {/* {quadrant >= 3 && (
        <div className={classes.empty_box}/>
      )} */}
      <div className={`${classes.left_graph} ${quadrant[0] >= 3? classes.lower:''}`}>
        <Chart
          type="line"
          width={265}
          height={75}
          series={quadrant[0] >= 3? series[1]:series[0]}
          options={options}
        ></Chart>
      </div>
      <div className={`${classes.right_graph} ${quadrant[0] >= 3? classes.lower:''}`}>
        <Chart
          type="line"
          width={265}
          height={75}
          series={quadrant[0] >= 3? series[0]:series[1]}
          options={options}
        ></Chart>
      </div>
    </div>
  );
}

export default GraphBox
