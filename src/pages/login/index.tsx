import React, { useEffect } from 'react';
import styles from '../../components/BurgerIngredients/burger-ingredients.module.css';
import { AppHeader } from '../../components/AppHeader/app-header';
import containerStyles from './index.module.scss';
import {
	Button,
	Input,
	PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useNavigate } from 'react-router-dom';
import { reg } from '../../constants/reg-exp-email';
import { authUser } from '../../services/fetch/auth-user';

export const LoginPage = () => {
	const [email, setEmail] = React.useState('');
	const [password, setPassword] = React.useState('');
	const [error, setError] = React.useState(false);
	const navigate = useNavigate();
	useEffect(() => {
		if (email !== '') {
			if (!reg.test(email)) {
				setError(true);
			} else setError(false);
		}
	}, [email]);
	const handleLogin = async () => {
		try {
			await authUser(email, password, () => navigate('/'));
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
							<p className='text text_type_main-medium'>Вход</p>
							<Input
								type={'text'}
								placeholder={'E-mail'}
								onChange={(e) => setEmail(e.target.value)}
								value={email}
								name={'name'}
								errorText={error ? 'Введите корректный E-mail' : ''}
								error={error}
								size={'default'}
								extraClass='ml-1'
							/>
							<PasswordInput
								onChange={(e) => setPassword(e.target.value)}
								value={password}
								name={'Пароль'}
								extraClass='mb-2'
							/>
							<Button
								htmlType='button'
								type='primary'
								size='large'
								onClick={handleLogin}>
								Войти
							</Button>
							<div className={containerStyles.footer_info}>
								<p className='text text_type_main-default text_color_inactive'>
									Вы - новый пользователь?{' '}
									<Link to={'/register'}>Зарегистрироваться</Link>
								</p>
								<p className='text text_type_main-default text_color_inactive'>
									Забыли пароль?{' '}
									<Link to={'/forgot-password'}>Восстановить пароль</Link>
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};