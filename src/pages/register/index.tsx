import React, { useEffect } from 'react';
import styles from '../../components/BurgerIngredients/burger-ingredients.module.css';
import containerStyles from '../login/index.module.scss';
import {
	Button,
	Input,
	PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useNavigate } from 'react-router-dom';
import { reg } from '../../constants/reg-exp-email';
import { registerUser } from '../../services/fetch/register-user';

export const RegisterPage = () => {
	const [email, setEmail] = React.useState('');
	const [password, setPassword] = React.useState('');
	const [name, setName] = React.useState('');
	const [error, setError] = React.useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		if (email !== '') {
			if (!reg.test(email)) {
				setError(true);
			} else {
				setError(false);
			}
		}
	}, [email]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault(); // Предотвращаем перезагрузку страницы при отправке формы
		if (error) return; // Если есть ошибка, не отправляем форму
		try {
			await registerUser(email, password, name, () => navigate('/'));
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<div className={containerStyles.container}>
				<div className={styles.modal_container}>
					<div className={styles.info_container}>
						<div className={containerStyles.content_container}>
							<p className='text text_type_main-medium'>Регистрация</p>
							<form
								onSubmit={handleSubmit}
								className={containerStyles.content_container}>
								<Input
									type={'text'}
									placeholder={'Имя'}
									onChange={(e) => setName(e.target.value)}
									value={name}
									name={'name'}
									size={'default'}
									extraClass='ml-1'
									onPointerEnterCapture={undefined}
									onPointerLeaveCapture={undefined}
								/>
								<Input
									type={'email'}
									placeholder={'E-mail'}
									onChange={(e) => setEmail(e.target.value)}
									value={email}
									name={'email'}
									errorText={error ? 'Введите корректный E-mail' : ''}
									error={error}
									size={'default'}
									extraClass='ml-1'
									onPointerEnterCapture={undefined}
									onPointerLeaveCapture={undefined}
								/>
								<PasswordInput
									onChange={(e) => setPassword(e.target.value)}
									value={password}
									name={'Пароль'}
									extraClass='mb-2'
								/>
								<Button
									htmlType='submit' // Изменено на 'submit'
									type='primary'
									size='large'>
									Зарегистрироваться
								</Button>
							</form>
							<div className={containerStyles.footer_info}>
								<p className='text text_type_main-default text_color_inactive'>
									Уже зарегистрированы? <Link to={'/login'}>Войти</Link>
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
