import React from 'react';
import styled from 'styled-components';
import defaultLogo from '../../assets/img/default.png';

const DefaultChatWrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 100%;
	place-items: center;
	padding: 20px;
	color: ${({ theme }) => theme.primary_font};

	& img {
		width: 50%;
		height: 50%;
		object-fit: contain;
	}
	& h4 {
		margin-top: 30px;
	}
`;

const DefaultChat = () => {
	return (
		<DefaultChatWrapper>
			<img src={defaultLogo} alt="chat bud" />
			<h4>Hop into the group and start chatting !!</h4>
		</DefaultChatWrapper>
	);
};

export default DefaultChat;
