const HttpError = require('../O_models/m_error');

const Attendance = require('../O_models/m_attentdance');

exports.postRecord = async (req, res, next) => {
	console.log('Ricevo record TAG');
	const tagId = req.params.tagId;
	const today = new Date();

	const record = await new Attendance({
		tagId: tagId,
		date: today,
	});

	record.save();

	res.status(201).json('ok');
};

exports.insertRecord = async (req, res, next) => {
	try {
		console.log('>>> Ricevo inserimento manuale');
		const tagId = req.body.tagId;
		const day = new Date(req.body.date);

		console.log(req.body);

		const record = await new Attendance({
			tagId: tagId,
			date: day,
		});

		record.save();
		res.status(201).json(record);
	} catch (error) {
		next(new HttpError(error, 404));
	}
};

exports.editRecord = async (req, res, next) => {
	try {
		console.log('>>> Ricevo modifica record');
		console.log(req.body);
		const recId = req.body.recordId;
		const day = new Date(req.body.date);
		const del = Boolean(req.body.delete);

		console.log(req.body);

		const record = await Attendance.findOne({
			_id: recId,
		});

		if (del) {
			console.log('<<< Cancello record');
			await record.delete();
		} else {
			console.log('<<< Modifico record');
			record.date = day;
			await record.save();
		}

		res.status(201).json(record);
	} catch (error) {
		next(new HttpError(error.message, 404));
	}
};

exports.getRecords = async (req, res, next) => {
	console.log('Ricevo richiesta records letture');
	console.log(req.body.data);

	let startFilter;
	let endFilter;
	let r_date = new Date();
	// let r_month
	// let r_year

	if (req.body.date) {
		r_date = new Date(req.body.date);
	}

	console.log(r_date);
	let r_month = new Date(r_date).getMonth();
	let r_year = new Date(r_date).getFullYear();

	startFilter = new Date(Date.UTC(r_year, r_month, 1, 00, 00, 01));

	let dummyEndFilter = new Date(Date.UTC(r_year, r_month, 31, 12, 00, 01));
	let r_day = Number(dummyEndFilter.getDate());

	console.log({ r_day });
	console.log({ dummyEndFilter });
	endFilter = new Date(
		Date.UTC(r_year, r_month, r_day === 31 ? 31 : 31 - r_day, 23, 59, 59)
	);

	console.log({ startFilter });
	console.log({ endFilter });

	const querys = {
		date: {
			$gte: startFilter,
			$lte: endFilter,
		},
	};
	try {
		const data = await Attendance.find(querys).sort({ date: 1 });
		res.status(201).json(data);
	} catch (error) {
		// console.log(error);
		next(new HttpError('Non sono stato in grado trovare le informazioni', 404));
	}
};
