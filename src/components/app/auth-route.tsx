import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const AuthRoute = ({ isAuth }: { isAuth: boolean }) => {
	const location = useLocation();
	return isAuth ? (
		<Navigate to='/' state={{ from: location }} replace />
	) : (
		<Outlet />
	);
};

export default AuthRoute;
