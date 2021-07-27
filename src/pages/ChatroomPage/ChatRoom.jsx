import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import ChatList from '../../components/ChatList/ChatList';
import UserTab from '../../components/UserTab/UserTab';
import { device } from '../../theme/responsive';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChatBox from '../../components/ChatBox/ChatBox';
import { useSelector } from 'react-redux';
import { selelctRoomId } from '../../features/appSlice';

const ChatRoomWrapper = styled.div`
	height: 100vh;
	width: 100%;
	display: flex;
`;

const FixedWrapper = styled(ChatRoomWrapper)`
	position: fixed;
	top: 0;
	left: 0;
	z-index: 10;
	width: fit-content;
	transition: all 0.5s ease;
	@media only screen and ${device.sm} {
		transform: translateX(${({ open }) => (open ? `0` : `-100%`)});
		opacity: ${({ open }) => (open ? `1` : `0`)};
	}
`;

const Hamburger = styled.button`
	position: fixed;
	top: 20px;
	left: ${({ open }) => (open ? `25px` : `7.5px`)};
	padding: 0px;
	z-index: 99;
	opacity: 0.7;
	color: ${({ theme }) => theme.bg_color};
	background-color: ${({ theme }) => theme.secondary_font};
	border-radius: 50%;
	transition: all 0.5s ease-in-out;
	box-shadow: 0 3px 6px rgba(0, 0, 0, ${({ theme }) => theme.box_shadow * 0.5}),
		0 3px 6px rgba(0, 0, 0, ${({ theme }) => theme.box_shadow * 0.45});
	display: none;

	@media only screen and ${device.sm} {
		display: grid;
	}
`;

const ChatRoom = ({ user }) => {
	const [open, setOpen] = useState(false);
	const roomId = useSelector(selelctRoomId);

	const navRef = useRef(null);

	useEffect(() => {
		function handleClickOutside(event) {
			if (navRef.current && !navRef.current.contains(event.target)) {
				setOpen(false);
			}
		}
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [navRef]);

	return (
		<ChatRoomWrapper>
			<Hamburger open={open} onClick={() => setOpen(!open)}>
				{open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
			</Hamburger>
			<FixedWrapper ref={navRef} open={open}>
				<UserTab user={user} />
				<ChatList />
			</FixedWrapper>
			<ChatBox roomId={roomId} user={user} />
		</ChatRoomWrapper>
	);
};

export default ChatRoom;
