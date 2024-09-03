import styles from './burger-constructor.module.css';
import {
	Button,
	ConstructorElement, CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import {FC, useState} from 'react';
import {Modal} from "../Modal/Modal";
import {ReactComponent as Done} from "../../static/images/done.svg";

export interface IBurgerConstructor {
	img: string;
}

export const BurgerConstructor: FC<IBurgerConstructor> = ({ img }) => {
	const [openModal, setOpenModal] = useState(false)
	return (
		<>
		{openModal && (
			<Modal onClose={() => setOpenModal(false)} title={''} open={openModal} style={{height:'auto'}}>
				<div style={{marginBottom: 32}}>
					<p className="text text_type_digits-large" style={{textShadow: '#4C4CFF'}}>123456</p>
				</div>
				<p className="text text_type_main-medium" style={{marginBottom: 60}}>
					идентификатор заказа
				</p>
				<Done style={{marginBottom: 60}}/>
				<p className="text text_type_main-small" style={{marginBottom: 8}}>
					Ваш заказ начали готовить
				</p>
				<p className="text text_type_main-default text_color_inactive">
дождитесь на орбитальной станции				</p>
			</Modal>
		)}
			<div className={styles.container}>
				<div className={styles.main}>
					<div style={{display: 'flex', flexDirection: 'column', gap: '10px' }}>
					<ConstructorElement
						type='top'
						isLocked={true}
						text='Краторная булка N-200i (верх)'
						price={200}
						thumbnail={img}
					/>
					<div
						style={{
							display: 'flex',
							flexDirection: 'column',
							gap: '10px',
							height: 350,
							overflow: 'auto',
						}}>
						<ConstructorElement
							text='Краторная булка N-200i (верх)'
							price={50}
							thumbnail={img}
						/>
						<ConstructorElement
							text='Краторная булка N-200i (верх)'
							price={50}
							thumbnail={img}
						/>
						<ConstructorElement
							text='Краторная булка N-200i (верх)'
							price={50}
							thumbnail={img}
						/>
						<ConstructorElement
							text='Краторная булка N-200i (верх)'
							price={50}
							thumbnail={img}
						/>
						<ConstructorElement
							text='Краторная булка N-200i (верх)'
							price={50}
							thumbnail={img}
						/>
						<ConstructorElement
							text='Краторная булка N-200i (верх)'
							price={50}
							thumbnail={img}
						/>
					</div>
					<ConstructorElement
						type='bottom'
						isLocked={true}
						text='Краторная булка N-200i (низ)'
						price={200}
						thumbnail={img}
					/>
				</div>
			</div>
			<div
				style={{
					display: 'flex',
					flexDirection: 'row',
					justifyContent: 'end',
					alignItems: 'center',
				}}>
				<div style={{display:'flex', flexDirection:'row' , alignItems: 'center', marginRight:40, gap:8}}><p className='text text_type_digits-medium'>610</p>
					<CurrencyIcon type='primary' />
				</div>
				<Button htmlType='button' type='primary' size='large' onClick={()=> setOpenModal(true)}>
					Оформить заказ
				</Button>
			</div>
		</div>
		</>
	);
};
