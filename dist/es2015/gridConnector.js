define(["require", "exports"], function (require, exports) {
    var GridConnector = (function () {
        function GridConnector(datasource, selection, errorHandler) {
            this.controller = null;
            this.datasource = datasource;
            this.key = datasource.getKey();
            this.selection = selection || datasource.getSelection();
            this.errorhandler = errorHandler || null;
        }
        GridConnector.prototype.getSelection = function () {
            return this.selection;
        };
        GridConnector.prototype.gridCreated = function (controller) {
            this.controller = controller;
            this.eventID = this.datasource.addEventListener(this.eventHandler.bind(this));
            this.raiseEvent('sortIconUpdate');
            this.controller.updateHeights();
            this.controller.triggerScroll(0);
            this.controller.updateHeaderGrouping(this.datasource.getGrouping());
        };
        GridConnector.prototype.select = function (row) {
            this.datasource.select(row);
        };
        GridConnector.prototype.getDatasourceLength = function () {
            return this.datasource.length;
        };
        GridConnector.prototype.getGrouping = function () {
            return this.datasource.getGrouping();
        };
        GridConnector.prototype.group = function (grouping, keepExpanded) {
            var _this = this;
            this.controller.setLoadingScreen(true, null, this.getDatasourceLength()).then(function () {
                _this.datasource.group(grouping, keepExpanded);
            });
        };
        GridConnector.prototype.getElement = function (options) {
            var rowContext = {
                row: options.row,
                selection: this.selection,
                rowRef: this.datasource.getElement(options.row)
            };
            options.callback(rowContext);
        };
        GridConnector.prototype.query = function (a) {
            var _this = this;
            this.controller.setLoadingScreen(true, null, this.getDatasourceLength()).then(function () {
                _this.datasource.query(a);
            });
        };
        GridConnector.prototype.orderBy = function (attribute, addToCurrentSort) {
            var _this = this;
            this.controller.setLoadingScreen(true, null, this.getDatasourceLength()).then(function () {
                _this.datasource.orderBy(attribute, addToCurrentSort);
            });
        };
        GridConnector.prototype.destroy = function () {
            this.datasource.removeEventListener(this.eventID);
        };
        GridConnector.prototype.getCurrentOrderBy = function () {
            return this.datasource.getCurrentOrderBy();
        };
        GridConnector.prototype.getCurrentFilter = function () {
            return this.datasource.getCurrentFilter();
        };
        GridConnector.prototype.getFilterOperatorName = function (operator) {
            return this.datasource.getFilterOperatorName(operator);
        };
        GridConnector.prototype.expandGroup = function (id) {
            var _this = this;
            this.controller.setLoadingScreen(true, null, this.getDatasourceLength()).then(function () {
                _this.datasource.groupExpand(id);
            });
        };
        GridConnector.prototype.collapseGroup = function (id) {
            var _this = this;
            this.controller.setLoadingScreen(true, null, this.getDatasourceLength()).then(function () {
                _this.datasource.groupCollapse(id);
            });
        };
        GridConnector.prototype.eventHandler = function (event) {
            switch (event) {
                case 'collection_changed':
                case 'collection_grouped':
                case 'collection_collapsed_all':
                case 'collection_expanded_all':
                    this.raiseEvent('sortIconUpdate');
                    this.controller.updateHeights();
                    this.controller.triggerScroll(0);
                    this.controller.updateHeaderGrouping(this.datasource.getGrouping());
                    this.controller.setLoadingScreen(false);
                    break;
                case 'collection_collapsed':
                case 'collection_expanded':
                    this.raiseEvent('sortIconUpdate');
                    this.controller.updateHeights();
                    this.controller.triggerScroll(null);
                    this.controller.updateHeaderGrouping(this.datasource.getGrouping());
                    this.controller.setLoadingScreen(false);
                    break;
                case 'collection_sorted':
                    this.raiseEvent('sortIconUpdate');
                    this.controller.rebindAllRows();
                    this.controller.setLoadingScreen(false);
                    break;
                case 'collection_filtered':
                    this.raiseEvent('sortIconUpdate');
                    this.controller.updateHeights();
                    this.controller.triggerScroll(null);
                    this.controller.setLoadingScreen(false);
                    break;
                default:
                    console.log('unknown event');
                    console.log(event);
            }
        };
        GridConnector.prototype.raiseEvent = function (name, data) {
            if (data === void 0) { data = {}; }
            var event = new CustomEvent(name, {
                detail: data,
                bubbles: true
            });
            if (this.controller) {
                this.controller.element.dispatchEvent(event);
            }
        };
        return GridConnector;
    }());
    exports.GridConnector = GridConnector;
});

//# sourceMappingURL=gridConnector.js.map
