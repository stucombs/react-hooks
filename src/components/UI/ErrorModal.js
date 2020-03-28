import React from 'react';

import css from './ErrorModal.css';

const ErrorModal = React.memo(props => {
	return (
		<React.Fragment>
			<div className={css.backdrop} onClick={props.onClose} />
			<div className={css["error-modal"]}>
				<h2>An Error Occured</h2>
				<p>{props.children}</p>
				<div className={css["error-modal__actions"]}>
					<button type="button" onClick={props.onClose}>Okay</button>
				</div>
			</div>
		</React.Fragment>
	);
})

export default ErrorModal;