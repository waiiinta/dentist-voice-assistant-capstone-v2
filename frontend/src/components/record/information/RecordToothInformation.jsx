import DropdownMode from "./type/DropdownMode";
import classes from "./RecordToothInformation.module.css"
import implant from "../../../images/implant.png"


const RecordToothInformation = ({
  quadrant,
  id,
  information,
  handleSetInformation,
  isHighlight
})=>{
  return (
    <div className={classes.box}>
      <DropdownMode
        quadrant={quadrant}
        id={id}
        handleSetInformation={handleSetInformation}
        currentCommand = {isHighlight}
        information={information}
      />
      {/* <div className={classes.emptyBox}>
        {information.implant && (
          <img src={implant} height={20} width={20}/>
        )}
      </div> */}
    </div>
  )

}

export default RecordToothInformation