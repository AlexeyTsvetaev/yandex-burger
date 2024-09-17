import styles from './burger-constructor.module.css';
import {
	Button,
	ConstructorElement,
	CurrencyIcon,
	DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { FC, useMemo, useState } from 'react';
import { Modal } from '../Modal/Modal';
import { OrderDetails } from '../OrderDetails/order-details';

import { IIngredients } from '../BurgerIngredients/Ingredient';
import { useModal } from '../../hooks/use-modal';
import { useDrop, useDrag } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';
import {
	removeItemFromConstructor,
	moveItemInConstructor,
	addItemToConstructorWithUuid,
} from '../../services/reducers/ingredients-slice';
import { RootState } from '../../store';
import { ICreateOrderResponse } from '../../types/ingredients';
import { useCreateOrderMutation } from '../../services/rtk-query/api-slice';

export const BurgerConstructor: FC = () => {
	const { isModalOpen, openModal, closeModal } = useModal();
	const dispatch = useDispatch();
	const ingredients = useSelector(
		(state: RootState) => state.ingredients.burgerConstructor
	);
	const [successOrderData, setOrderData] = useState<ICreateOrderResponse>();

	const bun = ingredients.find((item) => item.type === 'bun') || null;
	const nonBunIngredients = ingredients.filter((item) => item.type !== 'bun');

	const orderDetails = useSelector(
		(state: RootState) => state.ingredients.burgerConstructor
	);
	const ingredientIds = orderDetails
		.filter((item) => item.type !== 'bun') // Фильтруем все, кроме булок
		.map((item) => item._id); // Массив _id

	if (bun) {
		ingredientIds.unshift(bun._id);
		ingredientIds.push(bun._id);
	}
	const [createOrder, { isLoading }] = useCreateOrderMutation();
	const handleOrder = async () => {
		if (!bun) {
			console.error('Булка не выбрана. Невозможно оформить заказ.');
			return; // Останавливаем выполнение, если булки нет
		}

		const orderData = { ingredients: ingredientIds };
		try {
			const response = await createOrder(orderData).unwrap();
			setOrderData(response);
			openModal();
		} catch (error) {
			console.error('Failed to create order:', error);
		}
	};

	const [, dropRef] = useDrop({
		accept: 'ingredient',
		drop(item: IIngredients) {
			if (item.type === 'bun') {
				if (bun) {
					dispatch(removeItemFromConstructor(bun.uuid));
				}
				dispatch(addItemToConstructorWithUuid(item));
			} else {
				dispatch(addItemToConstructorWithUuid(item));
			}
		},
		collect: (monitor) => ({
			isOver: monitor.isOver(),
		}),
	});

	const handleRemoveIngredient = (uuid: string) => {
		dispatch(removeItemFromConstructor(uuid));
	};

	const moveIngredient = (dragIndex: number, hoverIndex: number) => {
		dispatch(
			moveItemInConstructor({
				fromIndex: dragIndex + 1,
				toIndex: hoverIndex + 1,
			})
		);
	};

	const DraggableIngredient: FC<{
		ingredient: IIngredients & { uuid: string };
		index: number;
	}> = ({ ingredient, index }) => {
		const [, dragRef] = useDrag({
			type: 'constructor-ingredient',
			item: { index },
		});

		const [, dropRef] = useDrop({
			accept: 'constructor-ingredient',
			hover(item: { index: number }) {
				const dragIndex = item.index;
				const hoverIndex = index;

				if (dragIndex !== hoverIndex) {
					moveIngredient(dragIndex, hoverIndex);
					item.index = hoverIndex; // Обновляем индекс перетаскиваемого элемента
				}
			},
		});

		return (
			<div
				ref={(node) => dragRef(dropRef(node))}
				className={styles.item_constr}>
				<DragIcon type='primary' />
				<ConstructorElement
					text={ingredient.name}
					price={ingredient.price}
					thumbnail={ingredient.image}
					handleClose={() => handleRemoveIngredient(ingredient.uuid)} // Удаление по uuid
				/>
			</div>
		);
	};

	const totalPrice = useMemo(() => {
		return (
			nonBunIngredients.reduce(
				(total, ingredient) => total + ingredient.price,
				0
			) + (bun ? bun.price * 2 : 0)
		);
	}, [ingredients, bun]);

	return (
		<>
			{isModalOpen && (
				<Modal
					onClose={() => closeModal()}
					title={
						isLoading
							? 'Загружаю данные...'
							: successOrderData && successOrderData.name
					}
					open={isModalOpen}
					style={{ height: 'auto' }}>
					<OrderDetails
						numberOrder={
							isLoading ? 0 : successOrderData && successOrderData.order.number
						}
					/>
				</Modal>
			)}
			<div className={styles.container} ref={dropRef}>
				<div className={styles.main}>
					<div className={styles.ingredients_block}>
						<div className={styles.bread_container}>
							{bun && (
								<ConstructorElement
									type='top'
									isLocked={true}
									text={`${bun.name} (верх)`}
									price={bun.price}
									thumbnail={bun.image}
								/>
							)}
						</div>

						<div className={styles.items_container}>
							{nonBunIngredients.map((ingredient, index) => (
								<DraggableIngredient
									key={ingredient.uuid}
									ingredient={ingredient}
									index={index}
								/>
							))}
						</div>

						<div className={styles.bread_container}>
							{bun && (
								<ConstructorElement
									type='bottom'
									isLocked={true}
									text={`${bun.name} (низ)`}
									price={bun.price}
									thumbnail={bun.image}
								/>
							)}
						</div>
					</div>
				</div>

				<div className={styles.order_block}>
					<div className={styles.currency_icon}>
						<p className='text text_type_digits-medium'>{totalPrice}</p>
						<CurrencyIcon type='primary' />
					</div>
					<Button
						htmlType='button'
						type='primary'
						size='large'
						onClick={() => {
							if (!bun) {
								alert('Добавьте булку для оформления заказа');
								return;
							}
							handleOrder();
						}}>
						Оформить заказ
					</Button>
				</div>
			</div>
		</>
	);
};
