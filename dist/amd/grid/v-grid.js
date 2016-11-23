var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", "aurelia-framework", "./mainMarkup", "./mainScrollEvents", "./rowMarkup", "./rowScrollEvents", "./columnMarkup", "./htmlCache", "./htmlHeightWidth", "./viewSlots", "./columnBindingContext", "./rowDataBinder", "./rowClickHandler", "./groupingElements", "./controller", "./loadingScreen", "./contextMenu", "../interfaces"], function (require, exports, aurelia_framework_1, mainMarkup_1, mainScrollEvents_1, rowMarkup_1, rowScrollEvents_1, columnMarkup_1, htmlCache_1, htmlHeightWidth_1, viewSlots_1, columnBindingContext_1, rowDataBinder_1, rowClickHandler_1, groupingElements_1, controller_1, loadingScreen_1, contextMenu_1, interfaces_1) {
    var VGrid = (function () {
        function VGrid(element, viewCompiler, container, viewResources, taskQueue) {
            this.element = element;
            this.viewCompiler = viewCompiler;
            this.container = container;
            this.viewResources = viewResources;
            this.taskQueue = taskQueue;
            this.dragDropAttributeSharedContext = {};
            this.resizeAttributeSharedContext = {};
            this.colConfig = [];
            this.backupColConfig = [];
            this.colRepeater = false;
            this.colRepeatRowTemplate = null;
            this.colRepeatRowHeaderTemplate = null;
            this.colGroupRow = null;
            this.colGroupElement = null;
            this.customMenuTemplates = {};
            this.newGrid = true;
            this.controller = new controller_1.Controller(this);
            this.htmlCache = new htmlCache_1.HtmlCache(element);
            this.htmlHeightWidth = new htmlHeightWidth_1.HtmlHeightWidth();
            this.viewSlots = new viewSlots_1.ViewSlots(this.htmlCache);
            this.columnBindingContext = new columnBindingContext_1.ColumnBindingContext(this.controller);
            this.rowDataBinder = new rowDataBinder_1.RowDataBinder(element, this.controller);
            this.mainMarkup = new mainMarkup_1.MainMarkup(element, viewCompiler, container, viewResources, this.htmlHeightWidth, this.viewSlots);
            this.mainScrollEvents = new mainScrollEvents_1.MainScrollEvents(element, this.htmlCache);
            this.rowMarkup = new rowMarkup_1.RowMarkup(element, this.htmlCache);
            this.rowScrollEvents = new rowScrollEvents_1.RowScrollEvents(element, this.htmlCache);
            this.rowClickHandler = new rowClickHandler_1.RowClickHandler(element, this.htmlCache);
            this.columnMarkup = new columnMarkup_1.ColumnMarkup(element, viewCompiler, container, viewResources, this.htmlCache, this.viewSlots, this.columnBindingContext);
            this.groupingElements = new groupingElements_1.GroupingElements(element, viewCompiler, container, viewResources, this.htmlCache, this.viewSlots, this.columnBindingContext);
            this.loadingScreen = new loadingScreen_1.LoadingScreen(element, viewCompiler, container, viewResources, this.viewSlots);
            this.contextMenu = new contextMenu_1.ContextMenu(viewCompiler, container, viewResources, this.viewSlots);
        }
        VGrid.prototype.bind = function (bindingContext, overrideContext) {
            this.bindingContext = bindingContext;
            this.overrideContext = overrideContext;
            this.attRowHeight = this.attRowHeight ? this.attRowHeight * 1 : 25;
            this.attHeaderHeight = this.attHeaderHeight ? this.attHeaderHeight * 1 : 25;
            this.attFooterHeight = this.attFooterHeight ? this.attFooterHeight * 1 : 25;
            this.attPanelHeight = this.attPanelHeight ? this.attPanelHeight * 1 : 25;
            this.attMultiSelect = this.checkBool(this.attMultiSelect);
            this.attManualSelection = this.attManualSelection ? this.checkBool(this.attManualSelection) : null;
            this.attTheme = this.attTheme || 'avg-default';
            this.element.classList.add(this.attTheme);
            this.attOnRowDraw = typeof this.attOnRowDraw === 'function' ? this.attOnRowDraw : null;
            this.attLanguage = typeof this.attLanguage === 'object' ? this.attLanguage : {};
        };
        VGrid.prototype.unbind = function () {
            this.newGrid = false;
            this.viewSlots.unbindAndDetachColumns();
        };
        VGrid.prototype.attached = function () {
            if (this.newGrid) {
                this.backupColConfig = this.colConfig.slice(0);
                if (this.attColConfig) {
                    this.colConfig = this.attColConfig.length > 0 ? this.attColConfig : this.colConfig;
                }
                this.controller.getContext();
                this.controller.createGrid();
            }
            this.viewSlots.bindAndAttachColumns(this.overrideContext, this.columnBindingContext);
            this.attGridConnector.gridCreated(this.controller);
        };
        VGrid.prototype.checkBool = function (value) {
            if (typeof value === 'string') {
                value = value.toLowerCase();
            }
            switch (true) {
                case value === 'true':
                case value === true:
                    value = true;
                    break;
                case value === 'false':
                case value === false:
                    value = false;
                    break;
                default:
                    value = false;
                    break;
            }
            return value;
        };
        return VGrid;
    }());
    exports.VGrid = VGrid;
    VGrid.inject = [Element, aurelia_framework_1.ViewCompiler, aurelia_framework_1.Container, aurelia_framework_1.ViewResources, aurelia_framework_1.TaskQueue];
    __decorate([
        aurelia_framework_1.bindable({ attribute: 'v-row-height' }),
        __metadata("design:type", Number)
    ], VGrid.prototype, "attRowHeight", void 0);
    __decorate([
        aurelia_framework_1.bindable({ attribute: 'v-header-height' }),
        __metadata("design:type", Number)
    ], VGrid.prototype, "attHeaderHeight", void 0);
    __decorate([
        aurelia_framework_1.bindable({ attribute: 'v-footer-height' }),
        __metadata("design:type", Number)
    ], VGrid.prototype, "attFooterHeight", void 0);
    __decorate([
        aurelia_framework_1.bindable({ attribute: 'v-panel-height' }),
        __metadata("design:type", Number)
    ], VGrid.prototype, "attPanelHeight", void 0);
    __decorate([
        aurelia_framework_1.bindable({ attribute: 'v-grid-connector' }),
        __metadata("design:type", interfaces_1.GridConnector)
    ], VGrid.prototype, "attGridConnector", void 0);
    __decorate([
        aurelia_framework_1.bindable({ attribute: 'v-multi-select' }),
        __metadata("design:type", Boolean)
    ], VGrid.prototype, "attMultiSelect", void 0);
    __decorate([
        aurelia_framework_1.bindable({ attribute: 'v-manual-sel' }),
        __metadata("design:type", Boolean)
    ], VGrid.prototype, "attManualSelection", void 0);
    __decorate([
        aurelia_framework_1.bindable({ attribute: 'v-theme' }),
        __metadata("design:type", String)
    ], VGrid.prototype, "attTheme", void 0);
    __decorate([
        aurelia_framework_1.bindable({ attribute: 'v-row-on-draw' }),
        __metadata("design:type", Function)
    ], VGrid.prototype, "attOnRowDraw", void 0);
    __decorate([
        aurelia_framework_1.bindable({ attribute: 'v-columns' }),
        __metadata("design:type", Array)
    ], VGrid.prototype, "attColConfig", void 0);
    __decorate([
        aurelia_framework_1.bindable({ attribute: 'v-language' }),
        __metadata("design:type", Object)
    ], VGrid.prototype, "attLanguage", void 0);
});

//# sourceMappingURL=v-grid.js.map
