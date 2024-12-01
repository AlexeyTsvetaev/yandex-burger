import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const AuthRoute = ({ isAuth }: { isAuth: boolean }) => {
	return isAuth ? <Navigate to='/' replace /> : <Outlet />;
};

export default AuthRoute;
