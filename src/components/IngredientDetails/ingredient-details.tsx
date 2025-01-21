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
			<img src={data.image} alt={data.name} className={styles.image} />
			<p className='text text_type_main-medium'>{data.name}</p>
			<div className={styles.info_container}>
				<div className={styles.info_item}>
					<p
						className={`${styles.f16} text text_type_main-default text_color_inactive`}>
						Калории, ккал
					</p>
					<p
						className={`${styles.f28} text text_type_main-default text_color_inactive`}>
						{data.calories}
					</p>
				</div>
				<div className={styles.info_item}>
					<p
						className={`${styles.f16} text text_type_main-default text_color_inactive`}>
						Белки, г
					</p>
					<p
						className={`${styles.f28} text text_type_main-default text_color_inactive`}>
						{data.proteins}
					</p>
				</div>
				<div className={styles.info_item}>
					<p
						className={`${styles.f16} text text_type_main-default text_color_inactive`}>
						Жиры, г
					</p>
					<p
						className={`${styles.f28} text text_type_main-default text_color_inactive`}>
						{data.fat}
					</p>
				</div>
				<div className={styles.info_item}>
					<p
						className={`${styles.f16} text text_type_main-default text_color_inactive`}>
						Углеводы, г
					</p>
					<p
						className={`${styles.f28} text text_type_main-default text_color_inactive`}>
						{data.carbohydrates}
					</p>
				</div>
			</div>
		</div>
	);
};
