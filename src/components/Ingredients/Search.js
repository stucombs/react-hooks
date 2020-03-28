import React, {useState, useEffect, useRef} from 'react';
import axios from 'axios';

import Card from '../UI/Card';
import useHttp from '../../hooks/http';
import ErrorModal from '../UI/ErrorModal';
import css from './Search.css';

const Search = React.memo(props => {
	const {onLoadIngredients} = props;
	const [searchString, setSearchString] = useState('');
	const inputRef = useRef();
	const {isLoading, data, error, sendRequest, clear} = useHttp();

	useEffect(() => {
		const timer = setTimeout(() => {
			if(searchString === inputRef.current.value){
				const query = searchString.length === 0 ? '' : `?orderBy="title"&equalTo="${searchString}"`;
				sendRequest('get', 'https://react-hooks-faf8b.firebaseio.com/ingredients.json' + query);	
			}
		}, 500);
		return () => {
			clearTimeout(timer);
		};
	}, [searchString, inputRef, sendRequest]);

	useEffect(() => {
		if(!isLoading && !error && data){
			const loadedIngredients = [];
			for(const key in data.data){
				loadedIngredients.push({
					id: key,
					title: data.data[key].title,
					amount: data.data[key].amount
				});
			}
			onLoadIngredients(loadedIngredients);
		}
	}, [data, isLoading, error, onLoadIngredients]);

	return (
		<section className={css.search}>
			{error ? <ErrorModal onClose={clear}>{error}</ErrorModal> : null}
			<Card>
				<div className={css["search-input"]}>
					<label>Filter by Title</label>
					{isLoading ? <span>Loading...</span> : null}
					<input type="text" value={searchString} onChange={event => setSearchString(event.target.value)} ref={inputRef} />
				</div>
			</Card>
		</section>
	);
});

export default Search;