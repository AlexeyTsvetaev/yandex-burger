import { combineReducers } from 'redux';
import { configureStore, ThunkDispatch } from '@reduxjs/toolkit';
import {
	useDispatch as dispatchHook,
	useSelector as selectorHook,
} from 'react-redux';
import ingredientsReducer, {
	clearConstructor,
	moveItemInConstructor,
	removeItemFromConstructor,
	setIngredients,
	setViewedIngredient,
	TAddItemToConstructorActions,
} from '../services/reducers/ingredients-slice';

import { apiSlice } from '../services/rtk-query/api-slice';
import {
	TWsInternalActions,
	websocketSlice,
	wsClose,
	wsConnecting,
	wsError,
	wsMessage,
	wsOpen,
} from '../services/ws/ws-slice';
import { socketMiddleware } from '../services/ws/socket-middleware';
import {
	TWsExternalActions,
	wsConnect,
	wsDisconnect,
} from '../services/ws/ws-actions';

const rootReducer = combineReducers({
	ingredients: ingredientsReducer,
	[apiSlice.reducerPath]: apiSlice.reducer,
	[websocketSlice.reducerPath]: websocketSlice.reducer,
});
const webSocketMiddleware = socketMiddleware({
	connect: wsConnect,
	disconnect: wsDisconnect,
	onConnecting: wsConnecting,
	onOpen: wsOpen,
	onClose: wsClose,
	onError: wsError,
	onMessage: wsMessage,
});

export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) => {
		return getDefaultMiddleware()
			.concat(apiSlice.middleware) // Добавляем middleware для RTK Query
			.concat(webSocketMiddleware); // Добавляем middleware для WebSocket
	},
	devTools: process.env.NODE_ENV !== 'production',
});

export type TIngredientsActions = ReturnType<typeof setIngredients>;
export type TMoveIngredientActions = ReturnType<typeof moveItemInConstructor>;
export type TRemoveIngredientActions = ReturnType<
	typeof removeItemFromConstructor
>;
export type TClearConstructor = ReturnType<typeof clearConstructor>;
export type TSetViewIngredient = ReturnType<typeof setViewedIngredient>;

type TApplicationActions =
	| TWsExternalActions
	| TWsInternalActions
	| TIngredientsActions
	| TMoveIngredientActions
	| TRemoveIngredientActions
	| TAddItemToConstructorActions
	| TClearConstructor
	| TSetViewIngredient;

// Типизация состояния и dispatch
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = ThunkDispatch<
	RootState,
	unknown,
	TApplicationActions
>;

export const useDispatch = dispatchHook.withTypes<AppDispatch>();
export const useSelector = selectorHook.withTypes<RootState>();
