import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import css from './index.css';
import AuthContextProvider from './context/auth-context';

const app = (
	<AuthContextProvider>
		<App />
	</AuthContextProvider>
);

ReactDOM.render(app, document.getElementById("root"));