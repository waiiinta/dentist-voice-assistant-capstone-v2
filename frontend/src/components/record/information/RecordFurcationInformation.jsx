import FurcationDropdownBox from "./type/DropdownFurcationBox";
import classes from "./RecordFurcationInformation.module.css";

const RecordFurcationInformation = ({
	quadrant,
	id,
	furcation,
	handleSetInformation,
	currentCommand,
}) => {
	console.log(currentCommand)
	const command =
		currentCommand && currentCommand.command
			? currentCommand.command
			: null;

	const isHighlighted =
		!!currentCommand
			? command == "FUR"
			: false;
	console.log(isHighlighted)
	return (
		<div className={classes.direction}>
			<FurcationDropdownBox
				quadrant={quadrant}
				id={id}
				mode={command}
				data={furcation}
				handleSetInformation={handleSetInformation}
				isHighlighted={
					isHighlighted
				}
			/>
		</div>
	);
};

export default RecordFurcationInformation;
