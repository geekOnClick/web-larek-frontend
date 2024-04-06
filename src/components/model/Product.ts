import {
	IProduct,
	STATUS,
} from '../../types';
import { IEvents } from '../base/Events';

export class Product<T> implements IProduct {
	id: string;
	description: string;
	image: string;
	title: string;
	category: string;
	price: number | null;
	cartStatus: STATUS;

	constructor(data: Partial<T>, protected events: IEvents) {
		Object.assign(this, data);
		this.cartStatus = STATUS.NOT_IN_CART; 
		if (this.price === null) {
			this.cartStatus = STATUS.NO_PRICE;
		}
	}
}