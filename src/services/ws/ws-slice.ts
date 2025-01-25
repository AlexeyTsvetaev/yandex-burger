import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type WsStore = {
	status: boolean;
	message: string;
	connectionError: string | null;
};

const initialState: WsStore = {
	status: false,
	message: '',
	connectionError: null,
};

export const websocketSlice = createSlice({
	name: 'ws',
	initialState,
	reducers: {
		wsConnecting: (state) => {
			state.status = true;
		},
		wsOpen: (state) => {
			state.status = true;
			state.connectionError = null;
		},
		wsClose: (state) => {
			state.status = false;
		},
		wsError: (state, action: PayloadAction<string>) => {
			state.connectionError = action.payload;
		},
		wsMessage: (state, action: PayloadAction<string>) => {
			state.message = action.payload;
		},
	},
	selectors: {
		getMessage: (state) => state.message,
		getWebsocketStatus: (state) => state.status,
	},
});

export const { wsConnecting, wsOpen, wsClose, wsError, wsMessage } =
	websocketSlice.actions;
export const { getMessage, getWebsocketStatus } = websocketSlice.selectors;

export type TWsInternalActions = ReturnType<
	(typeof websocketSlice.actions)[keyof typeof websocketSlice.actions]
>;
export default websocketSlice.reducer;
