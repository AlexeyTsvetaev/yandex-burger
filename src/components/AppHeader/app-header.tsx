import styles from './app-header.module.scss';
import { FC } from 'react';
import {
	BurgerIcon,
	ListIcon,
	Logo,
	ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useLocation, useNavigate } from 'react-router';
export const AppHeader: FC = () => {
	const location = useLocation();
	const navigate = useNavigate();

	return (
		<header className={styles.main}>
			<div className={styles.container}>
				<div className={`${styles.left_group} , m-4`}>
					<nav
						onClick={() => navigate('/')}
						className={
							location.pathname === '/'
								? styles.button_primary
								: styles.button_secondary
						}>
						<BurgerIcon
							type={location.pathname === '/' ? 'primary' : 'secondary'}
						/>
						<p className='text text_type_main-default'>Конструктор</p>
					</nav>
					<nav
						onClick={() => navigate('/orders')}
						className={
							location.pathname === '/orders'
								? styles.button_primary
								: styles.button_secondary
						}>
						<ListIcon
							type={location.pathname === '/orders' ? 'primary' : 'secondary'}
						/>
						<p className='text text_type_main-default'>Лента заказов</p>
					</nav>
				</div>
				<nav
					onClick={() => navigate('/profile')}
					className={
						location.pathname === '/profile'
							? styles.button_primary
							: styles.button_secondary
					}>
					<ProfileIcon
						type={location.pathname === '/profile' ? 'primary' : 'secondary'}
					/>
					<p className='text text_type_main-default'>Личный кабинет</p>
				</nav>
				<Logo className={`${styles.logo} ${styles.center}`} />
			</div>
		</header>
	);
};
