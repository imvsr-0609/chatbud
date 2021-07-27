import React from 'react';
import styled from 'styled-components';
import Avatar from '@material-ui/core/Avatar';
import { device } from '../../theme/responsive';
import { useDispatch } from 'react-redux';
import { enterRoom } from '../../features/appSlice';

const SingleChat = styled.div`
	height: 75px;
	background-color: ${({ theme }) => theme.list_bg};
	color: ${({ theme }) => theme.primary_font};
	border-radius: 5px;
	padding: 20px;
	margin: 10px 0;
	display: flex;
	cursor: pointer;

	box-shadow: 0 3px 6px rgba(0, 0, 0, ${({ theme }) => theme.box_shadow}),
		0 3px 6px rgba(0, 0, 0, ${({ theme }) => theme.box_shadow * 1.2});

	@media only screen and ${device.sm} {
		padding: 20px 10px;
	}
`;

const ChatDescription = styled.div`
	display: flex;
	flex: 1;
	flex-direction: column;
	margin-left: 20px;
	& h4 {
		font-size: small;
		margin-bottom: 5px;
	}
	& p {
		font-size: small;
		color: ${({ theme }) => theme.secondary_font};
	}
`;

const ChatUnread = styled.div`
	padding: 5px 10px;
	color: white;
	display: grid;
	place-items: center;
	& p {
		font-size: x-small;
		font-weight: bold;
		background: linear-gradient(
			135deg,
			${({ theme }) => theme.user_chat_bg_top_left},
			${({ theme }) => theme.user_chat_bg_bottom_right}
		);
		width: 15px;
		height: 15px;
		display: grid;
		place-items: center;
		border-radius: 50%;
	}
`;

const SingleChatList = (props) => {
	const { name, id, image, description } = props;
	const dispatch = useDispatch();
	const selectChat = () => {
		if (id) {
			dispatch(
				enterRoom({
					roomId: id,
					imageUrl: image,
					roomName: name,
				}),
			);
		}
	};
	return (
		<SingleChat onClick={selectChat}>
			<Avatar alt={name} src={image} />
			<ChatDescription>
				<h4>{name}</h4>
				<p>{description} </p>
			</ChatDescription>
			<ChatUnread>
				<p>5</p>
			</ChatUnread>
		</SingleChat>
	);
};

export default SingleChatList;
