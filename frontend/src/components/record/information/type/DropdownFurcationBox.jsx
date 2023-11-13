import { useState } from "react";
// import Dropdown from "react-bootstrap/Dropdown";
// import DropdownButton from "react-bootstrap/DropdownButton";
import classes from "./DropdownFurcationBox.module.css";
import DropdownFurcation from "./DropdownFurcation";

function FurcationDropdownBox({
	quadrant,
	id,
	mode,
	data,
	handleSetInformation,
	positionToBeHighlighted,
}) {
	const spec_id =
		quadrant === 1 || quadrant === 4
			? ["distal", "buccal","lingual", "mesial"]
			: ["mesial", "buccal","lingual", "distal"];
  // console.log(data)
	return (
		<div >
      <div className={classes.direction}>
        <DropdownFurcation
          quadrant={quadrant}
					id={id}
					mode={mode}
					specific_id={spec_id[1]}
					data={data[spec_id[1]]}
					handleSetInformation={handleSetInformation}
					isHighlighted={
						positionToBeHighlighted === spec_id[0] ? true : false
					}
        />
      </div>
      <div className={classes.direction}>
				<DropdownFurcation
					quadrant={quadrant}
					id={id}
					mode={mode}
					specific_id={spec_id[0]}
					data={data[spec_id[0]]}
					handleSetInformation={handleSetInformation}
					isHighlighted={
						positionToBeHighlighted === spec_id[0] ? true : false
					}
				/>
				<DropdownFurcation
					quadrant={quadrant}
					id={id}
					mode={mode}
					specific_id={spec_id[2]}
					data={data[spec_id[2]]}
					handleSetInformation={handleSetInformation}
					isHighlighted={
						positionToBeHighlighted === spec_id[1] ? true : false
					}
				/>
				<DropdownFurcation
					quadrant={quadrant}
					id={id}
					mode={mode}
					specific_id={spec_id[3]}
					data={data[spec_id[3]]}
					handleSetInformation={handleSetInformation}
					isHighlighted={
						positionToBeHighlighted === spec_id[2] ? true : false
					}
				/>
			</div>
		</div>
	);
}
export default FurcationDropdownBox;
