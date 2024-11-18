import styles from "../BurgerIngredients/burger-ingredients.module.css";
import React, {FC} from "react";
import {IIngredients} from "../BurgerIngredients/Ingredient";


export const OrderDetails:FC<IIngredients> = ({calories, proteins, fat, carbohydrates, name, image}) => {
	return (

		<div className={styles.modal_container}>
			<img src={image} alt={name} className={styles.image}/>
			<p className="text text_type_main-medium">
				{name}
			</p>
			<div className={styles.info_container}>
				<div className={styles.info_item}>
					<p className={`${styles.f16} text text_type_main-default text_color_inactive`}>
						Калории, ккал
					</p>
					<p className={`${styles.f28} text text_type_main-default text_color_inactive`}>
						{calories}
					</p>
				</div>
				<div className={styles.info_item}>
					<p className={`${styles.f16} text text_type_main-default text_color_inactive`}>
						Белки, г
					</p>
					<p className={`${styles.f28} text text_type_main-default text_color_inactive`}>
						{proteins}
					</p>
				</div>
				<div className={styles.info_item}>
					<p className={`${styles.f16} text text_type_main-default text_color_inactive`}>
						Жиры, г
					</p>
					<p className={`${styles.f28} text text_type_main-default text_color_inactive`}>
						{fat}
					</p>
				</div>
				<div className={styles.info_item}>
					<p className={`${styles.f16} text text_type_main-default text_color_inactive`}>
						Углеводы, г
					</p>
					<p className={`${styles.f28} text text_type_main-default text_color_inactive` }>
						{carbohydrates}
					</p>
				</div>
			</div>
		</div>
	)
}