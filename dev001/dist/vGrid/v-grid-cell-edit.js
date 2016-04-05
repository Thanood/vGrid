"use strict";

System.register([], function (_export, _context) {
  var VGridCellEdit;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [],
    execute: function () {
      _export("VGridCellEdit", VGridCellEdit = function () {
        function VGridCellEdit(parent) {
          _classCallCheck(this, VGridCellEdit);

          this.first = -1;
          this.last = -1;
          this.editMode = false;
          this.parent = null;
          this.element = null;
          this.update = true;

          this.parent = parent;
          this.element = parent.element;
          this.addGridKeyListner();
        }

        VGridCellEdit.prototype.setCellsFromElement = function setCellsFromElement(e, direction) {
          var thisTop;
          var element;
          var x = 10;
          var node = e;
          for (var i = 0; i < x; i++) {
            try {
              if (node.classList.contains(this._private.css.row)) {
                var row = parseInt(node.getAttribute("row"));
                for (var y = 0; y < this._private.htmlCache.rowsArray.length; y++) {
                  if (row === this._private.htmlCache.rowsArray[y].top / this._private.rowHeight) {
                    thisTop = this._private.htmlCache.rowsArray[y + direction].top;
                    element = this._private.htmlCache.rowsArray[y + direction].div;
                  }
                }
              }
              node = node.offsetParent;
            } catch (x) {}
          }
          if (element) {
            this.cells = element.querySelectorAll("." + this._private.css.cellContent);
          }
          return thisTop;
        };

        VGridCellEdit.prototype.setCellsFromTopValue = function setCellsFromTopValue(top) {
          var element = 0;
          for (var i = 0; i < this._private.htmlCache.rowsArray.length; i++) {
            if (this._private.htmlCache.rowsArray[i].top === top) {
              element = this._private.htmlCache.rowsArray[i].div;
            }
          }
          if (element) {
            this.cells = element.querySelectorAll("." + this._private.css.cellContent);
          }
        };

        VGridCellEdit.prototype.removeEditCssClasses = function removeEditCssClasses(element) {
          element.setAttribute("readonly", "false");
          element.classList.remove(this._private.css.editCell);
          element.classList.remove(this._private.css.editCellWrite);
          element.classList.remove(this._private.css.editCellFocus);
        };

        VGridCellEdit.prototype.dispatchCellClick = function dispatchCellClick(index) {
          var event = new MouseEvent('click', {
            'view': window,
            'bubbles': true,
            'cancelable': true
          });
          this.setAsSingleClick = true;
          if (this.cells[index]) {
            this.cells[index].dispatchEvent(event);
          }
        };

        VGridCellEdit.prototype.keyDownDelay = function keyDownDelay(callback) {
          var _this = this;

          if (!this.timer) {
            this.timer = setTimeout(function () {
              _this.timer = null;
              callback();
            }, 150);
          }
        };

        VGridCellEdit.prototype.addGridKeyListner = function addGridKeyListner() {

          this.element.onkeydown = function (e) {
            var _this2 = this;

            if (e.keyCode === 33) {
              e.preventDefault();
              this.updateBeforeNext(this.callbackObject());
              this.keyDownDelay(function () {
                if (_this2.curElement) {
                  var currentscrolltop = _this2.gridCtx.getScrollTop();

                  var rowHeight = _this2._private.rowHeight;
                  var containerHeight = _this2._private.htmlCache.content.clientHeight;
                  var containerRows = parseInt(containerHeight / rowHeight, 10);
                  var buffer = parseInt(containerHeight / 2, 10);
                  if (currentscrolltop !== _this2._private.configFunctions.getCollectionLength() * rowHeight - containerHeight) {
                    buffer = buffer * 2;
                  }

                  _this2.removeEditCssClasses(_this2.curElement);
                  _this2.top = _this2.setCellsFromElement(_this2.curElement, 0);
                  _this2.gridCtx.setScrollTop(currentscrolltop - (containerHeight - buffer));
                  var newTop = _this2.top - containerRows * rowHeight;
                  if (newTop / rowHeight <= 0) {
                    newTop = 0;
                  }
                  setTimeout(function () {
                    _this2.setCellsFromTopValue(newTop);
                    _this2.dispatchCellClick(_this2.index);
                  }, 100);
                }
              });
            }

            if (e.keyCode === 34) {
              e.preventDefault();
              this.updateBeforeNext(this.callbackObject());
              this.keyDownDelay(function () {
                if (_this2.curElement) {
                  var currentscrolltop = _this2.gridCtx.getScrollTop();

                  var rowHeight = _this2._private.rowHeight;
                  var containerHeight = _this2._private.htmlCache.content.clientHeight;
                  var containerRows = parseInt(containerHeight / rowHeight, 10);
                  var buffer = parseInt(containerHeight / 2, 10);
                  if (currentscrolltop !== 0) {
                    buffer = buffer * 2;
                  }

                  _this2.removeEditCssClasses(_this2.curElement);
                  _this2.top = _this2.setCellsFromElement(_this2.curElement, 0);
                  _this2.gridCtx.setScrollTop(currentscrolltop + (containerHeight - buffer));
                  var newTop = _this2.top + containerRows * rowHeight;
                  if (newTop / rowHeight >= _this2._private.configFunctions.getCollectionLength()) {
                    newTop = _this2._private.configFunctions.getCollectionLength() * rowHeight;
                    newTop = newTop - rowHeight;
                  }
                  setTimeout(function () {
                    _this2.setCellsFromTopValue(newTop);
                    _this2.dispatchCellClick(_this2.index);
                  }, 100);
                }
              });
            }

            if (e.keyCode === 40) {
              e.preventDefault();
              this.keyDownDelay(function () {
                if (_this2.curElement) {
                  _this2.removeEditCssClasses(_this2.curElement);
                  _this2.top = _this2.setCellsFromElement(_this2.curElement, +1);
                  _this2.dispatchCellClick(_this2.index);
                }
              });
            }

            if (e.keyCode === 39 && !this.editMode) {
              e.preventDefault();
              this.keyDownDelay(function () {
                if (_this2.curElement) {
                  if (!_this2.last) {
                    _this2.removeEditCssClasses(_this2.curElement);
                    _this2.dispatchCellClick(_this2.index + 1);
                  }
                }
              });
            }

            if (e.keyCode === 37 && !this.editMode) {
              e.preventDefault();
              this.keyDownDelay(function () {
                if (_this2.curElement) {
                  if (!_this2.first) {
                    _this2.removeEditCssClasses(_this2.curElement);
                    _this2.dispatchCellClick(_this2.index - 1);
                  }
                }
              });
            }

            if (e.keyCode === 38) {
              e.preventDefault();
              this.keyDownDelay(function () {
                if (_this2.curElement) {
                  _this2.removeEditCssClasses(_this2.curElement);
                  _this2.top = _this2.setCellsFromElement(_this2.curElement, -1);
                  _this2.dispatchCellClick(_this2.index);
                }
              });
            }

            if (e.keyCode === 9 && e.shiftKey === true) {
              e.preventDefault();
              this.keyDownDelay(function () {
                if (_this2.curElement) {
                  _this2.removeEditCssClasses(_this2.curElement);
                  _this2.index = _this2.index - 1;
                  if (_this2.first) {
                    _this2.index = _this2.cells.length - 1;
                    _this2.top = _this2.setCellsFromElement(_this2.curElement, -1);
                  }
                  _this2.dispatchCellClick(_this2.index);
                }
              });
            }

            if (e.keyCode === 9 && e.shiftKey === false) {
              e.preventDefault();
              this.keyDownDelay(function () {
                if (_this2.curElement) {
                  _this2.removeEditCssClasses(_this2.curElement);
                  _this2.index = _this2.index + 1;
                  if (_this2.last) {
                    _this2.index = 0;
                    _this2.top = _this2.setCellsFromElement(_this2.curElement, 1);
                  }
                  _this2.dispatchCellClick(_this2.index);
                }
              });
            }
          }.bind(this);
        };

        VGridCellEdit.prototype.elementBlur = function elementBlur() {
          this.removeEditCssClasses(this.curElement);
          this.top = this.setCellsFromElement(this.curElement, 0);
          this.updateCurrentDone(this.callbackObject());
          this.editMode = false;
          this.setCellsFromTopValue(this.top);
          this.dispatchCellClick(this.index);
        };

        VGridCellEdit.prototype.elementKeyDown = function elementKeyDown() {
          var _this3 = this;

          this.curElement.onkeydown = function (e) {
            if (e.keyCode == 13) {
              _this3.elementBlur();
              return false;
            }
            if (_this3.readOnly === true && e.keyCode !== 9) {
              return false;
            } else {
              return true;
            }
          };
        };

        VGridCellEdit.prototype.editHandler = function editHandler(obj) {

          if (this.parent.eventEditHandler) {
            return this.parent.$parent[this.parent.eventEditHandler]("afterEdit", {
              attribute: this.attribute,
              value: this.curElement.value,
              oldValue: this.parent.collectionFiltered[this.row][this.attribute],
              element: this.curElement
            });
          } else {
            return obj;
          }
        };

        VGridCellEdit.prototype.callbackObject = function callbackObject() {

          return {
            attribute: this.attribute,
            value: this.curElement.value,
            oldValue: this.oldValue,
            element: this.curElement
          };
        };

        VGridCellEdit.prototype.onScroll = function onScroll() {
          if (this.updated === false) {
            this.updateActual(this.callbackObject());
          }
        };

        VGridCellEdit.prototype.setBackFocus = function setBackFocus() {
          if (this.curElement) {
            var rowNo = this.parent.filterRow;
            var rowheight = this._private.rowHeight;
            this.setCellsFromTopValue(rowNo * rowheight);
            if (this.cells.length > 0) {
              this.curElement = this.cells[this.index];

              if (!this.cells[this.index].classList.contains(this._private.css.editCell)) {
                this.cells[this.index].classList.add(this._private.css.editCell);
              }

              if (!this.cells[this.index].classList.contains(this._private.css.editCellWrite)) {
                this.cells[this.index].classList.add(this._private.css.editCellWrite);
              }

              if (this.editMode) {
                if (this.readOnly === false) {
                  if (this.cells[this.index].classList.contains(this._private.css.editCellFocus)) {
                    this.cells[this.index].classList.remove(this._private.css.editCellFocus);
                  }
                  this.cells[this.index].removeAttribute("readonly");
                } else {
                    this.cells[this.index].classList.add(this._private.css.editCellFocus);
                  }
              } else {
                this.cells[this.index].classList.add(this._private.css.editCellFocus);
              }
            }
          }
        };

        VGridCellEdit.prototype.updateCurrentDone = function updateCurrentDone(obj) {
          if (this.attributeType !== "image" && this.editMode) {
            obj = this.editHandler(obj);
            this.parent.currentRowEntity[obj.attribute] = obj.value;
            this.parent.currentEntity[obj.attribute] = obj.value;
            this.parent.gridContext.ctx.updateRow(this.filterRow, true);
          }
          this.updated = true;
        };

        VGridCellEdit.prototype.updateBeforeNext = function updateBeforeNext(obj) {
          if (this.attributeType !== "image" && this.editMode) {
            obj = this.editHandler(obj);
            this.parent.collectionFiltered[this.row][obj.attribute] = obj.value;
          }
          this.updated = true;
        };

        VGridCellEdit.prototype.updateLastRow = function updateLastRow(row) {
          this.parent.gridContext.ctx.updateRow(row, true);
        };

        VGridCellEdit.prototype.updateActual = function updateActual(obj) {

          if (obj.oldValue !== obj.value && this.attributeType !== "image" && this.editMode) {
            obj = this.editHandler(obj);
            this.parent.skipNextUpdateProperty.push(obj.attribute);

            this.parent.currentRowEntity[obj.attribute] = obj.value;
            this.parent.currentEntity[obj.attribute] = obj.value;
          }
          this.updated = true;
        };

        VGridCellEdit.prototype.editCellhelper = function editCellhelper(row, e, readOnly) {
          var _this4 = this;

          if (!this._private) {
            this._private = this.parent.gridContext.ctx._private;
            this.gridCtx = this.parent.gridContext.ctx;
          }

          if (e.target.classList.contains(this._private.css.cellContent)) {
            if (this.curElement) {

              this.removeEditCssClasses(this.curElement);
              if (this.row !== row) {
                this.updateBeforeNext(this.callbackObject());

                this.updateLastRow(this.row);
              } else {
                this.updateActual(this.callbackObject());
              }
            }

            this.updated = false;
            this.row = row;
            this.curElement = e.target;
            this.readOnly = readOnly;
            this.oldValue = e.target.value;
            this.attribute = e.target.getAttribute(this._private.atts.dataAttribute);
            this.index = this._private.attributeArray.indexOf(this.attribute);
            this.type = e.type;
            this.attributeType = this._private.colTypeArray[this.index];
            this.cells = this.curElement.offsetParent.offsetParent.querySelectorAll("." + this._private.css.cellContent);
            this.row = this.parent.filterRow;

            if (this.attributeType === "image") {
              this.curElement = e.target.offsetParent;
              this.curElement.setAttribute("tabindex", 0);
            }

            if (this.setAsSingleClick) {
              this.setAsSingleClick = false;
              this.type = "click";
            }

            setTimeout(function () {
              _this4._private.htmlCache.header.scrollLeft = _this4._private.htmlCache.content.scrollLeft;
            }, 10);

            if (this.index === this.cells.length - 1) {
              this.last = true;
            } else {
              this.last = false;
            }
            if (this.index === 0) {
              this.first = true;
            } else {
              this.first = false;
            }

            if (!this.curElement.classList.contains(this._private.css.editCell)) {
              this.curElement.classList.add(this._private.css.editCell);
            }

            if (!this.curElement.classList.contains(this._private.css.editCellWrite)) {
              this.curElement.classList.add(this._private.css.editCellWrite);
            }

            if (this.type === "dblclick" || this.editMode) {
              this.editMode = true;
              if (this.readOnly === false && this.attributeType !== "image") {
                if (this.curElement.classList.contains(this._private.css.editCellFocus)) {
                  this.curElement.classList.remove(this._private.css.editCellFocus);
                }
                this.curElement.removeAttribute("readonly");
              } else {
                  this.curElement.classList.add(this._private.css.editCellFocus);
                }
            } else {
              this.curElement.classList.add(this._private.css.editCellFocus);
            }

            this.elementKeyDown();
            this.curElement.focus();
          }
        };

        return VGridCellEdit;
      }());

      _export("VGridCellEdit", VGridCellEdit);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1jZWxsLWVkaXQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7K0JBT2E7QUFVWCxpQkFWVyxhQVVYLENBQVksTUFBWixFQUFvQjtnQ0FWVCxlQVVTOztlQVBwQixRQUFRLENBQUMsQ0FBRCxDQU9ZO2VBTnBCLE9BQU8sQ0FBQyxDQUFELENBTWE7ZUFMcEIsV0FBVyxNQUtTO2VBSnBCLFNBQVMsS0FJVztlQUhwQixVQUFVLEtBR1U7ZUFGcEIsU0FBUyxLQUVXOztBQUNsQixlQUFLLE1BQUwsR0FBYyxNQUFkLENBRGtCO0FBRWxCLGVBQUssT0FBTCxHQUFlLE9BQU8sT0FBUCxDQUZHO0FBR2xCLGVBQUssaUJBQUwsR0FIa0I7U0FBcEI7O0FBVlcsZ0NBa0JYLG1EQUFvQixHQUFHLFdBQVc7QUFDaEMsY0FBSSxPQUFKLENBRGdDO0FBRWhDLGNBQUksT0FBSixDQUZnQztBQUdoQyxjQUFJLElBQUksRUFBSixDQUg0QjtBQUloQyxjQUFJLE9BQU8sQ0FBUCxDQUo0QjtBQUtoQyxlQUFLLElBQUksSUFBSSxDQUFKLEVBQU8sSUFBSSxDQUFKLEVBQU8sR0FBdkIsRUFBNEI7QUFDMUIsZ0JBQUk7QUFDRixrQkFBSSxLQUFLLFNBQUwsQ0FBZSxRQUFmLENBQXdCLEtBQUssUUFBTCxDQUFjLEdBQWQsQ0FBa0IsR0FBbEIsQ0FBNUIsRUFBb0Q7QUFDbEQsb0JBQUksTUFBTSxTQUFTLEtBQUssWUFBTCxDQUFrQixLQUFsQixDQUFULENBQU4sQ0FEOEM7QUFFbEQscUJBQUssSUFBSSxJQUFJLENBQUosRUFBTyxJQUFJLEtBQUssUUFBTCxDQUFjLFNBQWQsQ0FBd0IsU0FBeEIsQ0FBa0MsTUFBbEMsRUFBMEMsR0FBOUQsRUFBbUU7QUFDakUsc0JBQUksUUFBUyxLQUFLLFFBQUwsQ0FBYyxTQUFkLENBQXdCLFNBQXhCLENBQWtDLENBQWxDLEVBQXFDLEdBQXJDLEdBQXlDLEtBQUssUUFBTCxDQUFjLFNBQWQsRUFBMEI7QUFD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