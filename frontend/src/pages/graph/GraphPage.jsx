import { Fragment, useEffect, useState } from "react";
import classes from "./GraphPage.module.css";
import graph from "../../images/plain_graph.jpg";
import NavBar from "../../components/ui/NavBar";
import GraphControlBar from "../../components/graph/GraphControlBar";
import Chart from "react-apexcharts"
import GraphBox from "../../components/graph/GraphBox";


const GraphPage = () => {
  let series = [
    {
      data: [
        [1, 1],
        [2, 3],
        [3, 2],
        [4, 2],
        [5, 1],
        [6, 4],
        [7, 2],
        [8, 3],
        [9, 0],
        [10, 0],
        [11, 2],
        [12, 0],
        [13, 4],
        [14, 1],
        [15, 7],
        [16, 3],
        [17, 6],
        [18, 2],
        [19, 0],
        [20, 3],
        [21, 1],
        [22, 0],
        [23, 2],
        [24, 0],
      ],
    },
    {
      data: [
        [1, -1],
        [2, -3],
        [3, -2],
        [4, -2],
        [5, -1],
        [6, -4],
        [7, -2],
        [8, -3],
        [9, 0],
        [10, 0],
        [11, -2],
        [12, 0],
        [13, -4],
        [14, -1],
        [15, -5],
        [16, -3],
        [17, -1],
        [18, -2],
        [19, 0],
        [20, -3],
        [21, -1],
        [22, 0],
        [23, -2],
        [24, -0],
      ],
    },
    {
      data:[[1,0],[24,0]]
    }
  ]
  let series2 = [
    {
      data: [
        [1, -1],
        [2, -3],
        [3, -2],
        [4, -2],
        [5, -1],
        [6, -4],
        [7, -2],
        [8, -3],
        [9, 0],
        [10, 0],
        [11, -2],
        [12, 0],
        [13, -4],
        [14, -1],
        [15, -7],
        [16, -3],
        [17, -6],
        [18,-2],
        [19, -0],
        [20, -3],
        [21, -1],
        [22, 0],
        [23, -2],
        [24, 0],
      ],
    },
    {
      data: [
        [1, 1],
        [2, 3],
        [3, 2],
        [4, 2],
        [5, 1],
        [6, 4],
        [7, 2],
        [8, 3],
        [9, 0],
        [10, 0],
        [11, 2],
        [12, 0],
        [13, 4],
        [14, 1],
        [15, 5],
        [16, 3],
        [17, 1],
        [18, 2],
        [19, 0],
        [20, 3],
        [21, 1],
        [22, 0],
        [23, 2],
        [24, 0],
      ],
    },
    {
      data:[[1,0],[24,0]]
    }
  ]
  return (
    <Fragment>
      <div className= {classes.block}>
        <div className={classes.topbar}>
          <NavBar></NavBar>
        </div>
        <div className= {classes.image}>
            <div className={classes.container}>
              <div className={classes.info}/>
              <GraphBox
                quadrant={1}
                series={series}
              />
              <div className={classes.info}/>
              <GraphBox
                quadrant={2}
                series={series}
              />
              <div className={classes.tooth_no}/>
              <div className={classes.num_space}/>
              <div className={classes.tooth_no}/>
              {/* <div className={classes.empty_box}/> */}
              <GraphBox
                quadrant={3}
                series={series2}
              />
              <div className={classes.info}/>
              <GraphBox
                quadrant={4}
                series={series2}
              />
              <div className={classes.info}/>
            </div>
            <img src={graph} className={classes.element}/>
        </div>
        <div className={classes.topbar}>
          <GraphControlBar/>
        </div>
      </div>
    </Fragment>
  );
};

export default GraphPage;
