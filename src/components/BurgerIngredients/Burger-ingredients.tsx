import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import React, {FC, useState} from 'react';
import styles from './burger-ingredients.module.css';
import { IIngredients, Ingredient } from './Ingredient';

interface BurgerIngredientsProps {
	data : IIngredients[]
}

export const BurgerIngredients:FC<BurgerIngredientsProps>= ({data}) => {
	const [current, setCurrent] = useState('one');
	const buns = data.filter((item) => item.type === 'bun');
	const sauces = data.filter((item) => item.type === 'sauce');
	const mains = data.filter((item) => item.type === 'main');


	return (
		<>


			<div className={styles.container}>
				<div className={styles.title}>
					<p className='text text_type_main-large'>Соберите бургер</p>
				</div>
				<div style={{display: 'flex', marginTop: 20, marginBottom: 40}}>
					<Tab
						value='one'
						active={current === 'one'}
						onClick={() => {
							setCurrent('one')
						}}>
						Булки
					</Tab>
					<Tab
						value='two'
						active={current === 'two'}
						onClick={() => setCurrent('two')}>
						Соусы
					</Tab>
					<Tab
						value='three'
						active={current === 'three'}
						onClick={() => setCurrent('three')}>
						Начинки
					</Tab>
				</div>

				<div className={styles.ingredients_container}>
					<div className={styles.container_body}>
						<p className='text text_type_main-medium'>Булки</p>
						<div className={styles.bread_container}>
							{buns.map((item) => (
								<Ingredient
									key={item._id}
									name={item.name}
									price={item.price}
									image={item.image}
									calories={item.calories}
									fat={item.fat}
									carbohydrates={item.carbohydrates}
									proteins={item.proteins}
								/>
							))}
						</div>
						<p className='text text_type_main-medium'>Соусы</p>
						<div className={styles.bread_container}>
							{sauces.map((item) => (
								<Ingredient
									key={item._id}
									name={item.name}
									price={item.price}
									image={item.image}
									calories={item.calories}
									fat={item.fat}
									carbohydrates={item.carbohydrates}
									proteins={item.proteins}/>
							))}
						</div>
						<p className='text text_type_main-medium'>Начинки</p>
						<div className={styles.bread_container}>
							{mains.map((item) => (
								<Ingredient
									key={item._id}
									name={item.name}
									price={item.price}
									image={item.image}
									calories={item.calories}
									fat={item.fat}
									carbohydrates={item.carbohydrates}
									proteins={item.proteins}/>
							))}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
