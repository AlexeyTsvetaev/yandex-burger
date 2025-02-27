import React, { Component, ReactNode } from 'react';
import { Error404 } from './404';

interface ErrorBoundaryProps {
	children: ReactNode;
}

interface ErrorBoundaryState {
	hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
	constructor(props: ErrorBoundaryProps) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError(error: Error) {
		return { hasError: true };
	}

	componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
		console.error('error:', error, errorInfo);
	}

	render() {
		if (this.state.hasError) {
			return <Error404 />;
		}

		return this.props.children;
	}
}

export default ErrorBoundary;
