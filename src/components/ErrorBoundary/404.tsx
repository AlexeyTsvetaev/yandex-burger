import React from 'react';
import styles from '../../components/BurgerIngredients/burger-ingredients.module.css';
import { AppHeader } from '../AppHeader/app-header';
import containerStyles from '../../pages/login/index.module.scss';

export const Error404 = () => {
	return (
		<>
			<AppHeader />
			<div className={containerStyles.container}>
				<div className={styles.modal_container}>
					<div className={styles.info_container}>
						<div className={containerStyles.content_container}>
							<p className='text text_type_digits-large'>404</p>
							<p className='text text_type_main-medium'>
								Страницы не существует :(
							</p>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
