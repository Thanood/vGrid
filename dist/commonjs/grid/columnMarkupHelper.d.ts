import { ColConfig } from '../interfaces';
export declare class ColumnMarkupHelper {
    private useCustomOnly;
    generate(colConfig: Array<ColConfig>): void;
    private processColumns(array);
    private createHeaderTemplate(col);
    private createRowTemplate(col);
    private getAttribute(value, capitalize);
    private checkAttribute(attribute);
    private createImageRowMarkup(col);
    private createInputRowMarkup(col);
    private createInputHeaderMarkup(col);
    private createLabelMarkup(col);
}
