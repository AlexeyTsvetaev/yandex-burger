import React, {FC} from 'react';
import styles from './burger-ingredients.module.css';
import { CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {Modal} from '../Modal/Modal';
import {OrderDetails} from '../IngredientDetails/ingredient-details';
import {useModal} from '../../hooks/use-modal';
import {useDrag} from 'react-dnd';
import {useDispatch} from "react-redux";
import {setViewedIngredient} from "../../services/reducers/ingredients-slice";
export interface IIngredients {
	_id: string;
	name: string;
	type: string;
	proteins: number;
	fat: number;
	carbohydrates?: number;
	calories?: number;
	price: number;
	image: string;
}

export const Ingredient: FC<IIngredients> = ({ name, price, image, _id, calories, proteins, fat, carbohydrates, type }) => {
	const { isModalOpen, openModal, closeModal } = useModal();
	const [, dragRef] = useDrag({
		type: 'ingredient',
		item: { _id, name, price, image, type },
	});
	const dispatch = useDispatch()
	return (
		<>
		{isModalOpen && (
			<Modal onClose={() => closeModal()} open={isModalOpen} title={'Детали ингредиента'}>
					<OrderDetails
						name={name}
						image={image}
						calories={calories}
						fat={fat}
						carbohydrates={carbohydrates}
						proteins={proteins}
						price={price}
						_id={_id}
						type={type}
					/>
			</Modal>
		)
		}
			<div
				ref={dragRef}
				className={styles.ingredient_item}
				key={_id}
				onClick={() => {
					openModal(),
						dispatch(
							setViewedIngredient({
								_id: _id,
								name: name,
								type: type,
								fat: fat,
								calories: calories,
								carbohydrates: carbohydrates,
								image: image,
								price: price,
								proteins: proteins
							})
						);
				}}>
				<img className={styles.img_item} src={image} alt={name}/>
				<div
					className={styles.price_block}>
				<p className='text text_type_digits-default'>{price}</p>
				<CurrencyIcon type='primary' />
			</div>
				<p className={`${styles.text_center} text text_type_main-small`}>
				{name}
				</p>
		</div>
		</>
	);
};
