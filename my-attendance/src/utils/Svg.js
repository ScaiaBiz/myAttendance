import React from 'react';

import './Svg.css';

function Svg({ type, action, text }) {
	switch (type) {
		case '+':
			return (
				<span className='material-icons' onClick={action}>
					add_circle
				</span>
			);

		default:
			return (
				<span className='material-icons' onClick={action}>
					{text}
				</span>
			);
			break;
	}

	return <>Errore</>;
}

export default Svg;
