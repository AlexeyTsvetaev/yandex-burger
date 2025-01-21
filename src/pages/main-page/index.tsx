import styles from '../../components/app/app.module.scss';
import { BurgerIngredients } from '../../components/BurgerIngredients/burger-ingredients';
import { BurgerConstructor } from '../../components/BurgerConstructor/burger-construtror';
import React from 'react';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';

export const MainPage = () => {
	return (
		<>
			<DndProvider backend={HTML5Backend}>
				<main className={styles.main_content}>
					<BurgerIngredients />
					<BurgerConstructor />
				</main>
			</DndProvider>
		</>
	);
};

export default MainPage;
