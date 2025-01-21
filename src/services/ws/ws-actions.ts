import { createAction } from '@reduxjs/toolkit';

export const wsConnect = createAction<string, 'WS_CONNECT'>('WS_CONNECT');

export const wsDisconnect = createAction('WS_DISCONNECT');

export type TWsExternalActions =
	| ReturnType<typeof wsConnect>
	| ReturnType<typeof wsDisconnect>;
