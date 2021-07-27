import React from 'react';
import styled from 'styled-components';
import Avatar from '@material-ui/core/Avatar';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';
import { useSelector } from 'react-redux';
import { selelctRoomIdImage, selelctRoomName } from '../../features/appSlice';

const Header = styled.div`
	display: flex;
	justify-content: space-between;
	background: ${({ theme }) => theme.bg_color};
	padding: 25px;
	align-items: center;
	color: ${({ theme }) => theme.primary_font};
	box-shadow: 0 3px 6px rgba(0, 0, 0, ${({ theme }) => theme.box_shadow * 0.5}),
		0 3px 6px rgba(0, 0, 0, ${({ theme }) => theme.box_shadow * 0.45});
	color: ${({ theme }) => theme.primary_font};
	height: 70px;
`;

const Profile = styled.div`
	display: flex;
	justify-content: center;
	width: 150px;
`;

const UserStatus = styled.div`
	display: flex;
	flex-direction: column;
	margin-left: 10px;
	position: relative;

	justify-content: space-evenly;
	& p {
		color: ${({ theme }) => theme.secondary_font};
		font-size: small;
	}
	& span {
		height: 8px;
		width: 8px;
		border-radius: 50%;
		background: ${({ theme }) => theme.user_active};
		position: absolute;
		left: 100%;
		top: 5px;
		margin-left: 5px;
	}
`;

const AddFile = styled.button`
	color: ${({ theme }) => theme.secondary_font};
	& svg {
		font-size: x-large;
	}
`;

const ChatHeader = ({ room, user }) => {
	const image = useSelector(selelctRoomIdImage);
	const name = useSelector(selelctRoomName);

	return (
		<Header>
			<Profile>
				<Avatar alt={name} src={image} />
				<UserStatus>
					<h5>{room?.name}</h5>
					<p>Active Now</p>
					<span></span>
				</UserStatus>
			</Profile>
			<Tooltip title="Attach File" TransitionComponent={Zoom}>
				<AddFile>
					<AttachFileIcon />
				</AddFile>
			</Tooltip>
		</Header>
	);
};

export default ChatHeader;
