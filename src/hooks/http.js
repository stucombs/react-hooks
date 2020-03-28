import {useReducer, useCallback} from 'react';
import axios from 'axios';

const initialState = {
	loading: false,
	error: null,
	data: null,
	extra: null,
	identifier: null
};

const httpReducer = (httpState, action) => {
	switch(action.type){
		case "SEND_REQUEST":
			return {loading: true, error: null, data: null, extra: null, identifier: action.identifier}
		break;
		case "RESPONSE":
			return {...httpState, loading: false, data: action.response, extra: action.extra}
		break;
		case "ERROR":
			return {loading: false, error: action.error}
		break;
		case "CLEAR": return initialState; break;
		default: throw new Error("An Error Occurred");
	}
}

const useHttp = () => {
	//WILL rerun with every rerender cycle
	const [httpState, dispatchHttp] = useReducer(httpReducer, initialState);

	const clear = useCallback(() => dispatchHttp({type: "CLEAR"}), []);

	const sendRequest = useCallback((method, url, body, extra, identifier) => {
		dispatchHttp({type: "SEND_REQUEST", identifier: identifier});
		axios({method: method, url: url, data: body})
		.then(response => {
			dispatchHttp({type: "RESPONSE", response: response, extra: extra});
		})
		.catch(err => {
			dispatchHttp({type: "ERROR", error: "An error occurred communicating with the server"});
		})		
	}, []);

	return {
		isLoading: httpState.loading,
		data: httpState.data,
		error: httpState.error,
		sendRequest: sendRequest,
		extra: httpState.extra,
		identifier: httpState.identifier,
		clear: clear
	};

};

export default useHttp;