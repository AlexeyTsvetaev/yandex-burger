import React, {FC, useState} from 'react';
import styles from './burger-ingredients.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import {Modal} from "../Modal/Modal";
import {OrderDetails} from "../IngredientDetails/ingredient-details";
import {useModal} from "../../hooks/use-modal";
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
	const {isModalOpen, openModal, closeModal} = useModal()
	return (
		<>
		{isModalOpen && (
			<Modal onClose={() => closeModal()} open={isModalOpen} title={'Детали ингредиента'}>
				<OrderDetails name={name} image={image} calories={calories} fat={fat} carbohydrates={carbohydrates} proteins={proteins} price={price}/>
			</Modal>
		)
		}
			<div className={styles.ingredient_item} key={_id} onClick={() => openModal()}>
				<img className={styles.img_item} src={image} alt={name}/>
				<div
					className={styles.price_block}>
				<p className='text text_type_digits-default'>{price}</p>
				<CurrencyIcon type='primary' />
			</div>
			<p className='text text_type_main-small'>
				{name}
			</p>
		</div>
		</>
	);
};
