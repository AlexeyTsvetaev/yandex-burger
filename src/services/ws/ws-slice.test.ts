import websocketReducer, {
	wsConnecting,
	wsOpen,
	wsClose,
	wsError,
	wsMessage,
	WsStore,
} from './ws-slice';

describe('websocketSlice reducer', () => {
	let initialState: WsStore;

	beforeEach(() => {
		initialState = {
			status: false,
			message: '',
			connectionError: null,
		};
	});

	it('should return the initial state', () => {
		// @ts-ignore
		expect(websocketReducer(undefined, { type: undefined })).toEqual(
			initialState
		);
	});

	it('should handle wsConnecting', () => {
		const newState = websocketReducer(initialState, wsConnecting());
		expect(newState).toEqual({
			...initialState,
			status: true,
		});
	});

	it('should handle wsOpen', () => {
		const newState = websocketReducer(initialState, wsOpen());
		expect(newState).toEqual({
			...initialState,
			status: true,
			connectionError: null,
		});
	});

	it('should handle wsClose', () => {
		const newState = websocketReducer(
			{ ...initialState, status: true },
			wsClose()
		);
		expect(newState).toEqual({
			...initialState,
			status: false,
		});
	});

	it('should handle wsError', () => {
		const errorMessage = 'Connection failed';
		const newState = websocketReducer(initialState, wsError(errorMessage));
		expect(newState).toEqual({
			...initialState,
			connectionError: errorMessage,
		});
	});

	it('should handle wsMessage', () => {
		const testMessage = 'New WebSocket message received';
		const newState = websocketReducer(initialState, wsMessage(testMessage));
		expect(newState).toEqual({
			...initialState,
			message: testMessage,
		});
	});
});
