import { useState } from "react";
import NavDropdown from "react-bootstrap/NavDropdown";
import crown from "../../../../images/crown.png";
import classes from "./DropdownMode.module.css";
import implant from "../../../../images/implant.png";
function DropdownMode({
	quadrant,
	id,
	handleSetInformation,
	isHighlighted,
	information,
}) {
	const handleSelect = (mode) => {
		handleSetInformation(quadrant, id, NaN, mode, true);
		// if(mode)
	};
	//   console.log(isHighlighted)
	const handleSelectBridge = async (i) => {
		i = parseInt(i);
		// console.log(i,id)
		if(i < id){
			for(let j = i; j <= id; j++){
				console.log(j)
				if(j == i || j == id){
					console.log("pass")
					await handleSetInformation(quadrant, j, NaN,"Bridge", true,NaN,true)
				}else{
					await handleSetInformation(quadrant, j, NaN,"Bridge", true);
				}
			}
		}else{
			for(let j = id; j <= i; j++){
				if(j == i || j == id){
					await handleSetInformation(quadrant, j, NaN,"Bridge", true,NaN,true)
				}else{
					await handleSetInformation(quadrant, j, NaN,"Bridge", true);
				}
			}
		}
	}

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
					} ${information.bridge_edge? classes["bridge-edge"] : ""}
					${(!information.bridge_edge && information.bridge)? classes["bridge"] : null}`}
					title={
						<div
							className={`${classes.title} ${
								isHighlighted ? classes.highlighted : null
							}`}
						>
							{quadrant}
							{id}
						</div>
					}
					onSelect={handleSelect}
				>
					<NavDropdown.Item eventKey="-">-</NavDropdown.Item>
					<NavDropdown.Item eventKey="Missing">
						Missing
					</NavDropdown.Item>
					<NavDropdown.Item eventKey="Crown">Crown</NavDropdown.Item>
					<NavDropdown.Item eventKey="Implant">
						Implant
					</NavDropdown.Item>
					<NavDropdown className={classes.submenu} title="bridge" drop="end" onSelect={handleSelectBridge}
					// onClick={()=>setShow(true)}
					>
						<NavDropdown.Item eventKey={1}>
							{id}-1
						</NavDropdown.Item>
						<NavDropdown.Item eventKey={2}>
							{id}-2
						</NavDropdown.Item>
						<NavDropdown.Item eventKey={3}>
							{id}-3
						</NavDropdown.Item>
						<NavDropdown.Item eventKey={4}>
							{id}-4
						</NavDropdown.Item>
						<NavDropdown.Item eventKey={5}>
							{id}-5
						</NavDropdown.Item>
						<NavDropdown.Item eventKey={6}>
							{id}-6
						</NavDropdown.Item>
						<NavDropdown.Item eventKey={7}>
							{id}-7
						</NavDropdown.Item>
						<NavDropdown.Item eventKey={8}>
							{id}-8
						</NavDropdown.Item>
					</NavDropdown>
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
