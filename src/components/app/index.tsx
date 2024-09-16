import { AppHeader } from '../AppHeader/app-header';
import styles from './app.module.scss';
import { BurgerIngredients } from '../BurgerIngredients/burger-ingredients';
import { BurgerConstructor } from '../BurgerConstructor/burger-construtror';
import React, { useEffect } from 'react';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { useDispatch } from 'react-redux';
import { useGetQuery } from '../../hooks/use-get-query';
import { url_ingredients } from '../../constants/api';
import { IIngredientsResponse} from '../../types/ingredients';
import { setIngredients } from '../../services/reducers/ingredients-slice';

export const App = () => {
	const dispatch = useDispatch();
	const { data, isLoading, error } = useGetQuery<IIngredientsResponse>(
		url_ingredients,
		['ingredients'],
		() => '',
		{ enabled: true },
		0,
		false
	);

	useEffect(() => {
		if (data && data.success) {
			dispatch(setIngredients(data.data));
		}
	}, [data, dispatch]);

	if (isLoading) return <div>Загрузка...</div>;
	if (error) return <div>Ошибка: {error.message}</div>;

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

export default App;
