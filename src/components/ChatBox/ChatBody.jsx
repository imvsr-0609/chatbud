import React from 'react';
import styled from 'styled-components';
import SingleChat from './SingleChat';

const ChatBodyWrapper = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;
	overflow-y: scroll;
	padding-bottom: 50px;
	z-index: 2;
	&::-webkit-scrollbar {
		display: none;
	}
`;

const ChatBody = ({ messages, user }) => {
	return (
		<ChatBodyWrapper>
			{messages?.map((msg) => (
				<SingleChat
					key={msg?.id}
					msg={msg.data()}
					type={user?.id === msg.data()?.userId ? 'send' : 'recieve'}
				/>
			))}
		</ChatBodyWrapper>
	);
};

export default ChatBody;
