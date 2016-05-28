"use strict";

System.register(["data/dummyDataGenerator"], function (_export, _context) {
  "use strict";

  var dummyDataGenerator, _createClass, _class, _temp, _initialiseProps, sample01;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_dataDummyDataGenerator) {
      dummyDataGenerator = _dataDummyDataGenerator.dummyDataGenerator;
    }],
    execute: function () {
      _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);
          if (staticProps) defineProperties(Constructor, staticProps);
          return Constructor;
        };
      }();

      _export("sample01", sample01 = (_temp = _class = function () {
        sample01.prototype.onRowDraw = function onRowDraw(data, collectionData) {
          if (data) {
            if (data.number > 100) {
              data.numberColor = "green";
              data.numberFont = "normal";
            } else {
              data.numberColor = "red";
              data.numberFont = "bold";
            }
          }
        };

        sample01.prototype.singleClick = function singleClick(e) {
          console.log("click");
        };

        sample01.prototype.singleDblClick = function singleDblClick(e) {
          console.log("dblClick");
        };

        _createClass(sample01, [{
          key: "filteredRows",
          get: function get() {
            if (this.myGrid.ctx) {
              return this.myGrid.ctx.vGridCollectionFiltered.length;
            } else {
              return 0;
            }
          }
        }]);

        function sample01(element, dummyDataGenerator) {
          var _this = this;

          _classCallCheck(this, sample01);

          _initialiseProps.call(this);

          this.element = element;

          this.dummyDataGenerator = dummyDataGenerator;
          this.dummyDataGenerator.generateData(10000, function (data) {
            _this.myCollection = data;
            _this.collectionLength = _this.myCollection.length;
          });
        }

        sample01.prototype.attached = function attached() {
          this.getMaxRows = this.myGrid.ctx.getMaxRows();
        };

        sample01.prototype.replaceBtn = function replaceBtn(x) {
          var _this2 = this;

          this.dummyDataGenerator.reset();
          this.dummyDataGenerator.generateData(x, function (data) {
            _this2.myCollection = data;
            _this2.collectionLength = _this2.myCollection.length;
          });
        };

        sample01.prototype.addBtn = function addBtn(x, scrollBottom) {
          var _this3 = this;

          this.dummyDataGenerator.generateData(x, function (data) {
            data.forEach(function (x) {
              _this3.myCollection.push(x);
            });
            if (scrollBottom) {
              _this3.myGrid.ctx.scrollBottomNext();
            }

            _this3.collectionLength = _this3.myCollection.length;
          });
        };

        sample01.prototype.insertOneBtn = function insertOneBtn() {
          var _this4 = this;

          try {
            this.dummyDataGenerator.generateData(1, function (data) {
              _this4.myCollection.splice(2, 0, data[0]);
            });
          } catch (e) {
            console.log(e);
          }
        };

        sample01.prototype.insertFiveBtn = function insertFiveBtn() {
          var _this5 = this;

          try {
            for (var i = 0; i < 5; i++) {
              this.dummyDataGenerator.generateData(1, function (data) {
                _this5.myCollection.splice(2, 0, data[0]);
              });
            }
          } catch (e) {
            console.log(e);
          }
        };

        sample01.prototype.removeFirstBtn = function removeFirstBtn() {
          this.myCollection.splice(0, 1);
          this.collectionLength = this.myCollection.length;
        };

        sample01.prototype.removeLastBtn = function removeLastBtn() {
          this.myCollection.pop();
          this.collectionLength = this.myCollection.length;
        };

        sample01.prototype.removeFirstxBtn = function removeFirstxBtn(x) {
          this.myCollection.splice(0, x);
          this.collectionLength = this.myCollection.length;
        };

        sample01.prototype.removeLastxBtn = function removeLastxBtn(x) {
          this.myCollection.splice(this.myCollection.length - x, x);
          this.collectionLength = this.myCollection.length;
        };

        sample01.prototype.miscBtn = function miscBtn() {
          var _this6 = this;

          this.myCollection.pop();

          this.myCollection.splice(2, 2);

          this.myCollection.splice(4, 2);

          this.dummyDataGenerator.generateData(2, function (data) {
            _this6.myCollection.push(data[0]);
            _this6.myCollection.push(data[1]);
          });
        };

        sample01.prototype.saveStateBtn = function saveStateBtn() {
          this.oldState = this.myGrid.ctx.getColumns(this.oldState);
        };

        sample01.prototype.loadStateBtn = function loadStateBtn() {
          if (this.oldState) {
            this.myGrid.ctx.setColumns(this.oldState);
            this.myGrid.ctx.rebuildColumns();
          }
        };

        sample01.prototype.switchNameBtn = function switchNameBtn() {
          var oldState = this.myGrid.ctx.getColumns(this.oldState);
          var oldIndex = oldState.colAttrArray.indexOf("name");
          var newIndex = oldState.colAttrArray.indexOf("color");

          oldState.colAttrArray[oldIndex] = "color";
          oldState.colAttrArray[newIndex] = "name";

          oldState.colHeaderArray[oldIndex] = "Color";
          oldState.colHeaderArray[newIndex] = "Name";

          this.myGrid.ctx.setColumns(oldState);
          this.myGrid.ctx.rebuildColumns();
        };

        sample01.prototype.report = function report() {
          this.myGrid.ctx.createReport();
        };

        sample01.prototype.redraw = function redraw() {
          this.myGrid.ctx.redrawGrid();
        };

        sample01.prototype.runFilterByCode = function runFilterByCode() {
          var _this7 = this;

          this.myGrid.ctx.setSorting({ attribute: "name", asc: true }, true);
          this.myGrid.ctx.setSorting({ attribute: "index", asc: true }, true);

          var simpleFilter = function simpleFilter(attribute, value, operator) {
            var _this7$myGrid$ctx$vGr;

            _this7.myGrid.ctx.vGridFilter.queryStrings = (_this7$myGrid$ctx$vGr = {}, _this7$myGrid$ctx$vGr[attribute] = value, _this7$myGrid$ctx$vGr);
            _this7.myGrid.ctx.rebuildColumns();
            _this7.myGrid.ctx.runFilter([{ attribute: attribute, value: value, operator: operator }]);
          };
          simpleFilter("name", "ge", "*");
        };

        return sample01;
      }(), _class.inject = [Element, dummyDataGenerator], _initialiseProps = function _initialiseProps() {
        this.myCollection = [];
        this.myCurrentEntity = {};
        this.myGrid = {};
        this.collectionLength = 0;
        this.oldState = null;
      }, _temp));

      _export("sample01", sample01);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNhbXBsZXMvc2FtcGxlMDMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQVEsd0IsMkJBQUEsa0I7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzswQkFHSyxROzJCQW9CWCxTLHNCQUFXLEksRUFBTSxjLEVBQWdCO0FBQy9CLGNBQUksSUFBSixFQUFVO0FBQ1IsZ0JBQUcsS0FBSyxNQUFMLEdBQVksR0FBZixFQUFtQjtBQUNqQixtQkFBSyxXQUFMLEdBQW1CLE9BQW5CO0FBQ0EsbUJBQUssVUFBTCxHQUFrQixRQUFsQjtBQUNELGFBSEQsTUFHTztBQUNMLG1CQUFLLFdBQUwsR0FBbUIsS0FBbkI7QUFDQSxtQkFBSyxVQUFMLEdBQWtCLE1BQWxCO0FBQ0Q7QUFDRjtBQUVGLFM7OzJCQUdELFcsd0JBQVksQyxFQUFFO0FBQ1osa0JBQVEsR0FBUixDQUFZLE9BQVo7QUFDRCxTOzsyQkFHRCxjLDJCQUFlLEMsRUFBRTtBQUNmLGtCQUFRLEdBQVIsQ0FBWSxVQUFaO0FBQ0QsUzs7Ozs4QkE5QmlCO0FBQ2hCLGdCQUFHLEtBQUssTUFBTCxDQUFZLEdBQWYsRUFBbUI7QUFDakIscUJBQU8sS0FBSyxNQUFMLENBQVksR0FBWixDQUFnQix1QkFBaEIsQ0FBd0MsTUFBL0M7QUFDRCxhQUZELE1BRU87QUFDTCxxQkFBTyxDQUFQO0FBQ0Q7QUFDRjs7O0FBa0NELDBCQUFZLE9BQVosRUFBcUIsa0JBQXJCLEVBQXlDO0FBQUE7O0FBQUE7O0FBQUE7O0FBRXZDLGVBQUssT0FBTCxHQUFlLE9BQWY7O0FBR0EsZUFBSyxrQkFBTCxHQUEwQixrQkFBMUI7QUFDQSxlQUFLLGtCQUFMLENBQXdCLFlBQXhCLENBQXFDLEtBQXJDLEVBQTRDLFVBQUMsSUFBRCxFQUFVO0FBQ3BELGtCQUFLLFlBQUwsR0FBb0IsSUFBcEI7QUFDQSxrQkFBSyxnQkFBTCxHQUF3QixNQUFLLFlBQUwsQ0FBa0IsTUFBMUM7QUFDRCxXQUhEO0FBS0Q7OzJCQUVELFEsdUJBQVU7QUFD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