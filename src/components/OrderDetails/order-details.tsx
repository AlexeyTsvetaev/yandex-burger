import {ReactComponent as Done} from "../../static/images/done.svg";
import {FC} from "react";
import styles from './order-details.module.css'
interface IOrderDetails {
	numberOrder: number
}

export const OrderDetails:FC<IOrderDetails> = ({numberOrder = 123456}) => {
	return (
		<div className={styles.container}>
			<div>
				<p className="text text_type_digits-large">{numberOrder}</p>
			</div>
			<p className="text text_type_main-medium mb-30" >
				идентификатор заказа
			</p><Done className={"mb-30"}/><p className="text text_type_main-small mb-8" >
			Ваш заказ начали готовить
		</p><p className="text text_type_main-default text_color_inactive">
			дождитесь на орбитальной станции </p>
		</div>
	)
}