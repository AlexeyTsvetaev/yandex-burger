// store/ws-slice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IWSMessage } from './ws-types';

interface WSState {
	isConnected: boolean;
	isConnectedClient: boolean;
	orders: IWSMessage | null;
	clientOrders: IWSMessage | null;
	error: string | null;
}

const initialState: WSState = {
	isConnected: false,
	isConnectedClient: false,
	clientOrders: null,
	orders: null,
	error: null,
};

export const wsSlice = createSlice({
	name: 'websocket',
	initialState,
	reducers: {
		connect: (state) => {
			state.isConnected = true; // Устанавливаем соединение
			state.error = null;
		},
		disconnect: (state) => {
			state.isConnected = false;
			state.orders = null; // Очищаем заказы при разрыве соединения
		},
		connected: (state) => {
			state.isConnected = true;
			state.error = null;
		},
		clientConnected: (state) => {
			state.isConnectedClient = true;
			state.error = null;
		},
		disconnected: (state) => {
			state.isConnected = false;
		},
		messageReceived: (state, action: PayloadAction<IWSMessage>) => {
			state.orders = action.payload; // Сохраняем полученные данные в store
		},
		clientMessageReceived: (state, action: PayloadAction<IWSMessage>) => {
			state.clientOrders = action.payload;
		},
		error: (state, action: PayloadAction<string>) => {
			state.error = action.payload;
		},
	},
});

export const wsActions = wsSlice.actions;
export default wsSlice.reducer;
