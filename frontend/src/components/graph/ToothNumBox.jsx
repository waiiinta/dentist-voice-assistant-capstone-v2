import React from "react"
import classes from "./ToothNumBox.module.css"
import SymbolBox from "./SymbolBox"

const ToothNumBox = ({
    quadrant,
    data
}) => {
    let l_data = data[0]
    let r_data = data[1]

    return (
        <div className= {classes.teeth_no}>
            <div className={classes.left_no}>
                {
                    l_data.idxArray.map((idx)=>(
                        <SymbolBox
                            key={String(quadrant[0])+String(idx.ID)}
                            quadrant={quadrant[0]}
                            data={idx}
                        />
                    ))
                }
            </div>
            <div className={classes.right_no}>
                {
                    r_data.idxArray.map((idx)=>(
                        <SymbolBox
                            key={String(quadrant[1])+String(idx.ID)}
                            quadrant={quadrant[1]}
                            data={idx}
                        />
                    ))
                }
            </div>
        </div>
    )
}

export default ToothNumBox