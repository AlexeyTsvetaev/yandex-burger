import styles from './app-header.module.scss';
import { FC } from 'react';
import {
	BurgerIcon,
	ListIcon,
	Logo,
	ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
export const AppHeader: FC = () => {
	return (
		<header className={styles.main}>
			<div className={styles.container}>
				<div className={`${styles.left_group} , m-4`}>
					<nav className={styles.button_primary}>
						<BurgerIcon type='primary' />
						<p className='text text_type_main-default'>Конструктор</p>
					</nav>
					<nav className={styles.button_secondary}>
						<ListIcon type='secondary' />
						<p className='text text_type_main-default'>Лента заказов</p>
					</nav>
				</div>
				<nav className={`${styles.profile_button}`}>
					<ProfileIcon type='secondary' />
					<p className='text text_type_main-default'>Личный кабинет</p>
				</nav>
				<Logo className={`${styles.logo} ${styles.center}`} />
			</div>
		</header>
	);
};
