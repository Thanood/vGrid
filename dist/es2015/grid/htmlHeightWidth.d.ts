import { ColConfig, ColumnBindingContext } from '../interfaces';
export declare class HtmlHeightWidth {
    avgScrollBarWidth: number;
    avgPanel_Height: number;
    avgHeader_Height: number;
    avgHeader_Top: number;
    avgContent_Top: number;
    avgContent_Bottom: number;
    avgHeaderLeft_Width: number;
    avgHeaderMain_Left: number;
    avgHeaderMain_Right: number;
    avgHeaderMainScroll_Width: number;
    avgHeaderMainScroll_Height: number;
    avgHeaderRight_Right: number;
    avgHeaderRight_Width: number;
    avgContentLeft_Width: number;
    avgContentLeftScroll_Width: string;
    avgContentLeftScroll_Height: number;
    avgContentMain_Left: number;
    avgContentMain_Right: number;
    avgContentMainScroll_Width: number;
    avgContentMainScroll_Height: number;
    avgContentRight_Right: number;
    avgContentRight_Width: number;
    avgContentRightScroll_Width: string;
    avgContentRightScroll_Height: number;
    avgContentGroup_Width: number;
    avgContentGroup_Height: number;
    avgContentGroup_Top: number;
    avgContentGroup_Bottom: number;
    avgContentVhandle_Width: number;
    avgContentVhandle_Height: number;
    avgContentVhandle_Top: number;
    avgContentVhandleScroll_Height: number;
    avgContentVhandle_Bottom: number;
    avgContentHhandle_Bottom: number;
    avgContentHhandle_Right: number;
    avgContentHhandle_Left: number;
    avgContentHhandle_Height: number;
    avgContentHhandleScroll_Width: number;
    avgFooter_Height: number;
    attHeaderHeight: number;
    attRowHeight: number;
    attFooterHeight: number;
    attPanelHeight: number;
    constructor();
    setCollectionLength(length: number): void;
    addDefaultsAttributes(attHeaderHeight: number, attRowHeight: number, attFooterHeight: number, attPanelHeight: number): void;
    adjustWidthsColumns(columnBindingContext: ColumnBindingContext, groupsLength: number): void;
    setWidthFromColumnConfig(colConfig: Array<ColConfig>, groupsLength?: number): void;
    getScrollbarWidth(): number;
}
