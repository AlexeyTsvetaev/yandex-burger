export interface IOrder {
	name: string;
	ingredients: string[];
	_id: string;
	status: string;
	number: number;
	createdAt: string;
	updatedAt: string;
}

export interface IWSMessage {
	success: boolean;
	orders: IOrder[];
	total: number;
	totalToday: number;
}

export const WS_CONNECTION_START = 'WS_CONNECTION_START';
export const WS_CONNECTION_SUCCESS = 'WS_CONNECTION_SUCCESS';
export const WS_CONNECTION_START_CLIENT = 'WS_CONNECTION_START_CLIENT';
export const WS_CONNECTION_SUCCESS_CLIENT = 'WS_CONNECTION_SUCCESS_CLIENT';
export const WS_CONNECTION_ERROR = 'WS_CONNECTION_ERROR';
export const WS_CONNECTION_CLOSED = 'WS_CONNECTION_CLOSED';
export const WS_GET_MESSAGE = 'WS_GET_MESSAGE';
export const WS_SEND_MESSAGE = 'WS_SEND_MESSAGE';

export interface WsConnectionStartAction {
	type: typeof WS_CONNECTION_START;
	payload: Event;
}

export interface WsConnectionSuccessAction {
	type: typeof WS_CONNECTION_SUCCESS;
	payload: Event;
}
export interface WsConnectionStartClientAction {
	type: typeof WS_CONNECTION_START_CLIENT;
	payload: Event;
}

export interface WsConnectionSuccessClientAction {
	type: typeof WS_CONNECTION_SUCCESS_CLIENT;
	payload: Event;
}

export interface WsConnectionErrorAction {
	type: typeof WS_CONNECTION_ERROR;
	payload: Event;
}

export interface WsConnectionClosedAction {
	type: typeof WS_CONNECTION_CLOSED;
	payload: Event;
}

export interface WsGetMessageAction {
	type: typeof WS_GET_MESSAGE;
	payload: string; // данные от сервера приходят в виде строки
}

export interface WsSendMessageAction {
	type: typeof WS_SEND_MESSAGE;
	payload: any; // Тип сообщения, которое отправляется на сервер
}

export type AppActions =
	| WsConnectionStartAction
	| WsConnectionSuccessAction
	| WsConnectionErrorAction
	| WsConnectionClosedAction
	| WsGetMessageAction
	| WsSendMessageAction
	| WsConnectionStartClientAction
	| WsConnectionSuccessClientAction;
