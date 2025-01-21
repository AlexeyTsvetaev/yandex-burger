export interface IOrder {
	name: string;
	ingredients: string[];
	_id: string;
	status: string;
	number: number;
	createdAt: string;
	updatedAt: string;
}

export interface IWSMessage {
	success: boolean;
	orders: IOrder[];
	total: number;
	totalToday: number;
}
