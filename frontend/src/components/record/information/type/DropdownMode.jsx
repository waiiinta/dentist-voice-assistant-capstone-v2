import { useState } from "react";
import NavDropdown from "react-bootstrap/NavDropdown";
import crown from "../../../../images/crown.png";
import classes from "./DropdownMode.module.css";
import implant from "../../../../images/implant.png";
import React from "react";

function DropdownMode({
	quadrant,
	id,
	handleSetInformation,
	isHighlighted,
	information,
}) {
	const handleSelect = (mode) => {
		handleSetInformation(quadrant, id, NaN, mode, true);
	};
//   console.log(isHighlighted)

	return (
		<div className={classes.box}>
			{information.crown && (
				<div className={classes.crown}>
					<img src={crown} width={20} height={20} />
				</div>
			)}
			{!information.crown && <div className={classes.emptyBox} />}
			<div className={classes.dropdown}>
				<NavDropdown
					className={`${classes["largebox"]} ${
						isHighlighted ? classes["highlighted"] : ""
					}`}
					title={
						<div
							className={`${classes.title} ${
                isHighlighted? classes.highlighted:null
              }`}
						>
							{quadrant}{id}
						</div>
					}
					onSelect={handleSelect}
					s
				>
					<NavDropdown.Item eventKey="-">-</NavDropdown.Item>
					<NavDropdown.Item eventKey="Missing">
						Missing
					</NavDropdown.Item>
					<NavDropdown.Item eventKey="Crown">Crown</NavDropdown.Item>
					<NavDropdown.Item eventKey="Implant">
						Implant
					</NavDropdown.Item>
					<NavDropdown.Item eventKey="Brigde">
						Bridge
					</NavDropdown.Item>
				</NavDropdown>
				{information.implant && (
					<img
						className={classes.implant}
						src={implant}
						height={40}
						width={40}
					/>
				)}
			</div>

			<div className={classes.emptyBox} />
		</div>
	);
}
export default DropdownMode;
