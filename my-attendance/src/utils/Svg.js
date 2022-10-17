import React from 'react';

import './Svg.css';

function Svg({ type, action, text }) {
	if (text) {
		return (
			<span className='material-icons' onClick={action}>
				{text}
			</span>
		);
	}

	return <>Errore</>;
}

export default Svg;
