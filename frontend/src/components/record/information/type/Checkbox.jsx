import { useState } from "react";
import classes from "./Checkbox.module.css";

function Checkbox({
  quadrant,
  side,
  id,
  mode,
  specific_id,
  data,
  handleSetInformation,
}) {
  const handleSelect = (target) => {
    handleSetInformation(quadrant, id, side, mode, target, specific_id);
  };

  const BOP = (
    <label className={classes.l}>
      <input
        type="checkbox"
        onChange={() => {
          handleSelect(!data);
        }}
      />
      <span
        className={`checkbox ${data ? "checkbox--active" : ""}`}
        // This element is purely decorative so
        // we hide it for screen readers
        aria-hidden="true"
      />
    </label>
  )

  const SUP = (
    <label className={classes.l}>
      <input
        type="checkbox"
        onChange={() => {
          handleSelect(!data);
        }}
      />
      <span
        className={`checkbox ${data ? "checkbox--yellow" : ""}`}
        // This element is purely decorative so
        // we hide it for screen readers
        aria-hidden="true"
      />
    </label>
  )

  if(mode == "BOP"){
    return BOP
  }else if(mode == "SUP"){
    return SUP
  }
}

export default Checkbox;
