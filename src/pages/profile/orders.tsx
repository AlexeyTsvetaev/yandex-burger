import styles from '../feed/style.module.css';
import { FeedItem } from '../feed/feed-item';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router';
import { useOrdersWs } from '../../hooks/use-orders-client';
import { useDispatch } from '../../store';
import { wsDisconnect } from '../../services/ws/ws-actions';
import { ClientOrders } from '../../constants/wsUrls';

export const Orders = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		return () => {
			dispatch(wsDisconnect());
		};
	}, []);
	const location = useLocation();
	const { ingredients, ordersWs, filteredOrders, isConnectedWs } =
		useOrdersWs(ClientOrders);

	if (!isConnectedWs || !ordersWs) {
		return (
			<div className={styles.preloader}>
				<p className='text text_type_main-medium'>Загружаю заказы...</p>
			</div>
		);
	}

	return (
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
	);
};
