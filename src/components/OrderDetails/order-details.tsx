import { ReactComponent as Done } from '../../static/images/done.svg';
import { FC } from 'react';
import styles from './order-details.module.css';
interface IOrderDetails {
	numberOrder: number | undefined;
}

export const OrderDetails: FC<IOrderDetails> = ({ numberOrder }) => {
	return (
		<div className={styles.container} data-testid='order-details-modal'>
			<div className={styles.center}>
				<p data-testid='number-order' className='text text_type_digits-large'>
					{numberOrder}
				</p>
			</div>
			<div className={styles.center}>
				<p className='text text_type_main-medium mb-30'>идентификатор заказа</p>
			</div>
			<div className={styles.center}>
				<Done className={'mb-30'} />
			</div>
			<div className={styles.center}>
				<p className='text text_type_main-small mb-8'>
					Ваш заказ начали готовить
				</p>
				<p className='text text_type_main-default text_color_inactive'>
					дождитесь на орбитальной станции{' '}
				</p>
			</div>
		</div>
	);
};
