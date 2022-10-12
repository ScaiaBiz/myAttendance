import React, { useState, useEffect } from 'react';
import ReactDom from 'react-dom';

import classes from './Dipendenti.module.css';

import { useHttpClient } from '../../hooks/http-hooks';

import NewDipendente from './Dipendenti/NewDipendente';

function Dipendenti() {
	// useHTTPclient

	const [showAddEmployee, setShowAddEmployee] = useState(false);
	const handleAddEmployee = () => {
		setShowAddEmployee(!showAddEmployee);
	};

	let employees = [
		{
			_id: 0,
			name: 'Paolo',
			surname: 'Rossi',
			tagId: '000',
			hiringDate: '2022-01-01',
			isActive: true,
			roundsIN: 15,
			roundsOUT: 15,
			enableExtras: true,
			turnId: 0,
			groupId: 0,
		},
		{
			_id: 1,
			name: 'Fabio',
			surname: 'Grosso',
			tagId: '001',
			hiringDate: '2022-01-01',
			isActive: true,
			roundsIN: 15,
			roundsOUT: 15,
			enableExtras: true,
			turnId: 0,
			groupId: 0,
		},
		{
			_id: 2,
			name: 'Andrea',
			surname: 'Pirlo',
			tagId: '002',
			hiringDate: '2022-01-01',
			isActive: true,
			roundsIN: 15,
			roundsOUT: 15,
			enableExtras: true,
			turnId: 0,
			groupId: 0,
		},
	];

	const addNewEmployee = () => {
		const newEmployeeForm = <NewDipendente clear={handleAddEmployee} />;
		return ReactDom.createPortal(
			newEmployeeForm,
			document.getElementById('modal-hook')
		);
	};

	const createEmployeesVisula = () => {
		const visual = employees.map(e => {
			return (
				<div key={e._id} className={`${classes.empCard} ${e.isActive}`}>
					<h2>
						{e.name} {e.surname}
					</h2>
					<p>tagId: {e.tagId}</p>
					<p>Arrotondamento ENTRATA: {e.roundsIN}</p>
					<p>Arrotondamento USCITA: {e.roundsOUT}</p>
					<p>Straordinari: {e.enableExtras ? 'Abilitati' : 'No'}</p>
				</div>
			);
		});
		return visual;
	};

	return (
		<React.Fragment>
			{showAddEmployee && addNewEmployee()}
			<div className={classes.container}>
				<h1
					className={classes.addEmployee}
					onClick={() => {
						handleAddEmployee();
					}}
				>
					Aggiungi Nuovo
				</h1>
				<section className={classes.empCardsList}>
					{createEmployeesVisula()}
				</section>
			</div>
		</React.Fragment>
	);
}

export default Dipendenti;
