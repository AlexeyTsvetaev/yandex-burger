import styles from './style.module.css';
import { FC } from 'react';
import {
	Counter,
	CurrencyIcon,
	FormattedDate,
} from '@ya.praktikum/react-developer-burger-ui-components';

type imgIng = {
	image: string;
	count: number;
};

interface IFeedItem {
	onClick?: () => void;
	feedNumber?: number;
	feedDate?: string;
	showStatus?: boolean;
	status?: string;
	feedName?: string;
	imgIngredient?: imgIng[];
	price?: number;
}

export const FeedItem: FC<IFeedItem> = ({
	onClick,
	feedNumber,
	feedDate = new Date().toString(),
	status,
	showStatus = false,
	feedName,
	imgIngredient,
	price = 0,
}) => {
	return (
		<div className={styles.feed_item_container} onClick={onClick}>
			<div className={styles.feed_item_container_feed_number}>
				<p className='text text_type_digits-default'>{feedNumber}</p>
				<p className='text text_type_main-default text_color_inactive'>
					<FormattedDate date={new Date(feedDate)} />
				</p>
			</div>
			<div className={styles.feed_item_container_feed_name}>
				<p className='text text_type_main-medium'>{feedName}</p>
			</div>
			{showStatus && (
				<div className={styles.feed_item_container_feed_name}>
					<p
						className={`text text_type_main-default ${
							status === 'done'
								? 'text_color_success'
								: status === 'pending'
								? 'text_color_accent'
								: 'text_color_primary'
						}`}>
						{status === 'done'
							? 'Выполнен'
							: status === 'pending'
							? 'Готовится'
							: 'Создан'}
					</p>
				</div>
			)}
			<div className={styles.feed_item_container_feed_ingredients}>
				<div className={styles.dot_container}>
					{imgIngredient?.map(({ image, count }, index) => (
						<div className={styles.dot} key={index}>
							<div className={styles.dot_img}>
								<img className={styles.dot_img} src={image} />
								{count > 1 && (
									<div className={styles.dot_number}>
										<Counter count={count} size='small' />
									</div>
								)}
							</div>
						</div>
					))}
				</div>
				<div className={styles.price_container}>
					<p className='text text_type_digits-medium'>{price}</p>
					<CurrencyIcon type='primary' />
				</div>
			</div>
		</div>
	);
};
