import FurcationDropdownBox from "./type/DropdownFurcationBox";
import classes from "./RecordFurcationInformation.module.css";

const RecordFurcationInformation = ({
	quadrant,
	id,
	furcation,
	handleSetInformation,
	currentCommand,
}) => {
	// console.log(currentCommand)
	const command =
		currentCommand && currentCommand.command
			? currentCommand.command
			: null;

	const isPositionHighlited = currentCommand && command === "FUR"? currentCommand:null
	// console.log(isHighlighted)
	return (
		<div className={classes.direction}>
			<FurcationDropdownBox
				quadrant={quadrant}
				id={id}
				mode={command}
				data={furcation}
				handleSetInformation={handleSetInformation}
				isPositionHighlighted={isPositionHighlited}
			/>
		</div>
	);
};

export default RecordFurcationInformation;
