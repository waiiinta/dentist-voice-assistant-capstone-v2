import FurcationDropdownBox from "./type/DropdownFurcationBox";
import classes from "./RecordFurcationInformation.module.css"

const RecordFurcationInformation = ({
	quadrant,
	id,
	furcation,
	handleSetInformation,
	currentCommand,
}) => {
	const command =
		currentCommand && currentCommand.command
			? currentCommand.command
			: null;

  const positionToBeHighlighted =
      !!currentCommand && !!currentCommand.position
        ? currentCommand.position
        : null;

	return (
		<div className={classes.direction}>
			<FurcationDropdownBox
        quadrant={quadrant}
        id={id}
        mode={"FUR"}
        data={furcation}
        handleSetInformation={handleSetInformation}
        positionToBeHighlighted={
          command == "FUR"? positionToBeHighlighted : null
        }
      />
		</div>
	);
};

export default RecordFurcationInformation
