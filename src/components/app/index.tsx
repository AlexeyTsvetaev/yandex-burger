import React, { useEffect } from 'react';
import styles from '../../pages/feed/style.module.css';
import {
	Routes,
	Route,
	useLocation,
	useNavigate,
	Navigate,
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
import { getTokenToLocal } from '../../constants/local-storage';
import { Feed } from '../../pages/feed';

import { useDispatch } from '../../store';
import { useGetIngredientsQuery } from '../../services/rtk-query/api-slice';
import { setIngredients } from '../../services/reducers/ingredients-slice';
import { FeedDetails } from '../OrderDetails/feed-details';
import { FeedDetailPage } from '../../pages/feed/feed-detail-page';
import { OrderClientDetails } from '../OrderDetails/order-client-details';
import { OrderDetailsPage } from '../../pages/profile/order-details-page';
import { OrderDetails } from '../IngredientDetails/ingredient-details';
import { AppHeader } from '../AppHeader/app-header';
import { useSelector } from '../../store';

const AppContent = () => {
	const dispatch = useDispatch();

	const { data, isLoading, error } = useGetIngredientsQuery();

	useEffect(() => {
		if (data && data.success) {
			dispatch(setIngredients(data.data));
		}
	}, [data, dispatch]);

	const isAuth = !!getTokenToLocal();
	const location = useLocation();
	const navigate = useNavigate();
	const ingredients = useSelector(
		(state) => state.ingredients.ingredients
	).filter((e) => e._id === location.pathname);

	const background = location.state?.background;

	const dataIng = { ...ingredients[0] };
	const handleModalClose = () => {
		navigate(-1); // Закрытие модалки возвращает на предыдущую страницу
	};

	return (
		<>
			{isLoading ? (
				<div className={styles.preloader}>Загружаю ингредиенты...</div>
			) : error ? (
				<div className={styles.preloader}>
					Не могу загрузить ингредиенты, обнови страницу
				</div>
			) : (
				<AppHeader />
			)}

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
						<Route
							path={'/profile/orders/:id'}
							element={<OrderDetailsPage />}
						/>
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
									<OrderDetails />
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
								<Modal onClose={handleModalClose} title={''} open={true}>
									<FeedDetails />
								</Modal>
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
								<Modal onClose={handleModalClose} open={true} title={''}>
									<OrderClientDetails />
								</Modal>
							}
						/>
					</Routes>
				)}
			</ErrorBoundary>
		</>
	);
};

export default AppContent;
