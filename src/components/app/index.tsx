import React, { useEffect, useState } from 'react';
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
import { RootState, store } from '../../store';
import { getTokenToLocal } from '../../constants/local-storage';
import { Feed, IOrders } from '../../pages/feed';
import {
	IOrder,
	WS_CONNECTION_CLOSED,
	WS_CONNECTION_START,
	WS_CONNECTION_START_CLIENT,
} from '../../services/ws/ws-types';
import { useDispatch, useSelector } from 'react-redux';
import { useGetIngredientsQuery } from '../../services/rtk-query/api-slice';
import { setIngredients } from '../../services/reducers/ingredients-slice';
import { FeedDetails } from '../OrderDetails/feed-details';
import { FeedDetailPage } from '../../pages/feed/feed-detail-page';
import { OrderClientDetails } from '../OrderDetails/order-client-details';
import { OrderDetailsPage } from '../../pages/profile/order-details-page';
const AppContent = () => {
	const isAuth = !!getTokenToLocal();
	const location = useLocation();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const background = location.state?.background;
	const ingredients = store
		.getState()
		.ingredients.ingredients.filter((e) => e._id === location.pathname);
	const dataIng = { ...ingredients[0] };
	const handleModalClose = () => {
		navigate(-1); // Закрытие модалки возвращает на предыдущую страницу
	};
	useEffect(() => {
		if (isAuth) dispatch({ type: WS_CONNECTION_START_CLIENT });
		// Подключаемся к WebSocket при монтировании компонента
		dispatch({ type: WS_CONNECTION_START });

		return () => {
			// Закрываем соединение при размонтировании компонента
			dispatch({ type: WS_CONNECTION_CLOSED });
		};
	}, [dispatch]);

	const { data, isLoading, error } = useGetIngredientsQuery();

	useEffect(() => {
		if (data && data.success) {
			dispatch(setIngredients(data.data));
		}
	}, [data, dispatch]);

	return (
		<ErrorBoundary>
			<Routes location={background || location}>
				{/* Основные маршруты */}
				<Route path='/' element={<MainPage />} />
				<Route path='/ingredients/:id' element={<IngredientsInfoPage />} />
				<Route path={'/feed'} element={<Feed />} />
				<Route path={'/feed/:id'} element={<FeedDetailPage />} />

				{/* Защищённые маршруты */}
				<Route element={<ProtectedRoute isAuth={isAuth} />}>
					<Route path='/profile' element={<ProfilePage />} />
					<Route path='/profile/orders' element={<ProfilePage />} />
					<Route path={'/profile/orders/:id'} element={<OrderDetailsPage />} />
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
			{background && dataIng && (
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
			{/* Модалка для feed */}
			{background && dataIng && (
				<Routes>
					<Route
						path='/feed/:id'
						element={
							<FeedDetails onClose={handleModalClose} open={true}></FeedDetails>
						}
					/>
				</Routes>
			)}
			{/*модалка для заказов клиента*/}
			{background && dataIng && (
				<Routes>
					<Route
						path='profile/orders/:id'
						element={
							<OrderClientDetails
								onClose={handleModalClose}
								open={true}></OrderClientDetails>
						}
					/>
				</Routes>
			)}
		</ErrorBoundary>
	);
};

export default AppContent;
