import React, { useState, useEffect, createContext } from 'react';
import { auth, provider } from '../firebase';

export const UserContext = createContext();

function UserProvider(props) {
	const getUser = () => {
		const data = localStorage.getItem('user');
		if (data) {
			return JSON.parse(data);
		} else {
			return null;
		}
	};

	const [user, setUser] = useState(getUser);
	const [loadingUser, setLoadingUser] = useState(true);

	const signInWithGoogle = () => {
		auth.signInWithPopup(provider).catch((error) => {
			alert(error.message);
		});
	};
	const logout = () => {
		auth
			.signOut()
			.then(() => {
				setUser(null);
				localStorage.clear();
			})
			.catch((error) => {
				alert(error.message);
			});
	};

	useEffect(() => {
		auth.onAuthStateChanged(async (user) => {
			await setUser({
				displayName: user?.displayName,
				email: user?.email,
				id: user?.uid,
				picture: user?.photoURL,
			});
			localStorage.setItem('user', JSON.stringify(user));
			setLoadingUser(false);
		});
	}, []);

	return (
		<UserContext.Provider
			value={{ user, signInWithGoogle, logout, loadingUser }}
		>
			{props.children}
		</UserContext.Provider>
	);
}

export default UserProvider;
