import React from "react";
import classes from "./InformationBox.module.css";
import ToothInfomation from "./ToothInformation";

const InformationBox = ({
  quadrant,
  data,
  side
}) => {
  // console.log(data)
  let l_data = data[0]
  let r_data = data[1]
  return (
    <div className={classes.info}>
      <div className={classes.q_left}>
        {l_data.idxArray.map((idx) =>(
          <ToothInfomation
            quadrant={quadrant[0]}
            id={idx.ID}
            data={idx}
            side={side}
          />
        ))}
      </div>
      <div className={classes.q_right}>
        {r_data.idxArray.map((idx) =>(
          <ToothInfomation
            quadrant={quadrant[1]}
            id={idx.ID}
            data={idx}
            side={side}
          />
        ))}
      </div>
    </div>
  );
};

export default InformationBox;
