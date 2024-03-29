import "bootstrap/dist/css/bootstrap.css";
import Navbar from "react-bootstrap/Navbar";
import classes from "./GraphControlBar.module.css";
import React from "react";

function GraphControlBar(props) {
  return (
    <Navbar bg="black" variant="dark" fixed="bottom">
      <Navbar.Brand className={classes.actions}></Navbar.Brand>
    </Navbar>
  );
}

export default GraphControlBar;
