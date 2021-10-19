import React, { useState } from 'react';
import styled from 'styled-components';
import { db } from '../../firebase';
import EditGroup from './EditGroup';

const ChatMenu = styled.div`
	width: 75px;
	height: fit-content;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	background: ${({ theme }) => theme.bg_color};
	color: inherit;
	position: absolute;
	right: 5px;
	top: 50%;
	padding: 0.4rem;

	box-shadow: 0 3px 6px rgba(0, 0, 0, ${({ theme }) => theme.box_shadow}),
		0 3px 6px rgba(0, 0, 0, ${({ theme }) => theme.box_shadow * 1.2});
	border-radius: 5px;
	z-index: 999;

	& button {
		color: ${({ theme }) => theme.primary_font};
		padding: 5px 0;
		font-size: 0.7rem;
		background-color: inherit;
		border-radius: 0.2rem;

		&:hover {
			background-color: rgba(255, 255, 255, 0.2);
		}
	}
`;

const SingleChatMenu = (props) => {
	const [showEdit, setShowEdit] = useState(false);
	const handleDelete = async () => {
		await db.collection('rooms').doc(props.id).delete();
	};

	return (
		<ChatMenu>
			<button onClick={() => setShowEdit(true)}>Edit</button>
			<button onClick={handleDelete}>Delete</button>
			{showEdit && <EditGroup {...props} close={() => setShowEdit(false)} />}
		</ChatMenu>
	);
};

export default SingleChatMenu;
