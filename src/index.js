import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { store } from './app/store';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import GlobalStyle from './theme/globalStyles';
import ThemeContextProvider from './context/ThemeContext';
import UserProvider from './context/UserContext';

ReactDOM.render(
	<ThemeContextProvider>
		<UserProvider>
			<Provider store={store}>
				<GlobalStyle />
				<App />
			</Provider>
		</UserProvider>
	</ThemeContextProvider>,
	document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
