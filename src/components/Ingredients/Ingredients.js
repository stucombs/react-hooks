import React, {useReducer, useEffect, useCallback, useMemo} from 'react';
import axios from 'axios';

import IngredientForm from './IngredientForm';
import Search from './Search';
import IngredientList from './IngredientList';
import ErrorModal from '../UI/ErrorModal';
import useHttp from '../../hooks/http';

const ingredientReducer = (currentIngredients, action) => {
	switch(action.type){
		case "SET":
			return action.ingredients;
		break;
		case "ADD":
			return [...currentIngredients, action.ingredient];
		break;
		case "DELETE":
			return currentIngredients.filter(ig => ig.id !== action.id);
		break;
		default: throw new Error('Should not get here!');
	}
}

function Ingredients(){
	const [userIngredients, dispatch] = useReducer(ingredientReducer, []);
	const {isLoading, error, data, sendRequest, extra, identifier, clear} = useHttp();

	useEffect(() => {
		if(!isLoading && !error && identifier === "REMOVE_INGREDIENT"){
			dispatch({type: "DELETE", id: extra});
		}else if(!isLoading && !error && identifier === "ADD_INGREDIENT"){
			dispatch({type: "ADD", ingredient: {id: data.data.name, ...extra}})
		}
	}, [data, extra, identifier]);

	const searchIngredientsHandler = useCallback(searchIngredients => {
		dispatch({type: 'SET', ingredients: searchIngredients});
	},[]);


	const addIngredientHandler = useCallback(ingredient => {
		sendRequest('post', `https://react-hooks-faf8b.firebaseio.com/ingredients.json`, JSON.stringify(ingredient), ingredient, "ADD_INGREDIENT");
	}, [sendRequest]);

	const removeIngredientHandler = useCallback(id => {
		sendRequest('delete', `https://react-hooks-faf8b.firebaseio.com/ingredients/${id}.json`, null, id, "REMOVE_INGREDIENT");
	}, [sendRequest]);

	const ingredientList = useMemo(() => {
		return <IngredientList ingredients={userIngredients} onRemoveItem={removeIngredientHandler}/>;
	}, [userIngredients, removeIngredientHandler]);

	return(
		<div className="App">
			{error ? <ErrorModal onClose={clear}>{error}</ErrorModal> : null}
			<IngredientForm onAddIngredient={addIngredientHandler} loading={isLoading} />

			<section>
				<Search onLoadIngredients={searchIngredientsHandler}/>
				{ingredientList}
			</section>
		</div>
	);
}

export default Ingredients;