import { VGrid } from './v-grid';
import { BindingContext, CustomTargetInstruction, OverrideContext } from '../interfaces';
export declare class VGridElementColConfig {
    private vGrid;
    private element;
    private colRowTemplate;
    private colHeaderTemplate;
    private colCss;
    private colWidth;
    private colField;
    private colHeaderName;
    private colSort;
    private colPinLeft;
    private colPinRight;
    private colFilter;
    private colFilterTop;
    private colAddLabelAttributes;
    private colAddFilterAttributes;
    private colAddRowAttributes;
    private colType;
    constructor(element: Element, vGrid: VGrid, targetInstruction: CustomTargetInstruction);
    bind(bindingContext: BindingContext, overrideContext: OverrideContext): void;
    private checkBool(value);
}
