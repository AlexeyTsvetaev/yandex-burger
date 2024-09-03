import React, {FC, useState} from 'react';
import styles from './burger-ingredients.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import {Modal} from "../Modal/Modal";
import {OrderDetails} from "../IngredientDetails/Ingredient-details";
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

export const Ingredient: FC<IIngredients> = ({ name, price, image, _id, calories, proteins, fat, carbohydrates }) => {
	const [openDialog, setOpenDialog] = useState(false)
	return (
		<>
		{openDialog && (
			<Modal onClose={() => setOpenDialog(false)} open={openDialog} title={'Детали ингредиента'}>
				<OrderDetails name={name} image={image} calories={calories} fat={fat} carbohydrates={carbohydrates} proteins={proteins} price={price}/>
			</Modal>
		)
		}
			<div className={styles.ingredient_item} key={_id} onClick={() => setOpenDialog(true)}>
				<img className={styles.img_item} src={image} alt='ingredient'/>
				<div
					className={styles.price_block}>
				<p className='text text_type_digits-default'>{price}</p>
				<CurrencyIcon type='primary' />
			</div>
			<p className='text text_type_main-small' style={{ textAlign: 'center' }}>
				{name}
			</p>
		</div>
		</>
	);
};
