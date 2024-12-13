import { AppHeader } from '../../components/AppHeader/app-header';
import styles from '../../components/app/app.module.scss';
import { BurgerIngredients } from '../../components/BurgerIngredients/burger-ingredients';
import { BurgerConstructor } from '../../components/BurgerConstructor/burger-construtror';
import React, { useEffect } from 'react';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { useDispatch } from 'react-redux';
import { setIngredients } from '../../services/reducers/ingredients-slice';
import { useGetIngredientsQuery } from '../../services/rtk-query/api-slice';

export const MainPage = () => {
	const dispatch = useDispatch();
	const { data, isLoading, error } = useGetIngredientsQuery();

	useEffect(() => {
		if (data && data.success) {
			dispatch(setIngredients(data.data));
		}
	}, [data, dispatch]);

	if (isLoading) return <div>Загрузка...</div>;
	if (error) {
		if ('status' in error) {
			return <div>Ошибка: {`Status: ${error.status}`}</div>;
		} else {
			return <div>Ошибка: {error.message || 'Неизвестная ошибка'}</div>;
		}
	}

	return (
		<>
			<AppHeader />
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
