import { createSlice } from '@reduxjs/toolkit';

// const getCurrentRoom = () => {
// 	const roomId = JSON.parse(localStorage.getItem('current-room'));
// 	if (roomId === null) {
// 		return;
// 	}
// 	return roomId;
// };

const initialState = {
	roomId: 0,
	imageUrl: '',
	roomName: '',
};

export const appSlice = createSlice({
	name: 'app',
	initialState,

	reducers: {
		enterRoom: (state, action) => {
			state.roomId = action.payload.roomId;
			state.imageUrl = action.payload.imageUrl;
			state.roomName = action.payload.roomName;
		},
	},
});

export const { enterRoom } = appSlice.actions;
export const selelctRoomId = (state) => state.app.roomId;
export const selelctRoomIdImage = (state) => state.app.imageUrl;
export const selelctRoomName = (state) => state.app.roomName;

export default appSlice.reducer;
