import { Fragment, useState } from "react";
import useInput from "../../hooks/use-input";
import Validator from "../../utils/validator";
import React from "react";

// import {
//   validateMaxLength,
//   validateIllegalFileNameCharacters,
//   validateNoBlankValue
// } from "../../utils/validator";
import {
	DENTISTID_MAX_LENGTH,
	PATIENTID_MAX_LENGTH,
} from "../../utils/constants";

import classes from "./InputModal.module.css";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/esm/DropdownButton";

const InputModal = (props) => {
	const validateIllegalFileNameCharacters = new Validator(
		"validateIllegalFileNameCharacters"
	);
	const validateNoBlankValue = new Validator("validateNoBlankValue");
	const validateEmptyInput = new Validator("validateEmptyInput");
	const validateDentistIdMaxLength = new Validator("validateMaxLength", {
		maxLength: DENTISTID_MAX_LENGTH,
	});
	const validatePatientIdMaxLength = new Validator("validateMaxLength", {
		maxLength: PATIENTID_MAX_LENGTH,
	});

	// Dentist ID
	const {
		value: enteredDentistId,
		isValueValid: isDentistIdValid,
		hasError: hasDentistIdError,
		errorMessage: errorMessageDentistId,
		valueChangeHandler: dentistIdChangeHandler,
		inputBlurHandler: dentistIdBlurHandler,
		reset: resetDentistID,
	} = useInput(
		"Dentist ID",
		[
			validateIllegalFileNameCharacters,
			validateNoBlankValue,
			validateDentistIdMaxLength,
		],
		{
			maxLength: DENTISTID_MAX_LENGTH,
			defaultValue: props.dentistID,
		}
	);

	// Patient ID
	const {
		value: enteredPatientId,
		isValueValid: isPatientIdValid,
		hasError: hasPatientIdError,
		errorMessage: errorMessagePatientId,
		valueChangeHandler: patientIdChangeHandler,
		inputBlurHandler: patientIdBlurHandler,
		reset: resetPatientID,
	} = useInput(
		"Patient ID",
		[
			validateIllegalFileNameCharacters,
			validateNoBlankValue,
			validatePatientIdMaxLength,
		],
		{
			maxLength: PATIENTID_MAX_LENGTH,
		}
	);

	const {
		value: enteredPatientName,
		isValueValid: isPatientNameValid,
		hasError: hasPatientNameError,
		errorMessage: errorMessagePatientName,
		valueChangeHandler: patientNameChangeHandler,
		inputBlurHandler: patientNameBlurHandler,
		reset: resetPatientName,
	} = useInput(
		"Patient Name",
		[
			validateIllegalFileNameCharacters,
			validateEmptyInput,
			validatePatientIdMaxLength,
		],
		{
			maxLength: 200,
		}
	);

	const {
		value: enteredHN,
		isValueValid: isHNValid,
		hasError: hasHNError,
		errorMessage: errorMessageHN,
		valueChangeHandler: hnChangeHandler,
		inputBlurHandler: hnBlurHandler,
		reset: resetHN,
	} = useInput(
		"HN",
		[
			validateIllegalFileNameCharacters,
			validateEmptyInput,
			validateNoBlankValue,
			validatePatientIdMaxLength,
		],
		{
			maxLength: 10,
		}
	);

	const {
		value: enteredType,
		isValueValid: isTypeValid,
		hasError: hasTypeError,
		errorMessage: errorMessageType,
		valueChangeHandler: typeChangeHandler,
		inputBlurHandler: typeBlurHandler,
		reset: resetType,
	} = useInput("Type", [validateEmptyInput, validatePatientIdMaxLength], {
		maxLength: 20,
	});

  const [currentPatientID,setCurrentPatientID] = useState(null)
  const [currentPatientName,setCurrentPatientName] = useState(null)
  const [currentHN,setCurrentHN] = useState(null)
	const [currentType, setCurrentType] = useState(null);
  const [showErrorMessage, setShowErrorMessage] = useState(false)
	let isFormValid = false;
	if (isDentistIdValid && isPatientIdValid) {
		isFormValid = true;
	}



	const handleSelect = (target) => {
		console.log(target);
		props.setChartType(target);
		setCurrentType(target.charAt(0).toUpperCase() + target.slice(1));
	};

	const resetInput = () => {
		resetDentistID();
		resetPatientID();
	};

  const handleOnOK = () => {
    if(props.type == "home"){
      if(currentPatientID == null || currentPatientID == ""){
        setShowErrorMessage(true)
      }else{
        setShowErrorMessage(false)
        props.onOKClick()
      }
    }else{
      if(currentPatientName == null || currentHN == null || currentType == null){
        setShowErrorMessage(true)
      }else{
        setShowErrorMessage(false)
        props.onOKClick()
      }
    }
  }

	// buttons in input_modal actions
	const okButton = (
		<button
			onClick={handleOnOK}
			className={classes["ok_button"]}
			disabled={!isFormValid}
		>
			{props.okButtonText || "Continue"}
		</button>
	);
	const cancelButton = (
		<button
			onClick={() => {
				props.onCancelClick();
				resetInput();
			}}
			className={classes["cancel_button"]}
		>
			{props.cancelButtonText || "Cancel"}
		</button>
	);

	const home = (
		<Fragment>
			<div className={classes["backdrop"]}></div>
			<div
				className={`${classes["input_modal"]} ${
					classes[props.modalType]
				}`}
			>
				{/* modal's header */}
				<header className={classes["input_modal__header"]}>
					<p>{props.header}</p>
				</header>

				{/* modal's content */}
				{/* <div className={classes["modal__content"]}>{props.content}</div> */}
				{/* <div className={classes["input_modal__control"]}>
          <label htmlFor="Dentist-ID">Dentist ID</label>
          <input
            type="Dentist-ID"
            id="Dentist-ID"
            onChange={(e) => props.setDentistID(e.target.value)}
            value={props.dentistID}
          />
        </div>
        <div className={classes["input_modal__control"]}>
          <label htmlFor="Patient-ID">Patient ID</label>
          <input
            type="Patient-ID"
            id="Patient-ID"
            onChange={(e) => props.setPatientID(e.target.value)}
            value={props.patientID}
          />
        </div> */}

				{/* Dentist ID */}
				<div
					className={`${classes["input_modal__control"]} ${
						hasDentistIdError ? classes["invalid"] : ""
					}`}
				>
					<label htmlFor="dentistId">Dentist ID</label>
					<div>
						<input
							type="text"
							name="dentistId"
							maxLength={DENTISTID_MAX_LENGTH}
							value={enteredDentistId}
							onChange={(e) => {
                // setCurrentPatientID(e.target.value)
								props.setDentistID(e.target.value);
								dentistIdChangeHandler(e);
							}}
							onBlur={dentistIdBlurHandler}
						/>
						{hasDentistIdError && (
							<p className={"error"}>{errorMessageDentistId}</p>
						)}
					</div>
				</div>

				{/* Patient ID */}
				<div
					className={`${classes["input_modal__control"]} ${
						hasPatientIdError ? classes["invalid"] : ""
					}`}
				>
					<label htmlFor="patientId">Patient ID</label>
					<div>
						<input
							type="text"
							name="patientId"
							maxLength={PATIENTID_MAX_LENGTH}
							value={enteredPatientId}
							onChange={(e) => {
                setCurrentPatientID(e.target.value)
								props.setPatientID(e.target.value);
								patientIdChangeHandler(e);
							}}
							onBlur={patientIdBlurHandler}
						/>
						{hasPatientIdError && (
							<p className={"error"}>{errorMessagePatientId}</p>
						)}
					</div>
				</div>

        {showErrorMessage && (
          <div className={classes.error}>
            <span style={{ color: "red" }}>
              <b>Please complete all required information.</b>
            </span>
          </div>
        )}
				{/* input_modal's action bar */}
				<footer className={classes["input_modal__actions"]}>
					{cancelButton}
					{okButton}
				</footer>
			</div>
		</Fragment>
	);

	const graph = (
		<Fragment>
			<div className={classes["backdrop"]}></div>
			<div
				className={`${classes["input_modal"]} ${
					classes[props.modalType]
				}`}
			>
				{/* modal's header */}
				<header className={classes["input_modal__header"]}>
					<p>{props.header}</p>
				</header>

				{/* Patient Name */}
				<div
					className={`${classes["input_modal__control"]} ${
						hasPatientNameError ? classes["invalid"] : ""
					}`}
				>
					<label htmlFor="patientName">Patient Name</label>
					<div>
						<input
							type="text"
							name="patientName"
							maxLength={200}
							value={enteredPatientName}
							onChange={(e) => {
                setCurrentPatientName(e.target.value)
								props.setPatientName(e.target.value);
								patientNameChangeHandler(e);
							}}
							onBlur={patientNameBlurHandler}
						/>
						{hasPatientNameError && (
							<p className={"error"}>{errorMessagePatientName}</p>
						)}
					</div>
				</div>

				{/* HN */}
				<div
					className={`${classes["input_modal__control"]} ${
						hasHNError ? classes["invalid"] : ""
					}`}
				>
					<label htmlFor="hn">HN</label>
					<div>
						<input
							type="text"
							name="hn"
							maxLength={10}
							value={enteredHN}
							onChange={(e) => {
                setCurrentHN(e.target.value)
								props.setHN(e.target.value);
								hnChangeHandler(e);
							}}
							onBlur={hnBlurHandler}
						/>
						{hasHNError && (
							<p className={"error"}>{errorMessageHN}</p>
						)}
					</div>
				</div>
				<div className={classes["input_modal__control"]}>
					{/* <div
						className={`${classes["input_modal__control"]} ${
							hasTypeError ? classes["invalid"] : ""
						}`}
					> */}
						<label htmlFor="chartType">Chart Type</label>
						<DropdownButton
							className={classes.dropdown}
							title={
								currentType !== null
									? currentType
									: "Please select"
							}
							onSelect={handleSelect}
						>
							<Dropdown.Item eventKey="initial">
								Initial
							</Dropdown.Item>
							<Dropdown.Item eventKey="evaluation">
								Evaluation
							</Dropdown.Item>
							<Dropdown.Item eventKey="pre-surgical">
								Pre-surgical
							</Dropdown.Item>
							<Dropdown.Item eventKey="maintenance">
								Maintenance
							</Dropdown.Item>
						</DropdownButton>
					</div>
				{/* </div> */}

				{/* input_modal's action bar */}
        {/* <br/> */}
        {showErrorMessage && (
          <div className={classes.error}>
            <span style={{ color: "red" }}>
              <b>Please complete all required information.</b>
            </span>
          </div>
        )}
				<footer className={classes["input_modal__actions"]}>
					{cancelButton}
					{okButton}
				</footer>
			</div>
		</Fragment>
	);

	const renderObject = props.type === "home" ? home : graph;

	return renderObject;
};

export default InputModal;
