import { Fragment, useEffect, useState } from "react";
import { useLocation,useNavigate } from "react-router-dom";
import classes from "./GraphPage.module.css";
import graph from "../../images/plain_graph.jpg";
import NavBar from "../../components/ui/NavBar";

import GraphControlBar from "../../components/graph/GraphControlBar";
import GraphBox from "../../components/graph/GraphBox";
import InformationBox from "../../components/graph/InformationBox";
import ToothNumBox from "../../components/graph/ToothNumBox";
import PersonalInfoBox from "../../components/graph/PersonalInfoBox";
import Modal from "../../components/ui/Modal";

import graphDataProcessing from "../../utils/graphDataProcessing";

const GraphPage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const state = location.state

  let [series,setSeries] = useState(null)
  let [personalInfo, setPersonalInfo] = useState(null)
  let [userInfo, setUserInfo] = useState(null)
  let [graphData,setGraphData] = useState(null)

  const [checkBackToHome, setCheckBackToHome] = useState(false);

  //Back to home related
  const checkBackToHomeHandler = () => {
    setCheckBackToHome((prevcheckBackToHome) => {
      return !prevcheckBackToHome;
    });
  };
  const backToHomePageHandler = () => {
    checkBackToHomeHandler();
    navigate("/");
  }
  const modalBackContent = (
    <p>
      Are you sure to go back to Hame Page?
      <br />
      Once confirmed,{" "}
      <span style={{ color: "red" }}>
        <b> this procedure cannot be reversed.</b>
      </span>
    </p>
  );

  //set every states before render
  useEffect((()=>{
    let date = state.date.split("/")
    let psnInfo = {
      patient: state.patient,
      hn: state.hn,
      examiner: `${state.userData.dentistName} ${state.userData.dentistSurname}`,
      type: state.type,
      date: date
    }
    let information = state.information
    let newSeries = graphDataProcessing(information)

    setSeries(newSeries)
    setPersonalInfo(psnInfo)
    setUserInfo(state.userData)
    setGraphData(information)
  } 
  ),[])

  let renderObject = (
    (
      series && graphData && userInfo && (
      <Fragment>
        {checkBackToHome && (
          <Modal
            header="Back to Home Page"
            content={modalBackContent}
            onOKClick={backToHomePageHandler}
            onCancelClick={checkBackToHomeHandler}
            okButtonText="Confirm"
            modalType="confirm"
          />
        )}
        <div className= {classes.block}>
          <div className={classes.topbar}>
            <NavBar
              userData={userInfo}
              isLoaded={true}
              isSummary={true}
              checkBackToHomeHandler={checkBackToHomeHandler}
            />
          </div>
          <div className= {classes.image}>
              <div className={classes.container}>
                <PersonalInfoBox
                  props={personalInfo}
                />
                <InformationBox
                  quadrant={[1,2]}
                  data={[graphData[0],graphData[1]]}
                  side="Buccal"
                />
                <GraphBox
                  quadrant={[1,2]}
                  series={series.buccals.q12}
                />
                <InformationBox
                  quadrant={[1,2]}
                  data={[graphData[0],graphData[1]]}
                  side="Lingual"
                />
                <GraphBox
                  quadrant={[1,2]}
                  series={series.linguals.q12}
                />
                <ToothNumBox
                  quadrant={[1,2]}
                  data={[graphData[0],graphData[1]]}
                />
                <div className={classes.num_space}/>
                <ToothNumBox
                  quadrant={[4,3]}
                  data={[graphData[3],graphData[2]]}
                />
                <GraphBox
                  quadrant={[4,3]}
                  series={series.linguals.q34}
                />
                <InformationBox
                  quadrant={[4,3]}
                  data={[graphData[3],graphData[2]]}
                  side="Lingual"
                />
                <GraphBox
                  quadrant={[4,3]}
                  series={series.buccals.q34}
                />
                <InformationBox
                  quadrant={[4,3]}
                  data={[graphData[3],graphData[2]]}
                  side="Buccal"
                />
              </div>
              <img src={graph} className={classes.element}/>
          </div>
          <div className={classes.topbar}>
            <GraphControlBar/>
          </div>
        </div>
      </Fragment>
    ))
  )
  
  return renderObject
};

export default GraphPage;
