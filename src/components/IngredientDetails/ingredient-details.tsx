import styles from '../BurgerIngredients/burger-ingredients.module.css';
import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from '../../store';

export const OrderDetails = () => {
	const { id } = useParams();

	// Получаем ингредиенты через useSelector
	const ingredients = useSelector((state) => state.ingredients.ingredients);
	const data = ingredients.find((e) => e._id === id);
	if (!data) {
		return null; // Модальное окно не рендерится, если данных нет
	}
	return (
		<div className={styles.modal_container}>
			{data.image && (
				<img
					src={data.image}
					alt={data.name}
					className={styles.image}
					data-testid='ingredient-image'
				/>
			)}
			{data.name && (
				<p className='text text_type_main-medium' data-testid='ingredient-name'>
					{data.name}
				</p>
			)}
			<div className={styles.info_container}>
				<div className={styles.info_item}>
					<p
						className={`${styles.f16} text text_type_main-default text_color_inactive`}>
						Калории, ккал
					</p>
					{data.calories && (
						<p
							className={`${styles.f28} text text_type_main-default text_color_inactive`}
							data-testid='ingredient-calories'>
							{data.calories}
						</p>
					)}
				</div>
				<div className={styles.info_item}>
					<p
						className={`${styles.f16} text text_type_main-default text_color_inactive`}>
						Белки, г
					</p>
					{data.proteins && (
						<p
							className={`${styles.f28} text text_type_main-default text_color_inactive`}
							data-testid='ingredient-proteins'>
							{data.proteins}
						</p>
					)}
				</div>
				<div className={styles.info_item}>
					<p
						className={`${styles.f16} text text_type_main-default text_color_inactive`}>
						Жиры, г
					</p>
					{data.fat && (
						<p
							className={`${styles.f28} text text_type_main-default text_color_inactive`}
							data-testid='ingredient-fat'>
							{data.fat}
						</p>
					)}
				</div>
				<div className={styles.info_item}>
					<p
						className={`${styles.f16} text text_type_main-default text_color_inactive`}>
						Углеводы, г
					</p>

					{data.carbohydrates && (
						<p
							className={`${styles.f28} text text_type_main-default text_color_inactive`}
							data-testid='ingredient-carbohydrates'>
							{data.carbohydrates}
						</p>
					)}
				</div>
			</div>
		</div>
	);
};
