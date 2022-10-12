import React from 'react';

import Modal from './Modal';
// import Button from './Button';

const ErrorModal = props => {
	return (
		<Modal
			onCancel={props.onClear}
			header='Error!'
			headerClass='header danger'
			show={props.error}
			footer={
				<button onClick={props.onClear} autofocus={true}>
					Okay
				</button>
			}
		>
			<p>{props.error}</p>
		</Modal>
	);
};

export default ErrorModal;
