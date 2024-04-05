import React from "react";
import classes from "./PDREbox.module.css"

const PDREbox = ({
    quadrant,
    data
}) => {
    let left = [1,4].includes(quadrant)? data.distal:data.mesial
    let mid = data.middle
    let right = [1,4].includes(quadrant)? data.mesial:data.distal
    return (
        <div className={classes.large_box}>
            <div className={classes.small_box}>
                {left}
            </div>
            <div className={classes.small_box}>
                {mid}
            </div>
            <div className={classes.small_box}>
                {right}
            </div>
        </div>
    )
}

export default PDREbox