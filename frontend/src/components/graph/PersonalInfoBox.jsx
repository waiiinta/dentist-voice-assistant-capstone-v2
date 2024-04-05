import React from "react";
import classes from "./PersonalInfoBox.module.css"

const PersonalInfoBox = ({
  props
}) =>{
  // console.log(props)
  return (
    <div className={classes.personal_info}>
      <div className={classes.first_line}>
        <span className={classes.patient_name}>
          {props.patient}
        </span>
        <span className={classes.hn}>
          {props.hn}
        </span>
        <span className={classes.date}>
          {`${props.date[0]}`}
        </span>
        <span className={classes.date}>
          {`${props.date[1]}`}
        </span>
        <span className={classes.date}>
          {`${props.date[2].slice(2,4)}`}
        </span>
      </div>
      <div className={classes.second_line}>
        <div  style={{width:'23px'}}/>
        {props.type === "initial" && <div className={classes.tick_box}/>}
        {props.type !== "initial" && <div className={classes.box}/>}
        <div  style={{width:'29px'}}/>
        {props.type === "evaluation" && <div className={classes.tick_box}/>}
        {props.type !== "evaluation" && <div className={classes.box}/>}
        <div  style={{width:'49px'}}/>
        {props.type === "pre-surgical" && <div className={classes.tick_box}/>}
        {props.type !== "pre-surgical" && <div className={classes.box}/>}
        <div  style={{width:'55px'}}/>
        {props.type === "maintenance" && <div className={classes.tick_box}/>}
        {props.type !== "maintenance" && <div className={classes.box}/>}
        <span className={classes.examiner}>
          {props.examiner}
        </span>
      </div>
    </div>
  )
}

export default PersonalInfoBox