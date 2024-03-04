import classes from "./RecordHeader.module.css";
import React from "react";

const RecordHeader = ({ currentCommand }) => {
  const command = currentCommand.command;
  const side = !!currentCommand.side ? currentCommand.side.toLowerCase() : null;

  const commandToHighLight = {
    PDREBuccal: false,
    PDRELingual: false,
    PDBuccal: false,
    PDLingual: false,
    REBuccal: false,
    RELingual: false,
    BOPBuccal: false,
    BOPLingual: false,
    SUPBuccal:false,
    SUPLingual:false,
    MGJ: command === "MGJ",
    MO: command === "MO",
    FUR: command === "FUR",
  };

  if (command === "PDRE") {
    commandToHighLight.PDREBuccal = true;
    commandToHighLight.PDRELingual = true;
    if (side === "buccal") {
      commandToHighLight.PDRELingual = false;
    } else if (side === "lingual") {
      commandToHighLight.PDREBuccal = false;
    }
  } else if (command === "BOP") {
    commandToHighLight.BOPBuccal = true;
    commandToHighLight.BOPLingual = true;
    if (side === "buccal") {
      commandToHighLight.BOPLingual = false;
    } else if (side === "lingual") {
      commandToHighLight.BOPBuccal = false;
    }
  } else if (command === "SUP"){
    commandToHighLight.SUPBuccal = true
    commandToHighLight.SUPLingual = true
    if(side === "buccal"){
      commandToHighLight.SUPLingual = false
    }else if (side === "lingual"){
      commandToHighLight.SUPBuccal = false
    }
  }else if (command === "PD") {
    commandToHighLight.PDBuccal = true;
    commandToHighLight.PDLingual = true;
    if (side === "buccal") {
      commandToHighLight.PDLingual = false;
    } else if (side === "lingual") {
      commandToHighLight.PDBuccal = false;
    }
  }else if (command === "RE") {
    commandToHighLight.REBuccal = true;
    commandToHighLight.RELingual = true;
    if (side === "buccal") {
      commandToHighLight.RELingual = false;
    } else if (side === "lingual") {
      commandToHighLight.REBuccal = false;
    }
  }

  return (
    <div className={classes.side_direction}>
      <div className={classes.side_space}>
        <div
          className={`${classes["side"]} ${
            side === "buccal" ? classes["highlighted"] : ""
          }`}
        >
          BUCCAL
        </div>
        <div
          className={`${classes["side"]} ${
            side === "lingual" ? classes["highlighted"] : ""
          }`}
        >
          LINGUAL
        </div>
      </div>

      <div className={classes.direction}>
        {/* upper */}
        <div
          className={`${classes["title"]} ${
            commandToHighLight.PDREBuccal || commandToHighLight.PDBuccal ? classes["highlighted"] : ""
          }`}
        >
          PD
        </div>
        <div
          className={`${classes["title"]} ${
            commandToHighLight.PDREBuccal || commandToHighLight.REBuccal ? classes["highlighted"] : ""
          }`}
        >
          RE
        </div>
        <div
          className={`${classes["title"]} ${
            commandToHighLight.BOPBuccal ? classes["highlighted"] : ""
          }`}
        >
          BOP
        </div>
        <div
          className={`${classes["title"]} ${
            commandToHighLight.SUPBuccal ? classes["highlighted"] : ""
          }`}
        >
          SUP
        </div>
        <div
          className={`${classes["title"]} ${
            commandToHighLight.MGJ ? classes["highlighted"] : ""
          }`}
        >
          MGJ
        </div>
        <div className={classes.gap}> </div>
        {/* middle */}
        <div className={`${classes.title} ${
          commandToHighLight.FUR? classes["highlighted"] : ""
        }`}>
          FUR
        </div> 
        <div className={classes.gap2}> </div>

        {/* lower */}
        <div
          className={`${classes["title"]} ${
            commandToHighLight.MO ? classes["highlighted"] : ""
          }`}
        >
          MO
        </div>
        <div
          className={`${classes["title"]} ${
            commandToHighLight.BOPLingual ? classes["highlighted"] : ""
          }`}
        >
          BOP
        </div>
        <div
          className={`${classes["title"]} ${
            commandToHighLight.SUPLingual ? classes["highlighted"] : ""
          }`}
        >
          SUP
        </div>
        <div
          className={`${classes["title"]} ${
            commandToHighLight.PDRELingual || commandToHighLight.PDLingual ? classes["highlighted"] : ""
          }`}
        >
          PD
        </div>
        <div
          className={`${classes["title"]} ${
            commandToHighLight.PDRELingual || commandToHighLight.RELingual ? classes["highlighted"] : ""
          }`}
        >
          RE
        </div>
      </div>
    </div>
  );
};

export default RecordHeader;
