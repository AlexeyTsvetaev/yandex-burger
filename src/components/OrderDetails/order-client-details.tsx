import React, { FC, useEffect } from 'react';
import styles from './order-details.module.css';
import {
	CloseIcon,
	CurrencyIcon,
	FormattedDate,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useLocation, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { createPortal } from 'react-dom';
import { ModalOverlay } from '../Modal/modal-overlay';
export interface OrderDetails {
	onClose: () => void;
	open: boolean;
}
export const OrderClientDetails: FC<OrderDetails> = ({ onClose, open }) => {
	const modalRoot = document.getElementById('react-modals');
	const { id } = useParams(); // Получаем orderId из URL
	// Получаем список ингредиентов с их количеством
	const ingredientsDetails = useSelector(
		(state: RootState) => state.ingredients.ingredients
	);
	useEffect(() => {
		const handleEscButton = (e: KeyboardEvent) => {
			if (e.key === 'Escape') onClose();
		};
		document.addEventListener('keydown', handleEscButton);
		return () => {
			document.removeEventListener('keydown', handleEscButton);
		};
	}, [onClose]);
	// Получаем все заказы
	const orders = useSelector(
		(state: RootState) => state.websocket.clientOrders
	);

	// Находим нужный заказ по id
	const order = orders?.orders.find((order) => order._id === id);

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
		const ingredient = ingredientsDetails.find((item) => item._id === id);
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

	return modalRoot
		? createPortal(
				open && uniqueIngredients && ingredientsDetails && (
					<ModalOverlay onClose={onClose}>
						<div className={styles.modal}>
							<div
								className={styles.container}
								onClick={(e) => e.stopPropagation()}>
								<div className={styles.close_icon}>
									<CloseIcon
										type='primary'
										onClick={onClose}
										className={styles.close_icon}
									/>
								</div>
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
									{uniqueIngredients &&
										uniqueIngredients.map((ingredient, index) => (
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
										<p className='text text_type_digits-default'>
											{totalPrice}
										</p>{' '}
										<CurrencyIcon type={'primary'} />
									</div>
								</div>
							</div>
						</div>
					</ModalOverlay>
				),
				modalRoot
		  )
		: null; // Проверка на случай, если modalRoot не найден
};
