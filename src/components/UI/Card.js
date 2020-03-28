import React from 'react';

import css from './Card.css';

const Card = props => {
	return <div className={css.card}>{props.children}</div>
}

export default Card;