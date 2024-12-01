import React, { useEffect, useState } from 'react';
import styles from '../../components/BurgerIngredients/burger-ingredients.module.css';
import { store } from '../../store';
import { AppHeader } from '../../components/AppHeader/app-header';
import containerStyles from './index.module.scss';

export const IngredientsInfoPage = () => {
	const [isLoading, setIsLoading] = useState(false);
	const data = store.getState().ingredients.viewedIngredient;

	useEffect(() => {
		setIsLoading(true);
		if (
			data &&
			data.calories !== 0 &&
			data.name !== '' &&
			data.proteins !== 0 &&
			data.fat !== 0 &&
			data.image !== '' &&
			data.carbohydrates !== 0
		) {
			setIsLoading(false);
		}
	}, [data]);

	return isLoading
		? 'Загружаем данные'
		: data && (
				<>
					<AppHeader />
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
