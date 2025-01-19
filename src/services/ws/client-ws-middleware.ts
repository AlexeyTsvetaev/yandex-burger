import type { Middleware, MiddlewareAPI } from 'redux';

import type { AppDispatch, RootState } from '../../store';
import { AppActions, IWSMessage } from './ws-types';
import { wsActions } from './ws-slice';
import {
	getTokenToLocal,
	setTokenToLocal,
} from '../../constants/local-storage';
import { refreshToken } from '../fetch/fetch';
import { connect } from 'react-redux';

export const clientWsMiddleware = (wsUrl: string): Middleware => {
	return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
		let socket: WebSocket | null = null;
		return (next) => (action: AppActions) => {
			const { dispatch, getState } = store;
			const { type, payload } = action;

			if (type === 'WS_CONNECTION_START_CLIENT') {
				const token = getTokenToLocal()?.replace('Bearer ', '');

				//создаем сокет соединение
				socket = new WebSocket(`${wsUrl}?token=${token}`);
			}
			if (socket) {
				// функция, которая вызывается при открытии сокета
				socket.onopen = () => {
					dispatch({ type: 'WS_CONNECTION_SUCCESS_CLIENT' });
					dispatch(wsActions.clientConnected());
				};

				// функция, которая вызывается при ошибке соединения
				socket.onerror = (event) => {
					dispatch(wsActions.error('Ошибка соединения'));
					dispatch({ type: 'WS_CONNECTION_ERROR', payload: event });
				};

				// функция, которая вызывается при получения события от сервера
				socket.onmessage = async (event) => {
					try {
						const message: IWSMessage = JSON.parse(event.data);
						// Если сервер сообщает, что токен недействителен
						if (event.data === 'Invalid or expired token') {
							const newToken = await refreshToken(); // Запрос на обновление токена
							if (newToken) {
								setTokenToLocal(newToken.accessToken); // Обновляем токен в localStorage
								socket?.close(); // Закрываем текущее соединение
								connect(); // Переподключаемся с новым токеном
							} else {
								console.error('Ошибка обновления токена');
								dispatch(wsActions.error('Ошибка обновления токена'));
							}
							return;
						}

						dispatch(wsActions.clientMessageReceived(message));
					} catch (error) {
						console.error('Ошибка при парсинге сообщения', error);
					}
				};
				// функция, которая вызывается при закрытии соединения
				socket.onclose = (event) => {
					dispatch({ type: 'WS_CONNECTION_CLOSED', payload: event });
				};

				if (type === 'WS_SEND_MESSAGE') {
					// функция для отправки сообщения на сервер
					socket.send(JSON.stringify(payload));
				}
			}

			next(action);
		};
	}) as Middleware;
};
