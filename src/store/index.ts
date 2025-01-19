import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';

import ingredientsReducer from '../services/reducers/ingredients-slice';
import { apiSlice } from '../services/rtk-query/api-slice';
import wsReducer from '../services/ws/ws-slice';
import { socketMiddleware } from '../services/ws/socket-middleware';
import { clientWsMiddleware } from '../services/ws/client-ws-middleware';

const rootReducer = combineReducers({
	ingredients: ingredientsReducer,
	[apiSlice.reducerPath]: apiSlice.reducer,
	websocket: wsReducer,
});

export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(
			apiSlice.middleware,
			socketMiddleware('wss://norma.nomoreparties.space/orders/all'),
			clientWsMiddleware('wss://norma.nomoreparties.space/orders')
		),
	devTools: process.env.NODE_ENV !== 'production',
});

// Типизация состояния и dispatch
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
