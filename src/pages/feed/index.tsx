import styles from './style.module.css';
import { FeedItem } from './feed-item';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router';
import { useOrdersWs } from '../../hooks/use-orders-client';
import { OrdersAll } from '../../constants/wsUrls';
import { useGetIngredientsQuery } from '../../services/rtk-query/api-slice';
import { setIngredients } from '../../services/reducers/ingredients-slice';
import { useDispatch } from '../../store';

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

export const Feed = () => {
	const dispatch = useDispatch();
	const { data, isLoading, error } = useGetIngredientsQuery();
	useEffect(() => {
		if (data && data.success) {
			dispatch(setIngredients(data.data));
		}
	}, [data, dispatch]);

	const location = useLocation();
	const { ingredients, ordersWs, filteredOrders, isConnectedWs } =
		useOrdersWs(OrdersAll); // Используем хук
	if (!isConnectedWs || !ordersWs || isLoading) {
		return (
			<div className={styles.preloader}>
				<p className='text text_type_main-medium'>Загружаю заказы...</p>
			</div>
		);
	}

	return (
		isConnectedWs && (
			<>
				<main className={styles.main_content}>
					<div className={styles.header_container}>
						<p className='text text_type_main-large'>Лента заказов</p>
					</div>
					<div className={styles.feed}>
						<div className={styles.main_content_left}>
							<div className={styles.feed_container}>
								{ordersWs.orders.map((order) => {
									// Группируем ингредиенты по ID и считаем их количество
									const ingredientCount: Record<
										string,
										{ image: string; price: number; count: number }
									> = {};

									order.ingredients.forEach((id) => {
										const ingredient = ingredients.find(
											(item) => item._id === id
										);
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
											to={`/feed/${order._id}`}
											state={{ background: location }}>
											<FeedItem
												feedDate={order.createdAt}
												feedName={order.name}
												status={order.status}
												feedNumber={order.number}
												showStatus={true}
												price={totalPrice}
												imgIngredient={filteredImg}
											/>
										</Link>
									);
								})}
							</div>
						</div>
						<div className={styles.main_content_right}>
							<div className={styles.feed_info_success_row}>
								<div className={styles.main_content_right}>
									<p className='text text_type_main-medium'>Готовы: </p>
									<div className={styles.order_grid}>
										{filteredOrders
											.filter((e) => e.status === 'done')
											.map((e, index) => (
												<p
													key={e._id}
													className='text text_type_digits-default text_color_success'
													style={{ gridColumn: index >= 10 ? 2 : 1 }}>
													{e.number}
												</p>
											))}
									</div>
								</div>
								<div className={styles.main_content_right}>
									<p className='text text_type_main-medium'>В работе: </p>
									<div className={styles.order_grid}>
										{filteredOrders
											.filter((e) => e.status !== 'done')
											.map((e, index) => (
												<p
													key={e._id}
													className='text text_type_digits-default '
													style={{ gridColumn: index >= 10 ? 2 : 1 }}>
													{e.number}
												</p>
											))}
									</div>
								</div>
							</div>
							<div className={styles.main_content_right}>
								<p className='text text_type_main-medium'>
									Выполнено за все время:
								</p>
								<p className='text text_type_digits-large'>{ordersWs.total}</p>
							</div>
							<div className={styles.main_content_right}>
								<p className='text text_type_main-medium'>
									Выполнено за сегодня:
								</p>
								<p className='text text_type_digits-large'>
									{ordersWs.totalToday}
								</p>
							</div>
						</div>
					</div>
				</main>
			</>
		)
	);
};
