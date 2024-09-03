import { AppHeader } from '../AppHeader/App-header';
import './app.module.scss';
import { BurgerIngredients } from '../BurgerIngredients/Burger-ingredients';
import { BurgerConstructor } from '../BurgerConstructor/Burger-construtror';
import React, { useEffect, useState } from "react";
import { url_ingredients } from "../../constants/api";
import { IIngredients } from "../BurgerIngredients/Ingredient";

interface IngredientsData {
	success: boolean;
	data: IIngredients[];
}


export const App = () => {
	const [serverData, setServerData] = React.useState<IIngredients[]>([]);
	const [isError, setIsError] = React.useState(false)
	const [isLoading, setIsLoading] = React.useState(false)
	useEffect(() => {
		setIsLoading(true)
		fetch(url_ingredients)
			.then((response) => response.json())
			.then((data: IngredientsData) => {
				if (data.success) {
					setIsLoading(false)
					setIsError(false)
					setServerData(data.data);
				} else {
					setIsError(true)
					console.error('Ошибка получения ингредиентов');
				}
			})
			.catch((error) => console.error('Ошибка получения ингредиентов:', error));
	}, []);


	return (
			isLoading ? ( <></>
		) :

				isError ? (<></>) :

				(		<>
	<AppHeader />
	<div
		style={{
			display: 'flex',
			flexDirection: 'row',
			justifyContent: 'center',
		}}>
		<BurgerIngredients  data={serverData}/>
		<BurgerConstructor  img={''}/>
	</div>
</>)

	);
};
