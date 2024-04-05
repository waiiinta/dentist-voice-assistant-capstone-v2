import "bootstrap/dist/css/bootstrap.css";
import Navbar from "react-bootstrap/Navbar";
import classes from "./GraphControlBar.module.css";
import React from "react";

function GraphControlBar(props) {
  return (
    <Navbar bg="black" variant="dark" fixed="bottom" className={classes.navbar}>
      <Navbar.Brand className={classes.actions}>
      <button
          className={classes.saveAsButton}
          onClick={props.downloadPDF}
        >
          <img
            src={require("../../../src/images/icons8-microsoft-excel-24.png")}
            className={classes["icon"]}
          />
          {"Save as PDF"}
        </button>
      </Navbar.Brand>
    </Navbar>
  );
}

export default GraphControlBar;
