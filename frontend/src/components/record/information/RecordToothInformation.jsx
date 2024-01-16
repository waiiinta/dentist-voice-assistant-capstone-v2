import DropdownMode from "./type/DropdownMode";
import classes from "./RecordToothInformation.module.css"
import implant from "../../../images/implant.png"
import React from "react";


const RecordToothInformation = ({
  quadrant,
  id,
  information,
  handleSetInformation,
  isHighlighted
})=>{
  // console.log("isHighlighted",isHighlighted)
  return (
    <div className={classes.box}>
      <DropdownMode
        quadrant={quadrant}
        id={id}
        handleSetInformation={handleSetInformation}
        isHighlighted = {isHighlighted}
        information={information}
      />
    </div>
  )

}

export default RecordToothInformation