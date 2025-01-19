import type { Middleware, MiddlewareAPI } from 'redux';

import type { AppDispatch, RootState } from '../../store';
import { AppActions, IWSMessage } from './ws-types';
import { wsActions } from './ws-slice';

export const socketMiddleware = (wsUrl: string): Middleware => {
	return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
		let socket: WebSocket | null = null;

		return (next) => (action: AppActions) => {
			const { dispatch, getState } = store;
			const { type, payload } = action;

			if (type === 'WS_CONNECTION_START') {
				//создаем сокет соединение
				socket = new WebSocket(wsUrl);
			}
			if (socket) {
				// функция, которая вызывается при открытии сокета
				socket.onopen = () => {
					dispatch({ type: 'WS_CONNECTION_SUCCESS' });
					dispatch(wsActions.connected());
				};

				// функция, которая вызывается при ошибке соединения
				socket.onerror = (event) => {
					dispatch(wsActions.error('Ошибка соединения'));
					dispatch({ type: 'WS_CONNECTION_ERROR', payload: event });
				};

				// функция, которая вызывается при получения события от сервера
				socket.onmessage = (event) => {
					try {
						const message: IWSMessage = JSON.parse(event.data); // Парсим данные от сервера
						dispatch(wsActions.messageReceived(message)); // Отправляем в Redux
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
