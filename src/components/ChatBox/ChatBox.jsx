import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import ChatHeader from './ChatHeader';
import ChatInput from './ChatInput';
import { device } from '../../theme/responsive';
import ChatBody from './ChatBody';
import { useCollection, useDocument } from 'react-firebase-hooks/firestore';
import { db } from '../../firebase';
import DefaultChat from './DefaultChat';

const ChatWrapper = styled.div`
	flex: 1;
	height: 100%;
	background-color: ${({ theme }) => theme.bg_color};
	margin-left: 375px;
	position: relative;
	display: flex;
	flex-direction: column;
	z-index: 3;

	@media only screen and ${device.sm} {
		margin-left: 0;
		z-index: 0;
	}
`;

const ChatBox = ({ roomId, user }) => {
	const chatRef = useRef();
	const [roomDetails] = useDocument(
		roomId && db.collection('rooms').doc(roomId),
	);
	const [roomMessages, loading] = useCollection(
		roomId &&
			db
				.collection('rooms')
				.doc(roomId)
				.collection('messages')
				.orderBy('timestamp'),

		{
			snapshotListenOptions: { includeMetadataChanges: true },
		},
	);

	return (
		<ChatWrapper>
			{roomId ? (
				<>
					<ChatHeader user={user} roomId={roomId} room={roomDetails?.data()} />
					<ChatBody
						loading={loading}
						chatRef={chatRef}
						user={user}
						roomId={roomId}
						messages={roomMessages?.docs}
					/>
					<ChatInput chatRef={chatRef} user={user} roomId={roomId} />
				</>
			) : (
				<DefaultChat />
			)}
		</ChatWrapper>
	);
};

export default ChatBox;
