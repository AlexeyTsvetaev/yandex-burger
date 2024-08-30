import { FC } from 'react';
import styles from './burger-ingredients.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
export interface IIngredients {
	_id?: string;
	name: string;
	type?: string;
	proteins?: number;
	fat?: number;
	carbohydrates?: number;
	calories?: number;
	price: number;
	image: string;
}

export const Ingredient: FC<IIngredients> = ({ name, price, image, _id }) => {
	return (
		<div className={styles.ingredient_item} key={_id}>
			<img className={styles.img_item} src={image} alt='ingredient' />
			<div
				style={{
					display: 'flex',
					flexDirection: 'row',
					marginTop: 4,
					marginBottom: 4,
					gap: 8,
				}}>
				<p className='text text_type_digits-default'>{price}</p>
				<CurrencyIcon type='primary' />
			</div>
			<p className='text text_type_main-small' style={{ textAlign: 'center' }}>
				{name}
			</p>
		</div>
	);
};
