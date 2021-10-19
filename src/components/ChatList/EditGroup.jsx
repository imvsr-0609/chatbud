import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import Avatar from '@material-ui/core/Avatar';
import AddPhotoAlternateOutlinedIcon from '@material-ui/icons/AddPhotoAlternateOutlined';
import { db, storage } from '../../firebase';
import { LoginButton } from '../../pages/LoginPage/LoginPage';

const GroupModal = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	z-index: 99;
	display: grid;
	background: rgba(0, 0, 0, 0.4);
	backdrop-filter: blur(4px);
	place-items: center;
`;

const NewGroupForm = styled.div`
	width: 80%;
	padding: 20px;
	max-width: 400px;
	color: ${({ theme }) => theme.primary_font};
	height: fit-content;
	min-height: 350px;
	box-shadow: 0 3px 6px rgba(0, 0, 0, ${({ theme }) => theme.box_shadow}),
		0 3px 6px rgba(0, 0, 0, ${({ theme }) => theme.box_shadow});
	background: ${({ theme }) => theme.bg_color};
	display: flex;
	border-radius: 10px;
	flex-direction: column;
	justify-content: space-evenly;
	align-items: center;
	& > * {
		margin: 10px 0;
	}
`;

const ImageUpload = styled.label`
	display: flex;
	justify-content: center;
	align-items: flex-end;
	cursor: pointer;
	& input {
		display: none;
	}
	& .avatar {
		position: relative;
	}
`;

const GroupButton = styled(LoginButton)`
	&:disabled {
		cursor: not-allowed;
	}
`;

const Input = styled.input`
	background-color: transparent;
	border: none;
	outline: none;
	color: inherit;
	font-weight: bold;
	&::placeholder {
		color: ${({ theme }) => theme.secondary_font};
	}
	text-align: center;
	margin: 15px 0;
	padding: 10px 0;
	border-bottom: 1px solid ${({ theme }) => theme.secondary_font};
`;

const Description = styled.textarea`
	background-color: transparent;
	min-height: 100px;
	padding: 10px;
	width: 100%;
	border: 1px solid gray;
	outline: none;
	color: inherit;
	font-weight: bold;
	&::placeholder {
		color: ${({ theme }) => theme.secondary_font};
	}
`;

const EditGroup = ({ name, id, image, description, close }) => {
	const [newName, setName] = useState(name);
	const [newDescription, setDescription] = useState(description);
	const [file, setFile] = useState(null);
	const [url, setUrl] = useState(image);
	const [preview, setPreview] = useState(image);
	const [progress, setProgress] = useState(100);
	const [error, setError] = useState('');
	const modalRef = useRef(null);

	useEffect(() => {
		function handleClickOutside(event) {
			if (modalRef.current && !modalRef.current.contains(event.target)) {
				close();
			}
		}
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [modalRef]);

	const handleChange = (e) => {
		setProgress(0);
		let selected = e.target.files[0];

		if (selected) {
			setFile(selected);
			const storageRef = storage.ref(selected?.name);

			storageRef.put(selected).on(
				'state_changed',
				(snap) => {
					let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
					setProgress(percentage);
				},
				(err) => {
					setError(err);
					alert(err.message);
				},
				async () => {
					const url = await storageRef.getDownloadURL();
					setUrl(url);
				},
			);

			setPreview(URL.createObjectURL(selected));
			setError('');
		} else {
			setFile(null);
			setError('Please select an image file (png or jpg)');
		}
	};

	const editGroup = async (e) => {
		e.preventDefault();

		const updatedGroup = {
			name: newName,
			description: newDescription,
			image: url,
			id,
		};

		await db.collection('rooms').doc(id).update(updatedGroup);

		close();
	};

	return (
		<GroupModal>
			<NewGroupForm ref={modalRef}>
				<ImageUpload>
					<input
						type="file"
						accept="image/png, image/gif, image/jpeg"
						onChange={handleChange}
					/>
					<Avatar
						src={preview}
						className="avatar"
						style={{ width: 100, height: 100 }}
					/>
					<AddPhotoAlternateOutlinedIcon />
				</ImageUpload>

				<Input
					value={newName}
					onChange={(e) => setName(e.target.value)}
					placeholder="Enter group name..."
				/>
				<Description
					value={newDescription}
					onChange={(e) => setDescription(e.target.value)}
					placeholder="Enter group desc..."
				/>

				<GroupButton
					type="submit"
					disabled={progress < 100}
					onClick={editGroup}
				>
					Update
				</GroupButton>
			</NewGroupForm>
		</GroupModal>
	);
};

export default EditGroup;
