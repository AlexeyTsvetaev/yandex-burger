import styles from '../feed/style.module.css';
import { FeedItem } from '../feed/feed-item';
import React, { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState, store } from '../../store';

import { IIngredients } from '../../components/BurgerIngredients/Ingredient';
import { useLocation } from 'react-router';
interface IOrder {
	ingredients: string[];
	name: string;
	_id: string;
	status: string;
	number: number;
	createdAt: string;
	updatedAt: string;
}

// Интерфейс для данных, получаемых от сервера
export interface IOrders {
	success?: boolean;
	orders: IOrder[];
	total?: number;
	totalToday?: number;
}

export const Orders = () => {
	const location = useLocation();
	const ordersWs = useSelector(
		(state: RootState) => state.websocket.clientOrders
	) as IOrders;
	const isConnected = useSelector(
		(state: RootState) => state.websocket.isConnectedClient
	);
	const [isLoadingOrders, setIsLoadingOrders] = useState(true);
	const ingredients = useSelector(
		(state: RootState) => state.ingredients.ingredients as IIngredients[]
	);
	useEffect(() => {
		if (!ordersWs) {
			setIsLoadingOrders(true);
		} else {
			setIsLoadingOrders(false);
		}
	}, [ordersWs]);

	if (!isConnected) {
		return (
			<div className={styles.preloader}>
				<p className='text text_type_main-medium'>Подключаюсь к серверу...</p>
			</div>
		);
	}

	if (isLoadingOrders) {
		return (
			<div className={styles.preloader}>
				<p className='text text_type_main-medium'>Загружаю заказы...</p>
			</div>
		);
	}

	const filteredOrders = ordersWs.orders
		.filter((e) => e.status === 'done')
		.sort((a, b) => b.number - a.number) // Сортируем по убыванию номера
		.slice(0, 20);

	return (
		<>
			<div className={styles.feed_container}>
				{filteredOrders.map((order) => {
					// Группируем ингредиенты по ID и считаем их количество
					const ingredientCount: Record<
						string,
						{ image: string; price: number; count: number }
					> = {};

					order.ingredients.forEach((id) => {
						const ingredient = ingredients.find((item) => item._id === id);
						if (ingredient) {
							if (!ingredientCount[id]) {
								ingredientCount[id] = {
									image: ingredient.image,
									price: ingredient.price,
									count: 0,
								};
							}
							ingredientCount[id].count += 1;
						}
					});

					// Преобразуем объект в массив
					const filteredImg = Object.values(ingredientCount).map(
						({ image, count }) => ({
							image,
							count,
						})
					);

					// Считаем сумму заказа
					const totalPrice = Object.values(ingredientCount).reduce(
						(sum, { price, count }) => sum + price * count,
						0
					);

					return (
						<Link
							key={order._id}
							to={`/profile/orders/${order._id}`}
							state={{ background: location }}>
							<FeedItem
								key={order._id}
								feedDate={order.createdAt}
								feedName={order.name}
								status={order.status}
								feedNumber={order.number}
								price={totalPrice}
								imgIngredient={filteredImg}
							/>
						</Link>
					);
				})}
			</div>
		</>
	);
};
