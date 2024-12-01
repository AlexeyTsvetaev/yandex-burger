import React from 'react';
import styles from '../../components/BurgerIngredients/burger-ingredients.module.css';
import { AppHeader } from '../../components/AppHeader/app-header';
import containerStyles from '../login/index.module.scss';
import {
	Button,
	Input,
	PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useNavigate } from 'react-router-dom';
import { newPassword } from '../../services/fetch/reset-password';

export const ResetPasswordPage = () => {
	const [emailCode, setEmailCode] = React.useState('');
	const [password, setPassword] = React.useState('');
	const navigate = useNavigate();
	const handleSavePassword = async () => {
		try {
			await newPassword(password, emailCode, () => navigate('/'));
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<>
			<AppHeader />
			<div className={containerStyles.container}>
				<div className={styles.modal_container}>
					<div className={styles.info_container}>
						<div className={containerStyles.content_container}>
							<p className='text text_type_main-medium'>
								Восстановление пароля
							</p>
							<PasswordInput
								onChange={(e) => setPassword(e.target.value)}
								value={password}
								placeholder={'Введите новый пароль'}
								name={'пароль'}
								extraClass='mb-2'
							/>
							<Input
								type={'text'}
								placeholder={'Введите код из письма'}
								onChange={(e) => setEmailCode(e.target.value)}
								value={emailCode}
								name={'код'}
								size={'default'}
								extraClass='ml-1'
							/>
							<Button
								htmlType='button'
								type='primary'
								size='large'
								onClick={handleSavePassword}>
								Сохранить
							</Button>
							<div className={containerStyles.footer_info}>
								<p className='text text_type_main-default text_color_inactive'>
									Вспомнили пароль? <Link to={'/login'}>Войти</Link>
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};