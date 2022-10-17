const HttpError = require('../O_models/m_error');

const Employee = require('../O_models/m_employee');
const Attendance = require('../O_models/m_attentdance');
const e = require('express');

exports.getEmplyeesList = async (req, res, next) => {
	console.log('>>> Ricevo richiesta elenco dipendneti');
	try {
		const data = await Employee.find();
		res.status(201).json(data);
	} catch (error) {
		next(new HttpError('Errore non identificato: ' + error));
	}
};

exports.postNewEmployee = async (req, res, next) => {
	console.log('>>> Ricevo dati nuovo dipendente');
	const rdata = req.body;

	try {
		const alreadyExist = await Employee.findOne({
			name: rdata.name,
			surname: rdata.surname,
		});

		if (!alreadyExist) {
			const employee = new Employee({
				name: rdata.name,
				surname: rdata.surname,
				isActive: rdata.isActive,
				hiringDate: new Date(rdata.hiringDate),
				tagId: rdata.tagId,
				roundsIN: Number(rdata.roundsIN),
				roundsOUT: Number(rdata.roundsOUT),
				enableExtras: Boolean(rdata.enableExtras),
				turnId: rdata.turnId.toString(),
				groupId: rdata.groupId.toString(),
				creationDate: new Date(),
			});
			let data = await employee.save();
			res.status(201).json(data);
		} else {
			next(
				new HttpError(
					'Esiste già un dipendente con qeusto nome e cognome' + alreadyExist,
					404
				)
			);
		}
	} catch (err) {
		next(new HttpError('Errore non identificato: ' + err.message, 404));
	}
};

exports.editEmplyeeData = async (req, res, next) => {
	console.log('>>> Ricevo dati per modifica dipendente');
	const rdata = req.body;
	console.log(rdata);
	try {
		const emploiyee = await Employee.findOne({
			_id: rdata._id,
		});

		if (!emploiyee) {
			next(new HttpError('Dipendente non trovato!', 404));
		}

		if (emploiyee.tagId !== rdata.tagId) {
			console.log('Il tag è cambiato, registro la modifica');
			emploiyee.oldsTag.push({ tagId: emploiyee.tagId, editDate: new Date() });
			emploiyee.tagId = rdata.tagId;
		}

		emploiyee.name = rdata.name;
		emploiyee.surname = rdata.surname;
		emploiyee.hiringDate = rdata.hiringDate;
		emploiyee.roundsIN = rdata.roundsIN;
		emploiyee.roundsOUT = rdata.roundsOUT;
		emploiyee.enableExtras = rdata.enableExtras || emploiyee.enableExtras;
		emploiyee.isActive = rdata.isActive || emploiyee.isActive;

		let data = await emploiyee.save();

		res.status(201).json(data);
	} catch (err) {
		next(new HttpError('Errore non identificato: ' + err.message, 404));
	}
};

exports.deleteEmplyeeData = async (req, res, next) => {
	const tagId = req.body.tagId;
	const id = req.body.id;
	try {
		const canDelete = await Attendance.findOne({ tagId: tagId });
		const employee = await Employee.findOne({ _id: id });

		if (canDelete || tagId != employee.tagId) {
			next(
				new HttpError(
					'Esistono timbrature collegate a questo dipendete, è preferibile modificarlo come NON ATTIVO',
					404
				)
			);
		}

		if (!employee) {
			next(
				new HttpError(
					'Dipendente non trovato! - Probabilmente è già stato eliminato',
					404
				)
			);
		}
		data = await employee.delete();
		res.status(201).json(data);
	} catch (error) {
		next(new HttpError('Errore non identificato: ' + error.message, 404));
	}
};

exports.getEmplyeeData = async (req, res, next) => {}; //??? Serve davvero?
