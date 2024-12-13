import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/app';
import './styles.css';
import { Provider } from 'react-redux';
import { store } from './store';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);
const queryClient = new QueryClient();
root.render(
	<StrictMode>
		<Provider store={store}>
			<QueryClientProvider client={queryClient}>
				<DndProvider backend={HTML5Backend}>
					<BrowserRouter>
						<App />
					</BrowserRouter>
				</DndProvider>
			</QueryClientProvider>
		</Provider>
	</StrictMode>
);
