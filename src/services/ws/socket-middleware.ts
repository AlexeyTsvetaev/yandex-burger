import {
	ActionCreatorWithoutPayload,
	ActionCreatorWithPayload,
	Middleware,
} from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { refreshToken } from '../fetch/fetch';
import { wsConnect, wsDisconnect } from './ws-actions';

export type TWsActionTypes = {
	connect: ActionCreatorWithPayload<string>;
	disconnect: ActionCreatorWithoutPayload;
	onConnecting: ActionCreatorWithoutPayload;
	onOpen: ActionCreatorWithoutPayload;
	onClose: ActionCreatorWithoutPayload;
	onError: ActionCreatorWithPayload<string>;
	onMessage: ActionCreatorWithPayload<string>;
};

const RECONNECT_PERIOD = 3000;

export const socketMiddleware = (
	wsActions: TWsActionTypes,
	withTokenRefresh: boolean = true
): Middleware<{}, RootState> => {
	return (store) => {
		let socket: WebSocket | null = null;
		const {
			connect,
			onOpen,
			onClose,
			onError,
			onMessage,
			onConnecting,
			disconnect,
		} = wsActions;
		let isConnected = false;
		let reconnectTimer = 0;
		let url = '';

		return (next) => (action) => {
			const { dispatch } = store;
			if (connect.match(action)) {
				url = action.payload;
				socket = new WebSocket(url);
				isConnected = true;
				dispatch(onConnecting());

				socket.onopen = () => {
					dispatch(onOpen());
				};

				socket.onerror = () => {
					dispatch(onError('Error'));
				};

				socket.onmessage = (event) => {
					const { data } = event;

					try {
						const parsedData = JSON.parse(data);

						if (
							withTokenRefresh &&
							parsedData.message === 'Invalid or missing token'
						) {
							refreshToken()
								.then((refreshData) => {
									const wssUrl = new URL(url);
									wssUrl.searchParams.set(
										'token',
										refreshData.accessToken.replace('Bearer ', '')
									);
									dispatch(wsConnect(wssUrl.toString()));
								})
								.catch((err) => {
									console.error(err);
									dispatch(onError('Error'));
								});

							return;
						}

						dispatch(onMessage(data));
					} catch (error) {
						dispatch(onError((error as { message: string }).message));
					}
				};

				socket.onclose = () => {
					dispatch(onClose());
					if (isConnected) {
						reconnectTimer = window.setTimeout(() => {
							dispatch(connect(url));
						}, RECONNECT_PERIOD);
					}
				};
			}

			if (socket && disconnect.match(action)) {
				clearTimeout(reconnectTimer);
				isConnected = false;
				reconnectTimer = 0;
				socket.close();
				socket = null;
			}

			next(action);
		};
	};
};
