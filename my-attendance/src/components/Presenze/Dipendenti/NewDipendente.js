import React from 'react';

import classes from './NewDipendenete.module.css';

import { useForm } from '../../../hooks/form-hook';
import { VALIDATOR_NO, VALIDATOR_REQUIRE } from '../../../utils/validators';

import Input from '../../../utils/Inputs/Input';

const NewDipendente = ({ clear }) => {
	const [formState, inputHandler, setFormData] = useForm({
		name: {
			value: '',
			isValid: false,
			el: 'input',
			type: 'text',
			label: 'Nome',
			validator: [VALIDATOR_REQUIRE()],
			initValue: '',
			initIsValid: false,
		},
		surname: {
			value: '',
			isValid: false,
			el: 'input',
			type: 'text',
			label: 'Cognome',
			validator: [VALIDATOR_REQUIRE()],
			initValue: '',
			initIsValid: false,
		},

		hiringDate: {
			value: '',
			isValid: false,
			el: 'date',
			type: 'date',
			label: 'Data assunzione',
			validator: [VALIDATOR_NO()],
			initValue: '',
			initIsValid: false,
		},
		tagId: {
			value: '',
			isValid: false,
			el: 'input',
			type: 'number',
			label: 'Nr. Tag',
			validator: [VALIDATOR_REQUIRE()],
			initValue: '',
			initIsValid: false,
		},
		roundsIN: {
			value: '',
			isValid: false,
			el: 'input',
			type: 'number',
			label: 'Arrot. Entrata',
			validator: [VALIDATOR_REQUIRE()],
			initValue: 15,
			initIsValid: false,
		},
		roundsOUT: {
			value: '',
			isValid: false,
			el: 'input',
			type: 'number',
			label: 'Arrot. USCITA',
			validator: [VALIDATOR_REQUIRE()],
			initValue: 15,
			initIsValid: false,
		},

		turnId: {
			value: '',
			isValid: false,
			el: 'input',
			type: 'text',
			label: 'Turno',
			validator: [VALIDATOR_REQUIRE()],
			initValue: '',
			initIsValid: false,
		},
		groupId: {
			value: '',
			isValid: false,
			el: 'input',
			type: 'text',
			label: 'Gruppo',
			validator: [VALIDATOR_REQUIRE()],
			initValue: '',
			initIsValid: false,
		},
		enableExtras: {
			value: '',
			isValid: false,
			el: 'checkbox',
			type: 'checkbox',
			label: 'Straordinari',
			validator: [VALIDATOR_REQUIRE()],
			initValue: '',
			initIsValid: false,
		},
		isActive: {
			value: '',
			isValid: false,
			el: 'checkbox',
			type: 'checkbox',
			label: 'Attivo',
			validator: [VALIDATOR_NO()],
			initValue: 'checked',
			initIsValid: false,
		},
	});

	const setInputs = () => {
		let inputs = formState.inputs;
		let keys = Object.keys(formState.inputs);
		// console.log(formState.inputs);

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
					errorText='Campo obbligatorio'
					onInput={inputHandler}
					initValue=''
					initIsValid={false}
				/>
			);
		});
		return inputsVisual;
	};

	return (
		<React.Fragment>
			<div className={classes.container} onClick={clear} />
			<div className={classes.content}>
				<div className={classes.form}>{setInputs()}</div>
			</div>
		</React.Fragment>
	);
};
export default NewDipendente;
