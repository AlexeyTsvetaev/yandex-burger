import React, {FC, useState} from 'react';
import styles from './burger-ingredients.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import {Modal} from "../Modal/Modal";
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
				<div className={styles.modal_container}>
					<img src={image} alt={name} className={styles.image}/>
					<p className="text text_type_main-medium">
						{name}
					</p>
					<div className={styles.info_container}>
						<div className={styles.info_item}>
							<p className="text text_type_main-default text_color_inactive" style={{fontSize:16}}>
								Калории, ккал
							</p>
							<p className="text text_type_main-default text_color_inactive" style={{fontSize: 28}}>
								{calories}
							</p>
						</div>
						<div className={styles.info_item}>
							<p className="text text_type_main-default text_color_inactive" style={{fontSize:16}}>
								Белки, г
							</p>
							<p className="text text_type_main-default text_color_inactive" style={{fontSize: 28}}>
								{proteins}
							</p>
						</div>
						<div className={styles.info_item}>
							<p className="text text_type_main-default text_color_inactive" style={{fontSize:16}}>
								Жиры, г
							</p>
							<p className="text text_type_main-default text_color_inactive" style={{fontSize: 28}}>
								{fat}
							</p>
						</div>
						<div className={styles.info_item}>
							<p className="text text_type_main-default text_color_inactive" style={{fontSize:16}}>
								Углеводы, г
							</p>
							<p className="text text_type_main-default text_color_inactive" style={{fontSize: 28}}>
								{carbohydrates}
							</p>
						</div>
					</div>
				</div>
			</Modal>
		)
		}
			<div className={styles.ingredient_item} key={_id} onClick={() => setOpenDialog(true)}>
				<img className={styles.img_item} src={image} alt='ingredient'/>
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
		</>
	);
};
