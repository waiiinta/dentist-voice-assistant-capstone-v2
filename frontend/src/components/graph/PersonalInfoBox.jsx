import React from "react";
import classes from "./PersonalInfoBox.module.css"

const PersonalInfoBox = ({
  data
}) =>{
  console.log(data)
  return (
    <div className={classes.personal_info}>
      <div className={classes.first_line}>
        <span className={classes.patient_name}>
          {data.patient}
        </span>
        <span className={classes.hn}>
          {data.hn}
        </span>
        <span className={classes.date}>
          {`${data.date.slice(8,10)}`}
        </span>
        <span className={classes.date}>
          {`${data.date.slice(5,7)}`}
        </span>
        <span className={classes.date}>
          {`${data.date.slice(2,4)}`}
        </span>
      </div>
      <div className={classes.second_line}>
        <div  style={{width:'23px'}}/>
        {data.type === "initial" && <div className={classes.tick_box}/>}
        {data.type !== "initial" && <div className={classes.box}/>}
        <div  style={{width:'29px'}}/>
        {data.type === "evaluation" && <div className={classes.tick_box}/>}
        {data.type !== "evaluation" && <div className={classes.box}/>}
        <div  style={{width:'49px'}}/>
        {data.type === "pre-surgical" && <div className={classes.tick_box}/>}
        {data.type !== "pre-surgical" && <div className={classes.box}/>}
        <div  style={{width:'55px'}}/>
        {data.type === "maintenance" && <div className={classes.tick_box}/>}
        {data.type !== "maintenance" && <div className={classes.box}/>}
        <span className={classes.examiner}>
          {data.examiner}
        </span>
      </div>
    </div>
  )
}

export default PersonalInfoBox