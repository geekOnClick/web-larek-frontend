import { ensureElement } from '../../utils/utils';
import { Component } from '../base/Component';
import { IEvents } from '../base/Events';

interface ICartView {
	items: HTMLElement[];
	total: number;
	length: number;
}

export class Cart extends Component<ICartView> {
	protected _items: HTMLElement;
	protected _total: HTMLElement;
	protected _button: HTMLElement;

	constructor(container: HTMLElement, protected events: IEvents) {
		super(container);
		this._items = ensureElement<HTMLElement>(`.basket__list`, container);
		this._total = ensureElement<HTMLElement>(`.basket__price`, container);
		this._button = ensureElement<HTMLElement>(`.basket__button`, container);
		if (this._button) {
			this._button.addEventListener('click', () => {
				events.emit('details:open');
			});
		}
	}

	set items(items: HTMLElement[]) {
		this._items.replaceChildren(...items);
	}

	set total(value: number) {
		this.setText(this._total, value + ' синапсов');
	}

	set length(value: number) {
		if (value === 0) {
			this.setDisabled(this._button, true);
		} else {
			this.setDisabled(this._button, false);
		}
	}
}

interface ICartItemView {
	index: number;
	title: string;
	price: number | null;
}

interface ICartItemAction {
	onClick: (event: MouseEvent) => void;
}

export class CartItem extends Component<ICartItemView> {
	protected _index: HTMLElement;
	protected _title: HTMLElement;
	protected _price: HTMLElement;
	protected _deleteButton: HTMLElement;

	constructor(container: HTMLElement, action?: ICartItemAction) {
		super(container);
		this._index = ensureElement<HTMLElement>(`.basket__item-index`, container);
		this._title = ensureElement<HTMLElement>(`.card__title`, container);
		this._price = ensureElement<HTMLElement>(`.card__price`, container);
		this._deleteButton = ensureElement<HTMLElement>(
			`.basket__item-delete`,
			container
		);
		if (action) {
			if (this._deleteButton) {
				this._deleteButton.addEventListener('click', action.onClick);
			}
		}
	}
	set index(value: number) {
		this.setText(this._index, value);
	}
	set title(value: number) {
		this.setText(this._title, value);
	}
	set price(value: number) {
		this.setText(this._price, value + ' синапсов');
	}
}
