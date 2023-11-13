import { useState, useEffect } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import classes from "./DropdownFurcation.module.css";

function DropdownFurcation({
	quadrant,
	id,
	mode,
	specific_id,
	data,
	handleSetInformation,
	isHighlighted,
}) {
	const handleSelect = (target) => {
		handleSetInformation(quadrant, id,NaN ,mode, target, specific_id);
	};

	const FURDropdown = (
		<DropdownButton
			className={`${classes["smallbox"]} ${
				isHighlighted ? classes["highlighted"] : ""
			}`}
			title={data !== null ? data : ""}
			onSelect={handleSelect}
		>
			<Dropdown.Item eventKey="">-</Dropdown.Item>
			<Dropdown.Item eventKey="1">1</Dropdown.Item>
			<Dropdown.Item eventKey="2">2</Dropdown.Item>
			<Dropdown.Item eventKey="3">3</Dropdown.Item>
		</DropdownButton>
	);

	return FURDropdown
}
export default DropdownFurcation;
