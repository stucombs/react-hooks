import React, {useContext} from 'react';

import Card from './UI/Card';
import {AuthContext} from '../context/auth-context';
import css from './Auth.css';

const Auth = props => {
	const authContext = useContext(AuthContext);
	const loginHandler = () => {
		authContext.login();
	};

	return (
		<div className={css.auth}>
			<Card>
				<h2>You are not authenticated!</h2>
				<p>Please login to continue</p>
				<button onClick={loginHandler}>Log In</button>
			</Card>
		</div>
	);
}

export default Auth;