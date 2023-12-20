import { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import classes from "./DropdownLg.module.css";

function DropdownLg({
  quadrant,
  side,
  id,
  mode,
  data,
  handleSetInformation,
  isHighlighted,
}) {
  const handleSelect = (target) => {
    handleSetInformation(quadrant, id, side, mode, target);
  };
  const MO = (
    <DropdownButton
    className={`${classes["largebox"]} ${isHighlighted ? classes["highlighted"] : ""
      }`}
    title={data !== null ? data : ""}
    onSelect={handleSelect}
  >
    <Dropdown.Item eventKey="">-</Dropdown.Item>
    <Dropdown.Item eventKey="1">1</Dropdown.Item>
    <Dropdown.Item eventKey="2">2</Dropdown.Item>
    <Dropdown.Item eventKey="3">3</Dropdown.Item>

  </DropdownButton>
  );

  const MGJ = (
    <DropdownButton
    className={`${classes["largebox"]} ${isHighlighted ? classes["highlighted"] : ""
      }`}
    title={data !== null ? data : ""}
    onSelect={handleSelect}
  >
    <Dropdown.Item eventKey="">-</Dropdown.Item>
    <Dropdown.Item eventKey="0">0</Dropdown.Item>
    <Dropdown.Item eventKey="1">1</Dropdown.Item>
    <Dropdown.Item eventKey="2">2</Dropdown.Item>
    <Dropdown.Item eventKey="3">3</Dropdown.Item>
    <Dropdown.Item eventKey="4">4</Dropdown.Item>
    <Dropdown.Item eventKey="5">5</Dropdown.Item>
    <Dropdown.Item eventKey="6">6</Dropdown.Item>
    <Dropdown.Item eventKey="7">7</Dropdown.Item>
    <Dropdown.Item eventKey="8">8</Dropdown.Item>
    <Dropdown.Item eventKey="9">9</Dropdown.Item>
    <Dropdown.Item eventKey="10">10</Dropdown.Item>
  </DropdownButton>
  );

  if(mode === "MGJ"){
    return MGJ
  }else{
    return MO
  }
  return (
    <DropdownButton
      className={`${classes["largebox"]} ${isHighlighted ? classes["highlighted"] : ""
        }`}
      title={data !== null ? data : ""}
      onSelect={handleSelect}
    >
      <Dropdown.Item eventKey="">-</Dropdown.Item>
      <Dropdown.Item eventKey="0">0</Dropdown.Item>
      <Dropdown.Item eventKey="1">1</Dropdown.Item>
      <Dropdown.Item eventKey="2">2</Dropdown.Item>
      <Dropdown.Item eventKey="3">3</Dropdown.Item>
      <Dropdown.Item eventKey="4">4</Dropdown.Item>
      <Dropdown.Item eventKey="5">5</Dropdown.Item>
      <Dropdown.Item eventKey="6">6</Dropdown.Item>
      <Dropdown.Item eventKey="7">7</Dropdown.Item>
      <Dropdown.Item eventKey="8">8</Dropdown.Item>
      <Dropdown.Item eventKey="9">9</Dropdown.Item>
      <Dropdown.Item eventKey="10">10</Dropdown.Item>
    </DropdownButton>
  );
}
export default DropdownLg;
