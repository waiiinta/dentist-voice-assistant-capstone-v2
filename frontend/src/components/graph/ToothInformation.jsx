import React from "react";
import classes from "./ToothInfomation.module.css"
import BUPSUPbox from "./BOPSUPbox.jsx";
import PDREbox from "./PDREbox.jsx";

const ToothInfomation = ({
    quadrant,
    id,
    data,
    side
}) => {
    // console.log(quadrant,id)
    console.log(quadrant,id,data,side)
    let mo_mgj = side == "Buccal"? data.MGJ:data.MO
    let side_data = data.depended_side_data[0].side === side.toLowerCase()? data.depended_side_data[0]:data.depended_side_data[1]
    // console.log(side,side_data)
    let pd = side_data.PD
    let re = side_data.RE 
    let sup = side_data.SUP
    let bop = side_data.BOP
    // console.log(bop)
    if (data.missing === true){
        return (
            <div className={classes.missing}/>
        )
    }

    if (data.bridge === true && data.bridge_edge === false){
        return (
            <div className={classes.edge}/>
        )
    }

    const render_object = quadrant < 3?
        (<div className={`${classes.tooth_box} ${data.bridge === true? classes.bridge:""}`}>
            <div className={classes.large_box}>
                {mo_mgj}
            </div>
            <BUPSUPbox
                quadrant={quadrant}
                data={bop}
                command="BOP"
            />
            <BUPSUPbox
                quadrant={quadrant}
                data={sup}
                command="SUP"
            />
            {/* <div className={classes.large_box}>
                <div className={classes.small_box}/>
                <div className={classes.small_box}/>
                <div className={classes.small_box}/>
            </div> */}
            <PDREbox
                quadrant={quadrant}
                data={pd}
            />
            <PDREbox
                quadrant={quadrant}
                data={re}
            />
        </div>):
        (<div className={`${classes.tooth_box} ${data.bridge === true? classes.bridge:""}`}>
            <PDREbox
                quadrant={quadrant}
                data={re}
            />
            <PDREbox
                quadrant={quadrant}
                data={pd}
            />
            <BUPSUPbox
                quadrant={quadrant}
                data={bop}
                command="BOP"
            />
            <BUPSUPbox
                quadrant={quadrant}
                data={sup}
                command="SUP"
            />
            <div className={classes.large_box}>
                {mo_mgj}
            </div>
        </div>)


    return render_object
}

export default ToothInfomation