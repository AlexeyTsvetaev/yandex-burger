import { AppHeader } from '../AppHeader/App-header';
import styles from './app.module.scss';
import { BurgerIngredients } from '../BurgerIngredients/Burger-ingredients';
import { BurgerConstructor } from '../BurgerConstructor/Burger-construtror';
import React, { useEffect } from "react";
import { url_ingredients } from "../../constants/api";
import { IIngredients } from "../BurgerIngredients/Ingredient";

interface IngredientsData {
	success: boolean;
	data: IIngredients[];
}

export const App = () => {
	const [serverData, setServerData] = React.useState<IIngredients[]>([]);
	const [isError, setIsError] = React.useState<string | null>(null);
	const [isLoading, setIsLoading] = React.useState(false);

	useEffect(() => {
		setIsLoading(true);
		fetch(url_ingredients)
			.then((response) => {
				if (!response.ok) {
					throw new Error(`${response.status}`);
				}
				return response.json();
			})
			.then((data: IngredientsData) => {
				if (data.success) {
					setServerData(data.data);
					setIsError(null);
				} else {
					setIsError('Ошибка получения ингредиентов: сервер вернул успешный статус, но данные не корректны.');
				}
			})
			.catch((error) => {
				setIsError(`Ошибка получения ингредиентов: ${error.message}`);
			})
			.finally(() => {
				setIsLoading(false);
			});
	}, []);

	return (
		isLoading ? (
			<div className={styles.loading}>Загрузка...</div>
		) : (
			isError ? (
				<div className={styles.loading}>Ошибка : {isError}</div>
			) : (
				<>
					<AppHeader />
					<div
						className={styles.main_content}>
						<BurgerIngredients data={serverData} />
						<BurgerConstructor img={''} />
					</div>
				</>
			)
		)
	);
};
