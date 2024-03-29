import { Fragment, useEffect, useState } from "react";
import classes from "./GraphPage.module.css";
import graph from "../../images/plain_graph.jpg";
import NavBar from "../../components/ui/NavBar";
import GraphControlBar from "../../components/record/GraphControlBar";
import Chart from "react-apexcharts"

let options = {
  options:{
    chart:{
      id:"basic-line"
    },
    xaxix:{
      
    }
  }
}

const GraphPage = () => {
  return (
    <Fragment>
      <div className= {classes.block}>
        <div className={classes.topbar}>
          <NavBar></NavBar>
        </div>
        <div className= {classes.image}>
            <div className={classes.container}>
              <Chart
                type="line"
                width={298}
                height={110}

                series={[
                  {
                    data:[[1,1],[2,3],[3,2],[4,2],[5,1],[6,4],[7,2],[8,3],[9,0],[10,0],[11,2],[12,0],[13,4],[14,1],[15,7],[16,3],[17,6],[18,2],[19,0],[20,3],[21,1],[22,0],[23,2],[24,0]]
                  },
                  // {
                  //   data:[[0,0],[24,0]]
                  // }
                ]}

                options={{
                  xaxis:{
                    type:"numeric",
                    labels:{
                      show:false
                    }
                  },
                  yaxis:{
                    max:15,
                    min:-5,
                    labels:{
                      show:false
                    }
                  },
                  chart:{
                    toolbar:{
                      show:false
                    },
                    animations:{
                      enabled:false
                    },
                    zoom:{
                      enabled:false
                    }
                  },
                  tooltip:{
                    enabled:false
                  },
                  dataLabels:{
                    enabled:false
                  },
                  stroke:{
                    width:1
                  },
                  legend:{
                    show:false
                  }
                }}
              ></Chart>
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
