var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", "aurelia-framework", "./mainMarkup", "./mainScrollEvents", "./rowMarkup", "./rowScrollEvents", "./columnMarkup", "./htmlCache", "./htmlHeightWidth", "./viewSlots", "./columnBindingContext", "./rowDataBinder", "./rowClickHandler", "./groupingElements", "./controller", "./loadingScreen", "./contextMenu", "./footer"], function (require, exports, aurelia_framework_1, mainMarkup_1, mainScrollEvents_1, rowMarkup_1, rowScrollEvents_1, columnMarkup_1, htmlCache_1, htmlHeightWidth_1, viewSlots_1, columnBindingContext_1, rowDataBinder_1, rowClickHandler_1, groupingElements_1, controller_1, loadingScreen_1, contextMenu_1, footer_1) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var VGrid = (function () {
        function VGrid(element, viewCompiler, container, viewResources, taskQueue) {
            this.element = element;
            this.viewCompiler = viewCompiler;
            this.container = container;
            this.viewResources = viewResources;
            this.taskQueue = taskQueue;
            this.dragDropAttributeSharedContext = {};
            this.resizeAttributeSharedContext = {};
            this.copyPasteValueSharedContext = null;
            this.colConfig = [];
            this.backupColConfig = [];
            this.colRepeater = false;
            this.colRepeatRowTemplate = null;
            this.colRepeatRowHeaderTemplate = null;
            this.colGroupRow = null;
            this.colGroupElement = null;
            this.customMenuTemplates = {};
            this.footerTemplate = null;
            this.loadingScreenTemplate = null;
            this.newGrid = true;
            this.controller = new controller_1.Controller(this);
            this.htmlCache = new htmlCache_1.HtmlCache(element);
            this.htmlHeightWidth = new htmlHeightWidth_1.HtmlHeightWidth(this.controller);
            this.viewSlots = new viewSlots_1.ViewSlots(this.htmlCache);
            this.columnBindingContext = new columnBindingContext_1.ColumnBindingContext(this.controller);
            this.rowDataBinder = new rowDataBinder_1.RowDataBinder(element, this.controller);
            this.mainMarkup = new mainMarkup_1.MainMarkup(element, viewCompiler, container, viewResources, this.htmlHeightWidth, this.viewSlots);
            this.mainScrollEvents = new mainScrollEvents_1.MainScrollEvents(element, this.htmlCache);
            this.rowMarkup = new rowMarkup_1.RowMarkup(element, this.htmlCache);
            this.rowScrollEvents = new rowScrollEvents_1.RowScrollEvents(element, this.htmlCache, this.controller);
            this.rowClickHandler = new rowClickHandler_1.RowClickHandler(element, this.htmlCache);
            this.columnMarkup = new columnMarkup_1.ColumnMarkup(element, viewCompiler, container, viewResources, this.htmlCache, this.viewSlots, this.columnBindingContext);
            this.groupingElements = new groupingElements_1.GroupingElements(element, viewCompiler, container, viewResources, this.htmlCache, this.viewSlots, this.columnBindingContext);
            this.loadingScreen = new loadingScreen_1.LoadingScreen(element, viewCompiler, container, viewResources, this.viewSlots);
            this.contextMenu = new contextMenu_1.ContextMenu(viewCompiler, container, viewResources, this.viewSlots, this.controller);
            this.footer = new footer_1.Footer(this.htmlCache, viewCompiler, container, viewResources, this.viewSlots);
            this.filterOperatorNames = {
                '=': 'equals',
                '<=': 'less than or eq',
                '>=': 'greater than or eq',
                '<': 'less than',
                '>': 'greater than',
                '*': 'contains',
                '!=': 'not equal to',
                '!*': 'does not contain',
                '*=': 'begins with',
                '=*': 'ends with'
            };
            this.filterOperatorTranslationKeys = {
                equals: '=',
                lessThanOrEqual: '<=',
                greaterThanOrEqual: '>=',
                lessThan: '<',
                greaterThan: '>',
                contains: '*',
                notEqualTo: '!=',
                doesNotContain: '!*',
                beginsWith: '*=',
                endsWith: '=*'
            };
        }
        VGrid.prototype.bind = function (bindingContext, overrideContext) {
            this.bindingContext = bindingContext;
            this.overrideContext = overrideContext;
            this.attRowHeight = this.attRowHeight ? this.attRowHeight * 1 : 25;
            this.attHeaderHeight = this.attHeaderHeight ? this.attHeaderHeight * 1 : 25;
            this.attFooterHeight = this.attFooterHeight ? this.attFooterHeight * 1 : 25;
            this.attPanelHeight = this.attPanelHeight ? this.attPanelHeight * 1 : 25;
            this.attDataDelay = this.attDataDelay ? this.attDataDelay * 1 : 0;
            this.attMultiSelect = this.checkBool(this.attMultiSelect);
            this.attManualSelection = this.attManualSelection ? this.checkBool(this.attManualSelection) : null;
            this.attVariableRowHeight = this.attVariableRowHeight ? this.checkBool(this.attVariableRowHeight) : null;
            this.attTheme = this.attTheme || 'avg-default';
            this.element.classList.add(this.attTheme);
            this.attOnRowDraw = typeof this.attOnRowDraw === 'function' ? this.attOnRowDraw : null;
            this.attI18N = typeof this.attI18N === 'function' ? this.attI18N : null;
        };
        VGrid.prototype.unbind = function () {
            this.newGrid = false;
            this.viewSlots.unbindAndDetachColumns();
        };
        VGrid.prototype.attached = function () {
            var _this = this;
            this.attGridConnector.connect(this.controller, function () {
                if (_this.newGrid) {
                    _this.backupColConfig = _this.colConfig.slice(0);
                    if (_this.attColConfig) {
                        _this.colConfig = _this.attColConfig.length > 0 ? _this.attColConfig : _this.colConfig;
                    }
                    _this.controller.getContext();
                    _this.controller.createGrid();
                }
                _this.viewSlots.bindAndAttachColumns(_this.overrideContext, _this.columnBindingContext, _this.attGridConnector.getSelection());
                setTimeout(function () {
                    _this.controller.udateHorizontalScroller();
                }, 50);
                _this.attGridConnector.gridCreated();
            });
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
        __metadata("design:type", Object)
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
        aurelia_framework_1.bindable({ attribute: 'v-i18n' }),
        __metadata("design:type", Function)
    ], VGrid.prototype, "attI18N", void 0);
    __decorate([
        aurelia_framework_1.bindable({ attribute: 'v-data-delay' }),
        __metadata("design:type", Number)
    ], VGrid.prototype, "attDataDelay", void 0);
    __decorate([
        aurelia_framework_1.bindable({ attribute: 'v-variable-row-height' }),
        __metadata("design:type", Boolean)
    ], VGrid.prototype, "attVariableRowHeight", void 0);
    exports.VGrid = VGrid;
});
