const HttpError = require('../O_models/m_error');

const Employee = require('../O_models/m_employee');

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
		next(new HttpError('Errore non identificato: ' + err, 404));
	}

	// const employee = new Employee();
};

exports.getEmplyeeData = async (req, res, next) => {}; //??? Serve davvero?

exports.editEmplyeeData = async (req, res, next) => {};
