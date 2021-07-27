import React, { useState } from 'react';
import styled from 'styled-components';
import SearchIcon from '@material-ui/icons/Search';
import SingleChatList from './SingleChatList';
import { device } from '../../theme/responsive';

import { db } from '../../firebase';
import { useCollection } from 'react-firebase-hooks/firestore';

const ChatListWrapper = styled.div`
	height: 100%;
	width: 300px;
	background-color: ${({ theme }) => theme.bg_color};
	@media only screen and ${device.xs} {
		width: calc(100vw - 75px);
	}
	@media only screen and ${device.xxs} {
		width: calc(100vw - 60px);
	}
`;

const SearchForm = styled.form`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 70px;
	padding: 25px;
	box-shadow: 0 3px 6px rgba(0, 0, 0, ${({ theme }) => theme.box_shadow * 0.5}),
		0 3px 6px rgba(0, 0, 0, ${({ theme }) => theme.box_shadow * 0.45});
	color: ${({ theme }) => theme.secondary_font};
	& > * {
		padding: 0 10px;
	}
`;

const SearchButton = styled.button`
	border: none;
	outline: none;
	background: transparent;
	display: grid;
	place-items: center;
	color: inherit;
	height: 20px;
	border-right: 1px solid ${({ theme }) => theme.secondary_font};
	& svg {
		font-size: medium;
	}
`;

export const SearchInput = styled.input`
	background-color: transparent;
	border: none;
	outline: none;
	color: inherit;
	font-weight: bold;
	&::placeholder {
		color: ${({ theme }) => theme.secondary_font};
	}
`;

const ChatListBody = styled.div`
	display: flex;
	flex-direction: column;
	background: ${({ theme }) => theme.lists_bg};
	padding: 15px;
	height: 90vh;
	overflow-y: scroll;
	&::-webkit-scrollbar {
		display: none;
	}
`;

const ChatList = () => {
	const [search, setSearch] = useState('');
	const [groups] = useCollection(db.collection('rooms'), {
		snapshotListenOptions: { includeMetadataChanges: true },
	});

	const searchGroup = (e) => {
		setSearch(e.target.value);
	};

	return (
		<ChatListWrapper>
			<SearchForm>
				<SearchButton>
					<SearchIcon />
				</SearchButton>
				<SearchInput
					value={search}
					onChange={searchGroup}
					type="text"
					placeholder="Search in your inbox"
				/>
			</SearchForm>

			<ChatListBody>
				{groups?.docs.map((group) => (
					<SingleChatList key={group.id} id={group.id} {...group.data()} />
				))}
			</ChatListBody>
		</ChatListWrapper>
	);
};

export default ChatList;
