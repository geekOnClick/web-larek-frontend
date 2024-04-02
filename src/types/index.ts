export interface IApp {
	catalog: IProductItem[];
	cart: string[];
}

export type ApiListResponse<Type> = {
    total: number,
    items: Type[]
};

export type IProduct = IProductItem & ICartStatus;

export interface IProductItem {
	id: string;
	description: string;
	image: string;
	title: string;
	category: string;
	price: number | null;
}

export interface IOrderForm {
	address: string;
	email: string;
	phone: string;
}

export interface IOrder extends IOrderForm {
	payment: METHOD;
	total: number;
	items: string[];
}

export enum METHOD {
	ONLINE = 'Онлайн',
	RECEIVED = 'При получении',
}

export enum STATUS {
	NOT_IN_CART = 0,
	IN_CART = 1,
	NO_PRICE = 2,
}

export interface ICartStatus {
	cartStatus: STATUS;
}

export type FormErrors = Partial<Record<keyof IOrder, string>>;

export interface IOrderResult {
	id: string;
	total: number;
}
