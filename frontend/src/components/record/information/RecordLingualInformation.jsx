import DropdownLg from "./type/DropdownLg";
import DropdownSmBox from "./type/DropdownSmBox";
import CheckboxBox from "./type/CheckboxBox";
import React from "react";

import classes from "./RecordLingualInformation.module.css";

const RecordLingualInformation = ({
  quadrant,
  id,
  lingualInformation,
  mo,
  handleSetInformation,
  currentCommand,
}) => {
  const pd = lingualInformation.PD;
  const re = lingualInformation.RE;
  const bop = lingualInformation.BOP;
  const sup = lingualInformation.SUP;
  const side = lingualInformation.side;

  const command =
    !!currentCommand && !!currentCommand.command
      ? currentCommand.command
      : null;

  const positionToBeHighlighted =
    !!currentCommand && !!currentCommand.position
      ? currentCommand.position
      : null;

  const isMOHighlighted = !!currentCommand && command === "MO" ? true : false;
  const isBOPHighlighted = !!currentCommand && command === "BOP" ? true : false;
  const isSUPHighlighted = !!currentCommand && command === "SUP" ? true : false;

  return (
    <div className={classes.direction}>
      <DropdownLg
        quadrant={quadrant}
        side={side}
        id={id}
        mode={"MO"}
        data={mo}
        handleSetInformation={handleSetInformation}
        isHighlighted={isMOHighlighted}
      />
      <CheckboxBox
        quadrant={quadrant}
        side={side}
        id={id}
        mode={"BOP"}
        data={bop}
        handleSetInformation={handleSetInformation}
        isHighlighted={isBOPHighlighted}
      />
      <CheckboxBox
        quadrant={quadrant}
        side={side}
        id={id}
        mode={"SUP"}
        data={sup}
        handleSetInformation={handleSetInformation}
        isHighlighted={isSUPHighlighted}
      />
      <DropdownSmBox
        quadrant={quadrant}
        side={side}
        id={id}
        mode={"PD"}
        data={pd}
        handleSetInformation={handleSetInformation}
        positionToBeHighlighted={
          command === "PDRE" ? positionToBeHighlighted : null
        }
      />
      <DropdownSmBox
        quadrant={quadrant}
        side={side}
        id={id}
        mode={"RE"}
        data={re}
        handleSetInformation={handleSetInformation}
        positionToBeHighlighted={
          command === "PDRE" ? positionToBeHighlighted : null
        }
      />
    </div>
  );
};

export default RecordLingualInformation;
