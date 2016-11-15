import { ViewCompiler, Container, ViewResources, HtmlCache, ColumnBindingContext, ViewSlots, ColConfig, OverrideContext } from '../interfaces';
export declare class ColumnMarkup {
    private element;
    private htmlCache;
    private viewSlots;
    private columnBindingContext;
    private markupHelper;
    private viewCompiler;
    private container;
    private viewResources;
    private overrideContext;
    private colConfig;
    private configLength;
    private colRepeater;
    private colRepeatRowTemplate;
    private colRepeatHeaderTemplate;
    private leftScroll;
    private mainScroll;
    private rightScroll;
    private groupScroll;
    private leftHeader;
    private mainHeader;
    private rightHeader;
    private leftRows;
    private mainRows;
    private rightRows;
    private groupRows;
    private rowLength;
    constructor(element: Element, viewCompiler: ViewCompiler, container: Container, viewResources: ViewResources, htmlCache: HtmlCache, viewSlots: ViewSlots, columnBindingContext: ColumnBindingContext);
    init(colConfig: Array<ColConfig>, overrideContext: OverrideContext, colRepeater: boolean, colRepeatRowTemplate: string, colRepeatRowHeaderTemplate: string): void;
    private getRowViews(type);
    private createColSetupContext(type);
    private getHeaderViews(type);
    private generateColumns();
    private createViewSlot(element, viewFactory);
    private updateInternalHtmlCache();
}
