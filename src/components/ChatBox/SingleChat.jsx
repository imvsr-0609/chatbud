import React from 'react';
import styled from 'styled-components';
import Avatar from '@material-ui/core/Avatar';

const ChatWrapper = styled.div`
	width: 100%;
	padding: 20px;
	display: flex;
	flex-direction: ${({ type }) => (type === 'send' ? `row-reverse` : 'row')};
	height: fit-content;
`;

const ChatDiv = styled.div`
	display: flex;
	flex-direction: column;
	& p {
		align-self: ${({ type }) => (type === 'send' ? `flex-end` : 'flex-start')};
		color: ${({ theme }) => theme.secondary_font};

		margin: 10px;
		font-weight: bold;
		font-size: small;
	}
`;

const Chat = styled.h5`
	padding: 15px 20px;
	background-color: palevioletred;
	background: linear-gradient(
		135deg,
		${({ theme, type }) =>
			type === 'send'
				? theme.user_chat_bg_top_left
				: theme.friend_chat_bg_top_left},
		${({ theme, type }) =>
			type === 'send'
				? theme.user_chat_bg_bottom_right
				: theme.friend_chat_bg_bottom_right}
	);
	color: ${({ theme }) => theme.chat_font};
	width: fit-content;
	font-size: small;
	font-weight: bold;
	line-height: 1.5;
	align-self: ${({ type }) => (type === 'send' ? `flex-end` : 'flex-start')};
	max-width: 500px;
	margin: 0 10px;
	border-radius: 20px;
	border-top-left-radius: ${({ type }) => (type === 'recieve' ? `0` : `20px`)};
	border-top-right-radius: ${({ type }) => (type === 'send' ? `0` : `20px`)};
`;

const SingleChat = ({ type, msg }) => {
	const { message, timestamp, user, userImage } = msg;

	const time = new Date(timestamp?.seconds * 1000 + 19800000);
	return (
		<ChatWrapper type={type}>
			<Avatar alt={user} src={userImage} />
			<ChatDiv type={type}>
				<Chat type={type}>{message}</Chat>
				<p>{time.toUTCString().substr(5, 21)}</p>
			</ChatDiv>
		</ChatWrapper>
	);
};

export default SingleChat;
