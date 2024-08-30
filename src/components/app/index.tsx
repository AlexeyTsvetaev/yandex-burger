import { AppHeader } from '../AppHeader/App-header';
import './app.module.scss';
import { BurgerIngredients } from '../BurgerIngredients/Burger-ingredients';
import { BurgerConstructor } from '../BurgerConstructor/Burger-construtror';

export const App = () => {
	return (
		<>
			<AppHeader />
			<div
				style={{
					display: 'flex',
					flexDirection: 'row',
					justifyContent: 'center',
				}}>
				<BurgerIngredients />
				<BurgerConstructor  img={''}/>
			</div>
		</>
	);
};
