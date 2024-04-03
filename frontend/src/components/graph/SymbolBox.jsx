import React from "react";
import classes from "./SymbolBox.module.css"
import crown from "../../images/crown.png"
import implant from "../../images/implant.png"

const SymbolBox = ({
    quadrant,
    data
}) => {
    // console.log(data)
    return (
        <div className={classes.tooth_no}>
            <div className={classes.crown_box}>
                {data.crown === true && 
                    (<img 
                        src={crown} 
                        height={13.2}
                    />)
                }
            </div>
            <div className={classes.implant_box}>
                {data.implant === true && 
                    (<img 
                        src={implant} 
                        height={16.4}
                    />)
                }
            </div>
        </div>
    )

}

export default SymbolBox