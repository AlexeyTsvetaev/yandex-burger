export interface IIngredients {
	_id: string;
	name: string;
	type: string;
	proteins: number;
	fat: number;
	carbohydrates?: number;
	calories?: number;
	price: number;
	image: string;
}

export interface IIngredientsResponse {
	success: boolean;
	data: IIngredients[];
}



export interface ICreateOrderRequest {
	ingredients: string[]; // Массив идентификаторов ингредиентов
}


export interface ICreateOrderResponse {
	name: string;
	order: {
		number: number;
	};
	success: boolean;
}
