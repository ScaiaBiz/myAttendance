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

exports.getRecors = async (req, res, next) => {
	console.log('Ricevo richiesta records letture');

	const startFilter = new Date(0);
	// const startFilter = new Date(
	// 	req.body?.startDate !== '' ? req.body.startDate : new Date(0)
	//     );

	const endFilter = new Date();
	// const endFilter =
	// 	req.body?.endDate !== ''
	// 		? new Date(req.body.endDate + ' 23:59:59')
	// 		: new Date();

	console.log({ startFilter });
	console.log({ endFilter });

	// contactId: customerId,
	const querys = {
		date: {
			$gte: startFilter,
			$lte: endFilter,
		},
	};
	try {
		const data = await Attendance.find(querys);
		res.status(201).json(data);
	} catch (error) {
		// console.log(error);
		next(new HttpError('Non sono stato in grado trovare le informazioni', 404));
	}
};
