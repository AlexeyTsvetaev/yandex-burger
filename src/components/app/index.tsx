import React, { useEffect } from 'react';
import {
	Routes,
	Route,
	useLocation,
	useNavigate,
	Navigate,
	useParams,
} from 'react-router-dom';
import { MainPage } from '../../pages/main-page';
import { IngredientsInfoPage } from '../../pages/ingredients-info-page';
import { LoginPage } from '../../pages/login';
import { RegisterPage } from '../../pages/register';
import { ForgotPasswordPage } from '../../pages/forgot-password';
import { ResetPasswordPage } from '../../pages/reset-password';
import { ProfilePage } from '../../pages/profile';
import { Error404 } from '../ErrorBoundary/404';
import ErrorBoundary from '../ErrorBoundary';
import ProtectedRoute from './protected-route';
import AuthRoute from './auth-route';
import { Modal } from '../Modal/Modal';
import { store } from '../../store';
import { getTokenToLocal } from '../../constants/local-storage';

const AppContent = () => {
	const isAuth = !!getTokenToLocal();
	const location = useLocation();
	const navigate = useNavigate();
	const background = location.state?.background;
	const ingredients = store
		.getState()
		.ingredients.ingredients.filter((e) => e._id === location.pathname);
	const data = { ...ingredients[0] };
	const handleModalClose = () => {
		navigate(-1); // Закрытие модалки возвращает на предыдущую страницу
	};

	return (
		<ErrorBoundary>
			<Routes location={background || location}>
				{/* Основные маршруты */}
				<Route path='/' element={<MainPage />} />
				<Route path='/ingredients/:id' element={<IngredientsInfoPage />} />

				{/* Защищённые маршруты */}
				<Route element={<ProtectedRoute isAuth={isAuth} />}>
					<Route path='/profile' element={<ProfilePage />} />
				</Route>

				{/* Для неавторизованных пользователей */}
				<Route element={<AuthRoute isAuth={isAuth} />}>
					<Route path='/login' element={<LoginPage />} />
					<Route path='/register' element={<RegisterPage />} />
					<Route path='/forgot-password' element={<ForgotPasswordPage />} />
				</Route>

				{/* Специальная защита для reset-password */}
				<Route
					path='/reset-password'
					element={
						location.state?.fromForgotPassword ? (
							<ResetPasswordPage />
						) : (
							<Navigate to='/forgot-password' replace />
						)
					}
				/>

				{/* 404 страница */}
				<Route path='*' element={<Error404 />} />
			</Routes>

			{/* Модалка для ингредиентов */}
			{background && data && (
				<Routes>
					<Route
						path='/ingredients/:id'
						element={
							<Modal
								onClose={handleModalClose}
								open={true}
								title='Детали ингредиента'>
								{/*<OrderDetails*/}
								{/*	name={data.name}*/}
								{/*	image={data.image}*/}
								{/*	calories={data.calories}*/}
								{/*	fat={data.fat}*/}
								{/*	carbohydrates={data.carbohydrates}*/}
								{/*	proteins={data.proteins}*/}
								{/*	price={data.price}*/}
								{/*	_id={data._id}*/}
								{/*	type={data.type}*/}
								{/*/>*/}
							</Modal>
						}
					/>
				</Routes>
			)}
		</ErrorBoundary>
	);
};

export default AppContent;
