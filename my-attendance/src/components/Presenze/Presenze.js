import React, { useState, useEffect } from 'react';
import { Outlet, useOutlet } from 'react-router-dom';

import classes from './Presenze.module.css';

import { useHttpClient } from '../../hooks/http-hooks';
import LoadingSpinner from '../../utils/LoadingSpinner';
import ErrorModal from '../../utils/ErrorModal';

function Presenze() {
	const { isLoading, error, sendRequest, clearError } = useHttpClient();
	const [tagRecords, setTagRecords] = useState(async () => {
		await sendRequest('attendance/getRecors');
	});
	const [hasChild, setHasChild] = useState(null);
	const [reload, setReload] = useState(true);

	const getTagRecorsd = async () => {
		const records = await sendRequest('attendance/getRecors');
		setTagRecords(records);
	};

	let child = useOutlet();

	const getHomePage = () => {
		return (
			<>
				<div className={classes.filters}>Area filtri</div>
				<div>Area tabelle</div>
			</>
		);
	};

	return (
		<React.Fragment>
			{error && <ErrorModal error={error} onClear={clearError} />}
			{isLoading && <LoadingSpinner asOverlay />}
			<div className={classes.container}>
				<h1 className={classes.header}>Presenze</h1>
				{!child && getHomePage()}
				<Outlet />
			</div>
		</React.Fragment>
	);
}

export default Presenze;
