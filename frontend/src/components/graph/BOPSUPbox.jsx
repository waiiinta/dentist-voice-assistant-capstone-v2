import React from "react";
import classes from "./BOPSUPbox.module.css"

const BUPSUPbox = ({
    quadrant,
    data,
    command
}) =>{
    console.log(data)
    let left = [1,4].includes(quadrant)? data.distal:data.mesial
    let mid = data.middle
    let right = [1,4].includes(quadrant)? data.mesial:data.distal
    // console.log(left,mid,right)

    return (
        <div className={classes.large_box}>
                <div className={`${classes.small_box} ${left? classes[command]:""}`}/>
                <div className={`${classes.small_box} ${mid? classes[command]:""}`}/>
                <div className={`${classes.small_box} ${right? classes[command]:""}`}/>
        </div>
    )
}

export default BUPSUPbox