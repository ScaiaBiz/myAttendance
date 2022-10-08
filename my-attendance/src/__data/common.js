export const MenuElements = [
	{
		_id: 1000,
		description: 'Presenze',
		path: '/Presenze',
		element: 'Presenze',
	},
	{
		_id: 2000,
		description: 'Impostazioni',
		path: '/Impostazioni',
		element: 'Impostazioni',
		subMenu: [
			{
				_id: 2010,
				description: 'Dipendenti',
				path: 'Dipendenti',
				element: 'Dipendenti',
			},
			{ _id: 2020, description: 'Turni', path: 'Turni', element: 'Turni' },
			{ _id: 2030, description: 'Gruppi', path: 'Gruppi', element: 'Gruppi' },
			{
				_id: 2040,
				description: 'SupervisioneCalifragile',
				path: 'Supervisione',
				element: 'Supervisione',
			},
		],
	},
];
