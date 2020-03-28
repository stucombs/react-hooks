import React from 'react';

import css from './LoadingIndicator.css';

const LoadingIndicator = () => (
	<div className={css["lds-ring"]}>
		<div />
		<div />
		<div />
		<div />
	</div>
);

export default LoadingIndicator;