import React, { useEffect } from 'react';
import styles from '../../components/BurgerIngredients/burger-ingredients.module.css';
import { AppHeader } from '../../components/AppHeader/app-header';
import containerStyles from '../login/index.module.scss';
import profileStyles from './style.module.scss';
import {
	Button,
	Input,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useLocation, useNavigate } from 'react-router';
import { logoutUser } from '../../services/fetch/logout';
import { getUserData } from '../../services/fetch/get-user';
import { updateUserData } from '../../services/fetch/patch-user';

export const ProfilePage = () => {
	const [isLoading, setIsLoading] = React.useState(true);
	const [email, setEmail] = React.useState('');
	const [emailEdit, setEmailEdit] = React.useState(true);
	const [nameEdit, setNameEdit] = React.useState(true);
	const [passwordEdit, setPasswordEdit] = React.useState(true);
	const [password, setPassword] = React.useState('');
	const [name, setName] = React.useState('');
	const [error, setError] = React.useState(false);
	const location = useLocation();
	const navigate = useNavigate();
	const handleLogout = async () => {
		try {
			await logoutUser(() => navigate('/login'));
		} catch (error) {
			console.log(error);
		}
	};
	const getUser = async () => {
		try {
			const response = await getUserData();
			if (response) {
				setIsLoading(false);
				setName(response.user.name);
				setEmail(response.user.email);
			}
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		getUser();
	}, []);

	const handleEditUser = async () => {
		try {
			const response = await updateUserData({
				email: email,
				name: name,
				password: password,
			});
			if (response.success) {
				setName(response.user.name);
				setEmail(response.user.email);
				setEmailEdit(true);
				setNameEdit(true);
				setPasswordEdit(true);
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<AppHeader />
			{isLoading ? (
				<p className={`text text_type_main-medium`}>Загружаем данные...</p>
			) : (
				<div className={containerStyles.container}>
					<div className={styles.modal_container}>
						<div className={styles.info_container}>
							<div className={containerStyles.content_container}>
								<div className={profileStyles.main_container}>
									<div className={profileStyles.tabs}>
										<p
											onClick={() => navigate('/profile')}
											className={`text text_type_main-medium ${
												location.pathname === '/profile'
													? ''
													: 'text_color_inactive'
											}`}>
											Профиль
										</p>
										<p
											onClick={() => navigate('/profile/orders')}
											className={`text text_type_main-medium ${
												location.pathname === '/profile/orders'
													? ''
													: 'text_color_inactive'
											}`}>
											История заказов
										</p>
										<p
											className={
												'text text_type_main-medium text_color_inactive'
											}
											onClick={handleLogout}>
											Выход
										</p>
									</div>
									<div className={profileStyles.profile_info}>
										<Input
											onChange={(e) => setName(e.target.value)}
											value={name}
											disabled={nameEdit}
											onIconClick={() => setNameEdit(false)}
											placeholder={'Имя'}
											icon={'EditIcon'}
										/>
										<Input
											onChange={(e) => setEmail(e.target.value)}
											onIconClick={() => setEmailEdit(false)}
											disabled={emailEdit}
											value={email}
											placeholder={'Логин'}
											icon={'EditIcon'}
										/>
										<Input
											onChange={(e) => setPassword(e.target.value)}
											value={password}
											disabled={passwordEdit}
											type='password'
											onIconClick={() => setPasswordEdit(false)}
											icon={'EditIcon'}
											placeholder={'Пароль'}
										/>
										<div className={profileStyles.profile_info_buttons}>
											{(!emailEdit || !nameEdit || !passwordEdit) && (
												<>
													<Button
														htmlType='button'
														type='primary'
														size='large'
														onClick={handleEditUser}>
														Сохранить
													</Button>
													<Button
														onClick={() => {
															setEmailEdit(true);
															setNameEdit(true);
															setPasswordEdit(true);
														}}
														htmlType='button'
														type='secondary'
														size='medium'>
														Отменить
													</Button>
												</>
											)}
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
};
