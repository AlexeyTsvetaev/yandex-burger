import React, { useEffect } from 'react';
import styles from '../../components/BurgerIngredients/burger-ingredients.module.css';
import { AppHeader } from '../../components/AppHeader/app-header';
import containerStyles from '../login/index.module.scss';
import {
	Button,
	Input,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useNavigate } from 'react-router-dom';
import { reg } from '../../constants/reg-exp-email';
import { resetPassword } from '../../services/fetch/reset-password';

export const ForgotPasswordPage = () => {
	const [email, setEmail] = React.useState('');
	const [error, setError] = React.useState(false);

	useEffect(() => {
		if (email !== '') {
			if (!reg.test(email)) {
				setError(true);
			} else setError(false);
		}
	}, [email]);

	const navigate = useNavigate();

	const handleForgotPassword = async () => {
		try {
			await resetPassword(email, () =>
				navigate('/reset-password', {
					state: { fromForgotPassword: true },
				})
			);
		} catch (e) {
			console.log(e);
		}
	};

	const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		handleForgotPassword();
	};

	return (
		<>
			<div className={containerStyles.container}>
				<div className={styles.modal_container}>
					<div className={styles.info_container}>
						<div className={containerStyles.content_container}>
							<p className='text text_type_main-medium'>
								Восстановление пароля
							</p>
							<form
								onSubmit={handleSubmit}
								className={containerStyles.content_container}>
								<Input
									type={'email'}
									placeholder={'E-mail'}
									onChange={handleEmailChange}
									value={email}
									name={'email'}
									errorText={error ? 'Введите корректный E-mail' : ''}
									error={error}
									size={'default'}
									extraClass='ml-1'
									onPointerEnterCapture={undefined}
									onPointerLeaveCapture={undefined}
								/>
								<Button htmlType='submit' type='primary' size='large'>
									Восстановить
								</Button>
							</form>
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
