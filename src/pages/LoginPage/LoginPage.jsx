import React, { useContext } from 'react';
import styled from 'styled-components';
import chatBud from '../../assets/img/chatbud-logo.png';
import Loader from '../../components/Loader/Loader';
import { UserContext } from '../../context/UserContext';

const LoginWrapper = styled.div`
	width: 100%;
	height: 100vh;
	display: grid;
	place-items: center;
	background-color: ${({ theme }) => theme.bg_color};
	padding: 20px;
`;

const LogIn = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	width: 80%;
	max-width: 400px;
	height: fit-content;
	min-height: 300px;
	padding: 20px;
	background-color: ${({ theme }) => theme.lists_bg};
	box-shadow: 0 3px 6px rgba(0, 0, 0, ${({ theme }) => theme.box_shadow}),
		0 3px 6px rgba(0, 0, 0, ${({ theme }) => theme.box_shadow});

	& img {
		width: 80%;
		height: 80%;
		object-fit: contain;
	}
`;

export const LoginButton = styled.button`
	width: 100%;
	height: 50px;
	margin-top: 30px;
	color: white;
	background: linear-gradient(
		135deg,
		${({ theme }) =>
			`${theme.user_chat_bg_top_left},${theme.user_chat_bg_bottom_right} `}
	);
	text-transform: uppercase;
	font-weight: bold;
	border-radius: 5px;

	&:hover {
		color: ${({ theme }) => theme.primary_font};
		background: transparent;
		border: 2px solid purple;
	}
`;

const LoginPage = () => {
	const { signInWithGoogle, loadingUser } = useContext(UserContext);
	return (
		<LoginWrapper>
			<LogIn>
				<img src={chatBud} alt="Chatbud" />

				{loadingUser ? (
					<Loader />
				) : (
					<LoginButton onClick={signInWithGoogle}>
						Sign in with google
					</LoginButton>
				)}
			</LogIn>
		</LoginWrapper>
	);
};

export default LoginPage;
