import React, { useEffect, useState } from 'react';
import styles from '../../components/BurgerIngredients/burger-ingredients.module.css';
import { AppHeader } from '../../components/AppHeader/app-header';
import containerStyles from './index.module.scss';
import { useParams } from 'react-router-dom';
import { getIngredients } from '../../services/fetch/get-ingredients';
import { IIngredients } from '../../types/ingredients';

export const IngredientsInfoPage = () => {
	const [isLoading, setIsLoading] = useState(true); // Начальное состояние true
	const [ingredients, setIngredients] = useState<IIngredients[]>([]); // Изначально пустой массив
	const { id } = useParams(); // Получаем id из URL

	useEffect(() => {
		const fetchIngredients = async () => {
			try {
				const response = await getIngredients();
				if (response && response.data) {
					setIngredients(response.data);
				}
			} catch (error) {
				console.error('Ошибка загрузки ингредиентов:', error);
			} finally {
				setIsLoading(false); // Скрываем состояние загрузки после запроса
			}
		};

		fetchIngredients();
	}, []);

	const data = ingredients.find((e) => e._id === id); // Находим один объект по id

	if (isLoading) {
		return <p>Загружаем данные...</p>; // Индикатор загрузки
	}

	if (!data) {
		return <p>Ингредиент не найден</p>; // Проверка на наличие данных
	}

	return (
		<>
			<div className={containerStyles.container}>
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
			</div>
		</>
	);
};
