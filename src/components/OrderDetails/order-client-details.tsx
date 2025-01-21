import React, { useEffect } from 'react';
import styles from './order-details.module.css';
import {
	CurrencyIcon,
	FormattedDate,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useParams } from 'react-router-dom';
import { useOrdersWs } from '../../hooks/use-orders-client';
import { ClientOrders } from '../../constants/wsUrls';

export const OrderClientDetails = () => {
	const { id } = useParams(); // Получаем orderId из URL
	// Используем кастомный хук для получения данных
	const { ingredients, ordersWs, isConnectedWs } = useOrdersWs(ClientOrders);

	// Проверка подключения
	if (!isConnectedWs || !ordersWs) {
		return (
			<div className={styles.preloader}>
				<p className='text text_type_main-medium'>Загружаю заказы...</p>
			</div>
		);
	}

	// Находим нужный заказ по id
	const order = ordersWs.orders.find((order) => order._id === id);
	if (!order) {
		return <div className={styles.preloader}></div>;
	}

	// Извлекаем данные
	const { number, createdAt, name, status } = order;

	const ingredientMap: Record<
		string,
		{ image: string; name: string; price: number; count: number }
	> = {};

	// Группируем ингредиенты по _id и считаем их количество
	order.ingredients.forEach((id) => {
		const ingredient = ingredients.find((item) => item._id === id);
		if (ingredient) {
			if (!ingredientMap[id]) {
				ingredientMap[id] = {
					image: ingredient.image,
					name: ingredient.name,
					price: ingredient.price,
					count: 0,
				};
			}
			ingredientMap[id].count += 1;
		}
	});

	const uniqueIngredients = Object.values(ingredientMap);

	// Подсчет общей суммы заказа
	const totalPrice = uniqueIngredients.reduce(
		(sum, item) => sum + (item?.price || 0) * (item?.count || 1),
		0
	);

	return (
		uniqueIngredients &&
		ingredients && (
			<div className={styles.modal}>
				<div className={styles.container} onClick={(e) => e.stopPropagation()}>
					<div className={styles.number}>
						<p className='text text_type_digits-default'>#{number}</p>
					</div>

					<p className='text text_type_main-medium'>{name}</p>
					<p
						className={`text text_type_main-default mb-15
									${status === 'done' ? 'text_color_success' : 'text_color_accent'}`}>
						{status === 'done' ? 'Выполнен' : 'Готовится'}
					</p>
					<p className='text text_type_main-medium'>Состав:</p>
					<div className={styles.ingredientsList}>
						{uniqueIngredients.map((ingredient, index) => (
							<div className={styles.ingredientItem} key={index}>
								<div className={styles.row}>
									<div className={styles.dot}>
										<img
											src={ingredient?.image}
											className={styles.dot_img}
											alt='Ингредиент'
										/>
									</div>
									<p className='text text_type_main-default'>
										{ingredient?.name}
									</p>
								</div>
								<div className={styles.row}>
									<p className='text text_type_digits-default'>
										{ingredient?.count} x {ingredient?.price}
									</p>
									<CurrencyIcon type={'primary'} />
								</div>
							</div>
						))}
					</div>
					<div className={styles.footer}>
						<p className='text text_type_main-default text_color_inactive'>
							<FormattedDate date={new Date(createdAt)} />
						</p>
						<div className={styles.row}>
							<p className='text text_type_digits-default'>{totalPrice}</p>{' '}
							<CurrencyIcon type={'primary'} />
						</div>
					</div>
				</div>
			</div>
		)
	);
};
