import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import SendIcon from '@material-ui/icons/Send';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';
import Picker from 'emoji-picker-react';
import { db, fv } from '../../firebase';

const ChatInputWrapper = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	background-color: ${({ theme }) => theme.bg_color};
	padding: 15px 25px;
	position: absolute;
	bottom: 0;
	width: 100%;
	height: 60px;
	box-shadow: 0 -3px 6px rgba(0, 0, 0, ${({ theme }) => theme.box_shadow * 0.5}),
		0 -3px 6px rgba(0, 0, 0, ${({ theme }) => theme.box_shadow * 0.45});
	color: ${({ theme }) => theme.secondary_font};
	z-index: 3;
`;

const ChatForm = styled.form`
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 100%;
	flex: 1;
	& > * {
		padding: 0 10px;
	}
`;

const ChatText = styled.input`
	background-color: transparent;
	border: none;
	outline: none;
	color: inherit;
	padding: 20px;
	font-size: small;
	font-weight: bold;
	flex: 1;
	&::placeholder {
		color: ${({ theme }) => theme.secondary_font};
	}
`;

const ChatSend = styled.button`
	border: none;
	outline: none;
	background: transparent;
	color: inherit;

	& svg {
		font-size: xx-large;
	}
`;

const Emoji = styled(ChatSend)``;

const EmojiKeyboard = styled.div`
	position: absolute;
	bottom: 100%;
	left: 0;
	transition: transform 0.3s ease-in-out;
	transform: scale(${({ show }) => (show ? `1` : `0`)});
	transform-origin: bottom left;
`;

const ChatInput = ({ roomId, user }) => {
	const [showKeyboard, setShowKeyboard] = useState(false);
	const [message, setMessage] = useState('');
	const emoRef = useRef(null);

	const onEmojiClick = (event, emojiObject) => {
		setMessage(message + emojiObject?.emoji);
	};

	useEffect(() => {
		function handleClickOutside(event) {
			if (emoRef.current && !emoRef.current.contains(event.target)) {
				setShowKeyboard(false);
			}
		}
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [emoRef]);

	const sendMessage = (e) => {
		e.preventDefault();
		if (message.length === 0) {
			return;
		}

		// console.log(message);

		db.collection('rooms').doc(roomId).collection('messages').add({
			message,
			userId: user?.id,
			user: user?.displayName,
			userImage: user?.picture,

			timestamp: fv.serverTimestamp(),
		});

		setMessage('');
	};

	return (
		<ChatInputWrapper>
			<Tooltip title="Emoji" TransitionComponent={Zoom}>
				<Emoji onClick={() => setShowKeyboard(!showKeyboard)}>
					<InsertEmoticonIcon />
				</Emoji>
			</Tooltip>
			<EmojiKeyboard ref={emoRef} show={showKeyboard}>
				<Picker onEmojiClick={onEmojiClick} />
			</EmojiKeyboard>

			<ChatForm onSubmit={sendMessage}>
				<ChatText
					value={message}
					onChange={(e) => setMessage(e.target.value)}
					placeholder="Type a message ..."
				/>
				<Tooltip title="Send" TransitionComponent={Zoom}>
					<ChatSend type="submit" onClick={sendMessage}>
						<SendIcon />
					</ChatSend>
				</Tooltip>
			</ChatForm>
		</ChatInputWrapper>
	);
};

export default ChatInput;
