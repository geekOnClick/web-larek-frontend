import { ensureElement, findKeyByValue } from '../../utils/utils';
import { Component } from '../base/Component';
import { IEvents } from '../base/Events';
import { settings } from '../../utils/constants';
import { STATUS, IProductItem } from '../../types';

interface ICardAction {
	onClick: (event: MouseEvent) => void;
}

export class Card extends Component<IProductItem> {
	protected _image: HTMLImageElement;
	protected _title: HTMLElement;
	protected _category: HTMLElement;
	protected _price: HTMLElement;

	constructor(container: HTMLElement, action?: ICardAction) {
		super(container);
		this._image = ensureElement<HTMLImageElement>(`.card__image`, container);
		this._title = ensureElement<HTMLElement>(`.card__title`, container);
		this._category = ensureElement<HTMLElement>(`.card__category`, container);
		for (const value in settings.category) {
			this._category.classList.remove(
				'card__category_' + String(settings.category[value as keyof object])
			);
		}
		this._price = ensureElement<HTMLElement>(`.card__price`, container);
		if (action) {
			container.addEventListener('click', action.onClick);
		}
	}

	set title(value: string) {
		this.setText(this._title, value);
	}
	set image(value: string) {
		this.setImage(this._image, value, 'Картинка товара: ' + this.title);
	}
	set category(value: string) {
		const category = findKeyByValue(settings.category, value);
		this.setText(this._category, value);
		this._category.classList.add('card__category_' + category);
	}
	set price(value: number | null) {
		if (value === null) {
			this.setText(this._price, 'Бесценно');
		} else {
			this.setText(this._price, value + ' синапсов');
		}
	}
}

export class CardModal extends Card {
	protected _description: HTMLElement;
	protected _cardButton: HTMLElement;

	constructor(container: HTMLElement, events: IEvents, cartStatus: number) {
		super(container);
		this._description = ensureElement<HTMLElement>(`.card__text`, container);
		this._cardButton = ensureElement<HTMLElement>(`.card__button`, container);
		if (cartStatus === STATUS.IN_CART) {
			this.setText(this._cardButton, 'Удалить из корзины');
			this._cardButton.addEventListener('click', () => {
				events.emit('cartItem:delete');
			});
		}
		if (cartStatus === STATUS.NO_PRICE) {
			this.setText(this._cardButton, 'Бесценно');
			this.setDisabled(this._cardButton, true);
		}
		if (cartStatus === STATUS.NOT_IN_CART) {
			this.setText(this._cardButton, 'В корзину');
			this._cardButton.addEventListener('click', () => {
				events.emit('cartItem:add');
			});
		}
	}

	set description(value: string) {
		this.setText(this._description, value);
	}
}
