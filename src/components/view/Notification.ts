import {Component} from "../base/Component";
import {ensureElement} from "../../utils/utils";
import { IEvents } from "../base/events";

interface ISuccessNotification {
    total: number;
}

interface ISuccessActions {
    onClick: () => void;
}

export class Notification extends Component<ISuccessNotification> {
    protected _total: HTMLElement;
    protected _close: HTMLElement;

    constructor(container: HTMLElement, action: ISuccessActions) {
        super(container);

        this._total = ensureElement<HTMLElement>('.order-success__description', this.container);
        this._close = ensureElement<HTMLElement>('.order-success__close', this.container);
        this._close.addEventListener('click', action.onClick);
    }
    set total(value: number){
        this.setText(this._total, 'Списано ' + value + ' синапсов')
    }
}