import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import Avatar from '@material-ui/core/Avatar';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import ExitToAppSharpIcon from '@material-ui/icons/ExitToAppSharp';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';
import { ThemeContext } from '../../context/ThemeContext';
import { device } from '../../theme/responsive';
import { UserContext } from '../../context/UserContext';
import NewGroup from './NewGroup';

const UserNav = styled.div`
	background-color: ${({ theme }) => theme.nav_bg};
	height: 100%;
	width: 75px;
	display: flex;
	justify-content: flex-start;
	align-items: center;
	flex-direction: column;
	padding: 10px;

	@media only screen and ${device.xxs} {
		width: 60px;
	}
`;

const UserDetails = styled(UserNav)`
	height: 100px;
	justify-content: center;
	cursor: pointer;

	& p {
		color: ${({ theme }) => theme.primary_font};
		text-align: center;
		font-size: x-small;
		font-weight: 600;
		margin: 5px 0;
	}

	@media only screen and ${device.sm} {
		margin-top: 50px;
	}
`;

export const ThemeButton = styled.button`
	width: 50px;
	height: 50px;
	display: grid;
	place-items: center;
	background: transparent;
	border: none;
	outline: none;
	cursor: pointer;
	color: ${({ theme }) => theme.secondary_font};

	& svg {
		font-size: x-large;
	}
`;

const UserTab = ({ user }) => {
	const [showModal, setShowModal] = useState(false);
	const { appThemeLight, toggleTheme } = useContext(ThemeContext);
	const { logout } = useContext(UserContext);

	return (
		<UserNav>
			{showModal && <NewGroup close={() => setShowModal(false)} />}

			<UserDetails>
				<Avatar alt={user?.displayName.split(' ')[0]} src={user?.picture} />
				<p>{user?.displayName.split(' ')[0]}</p>
			</UserDetails>
			<Tooltip title="Toggle Theme" TransitionComponent={Zoom}>
				<ThemeButton onClick={toggleTheme}>
					{appThemeLight ? <Brightness7Icon /> : <Brightness4Icon />}
				</ThemeButton>
			</Tooltip>

			<Tooltip title="New Group" TransitionComponent={Zoom}>
				<ThemeButton onClick={() => setShowModal(true)}>
					<GroupAddIcon />
				</ThemeButton>
			</Tooltip>

			<Tooltip title="Logout" TransitionComponent={Zoom}>
				<ThemeButton onClick={logout}>
					<ExitToAppSharpIcon />
				</ThemeButton>
			</Tooltip>
		</UserNav>
	);
};

export default UserTab;
