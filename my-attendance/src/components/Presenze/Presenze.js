import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, useOutlet } from 'react-router-dom';

import classes from './Presenze.module.css';
import {
	TimeFromDateString,
	dmyFromDateString,
	MonthStringFromDateString,
	roundHoursFromDate,
	TotalMinToHourMin,
} from '../../lib/functrions';

import { useHttpClient } from '../../hooks/http-hooks';
import LoadingSpinner from '../../utils/LoadingSpinner';
import ErrorModal from '../../utils/ErrorModal';
import Svg from '../../utils/Svg';
import FilterPanel from './Dipendenti/FilterPanel';

function Presenze() {
	const { isLoading, error, sendRequest, clearError } = useHttpClient();
	const [tagRecords, setTagRecords] = useState([]);
	const [employees, setEmployees] = useState([]);
	const [homePage, setHomePage] = useState(null);
	const [workingDate, setWorkingDate] = useState(null);
	const [reload, setReload] = useState(true);

	const getData = async () => {
		let e_data = await sendRequest('employee/getEmployeesList');
		setEmployees(e_data);
		getRecors();
	};

	const getRecors = async date => {
		const records = await sendRequest(
			'attendance/getRecors',
			'POST',
			{ date: date },
			{ 'Content-Type': 'application/json' }
		);
		setTagRecords(records);
	};

	useEffect(() => {
		// console.log({ workingDate });
		if (workingDate) {
			getRecors();
		}
	}, [workingDate]);

	let child = useOutlet();

	const getHomePage = async () => {
		const today = new Date();
		const w_day = workingDate === null ? today : workingDate;
		// console.log({ w_day });
		// let year = Number(w_day.getFullYear());
		// let month = Number(w_day.getMonth());
		// let startDate = new Date(Date.new(year, month, 1, 0, 0, 1));
		let startDate = w_day;
		startDate.setDate(1);

		let endDate = new Date();

		if (startDate.getMonth() < today.getMonth()) {
			let dummyEndDate = new Date(startDate);
			dummyEndDate.setDate(31);

			let day = dummyEndDate.getDate();
			// console.log({ day });
			endDate = new Date(dummyEndDate);
			endDate.setDate(31 - day);
			endDate.setMonth(startDate.getMonth());
		}

		// console.log({ startDate });
		// console.log({ endDate });

		const resData = [];
		let totals = [];
		let employeeAttendances = employees.map(e => {
			const dayRows = [];

			let isExit = false;
			for (
				let filterDate = startDate.getTime();
				filterDate <= endDate.getTime();
				filterDate += 24 * 60 * 60 * 1000
			) {
				let fDate = dmyFromDateString(new Date(filterDate));
				let dayRow = [];
				tagRecords.map(re => {
					let tDate = dmyFromDateString(re.date);
					if (tDate == fDate && e.tagId === re.tagId) {
						let rDate = dmyFromDateString(re.date);
						if (re.tagId == e.tagId && rDate == fDate) {
							re.isExit = isExit;
							dayRow.push(re);
							isExit = !isExit;
						}
						return false;
					}
				});
				let lastRecordDate;
				let workedMins = 0;
				let movements = dayRow.map(m => {
					let recordDate = new Date(m.date);
					if (
						dmyFromDateString(lastRecordDate).toString() !=
						dmyFromDateString(recordDate).toString()
					) {
						lastRecordDate = new Date(recordDate);
					}

					if (!m.isExit) {
						console.log(
							'Entrata: ' +
								TotalMinToHourMin(
									roundHoursFromDate(recordDate, false, m.isExit, e.roundsIN)
								)
						);
						workedMins -= roundHoursFromDate(
							recordDate,
							false,
							m.isExit,
							e.roundsIN
						);
					} else {
						console.log(
							'Uscita: ' +
								TotalMinToHourMin(
									roundHoursFromDate(recordDate, false, m.isExit, e.roundsIN)
								)
						);
						workedMins += roundHoursFromDate(
							recordDate,
							false,
							m.isExit,
							e.roundsOUT
						);
						// console.log(TotalMinToHourMin(workedMins));
					}

					return (
						<div className={classes.dailyTime_time}>
							{m.isExit ? 'U: ' : 'E: '} {TimeFromDateString(m.date)}
						</div>
					);
				});

				let rowExtra = workedMins - 8 * 60;

				dayRows.push(
					<div className={classes.dailyRow}>
						<div className={classes.dailyDate}>{fDate}</div>
						<div className={classes.dailyTime}>{movements}</div>
						<div
							className={`${classes.totRow} ${
								Number(workedMins) < 0 ? classes.totRowError : ''
							} ${Number(workedMins) == 0 ? classes.totRowHidden : ''}
							`}
						>
							{workedMins < 0 ? 'Errore' : TotalMinToHourMin(workedMins)}
						</div>
						<div
							className={`
							${classes.totRow}
							${Number(rowExtra) <= 0 ? classes.totRowHidden : ''}
							`}
						>
							{TotalMinToHourMin(rowExtra)}
						</div>
						<div
							className={classes.totRow}
							style={{
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'flex-end',
							}}
							onClick={() => console.log(dayRow)}
						>
							<Svg
								className={classes.totRow}
								text='add_circle'
								action={() => console.log('Aggio Clicketo')}
							/>
						</div>
					</div>
				);
				// console.log('Riga inserita, azzero conteggio: ' + workedMins);
				workedMins = 0;
			}

			dayRows.unshift(
				<div className={classes.dailyRowHeader}>
					<div className={classes.dailyDate}>
						{MonthStringFromDateString(startDate)}
					</div>

					<div className={classes.dailyTime}>Passaggi</div>

					<div className={classes.totRow}>Totale</div>
					<div className={classes.totRow}>Extra</div>
					<div className={classes.totRow}>Nuova</div>
				</div>
			);

			let card = (
				<div className={classes.employeeCard}>
					<div className={classes.employeeCardHeader}>
						{e.name} {e.surname}
					</div>
					<div className={classes.cardRows}>{dayRows}</div>
				</div>
			);
			return card;
		});

		// console.log(employeeAttendances);
		const visual = (
			<>
				<div className={classes.filters}>
					<FilterPanel action={setWorkingDate} />
				</div>
				<div className={classes.attendance}>{employeeAttendances}</div>
			</>
		);
		setHomePage(visual);
	};

	useEffect(() => {
		getData();
	}, []);

	useEffect(() => {
		getHomePage();
	}, [employees, tagRecords]);

	return (
		<React.Fragment>
			{error && <ErrorModal error={error} onClear={clearError} />}
			{isLoading && <LoadingSpinner asOverlay />}
			<div className={classes.container}>
				<NavLink to={'/Presenze'} className={classes.navigation}>
					<h1 className={classes.header}>Presenze</h1>
				</NavLink>
				{!child && homePage}
				<Outlet />
			</div>
		</React.Fragment>
	);
}

export default Presenze;
