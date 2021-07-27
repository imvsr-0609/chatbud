import React, { useContext } from 'react';
import { ThemeProvider } from 'styled-components';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from 'react-router-dom';
import ChatRoom from './pages/ChatroomPage/ChatRoom';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import LoginPage from './pages/LoginPage/LoginPage';
import theme from './theme/theme';
import { ThemeContext } from './context/ThemeContext';
import { UserContext } from './context/UserContext';

function App() {
	const { appThemeLight } = useContext(ThemeContext);
	const { user } = useContext(UserContext);

	return (
		<Router>
			<ThemeProvider theme={appThemeLight ? theme.lightTheme : theme.darkTheme}>
				<Switch>
					<Route exact path="/">
						{user?.email ? <ChatRoom user={user} /> : <Redirect to="/login" />}
					</Route>
					<Route exact path="/login">
						{!user?.email ? <LoginPage /> : <Redirect to="/" />}
					</Route>
					<Route exact path="*">
						<ErrorPage />
					</Route>
				</Switch>
			</ThemeProvider>
		</Router>
	);
}

export default App;
