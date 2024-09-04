import styles from './burger-constructor.module.css';
import {
	Button,
	ConstructorElement, CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import {FC} from 'react';
import {Modal} from "../Modal/Modal";
import {OrderDetails} from "../OrderDetails/order-details";
import { DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import {IIngredients} from "../BurgerIngredients/Ingredient";
import {useModal} from "../../hooks/use-modal";
import { data }  from '../../utils/ingredients-data'

export interface IBurgerConstructor {
	img: string;
}



export const BurgerConstructor: FC<IBurgerConstructor> = ({ img }) => {
	const {isModalOpen, openModal, closeModal} = useModal()
	return (
		<>
		{isModalOpen && (
			<Modal onClose={() => closeModal()} title={''} open={isModalOpen} style={{height:'auto'}}>
			<OrderDetails numberOrder={123456}/>
			</Modal>
		)}
			<div className={styles.container}>
				<div className={styles.main}>
					<div className={styles.ingredients_block}>
					<div className={styles.bread_container}><ConstructorElement
						type='top'
						isLocked={true}
						text='Краторная булка N-200i (верх)'
						price={200}
						thumbnail={'https://code.s3.yandex.net/react/code/bun-01.png'}
					/></div>
					<div
						className={styles.items_container}>
						{ data && data.map((e:IIngredients) => (<div className={styles.item_constr} key={e._id}>
							<DragIcon type="primary"/>
							<ConstructorElement
								text={e.name}
								price={e.price}
								thumbnail={e.image}
							/>
						</div>))}

					</div>
						<div className={styles.bread_container}>
							<ConstructorElement
								type='bottom'
								isLocked={true}
								text='Краторная булка N-200i (низ)'
								price={200}
								thumbnail={'https://code.s3.yandex.net/react/code/bun-01.png'}
					/></div>
				</div>
			</div>
			<div
				className={styles.order_block}>
				<div className={styles.currency_icon}><p className='text text_type_digits-medium'>610</p>
					<CurrencyIcon type='primary' />
				</div>
				<Button htmlType='button' type='primary' size='large' onClick={()=> openModal()}>
					Оформить заказ
				</Button>
			</div>
		</div>
		</>
	);
};
