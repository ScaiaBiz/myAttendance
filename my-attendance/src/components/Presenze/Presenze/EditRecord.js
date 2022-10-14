import React from 'react';

import classes from './EditRecord.module.css';

import LoadingSpinner from '../../../utils/LoadingSpinner';
import ErrorModal from '../../../utils/ErrorModal';
import Button from '../../../utils/Button/Button';
import Input from '../../../utils/Inputs/Input';

import { useForm } from '../../../hooks/form-hook';
import {
	VALIDATOR_MIN,
	VALIDATOR_MAX,
	VALIDATOR_NO,
} from '../../../utils/validators';
import { useHttpClient } from '../../../hooks/http-hooks';

function EditRecord({ clear, wData }) {
	const { isLoading, error, sendRequest, clearError } = useHttpClient();

	const checkedHandler = () => {
		let _val = document.getElementById('delete').checked;
		inputHandler('delete', _val, true);
	};

	const [formState, inputHandler, setFormData] = useForm({
		hours: {
			value: '',
			isValid: true,
			el: 'input',
			type: 'number',
			label: 'Ore',
			validator: [VALIDATOR_MIN(0), VALIDATOR_MAX(24)],
			initValue: wData.time.split(':')[0],
			initIsValid: true,
			errorText: 'Valore deve essere fra 0 e 24',
		},
		minutes: {
			value: '',
			isValid: true,
			el: 'input',
			type: 'number',
			label: 'Minuti',
			validator: [VALIDATOR_MIN(0), VALIDATOR_MAX(59)],
			initValue: wData.time.split(':')[1],
			initIsValid: true,
			errorText: 'Valore deve essere fra 0 e 59',
		},
		delete: {
			value: false,
			isValid: true,
			el: 'checkbox',
			type: 'checkbox',
			label: 'Elimina timbratura',
			validator: [VALIDATOR_NO()],
			initValue: false,
			initIsValid: true,
			click: checkedHandler,
		},
	});

	const postData = async e => {
		e.preventDefault();
		let year = wData.date.split('/')[2];
		let month = wData.date.split('/')[1];
		let day = wData.date.split('/')[0];

		let h = formState.inputs.hours.value;
		let m = formState.inputs.minutes.value;
		let toDelete = formState.inputs.delete.value;

		const postingDate = new Date(
			`${year}-${month}-${day} ${formState.inputs.hours.value}:${formState.inputs.minutes.value}:01`
		);
		console.log('PoPPosto: ' + postingDate);

		const records = await sendRequest(
			'attendance/editRecors',
			'POST',
			{ date: postingDate, recordId: wData.record._id, delete: toDelete },
			{
				'Content-Type': 'application/json',
			}
		);

		clear(true);
	};

	const closeCard = e => {
		e.preventDefault();
		clear();
	};

	const setInputs = () => {
		let inputs = formState.inputs;
		let keys = Object.keys(formState.inputs);

		const inputsVisual = keys.map(k => {
			let i = inputs[k];
			return (
				<Input
					key={k}
					id={k}
					element={i.el}
					type={i.type}
					label={i.label}
					validators={i.validator}
					errorText={i.errorText || 'Campo obbligatorio'}
					onInput={inputHandler}
					initValue={i.initValue}
					initIsValid={i.initIsValid}
					onClick={i.click}
				/>
			);
		});
		return inputsVisual;
	};

	return (
		<React.Fragment>
			{isLoading && <LoadingSpinner asOverlay />}
			{error && <ErrorModal error={error} onClear={clearError} />}
			<div className={classes.background} onClick={clear} />
			<div className={classes.container}>
				<div className={classes.title}>
					<p style={{ paddingBottom: '10px' }}>
						{wData.employee.name} {wData.employee.surname}
					</p>
					<p>{wData.date}</p>
				</div>
				<div className={classes.form}>
					<section className={classes.form__inputs}>{setInputs()}</section>
					<Button
						clname='danger'
						onClick={closeCard}
						style={{ width: 25 + '%', fontSize: 20 + 'px' }}
					>
						Annulla
					</Button>
					<Button
						clname='confirm'
						style={{ width: 40 + '%', fontSize: 20 + 'px' }}
						disabled={!formState.isValid}
						onClick={postData}
					>
						Modifica
					</Button>
				</div>
			</div>
		</React.Fragment>
	);
}

export default EditRecord;
