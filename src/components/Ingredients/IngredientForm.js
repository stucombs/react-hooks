import React, {useState} from 'react';

import Card from '../UI/Card';
import css from './IngredientForm.css';
import LoadingIndicator from '../UI/LoadingIndicator';

const IngredientForm = React.memo(props => {
	const [inputTitle, setInputTitle] = useState('');
	const [inputAmount, setInputAmount] = useState('');

	const submitHandler = event => {
		event.preventDefault();
		props.onAddIngredient({title: inputTitle, amount: inputAmount});
	}

	return (
		<section className={css["ingredient-form"]}>
			<Card>
				<form onSubmit={submitHandler}>
					<div className={css["form-control"]}>
						<label htmlFor="title">Name</label>
						<input type="text" id="title" value={inputTitle} onChange={event => setInputTitle(event.target.value)}/>
					</div>
					<div className={css["form-control"]}>
						<label htmlFor="amount">Amount</label>
						<input type="number" id="amount" value={inputAmount} onChange={event => setInputAmount(event.target.value)}/>
					</div>
					<div className={css["ingredient-form__actions"]}>
						<button type="submit">Add Ingredient</button>
						{props.loading ? <LoadingIndicator /> : null}
					</div>
				</form>
			</Card>
		</section>
	);
});

export default IngredientForm;