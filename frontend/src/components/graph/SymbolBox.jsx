import React from "react";
import classes from "./SymbolBox.module.css"
import crown from "../../images/crown.png"
import implant from "../../images/implant.png"

const SymbolBox = ({
    quadrant,
    data
}) => {
    console.log(data)
    return (
        <div className={classes.tooth_no}>
            <div className={classes.crown_box}>
                {/* <img 
                    src={crown} 
                    className={classes.crown}
                    height={13.2}
                /> */}
                {data.crown === true && 
                    (<img 
                        src={crown} 
                        // className={classes.crown}
                        height={13.2}
                    />)
                }
                {/* {data.crown !== true && (<div className={classes.not_clown}/>)} */}
            </div>
            <div className={classes.implant_box}>
                {/* <img 
                    src={implant} 
                    className={classes.crown}
                    height={16.4}
                /> */}
                {data.implant === true && 
                    (<img 
                        src={implant} 
                        // className={classes.crown}
                        height={16.4}
                    />)
                }
            </div>
        </div>
    )

}

export default SymbolBox