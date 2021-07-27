import React, { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

const ThemeContextProvider = (props) => {
	const [appThemeLight, setAppThemeLight] = useState(() => {
		const darkMode = localStorage.getItem('dark_mode');
		if (darkMode === null) {
			return;
		} else {
			return JSON.parse(darkMode);
		}
	});

	const toggleTheme = () => {
		setAppThemeLight(!appThemeLight);
	};

	useEffect(() => {
		localStorage.setItem('dark_mode', JSON.stringify(appThemeLight));
	}, [appThemeLight]);

	return (
		<ThemeContext.Provider value={{ appThemeLight, toggleTheme }}>
			{props.children}
		</ThemeContext.Provider>
	);
};

export default ThemeContextProvider;
