import { VGrid } from '../v-grid';
import { BindingContextInterface } from '../../interfaces';
export declare class VGridAttributeMenu {
    private element;
    private controller;
    private raiseEvent;
    private openBinded;
    private checkBinded;
    private callbackBinded;
    private groupingElements;
    private context;
    private filter;
    private filterkey;
    private sort;
    private pinned;
    private groupby;
    private hideshow;
    private groupbytitle;
    private copypaste;
    constructor(element: Element, vGrid: VGrid);
    attached(): void;
    bind(context: BindingContextInterface): void;
    unbind(): void;
    private check(e);
    private callback(type, option, event);
    private open(e);
    private getPosition(e);
    private getColumnContext();
}
