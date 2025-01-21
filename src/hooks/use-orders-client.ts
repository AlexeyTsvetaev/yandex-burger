import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from '../store';
import { getMessage, getWebsocketStatus } from '../services/ws/ws-slice';
import { wsConnect } from '../services/ws/ws-actions';
import { IWSMessage } from '../services/ws/ws-types';
import { useGetIngredientsQuery } from '../services/rtk-query/api-slice';
import { setIngredients } from '../services/reducers/ingredients-slice';

export const useOrdersWs = (url: string) => {
	const dispatch = useDispatch();

	const { data } = useGetIngredientsQuery();

	useEffect(() => {
		if (data && data.success) {
			dispatch(setIngredients(data.data));
		}
	}, [data, dispatch]);

	// Подключение к WebSocket при монтировании компонента
	useEffect(() => {
		dispatch(wsConnect(url));
	}, [dispatch, url]);

	// Получаем список ингредиентов
	const ingredients = useSelector((state) => state.ingredients.ingredients);

	// Стейт для хранения WS-сообщений
	const [ordersWs, setOrdersWs] = useState<IWSMessage | null>(null);

	// Получаем данные из WS
	const rawMessage = useSelector(getMessage);
	const isConnectedWs = useSelector(getWebsocketStatus);

	// Парсим JSON-сообщение и обновляем состояние
	useEffect(() => {
		if (rawMessage) {
			try {
				const parsedMessage: IWSMessage = JSON.parse(rawMessage);
				setOrdersWs(parsedMessage);
			} catch (error) {
				console.error('Ошибка парсинга WS-сообщения:', error);
			}
		}
	}, [rawMessage]);

	// Фильтруем и сортируем заказы
	const filteredOrders =
		ordersWs?.orders?.sort((a, b) => b.number - a.number).slice(0, 20) || [];

	return { ingredients, ordersWs, filteredOrders, isConnectedWs };
};
