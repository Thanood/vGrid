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
        function VGridCellEdit(vGrid) {
          _classCallCheck(this, VGridCellEdit);

          this.first = -1;
          this.last = -1;
          this.editMode = false;
          this.update = true;

          this.vGrid = vGrid;
          this.addGridKeyListner();
        }

        VGridCellEdit.prototype.setCellsFromElement = function setCellsFromElement(e, direction) {
          var thisTop;
          var element;
          var x = 10;
          var node = e;
          for (var i = 0; i < x; i++) {
            try {
              if (node.classList.contains(this.vGrid.vGridConfig.css.row)) {
                var row = parseInt(node.getAttribute("row"));
                for (var y = 0; y < this.vGrid.vGridGenerator.htmlCache.rowsArray.length; y++) {
                  if (row === parseInt(this.vGrid.vGridGenerator.htmlCache.rowsArray[y].top / this.vGrid.vGridConfig.rowHeight)) {
                    thisTop = this.vGrid.vGridGenerator.htmlCache.rowsArray[y + direction].top;
                    element = this.vGrid.vGridGenerator.htmlCache.rowsArray[y + direction].div;
                  }
                }
              }
              node = node.parentNode;
            } catch (x) {}
          }
          if (element) {
            this.cells = element.querySelectorAll("." + this.vGrid.vGridConfig.css.cellContent);
          }
          return thisTop;
        };

        VGridCellEdit.prototype.setCellsFromTopValue = function setCellsFromTopValue(top) {
          var element = 0;
          for (var i = 0; i < this.vGrid.vGridGenerator.htmlCache.rowsArray.length; i++) {
            if (this.vGrid.vGridGenerator.htmlCache.rowsArray[i].top === top) {
              element = this.vGrid.vGridGenerator.htmlCache.rowsArray[i].div;
            }
          }
          if (element) {
            this.cells = element.querySelectorAll("." + this.vGrid.vGridConfig.css.cellContent);
          }
        };

        VGridCellEdit.prototype.removeEditCssClasses = function removeEditCssClasses(element) {
          element.setAttribute("readonly", "false");
          var elementX = void 0;
          if (element.parentNode) {
            elementX = element.parentNode;
          } else {
            elementX = element.parentNode;
          }
          elementX.classList.remove(this.vGrid.vGridConfig.css.editCell);
          elementX.classList.remove(this.vGrid.vGridConfig.css.editCellWrite);
          elementX.classList.remove(this.vGrid.vGridConfig.css.editCellFocus);
        };

        VGridCellEdit.prototype.dispatchCellClick = function dispatchCellClick(index) {
          var e = document.createEvent('Event');
          e.initEvent("tabbing", true, true);

          if (this.cells[index]) {
            this.cells[index].dispatchEvent(e);
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

          this.vGrid.element.onkeydown = function (e) {
            var _this2 = this;

            if (e.keyCode === 33) {
              e.preventDefault();
              this.updateBeforeNext(this.callbackObject());
              this.keyDownDelay(function () {
                if (_this2.curElement) {
                  var currentscrolltop = _this2.vGrid.vGridGenerator.getScrollTop();

                  var rowHeight = _this2.vGrid.vGridConfig.rowHeight;
                  var containerHeight = _this2.vGrid.vGridGenerator.htmlCache.content.clientHeight;
                  var containerRows = parseInt(containerHeight / rowHeight, 10);

                  _this2.removeEditCssClasses(_this2.curElement);
                  _this2.top = _this2.setCellsFromElement(_this2.curElement, 0);
                  _this2.vGrid.vGridGenerator.setScrollTop(currentscrolltop - containerHeight);
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
                  var currentscrolltop = _this2.vGrid.vGridGenerator.getScrollTop();

                  var rowHeight = _this2.vGrid.vGridConfig.rowHeight;
                  var containerHeight = _this2.vGrid.vGridGenerator.htmlCache.content.clientHeight;
                  var containerRows = parseInt(containerHeight / rowHeight, 10);

                  _this2.removeEditCssClasses(_this2.curElement);
                  _this2.top = _this2.setCellsFromElement(_this2.curElement, 0);
                  _this2.vGrid.vGridGenerator.setScrollTop(currentscrolltop + containerHeight);
                  var newTop = _this2.top + containerRows * rowHeight;
                  if (newTop / rowHeight >= _this2.vGrid.vGridConfig.getCollectionLength()) {
                    newTop = _this2.vGrid.vGridConfig.getCollectionLength() * rowHeight;
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

        VGridCellEdit.prototype.formatHandler = function formatHandler(type, obj) {

          switch (type) {
            case "beforeEdit":
              if (this.vGrid.vGridConfig.eventFormatHandler) {
                return this.vGrid.$parent[this.vGrid.vGridConfig.eventFormatHandler](type, obj);
              } else {
                return obj;
              }
              break;
            case "afterEdit":
              if (this.vGrid.vGridConfig.eventFormatHandler) {
                return this.vGrid.$parent[this.vGrid.vGridConfig.eventFormatHandler](type, {
                  attribute: this.attribute,
                  value: this.curElement.value,
                  oldValue: this.vGrid.collectionFiltered[this.row][this.attribute],
                  element: this.curElement
                });
              } else {
                return obj;
              }
              break;
            default:
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
            var rowNo = this.vGrid.filterRow;
            var rowheight = this.vGrid.vGridConfig.rowHeight;
            this.setCellsFromTopValue(rowNo * rowheight);
            if (this.cells.length > 0) {
              this.curElement = this.cells[this.index];

              if (!this.cells[this.index].parentNode.classList.contains(this.vGrid.vGridConfig.css.editCell)) {
                this.cells[this.index].parentNode.classList.add(this.vGrid.vGridConfig.css.editCell);
              }

              if (!this.cells[this.index].parentNode.classList.contains(this.vGrid.vGridConfig.css.editCellWrite)) {
                this.cells[this.index].parentNode.classList.add(this.vGrid.vGridConfig.css.editCellWrite);
              }

              if (this.editMode) {
                if (this.readOnly === false) {
                  if (this.cells[this.index].parentNode.classList.contains(this.vGrid.vGridConfig.css.editCellFocus)) {
                    this.cells[this.index].parentNode.classList.remove(this.vGrid.vGridConfig.css.editCellFocus);
                  }
                  this.cells[this.index].removeAttribute("readonly");
                  if (this.attributeType !== "image") {
                    this.beforeCellEdit({
                      attribute: this.attribute,
                      value: this.curElement.value,
                      oldValue: this.vGrid.collectionFiltered[this.row][this.attribute],
                      element: this.curElement
                    });
                  }
                } else {
                  this.cells[this.index].parentNode.classList.add(this.vGrid.vGridConfig.css.editCellFocus);
                }
              } else {
                this.cells[this.index].parentNode.classList.add(this.vGrid.vGridConfig.css.editCellFocus);
              }
            }
          }
        };

        VGridCellEdit.prototype.updateCurrentDone = function updateCurrentDone(obj) {

          if (this.attributeType !== "image" && this.editMode) {
            obj = this.formatHandler("afterEdit", obj);
            this.vGrid.skipNextUpdateProperty.push(obj.attribute);
            this.vGrid.currentRowEntity[obj.attribute] = obj.value;
            this.vGrid.currentEntity[obj.attribute] = obj.value;
            this.vGrid.vGridGenerator.updateRow(this.vGrid.filterRow, true);
          }
          this.updated = true;
        };

        VGridCellEdit.prototype.updateBeforeNext = function updateBeforeNext(obj) {

          if (this.attributeType !== "image" && this.editMode) {
            obj = this.formatHandler("afterEdit", obj);
            this.vGrid.collectionFiltered[this.row][obj.attribute] = obj.value;
          }
          this.updated = true;
        };

        VGridCellEdit.prototype.updateLastRow = function updateLastRow(row) {
          this.vGrid.vGridGenerator.updateRow(row, true);
        };

        VGridCellEdit.prototype.updateActual = function updateActual(obj) {

          if (obj.oldValue !== obj.value && this.attributeType !== "image" && this.editMode) {
            obj = this.formatHandler("afterEdit", obj);
            this.vGrid.skipNextUpdateProperty.push(obj.attribute);

            this.vGrid.currentRowEntity[obj.attribute] = obj.value;
            this.vGrid.currentEntity[obj.attribute] = obj.value;
          }
          this.updated = true;
        };

        VGridCellEdit.prototype.beforeCellEdit = function beforeCellEdit(obj) {

          obj = this.formatHandler("beforeEdit", obj);
          if (obj.newValue) {
            obj.element.value = obj.newValue;
          }
        };

        VGridCellEdit.prototype.editCellhelper = function editCellhelper(row, e, readOnly) {
          var _this4 = this;

          this.newTarget = e.target;
          if (this.newTarget.classList.contains(this.vGrid.vGridConfig.css.rowCell)) {
            if (e.target.children.length > 0) {
              this.newTarget = e.target.firstChild;
            }
          }

          if (this.newTarget.classList.contains(this.vGrid.vGridConfig.css.cellContent)) {
            if (this.curElement) {
              if (this.curElement) {
                this.removeEditCssClasses(this.curElement);
              }

              if (this.row !== row) {
                this.updateBeforeNext(this.callbackObject());

                this.updateLastRow(this.row);
              } else {
                if (this.curElement !== this.newTarget && this.updated !== false) {
                  if (this.curElement) {
                    this.updateActual(this.callbackObject());
                  }
                }
              }
            }

            this.attribute = this.newTarget.getAttribute(this.vGrid.vGridConfig.atts.dataAttribute);
            this.attributeType = this.vGrid.vGridConfig.colTypeArray[this.index];
            this.newTarget.setAttribute("tabindex", 0);

            this.readOnly = readOnly;
            this.index = this.vGrid.vGridConfig.attributeArray.indexOf(this.attribute);
            this.type = e.type;

            if (!this.newTarget.parentNode.classList.contains(this.vGrid.vGridConfig.css.editCell)) {
              this.newTarget.parentNode.classList.add(this.vGrid.vGridConfig.css.editCell);
            }

            if (!this.newTarget.parentNode.classList.contains(this.vGrid.vGridConfig.css.editCellWrite)) {
              this.newTarget.parentNode.classList.add(this.vGrid.vGridConfig.css.editCellWrite);
            }

            if (this.type === "dblclick" || this.editMode) {
              if (this.readOnly === false && this.attributeType !== "image") {
                if (this.curElement !== this.newTarget || this.editMode === false) {
                  if (this.attributeType !== "image") {
                    this.beforeCellEdit({
                      attribute: this.attribute,
                      value: this.newTarget.value,
                      oldValue: this.vGrid.collectionFiltered[row][this.attribute],
                      element: this.newTarget
                    });
                  }
                }

                if (this.newTarget.parentNode.classList.contains(this.vGrid.vGridConfig.css.editCellFocus)) {
                  this.newTarget.parentNode.classList.remove(this.vGrid.vGridConfig.css.editCellFocus);
                }
                e.target.removeAttribute("readonly");
              } else {
                  this.newTarget.parentNode.classList.add(this.vGrid.vGridConfig.css.editCellFocus);
                }

              this.editMode = true;
            } else {
              this.newTarget.parentNode.classList.add(this.vGrid.vGridConfig.css.editCellFocus);
            }

            this.updated = false;
            this.row = row;
            this.curElement = this.newTarget;
            this.oldValue = this.curElement.value;
            this.cells = this.curElement.parentNode.parentNode.querySelectorAll("." + this.vGrid.vGridConfig.css.cellContent);

            if (this.curElement.parentNode.offsetLeft > this.vGrid.vGridGenerator.htmlCache.content.clientWidth) {
              this.vGrid.vGridGenerator.htmlCache.content.scrollLeft = this.curElement.parentNode.offsetLeft;
            }
            if (this.vGrid.vGridGenerator.htmlCache.content.scrollLeft > 0 && this.vGrid.vGridGenerator.htmlCache.content.clientWidth > this.curElement.parentNode.offsetLeft) {
              this.vGrid.vGridGenerator.htmlCache.content.scrollLeft = this.curElement.parentNode.offsetLeft;
            }

            setTimeout(function () {
              _this4.vGrid.vGridGenerator.htmlCache.header.scrollLeft = _this4.vGrid.vGridGenerator.htmlCache.content.scrollLeft;
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

            this.curElement.focus();
            if (this.editMode) {
              this.elementKeyDown();
              if (this.curElement.select) {
                if (this.type === "dblclick") {
                  this.curElement.select();
                }
              }
            }
          }
        };

        return VGridCellEdit;
      }());

      _export("VGridCellEdit", VGridCellEdit);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1jZWxsLWVkaXQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7K0JBT2E7QUFRWCxpQkFSVyxhQVFYLENBQVksS0FBWixFQUFtQjtnQ0FSUixlQVFROztlQUxuQixRQUFRLENBQUMsQ0FBRCxDQUtXO2VBSm5CLE9BQU8sQ0FBQyxDQUFELENBSVk7ZUFIbkIsV0FBVyxNQUdRO2VBRm5CLFNBQVMsS0FFVTs7QUFDakIsZUFBSyxLQUFMLEdBQWEsS0FBYixDQURpQjtBQUVqQixlQUFLLGlCQUFMLEdBRmlCO1NBQW5COztBQVJXLGdDQWlCWCxtREFBb0IsR0FBRyxXQUFXO0FBQ2hDLGNBQUksT0FBSixDQURnQztBQUVoQyxjQUFJLE9BQUosQ0FGZ0M7QUFHaEMsY0FBSSxJQUFJLEVBQUosQ0FINEI7QUFJaEMsY0FBSSxPQUFPLENBQVAsQ0FKNEI7QUFLaEMsZUFBSyxJQUFJLElBQUksQ0FBSixFQUFPLElBQUksQ0FBSixFQUFPLEdBQXZCLEVBQTRCO0FBQzFCLGdCQUFJO0FBQ0Ysa0JBQUksS0FBSyxTQUFMLENBQWUsUUFBZixDQUF3QixLQUFLLEtBQUwsQ0FBVyxXQUFYLENBQXVCLEdBQXZCLENBQTJCLEdBQTNCLENBQTVCLEVBQTZEO0FBQzNELG9CQUFJLE1BQU0sU0FBUyxLQUFLLFlBQUwsQ0FBa0IsS0FBbEIsQ0FBVCxDQUFOLENBRHVEO0FBRTNELHFCQUFLLElBQUksSUFBSSxDQUFKLEVBQU8sSUFBSSxLQUFLLEtBQUwsQ0FBVyxjQUFYLENBQTBCLFNBQTFCLENBQW9DLFNBQXBDLENBQThDLE1BQTlDLEVBQXNELEdBQTFFLEVBQStFO0FBQzdFLHNCQUFJLFFBQVEsU0FBVSxLQUFLLEtBQUwsQ0FBVyxjQUFYLENBQTBCLFNBQTFCLENBQW9DLFNBQXBDLENBQThDLENBQTlDLEVBQWlELEdBQWpELEdBQXVELEtBQUssS0FBTCxDQUFXLFdBQVgsQ0FBdUIsU0FBdkIsQ0FBekUsRUFBNkc7QUFDL0csOEJBQVUsS0FBSyxLQUFMLENBQVcsY0FBWCxDQUEwQixTQUExQixDQUFvQyxTQUFwQyxDQUE4QyxJQUFJLFNBQUosQ0FBOUMsQ0FBNkQsR0FBN0QsQ0FEcUc7QUFFL0csOEJBQVUsS0FBSyxLQUFMLENBQVcsY0FBWCxDQUEwQixTQUExQixDQUFvQyxTQUFwQyxDQUE4QyxJQUFJLFNBQUosQ0FBOUMsQ0FBNkQsR0FBN0QsQ0FGcUc7bUJBQWpIO2lCQURGO2VBRkY7QUFTQSxxQkFBTyxLQUFLLFVBQUwsQ0FWTDthQUFKLENBV0UsT0FBTyxDQUFQLEVBQVUsRUFBVjtXQVpKO0FBZUEsY0FBSSxPQUFKLEVBQWE7QUFDWCxpQkFBSyxLQUFMLEdBQWEsUUFBUSxnQkFBUixDQUF5QixNQUFNLEtBQUssS0FBTCxDQUFXLFdBQVgsQ0FBdUIsR0FBdkIsQ0FBMkIsV0FBM0IsQ0FBNUMsQ0FEVztXQUFiO0FBR0EsaUJBQU8sT0FBUCxDQXZCZ0M7OztBQWpCdkIsZ0NBZ0RYLHFEQUFxQixLQUFLO0FBQ3hCLGNBQUksVUFBVSxDQUFWLENBRG9CO0FBRXhCLGVBQUssSUFBSSxJQUFJLENBQUosRUFBTyxJQUFJLEtBQUssS0FBTCxDQUFXLGNBQVgsQ0FBMEIsU0FBMUIsQ0FBb0MsU0FBcEMsQ0FBOEMsTUFBOUMsRUFBc0QsR0FBMUUsRUFBK0U7QUFDN0UsZ0JBQUksS0FBSyxLQUFMLENBQVcsY0FBWCxDQUEwQixTQUExQixDQUFvQyxTQUFwQyxDQUE4QyxDQUE5QyxFQUFpRCxHQUFqRCxLQUF5RCxHQUF6RCxFQUE4RDtBQUNoRSx3QkFBVSxLQUFLLEtBQUwsQ0FBVyxjQUFYLENBQTBCLFNBQTFCLENBQW9DLFNBQXBDLENBQThDLENBQTlDLEVBQWlELEdBQWpELENBRHNEO2FBQWxFO1dBREY7QUFLQSxjQUFJLE9BQUosRUFBYTtBQUNYLGlCQUFLLEtBQUwsR0FBYSxRQUFRLGdCQUFSLENBQXlCLE1BQU0sS0FBSyxLQUFMLENBQVcsV0FBWCxDQUF1QixHQUF2QixDQUEyQixXQUEzQixDQUE1QyxDQURXO1dBQWI7OztBQXZEUyxnQ0FpRVgscURBQXFCLFNBQVM7QUFDNUIsa0JBQVEsWUFBUixDQUFxQixVQUFyQixFQUFpQyxPQUFqQyxFQUQ0QjtBQUU1QixjQUFJLGlCQUFKLENBRjRCO0FBRzVCLGNBQUksUUFBUSxVQUFSLEVBQW9CO0FBQ3RCLHVCQUFXLFFBQVEsVUFBUixDQURXO1dBQXhCLE1BRU87QUFDTCx1QkFBVyxRQUFRLFVBQVIsQ0FETjtXQUZQO0FBS0EsbUJBQVMsU0FBVCxDQUFtQixNQUFuQixDQUEwQixLQUFLLEtBQUwsQ0FBVyxXQUFYLENBQXVCLEdBQXZCLENBQTJCLFFBQTNCLENBQTFCLENBUjRCO0FBUzVCLG1CQUFTLFNBQVQsQ0FBbUIsTUFBbkIsQ0FBMEIsS0FBSyxLQUFMLENBQVcsV0FBWCxDQUF1QixHQUF2QixDQUEyQixhQUEzQixDQUExQixDQVQ0QjtBQVU1QixtQkFBUyxTQUFULENBQW1CLE1BQW5CLENBQTBCLEtBQUssS0FBTCxDQUFXLFdBQVgsQ0FBdUIsR0FBdkIsQ0FBMkIsYUFBM0IsQ0FBMUIsQ0FWNEI7OztBQWpFbkIsZ0NBb0ZYLCtDQUFrQixPQUFPO0FBQ3ZCLGNBQUksSUFBSSxTQUFTLFdBQVQsQ0FBcUIsT0FBckIsQ0FBSixDQURtQjtBQUV2QixZQUFFLFNBQUYsQ0FBWSxTQUFaLEVBQXVCLElBQXZCLEVBQTZCLElBQTdCLEVBRnVCOztBQUl2QixjQUFJLEtBQUssS0FBTCxDQUFXLEtBQVgsQ0FBSixFQUF1QjtBQUNyQixpQkFBSyxLQUFMLENBQVcsS0FBWCxFQUFrQixhQUFsQixDQUFnQyxDQUFoQyxFQURxQjtXQUF2Qjs7O0FBeEZTLGdDQW1HWCxxQ0FBYSxVQUFVOzs7QUFDckIsY0FBSSxDQUFDLEtBQUssS0FBTCxFQUFZO0FBQ2YsaUJBQUssS0FBTCxHQUFhLFdBQVcsWUFBSztBQUMzQixvQkFBSyxLQUFMLEdBQWEsSUFBYixDQUQyQjtBQUUzQix5QkFGMkI7YUFBTCxFQUdyQixHQUhVLENBQWIsQ0FEZTtXQUFqQjs7O0FBcEdTLGdDQWlIWCxpREFBb0I7O0FBRWxCLGVBQUssS0FBTCxDQUFXLE9BQVgsQ0FBbUIsU0FBbkIsR0FBK0IsVUFBVSxDQUFWLEVBQWE7OztBQUkxQyxnQkFBSSxFQUFFLE9BQUYsS0FBYyxFQUFkLEVBQWtCO0FBQ3BCLGdCQUFFLGNBQUYsR0FEb0I7QUFFcEIsbUJBQUssZ0JBQUwsQ0FBc0IsS0FBSyxjQUFMLEVBQXRCLEVBRm9CO0FBR3BCLG1CQUFLLFlBQUwsQ0FBa0IsWUFBTTtBQUN0QixvQkFBSSxPQUFLLFVBQUwsRUFBaUI7QUFFbkIsc0JBQUksbUJBQW1CLE9BQUssS0FBTCxDQUFXLGNBQVgsQ0FBMEIsWUFBMUIsRUFBbkIsQ0FGZTs7QUFLbkIsc0JBQUksWUFBWSxPQUFLLEtBQUwsQ0FBVyxXQUFYLENBQXVCLFNBQXZCLENBTEc7QUFNbkIsc0JBQUksa0JBQWtCLE9BQUssS0FBTCxDQUFXLGNBQVgsQ0FBMEIsU0FBMUIsQ0FBb0MsT0FBcEMsQ0FBNEMsWUFBNUMsQ0FOSDtBQU9uQixzQkFBSSxnQkFBZ0IsU0FBUyxrQkFBa0IsU0FBbEIsRUFBNkIsRUFBdEMsQ0FBaEIsQ0FQZTs7QUFXbkIseUJBQUssb0JBQUwsQ0FBMEIsT0FBSyxVQUFMLENBQTFCLENBWG1CO0FBWW5CLHlCQUFLLEdBQUwsR0FBVyxPQUFLLG1CQUFMLENBQXlCLE9BQUssVUFBTCxFQUFpQixDQUExQyxDQUFYLENBWm1CO0FBYW5CLHlCQUFLLEtBQUwsQ0FBVyxjQUFYLENBQTBCLFlBQTFCLENBQXVDLG1CQUFvQixlQUFwQixDQUF2QyxDQWJtQjtBQWNuQixzQkFBSSxTQUFTLE9BQUssR0FBTCxHQUFZLGdCQUFnQixTQUFoQixDQWROO0FBZW5CLHNCQUFJLE1BQUMsR0FBUyxTQUFULElBQXVCLENBQXhCLEVBQTJCO0FBQzdCLDZCQUFTLENBQVQsQ0FENkI7bUJBQS9CO0FBR0EsNkJBQVcsWUFBSztBQUVkLDJCQUFLLG9CQUFMLENBQTBCLE1BQTFCLEVBRmM7QUFHZCwyQkFBSyxpQkFBTCxDQUF1QixPQUFLLEtBQUwsQ0FBdkIsQ0FIYzttQkFBTCxFQUlSLEdBSkgsRUFsQm1CO2lCQUFyQjtlQURnQixDQUFsQixDQUhvQjthQUF0Qjs7QUFpQ0EsZ0JBQUksRUFBRSxPQUFGLEtBQWMsRUFBZCxFQUFrQjtBQUNwQixnQkFBRSxjQUFGLEdBRG9CO0FBRXBCLG1CQUFLLGdCQUFMLENBQXNCLEtBQUssY0FBTCxFQUF0QixFQUZvQjtBQUdwQixtQkFBSyxZQUFMLENBQWtCLFlBQU07QUFDdEIsb0JBQUksT0FBSyxVQUFMLEVBQWlCO0FBRW5CLHNCQUFJLG1CQUFtQixPQUFLLEtBQUwsQ0FBVyxjQUFYLENBQTBCLFlBQTFCLEVBQW5CLENBRmU7O0FBS25CLHNCQUFJLFlBQVksT0FBSyxLQUFMLENBQVcsV0FBWCxDQUF1QixTQUF2QixDQUxHO0FBTW5CLHNCQUFJLGtCQUFrQixPQUFLLEtBQUwsQ0FBVyxjQUFYLENBQTBCLFNBQTFCLENBQW9DLE9BQXBDLENBQTRDLFlBQTVDLENBTkg7QUFPbkIsc0JBQUksZ0JBQWdCLFNBQVMsa0JBQWtCLFNBQWxCLEVBQTZCLEVBQXRDLENBQWhCLENBUGU7O0FBVW5CLHlCQUFLLG9CQUFMLENBQTBCLE9BQUssVUFBTCxDQUExQixDQVZtQjtBQVduQix5QkFBSyxHQUFMLEdBQVcsT0FBSyxtQkFBTCxDQUF5QixPQUFLLFVBQUwsRUFBaUIsQ0FBMUMsQ0FBWCxDQVhtQjtBQVluQix5QkFBSyxLQUFMLENBQVcsY0FBWCxDQUEwQixZQUExQixDQUF1QyxtQkFBb0IsZUFBcEIsQ0FBdkMsQ0FabUI7QUFhbkIsc0JBQUksU0FBUyxPQUFLLEdBQUwsR0FBWSxnQkFBZ0IsU0FBaEIsQ0FiTjtBQWNuQixzQkFBSSxNQUFDLEdBQVMsU0FBVCxJQUF1QixPQUFLLEtBQUwsQ0FBVyxXQUFYLENBQXVCLG1CQUF2QixFQUF4QixFQUFzRTtBQUN4RSw2QkFBUyxPQUFLLEtBQUwsQ0FBVyxXQUFYLENBQXVCLG1CQUF2QixLQUErQyxTQUEvQyxDQUQrRDtBQUV4RSw2QkFBUyxTQUFTLFNBQVQsQ0FGK0Q7bUJBQTFFO0FBSUEsNkJBQVcsWUFBSztBQUVkLDJCQUFLLG9CQUFMLENBQTBCLE1BQTFCLEVBRmM7QUFHZCwyQkFBSyxpQkFBTCxDQUF1QixPQUFLLEtBQUwsQ0FBdkIsQ0FIYzttQkFBTCxFQUtSLEdBTEgsRUFsQm1CO2lCQUFyQjtlQURnQixDQUFsQixDQUhvQjthQUF0Qjs7QUFpQ0EsZ0JBQUksRUFBRSxPQUFGLEtBQWMsRUFBZCxFQUFrQjtBQUNwQixnQkFBRSxjQUFGLEdBRG9CO0FBRXBCLG1CQUFLLFlBQUwsQ0FBa0IsWUFBTTtBQUN0QixvQkFBSSxPQUFLLFVBQUwsRUFBaUI7QUFDbkIseUJBQUssb0JBQUwsQ0FBMEIsT0FBSyxVQUFMLENBQTFCLENBRG1CO0FBRW5CLHlCQUFLLEdBQUwsR0FBVyxPQUFLLG1CQUFMLENBQXlCLE9BQUssVUFBTCxFQUFpQixDQUFDLENBQUQsQ0FBckQsQ0FGbUI7QUFHbkIseUJBQUssaUJBQUwsQ0FBdUIsT0FBSyxLQUFMLENBQXZCLENBSG1CO2lCQUFyQjtlQURnQixDQUFsQixDQUZvQjthQUF0Qjs7QUFnQkEsZ0JBQUksRUFBRSxPQUFGLEtBQWMsRUFBZCxJQUFvQixDQUFDLEtBQUssUUFBTCxFQUFlO0FBQ3RDLGdCQUFFLGNBQUYsR0FEc0M7QUFFdEMsbUJBQUssWUFBTCxDQUFrQixZQUFNO0FBQ3RCLG9CQUFJLE9BQUssVUFBTCxFQUFpQjtBQUNuQixzQkFBSSxDQUFDLE9BQUssSUFBTCxFQUFXO0FBQ2QsMkJBQUssb0JBQUwsQ0FBMEIsT0FBSyxVQUFMLENBQTFCLENBRGM7QUFFZCwyQkFBSyxpQkFBTCxDQUF1QixPQUFLLEtBQUwsR0FBYSxDQUFiLENBQXZCLENBRmM7bUJBQWhCO2lCQURGO2VBRGdCLENBQWxCLENBRnNDO2FBQXhDOztBQWNBLGdCQUFJLEVBQUUsT0FBRixLQUFjLEVBQWQsSUFBb0IsQ0FBQyxLQUFLLFFBQUwsRUFBZTtBQUN0QyxnQkFBRSxjQUFGLEdBRHNDO0FBRXRDLG1CQUFLLFlBQUwsQ0FBa0IsWUFBTTtBQUN0QixvQkFBSSxPQUFLLFVBQUwsRUFBaUI7QUFDbkIsc0JBQUksQ0FBQyxPQUFLLEtBQUwsRUFBWTtBQUNmLDJCQUFLLG9CQUFMLENBQTBCLE9BQUssVUFBTCxDQUExQixDQURlO0FBRWYsMkJBQUssaUJBQUwsQ0FBdUIsT0FBSyxLQUFMLEdBQWEsQ0FBYixDQUF2QixDQUZlO21CQUFqQjtpQkFERjtlQURnQixDQUFsQixDQUZzQzthQUF4Qzs7QUFlQSxnQkFBSSxFQUFFLE9BQUYsS0FBYyxFQUFkLEVBQWtCO0FBQ3BCLGdCQUFFLGNBQUYsR0FEb0I7QUFFcEIsbUJBQUssWUFBTCxDQUFrQixZQUFNO0FBQ3RCLG9CQUFJLE9BQUssVUFBTCxFQUFpQjtBQUNuQix5QkFBSyxvQkFBTCxDQUEwQixPQUFLLFVBQUwsQ0FBMUIsQ0FEbUI7QUFFbkIseUJBQUssR0FBTCxHQUFXLE9BQUssbUJBQUwsQ0FBeUIsT0FBSyxVQUFMLEVBQWlCLENBQUMsQ0FBRCxDQUFyRCxDQUZtQjtBQUduQix5QkFBSyxpQkFBTCxDQUF1QixPQUFLLEtBQUwsQ0FBdkIsQ0FIbUI7aUJBQXJCO2VBRGdCLENBQWxCLENBRm9CO2FBQXRCOztBQWVBLGdCQUFJLEVBQUUsT0FBRixLQUFjLENBQWQsSUFBbUIsRUFBRSxRQUFGLEtBQWUsSUFBZixFQUFxQjtBQUMxQyxnQkFBRSxjQUFGLEdBRDBDO0FBRTFDLG1CQUFLLFlBQUwsQ0FBa0IsWUFBTTtBQUN0QixvQkFBSSxPQUFLLFVBQUwsRUFBaUI7QUFDbkIseUJBQUssb0JBQUwsQ0FBMEIsT0FBSyxVQUFMLENBQTFCLENBRG1CO0FBRW5CLHlCQUFLLEtBQUwsR0FBYSxPQUFLLEtBQUwsR0FBYSxDQUFiLENBRk07QUFHbkIsc0JBQUksT0FBSyxLQUFMLEVBQVk7QUFDZCwyQkFBSyxLQUFMLEdBQWEsT0FBSyxLQUFMLENBQVcsTUFBWCxHQUFvQixDQUFwQixDQURDO0FBRWQsMkJBQUssR0FBTCxHQUFXLE9BQUssbUJBQUwsQ0FBeUIsT0FBSyxVQUFMLEVBQWlCLENBQUMsQ0FBRCxDQUFyRCxDQUZjO21CQUFoQjtBQUlBLHlCQUFLLGlCQUFMLENBQXVCLE9BQUssS0FBTCxDQUF2QixDQVBtQjtpQkFBckI7ZUFEZ0IsQ0FBbEIsQ0FGMEM7YUFBNUM7O0FBa0JBLGdCQUFJLEVBQUUsT0FBRixLQUFjLENBQWQsSUFBbUIsRUFBRSxRQUFGLEtBQWUsS0FBZixFQUFzQjtBQUMzQyxnQkFBRSxjQUFGLEdBRDJDO0FBRTNDLG1CQUFLLFlBQUwsQ0FBa0IsWUFBTTtBQUN0QixvQkFBSSxPQUFLLFVBQUwsRUFBaUI7QUFDbkIseUJBQUssb0JBQUwsQ0FBMEIsT0FBSyxVQUFMLENBQTFCLENBRG1CO0FBRW5CLHlCQUFLLEtBQUwsR0FBYSxPQUFLLEtBQUwsR0FBYSxDQUFiLENBRk07QUFHbkIsc0JBQUksT0FBSyxJQUFMLEVBQVc7QUFDYiwyQkFBSyxLQUFMLEdBQWEsQ0FBYixDQURhO0FBRWIsMkJBQUssR0FBTCxHQUFXLE9BQUssbUJBQUwsQ0FBeUIsT0FBSyxVQUFMLEVBQWlCLENBQTFDLENBQVgsQ0FGYTttQkFBZjtBQUlBLHlCQUFLLGlCQUFMLENBQXVCLE9BQUssS0FBTCxDQUF2QixDQVBtQjtpQkFBckI7ZUFEZ0IsQ0FBbEIsQ0FGMkM7YUFBN0M7V0FwSjZCLENBa0s3QixJQWxLNkIsQ0FrS3hCLElBbEt3QixDQUEvQixDQUZrQjs7O0FBakhULGdDQTRSWCxxQ0FBYztBQUNaLGVBQUssb0JBQUwsQ0FBMEIsS0FBSyxVQUFMLENBQTFCLENBRFk7QUFFWixlQUFLLEdBQUwsR0FBVyxLQUFLLG1CQUFMLENBQXlCLEtBQUssVUFBTCxFQUFpQixDQUExQyxDQUFYLENBRlk7QUFHWixlQUFLLGlCQUFMLENBQXVCLEtBQUssY0FBTCxFQUF2QixFQUhZO0FBSVosZUFBSyxRQUFMLEdBQWdCLEtBQWhCLENBSlk7QUFLWixlQUFLLG9CQUFMLENBQTBCLEtBQUssR0FBTCxDQUExQixDQUxZO0FBTVosZUFBSyxpQkFBTCxDQUF1QixLQUFLLEtBQUwsQ0FBdkIsQ0FOWTs7O0FBNVJILGdDQTJTWCwyQ0FBaUI7OztBQUNmLGVBQUssVUFBTCxDQUFnQixTQUFoQixHQUE0QixVQUFDLENBQUQsRUFBTztBQUNqQyxnQkFBSSxFQUFFLE9BQUYsSUFBYSxFQUFiLEVBQWlCO0FBQ25CLHFCQUFLLFdBQUwsR0FEbUI7QUFFbkIscUJBQU8sS0FBUCxDQUZtQjthQUFyQjtBQUlBLGdCQUFJLE9BQUssUUFBTCxLQUFrQixJQUFsQixJQUEwQixFQUFFLE9BQUYsS0FBYyxDQUFkLEVBQWlCO0FBQzdDLHFCQUFPLEtBQVAsQ0FENkM7YUFBL0MsTUFFTztBQUNMLHFCQUFPLElBQVAsQ0FESzthQUZQO1dBTDBCLENBRGI7OztBQTNTTixnQ0ErVFgsdUNBQWMsTUFBTSxLQUFLOztBQUl2QixrQkFBUSxJQUFSO0FBQ0UsaUJBQUssWUFBTDtBQUNFLGtCQUFJLEtBQUssS0FBTCxDQUFXLFdBQVgsQ0FBdUIsa0JBQXZCLEVBQTJDO0FBQzdDLHVCQUFPLEtBQUssS0FBTCxDQUFXLE9BQVgsQ0FBbUIsS0FBSyxLQUFMLENBQVcsV0FBWCxDQUF1QixrQkFBdkIsQ0FBbkIsQ0FBOEQsSUFBOUQsRUFBb0UsR0FBcEUsQ0FBUCxDQUQ2QztlQUEvQyxNQUVPO0FBQ0wsdUJBQU8sR0FBUCxDQURLO2VBRlA7QUFLQSxvQkFORjtBQURGLGlCQVFPLFdBQUw7QUFDRSxrQkFBSSxLQUFLLEtBQUwsQ0FBVyxXQUFYLENBQXVCLGtCQUF2QixFQUEyQztBQUM3Qyx1QkFBTyxLQUFLLEtBQUwsQ0FBVyxPQUFYLENBQW1CLEtBQUssS0FBTCxDQUFXLFdBQVgsQ0FBdUIsa0JBQXZCLENBQW5CLENBQThELElBQTlELEVBQW9FO0FBQ3pFLDZCQUFXLEtBQUssU0FBTDtBQUNYLHlCQUFPLEtBQUssVUFBTCxDQUFnQixLQUFoQjtBQUNQLDRCQUFVLEtBQUssS0FBTCxDQUFXLGtCQUFYLENBQThCLEtBQUssR0FBTCxDQUE5QixDQUF3QyxLQUFLLFNBQUwsQ0FBbEQ7QUFDQSwyQkFBUyxLQUFLLFVBQUw7aUJBSkosQ0FBUCxDQUQ2QztlQUEvQyxNQU9PO0FBQ0wsdUJBQU8sR0FBUCxDQURLO2VBUFA7QUFVQSxvQkFYRjtBQVJGO0FBcUJJLHFCQUFPLEdBQVAsQ0FERjtBQXBCRixXQUp1Qjs7O0FBL1RkLGdDQW1XWCwyQ0FBaUI7O0FBRWYsaUJBQU87QUFDTCx1QkFBVyxLQUFLLFNBQUw7QUFDWCxtQkFBTyxLQUFLLFVBQUwsQ0FBZ0IsS0FBaEI7QUFDUCxzQkFBVSxLQUFLLFFBQUw7QUFDVixxQkFBUyxLQUFLLFVBQUw7V0FKWCxDQUZlOzs7QUFuV04sZ0NBbVhYLCtCQUFXO0FBQ1QsY0FBSSxLQUFLLE9BQUwsS0FBaUIsS0FBakIsRUFBd0I7QUFDMUIsaUJBQUssWUFBTCxDQUFrQixLQUFLLGNBQUwsRUFBbEIsRUFEMEI7V0FBNUI7OztBQXBYUyxnQ0E4WFgsdUNBQWU7QUFDYixjQUFJLEtBQUssVUFBTCxFQUFpQjtBQUNuQixnQkFBSSxRQUFRLEtBQUssS0FBTCxDQUFXLFNBQVgsQ0FETztBQUVuQixnQkFBSSxZQUFZLEtBQUssS0FBTCxDQUFXLFdBQVgsQ0FBdUIsU0FBdkIsQ0FGRztBQUduQixpQkFBSyxvQkFBTCxDQUEwQixRQUFRLFNBQVIsQ0FBMUIsQ0FIbUI7QUFJbkIsZ0JBQUksS0FBSyxLQUFMLENBQVcsTUFBWCxHQUFvQixDQUFwQixFQUF1QjtBQUN6QixtQkFBSyxVQUFMLEdBQWtCLEtBQUssS0FBTCxDQUFXLEtBQUssS0FBTCxDQUE3QixDQUR5Qjs7QUFHekIsa0JBQUksQ0FBQyxLQUFLLEtBQUwsQ0FBVyxLQUFLLEtBQUwsQ0FBWCxDQUF1QixVQUF2QixDQUFrQyxTQUFsQyxDQUE0QyxRQUE1QyxDQUFxRCxLQUFLLEtBQUwsQ0FBVyxXQUFYLENBQXVCLEdBQXZCLENBQTJCLFFBQTNCLENBQXRELEVBQTRGO0FBQzlGLHFCQUFLLEtBQUwsQ0FBVyxLQUFLLEtBQUwsQ0FBWCxDQUF1QixVQUF2QixDQUFrQyxTQUFsQyxDQUE0QyxHQUE1QyxDQUFnRCxLQUFLLEtBQUwsQ0FBVyxXQUFYLENBQXVCLEdBQXZCLENBQTJCLFFBQTNCLENBQWhELENBRDhGO2VBQWhHOztBQUlBLGtCQUFJLENBQUMsS0FBSyxLQUFMLENBQVcsS0FBSyxLQUFMLENBQVgsQ0FBdUIsVUFBdkIsQ0FBa0MsU0FBbEMsQ0FBNEMsUUFBNUMsQ0FBcUQsS0FBSyxLQUFMLENBQVcsV0FBWCxDQUF1QixHQUF2QixDQUEyQixhQUEzQixDQUF0RCxFQUFpRztBQUNuRyxxQkFBSyxLQUFMLENBQVcsS0FBSyxLQUFMLENBQVgsQ0FBdUIsVUFBdkIsQ0FBa0MsU0FBbEMsQ0FBNEMsR0FBNUMsQ0FBZ0QsS0FBSyxLQUFMLENBQVcsV0FBWCxDQUF1QixHQUF2QixDQUEyQixhQUEzQixDQUFoRCxDQURtRztlQUFyRzs7QUFJQSxrQkFBSSxLQUFLLFFBQUwsRUFBZTtBQUNqQixvQkFBSSxLQUFLLFFBQUwsS0FBa0IsS0FBbEIsRUFBeUI7QUFDM0Isc0JBQUksS0FBSyxLQUFMLENBQVcsS0FBSyxLQUFMLENBQVgsQ0FBdUIsVUFBdkIsQ0FBa0MsU0FBbEMsQ0FBNEMsUUFBNUMsQ0FBcUQsS0FBSyxLQUFMLENBQVcsV0FBWCxDQUF1QixHQUF2QixDQUEyQixhQUEzQixDQUF6RCxFQUFvRztBQUNsRyx5QkFBSyxLQUFMLENBQVcsS0FBSyxLQUFMLENBQVgsQ0FBdUIsVUFBdkIsQ0FBa0MsU0FBbEMsQ0FBNEMsTUFBNUMsQ0FBbUQsS0FBSyxLQUFMLENBQVcsV0FBWCxDQUF1QixHQUF2QixDQUEyQixhQUEzQixDQUFuRCxDQURrRzttQkFBcEc7QUFHQSx1QkFBSyxLQUFMLENBQVcsS0FBSyxLQUFMLENBQVgsQ0FBdUIsZUFBdkIsQ0FBdUMsVUFBdkMsRUFKMkI7QUFLM0Isc0JBQUksS0FBSyxhQUFMLEtBQXVCLE9BQXZCLEVBQWdDO0FBQ2xDLHlCQUFLLGNBQUwsQ0FBb0I7QUFDbEIsaUNBQVcsS0FBSyxTQUFMO0FBQ1gsNkJBQU8sS0FBSyxVQUFMLENBQWdCLEtBQWhCO0FBQ1AsZ0NBQVUsS0FBSyxLQUFMLENBQVcsa0JBQVgsQ0FBOEIsS0FBSyxHQUFMLENBQTlCLENBQXdDLEtBQUssU0FBTCxDQUFsRDtBQUNBLCtCQUFTLEtBQUssVUFBTDtxQkFKWCxFQURrQzttQkFBcEM7aUJBTEYsTUFhTztBQUNMLHVCQUFLLEtBQUwsQ0FBVyxLQUFLLEtBQUwsQ0FBWCxDQUF1QixVQUF2QixDQUFrQyxTQUFsQyxDQUE0QyxHQUE1QyxDQUFnRCxLQUFLLEtBQUwsQ0FBVyxXQUFYLENBQXVCLEdBQXZCLENBQTJCLGFBQTNCLENBQWhELENBREs7aUJBYlA7ZUFERixNQWlCTztBQUNMLHFCQUFLLEtBQUwsQ0FBVyxLQUFLLEtBQUwsQ0FBWCxDQUF1QixVQUF2QixDQUFrQyxTQUFsQyxDQUE0QyxHQUE1QyxDQUFnRCxLQUFLLEtBQUwsQ0FBVyxXQUFYLENBQXVCLEdBQXZCLENBQTJCLGFBQTNCLENBQWhELENBREs7ZUFqQlA7YUFYRjtXQUpGOzs7QUEvWFMsZ0NBNGFYLCtDQUFrQixLQUFLOztBQUVyQixjQUFJLEtBQUssYUFBTCxLQUF1QixPQUF2QixJQUFrQyxLQUFLLFFBQUwsRUFBZTtBQUNuRCxrQkFBTSxLQUFLLGFBQUwsQ0FBbUIsV0FBbkIsRUFBZ0MsR0FBaEMsQ0FBTixDQURtRDtBQUVuRCxpQkFBSyxLQUFMLENBQVcsc0JBQVgsQ0FBa0MsSUFBbEMsQ0FBdUMsSUFBSSxTQUFKLENBQXZDLENBRm1EO0FBR25ELGlCQUFLLEtBQUwsQ0FBVyxnQkFBWCxDQUE0QixJQUFJLFNBQUosQ0FBNUIsR0FBNkMsSUFBSSxLQUFKLENBSE07QUFJbkQsaUJBQUssS0FBTCxDQUFXLGFBQVgsQ0FBeUIsSUFBSSxTQUFKLENBQXpCLEdBQTBDLElBQUksS0FBSixDQUpTO0FBS25ELGlCQUFLLEtBQUwsQ0FBVyxjQUFYLENBQTBCLFNBQTFCLENBQW9DLEtBQUssS0FBTCxDQUFXLFNBQVgsRUFBc0IsSUFBMUQsRUFMbUQ7V0FBckQ7QUFPQSxlQUFLLE9BQUwsR0FBZSxJQUFmLENBVHFCOzs7QUE1YVosZ0NBOGJYLDZDQUFpQixLQUFLOztBQUVwQixjQUFJLEtBQUssYUFBTCxLQUF1QixPQUF2QixJQUFrQyxLQUFLLFFBQUwsRUFBZTtBQUNuRCxrQkFBTSxLQUFLLGFBQUwsQ0FBbUIsV0FBbkIsRUFBZ0MsR0FBaEMsQ0FBTixDQURtRDtBQUVuRCxpQkFBSyxLQUFMLENBQVcsa0JBQVgsQ0FBOEIsS0FBSyxHQUFMLENBQTlCLENBQXdDLElBQUksU0FBSixDQUF4QyxHQUF5RCxJQUFJLEtBQUosQ0FGTjtXQUFyRDtBQUlBLGVBQUssT0FBTCxHQUFlLElBQWYsQ0FOb0I7OztBQTliWCxnQ0E0Y1gsdUNBQWMsS0FBSztBQUNqQixlQUFLLEtBQUwsQ0FBVyxjQUFYLENBQTBCLFNBQTFCLENBQW9DLEdBQXBDLEVBQXlDLElBQXpDLEVBRGlCOzs7QUE1Y1IsZ0NBcWRYLHFDQUFhLEtBQUs7O0FBRWhCLGNBQUksSUFBSSxRQUFKLEtBQWlCLElBQUksS0FBSixJQUFhLEtBQUssYUFBTCxLQUF1QixPQUF2QixJQUFrQyxLQUFLLFFBQUwsRUFBZTtBQUNqRixrQkFBTSxLQUFLLGFBQUwsQ0FBbUIsV0FBbkIsRUFBZ0MsR0FBaEMsQ0FBTixDQURpRjtBQUVqRixpQkFBSyxLQUFMLENBQVcsc0JBQVgsQ0FBa0MsSUFBbEMsQ0FBdUMsSUFBSSxTQUFKLENBQXZDLENBRmlGOztBQUtqRixpQkFBSyxLQUFMLENBQVcsZ0JBQVgsQ0FBNEIsSUFBSSxTQUFKLENBQTVCLEdBQTZDLElBQUksS0FBSixDQUxvQztBQU1qRixpQkFBSyxLQUFMLENBQVcsYUFBWCxDQUF5QixJQUFJLFNBQUosQ0FBekIsR0FBMEMsSUFBSSxLQUFKLENBTnVDO1dBQW5GO0FBUUEsZUFBSyxPQUFMLEdBQWUsSUFBZixDQVZnQjs7O0FBcmRQLGdDQXFlWCx5Q0FBZSxLQUFLOztBQUdsQixnQkFBTSxLQUFLLGFBQUwsQ0FBbUIsWUFBbkIsRUFBaUMsR0FBakMsQ0FBTixDQUhrQjtBQUlsQixjQUFJLElBQUksUUFBSixFQUFjO0FBQ2hCLGdCQUFJLE9BQUosQ0FBWSxLQUFaLEdBQW9CLElBQUksUUFBSixDQURKO1dBQWxCOzs7QUF6ZVMsZ0NBbWZYLHlDQUFlLEtBQUssR0FBRyxVQUFVOzs7QUFFL0IsZUFBSyxTQUFMLEdBQWlCLEVBQUUsTUFBRixDQUZjO0FBRy9CLGNBQUksS0FBSyxTQUFMLENBQWUsU0FBZixDQUF5QixRQUF6QixDQUFrQyxLQUFLLEtBQUwsQ0FBVyxXQUFYLENBQXVCLEdBQXZCLENBQTJCLE9BQTNCLENBQXRDLEVBQTJFO0FBQ3pFLGdCQUFJLEVBQUUsTUFBRixDQUFTLFFBQVQsQ0FBa0IsTUFBbEIsR0FBMkIsQ0FBM0IsRUFBOEI7QUFDaEMsbUJBQUssU0FBTCxHQUFpQixFQUFFLE1BQUYsQ0FBUyxVQUFULENBRGU7YUFBbEM7V0FERjs7QUFRQSxjQUFJLEtBQUssU0FBTCxDQUFlLFNBQWYsQ0FBeUIsUUFBekIsQ0FBa0MsS0FBSyxLQUFMLENBQVcsV0FBWCxDQUF1QixHQUF2QixDQUEyQixXQUEzQixDQUF0QyxFQUErRTtBQUc3RSxnQkFBSSxLQUFLLFVBQUwsRUFBaUI7QUFDbkIsa0JBQUksS0FBSyxVQUFMLEVBQWlCO0FBQ25CLHFCQUFLLG9CQUFMLENBQTBCLEtBQUssVUFBTCxDQUExQixDQURtQjtlQUFyQjs7QUFJQSxrQkFBSSxLQUFLLEdBQUwsS0FBYSxHQUFiLEVBQWtCO0FBRXBCLHFCQUFLLGdCQUFMLENBQXNCLEtBQUssY0FBTCxFQUF0QixFQUZvQjs7QUFJcEIscUJBQUssYUFBTCxDQUFtQixLQUFLLEdBQUwsQ0FBbkIsQ0FKb0I7ZUFBdEIsTUFLTztBQUNMLG9CQUFJLEtBQUssVUFBTCxLQUFvQixLQUFLLFNBQUwsSUFBa0IsS0FBSyxPQUFMLEtBQWlCLEtBQWpCLEVBQXdCO0FBQ2hFLHNCQUFJLEtBQUssVUFBTCxFQUFpQjtBQUNuQix5QkFBSyxZQUFMLENBQWtCLEtBQUssY0FBTCxFQUFsQixFQURtQjttQkFBckI7aUJBREY7ZUFORjthQUxGOztBQW9CQSxpQkFBSyxTQUFMLEdBQWlCLEtBQUssU0FBTCxDQUFlLFlBQWYsQ0FBNEIsS0FBSyxLQUFMLENBQVcsV0FBWCxDQUF1QixJQUF2QixDQUE0QixhQUE1QixDQUE3QyxDQXZCNkU7QUF3QjdFLGlCQUFLLGFBQUwsR0FBcUIsS0FBSyxLQUFMLENBQVcsV0FBWCxDQUF1QixZQUF2QixDQUFvQyxLQUFLLEtBQUwsQ0FBekQsQ0F4QjZFO0FBeUI3RSxpQkFBSyxTQUFMLENBQWUsWUFBZixDQUE0QixVQUE1QixFQUF3QyxDQUF4QyxFQXpCNkU7O0FBNkI3RSxpQkFBSyxRQUFMLEdBQWdCLFFBQWhCLENBN0I2RTtBQThCN0UsaUJBQUssS0FBTCxHQUFhLEtBQUssS0FBTCxDQUFXLFdBQVgsQ0FBdUIsY0FBdkIsQ0FBc0MsT0FBdEMsQ0FBOEMsS0FBSyxTQUFMLENBQTNELENBOUI2RTtBQStCN0UsaUJBQUssSUFBTCxHQUFZLEVBQUUsSUFBRixDQS9CaUU7O0FBb0M3RSxnQkFBSSxDQUFDLEtBQUssU0FBTCxDQUFlLFVBQWYsQ0FBMEIsU0FBMUIsQ0FBb0MsUUFBcEMsQ0FBNkMsS0FBSyxLQUFMLENBQVcsV0FBWCxDQUF1QixHQUF2QixDQUEyQixRQUEzQixDQUE5QyxFQUFvRjtBQUN0RixtQkFBSyxTQUFMLENBQWUsVUFBZixDQUEwQixTQUExQixDQUFvQyxHQUFwQyxDQUF3QyxLQUFLLEtBQUwsQ0FBVyxXQUFYLENBQXVCLEdBQXZCLENBQTJCLFFBQTNCLENBQXhDLENBRHNGO2FBQXhGOztBQUtBLGdCQUFJLENBQUMsS0FBSyxTQUFMLENBQWUsVUFBZixDQUEwQixTQUExQixDQUFvQyxRQUFwQyxDQUE2QyxLQUFLLEtBQUwsQ0FBVyxXQUFYLENBQXVCLEdBQXZCLENBQTJCLGFBQTNCLENBQTlDLEVBQXlGO0FBQzNGLG1CQUFLLFNBQUwsQ0FBZSxVQUFmLENBQTBCLFNBQTFCLENBQW9DLEdBQXBDLENBQXdDLEtBQUssS0FBTCxDQUFXLFdBQVgsQ0FBdUIsR0FBdkIsQ0FBMkIsYUFBM0IsQ0FBeEMsQ0FEMkY7YUFBN0Y7O0FBTUEsZ0JBQUksS0FBSyxJQUFMLEtBQWMsVUFBZCxJQUE0QixLQUFLLFFBQUwsRUFBZTtBQUM3QyxrQkFBSSxLQUFLLFFBQUwsS0FBa0IsS0FBbEIsSUFBMkIsS0FBSyxhQUFMLEtBQXVCLE9BQXZCLEVBQWdDO0FBQzdELG9CQUFJLEtBQUssVUFBTCxLQUFvQixLQUFLLFNBQUwsSUFBa0IsS0FBSyxRQUFMLEtBQWtCLEtBQWxCLEVBQXlCO0FBQ2pFLHNCQUFJLEtBQUssYUFBTCxLQUF1QixPQUF2QixFQUFnQztBQUNsQyx5QkFBSyxjQUFMLENBQW9CO0FBQ2xCLGlDQUFXLEtBQUssU0FBTDtBQUNYLDZCQUFPLEtBQUssU0FBTCxDQUFlLEtBQWY7QUFDUCxnQ0FBVSxLQUFLLEtBQUwsQ0FBVyxrQkFBWCxDQUE4QixHQUE5QixFQUFtQyxLQUFLLFNBQUwsQ0FBN0M7QUFDQSwrQkFBUyxLQUFLLFNBQUw7cUJBSlgsRUFEa0M7bUJBQXBDO2lCQURGOztBQVdBLG9CQUFJLEtBQUssU0FBTCxDQUFlLFVBQWYsQ0FBMEIsU0FBMUIsQ0FBb0MsUUFBcEMsQ0FBNkMsS0FBSyxLQUFMLENBQVcsV0FBWCxDQUF1QixHQUF2QixDQUEyQixhQUEzQixDQUFqRCxFQUE0RjtBQUMxRix1QkFBSyxTQUFMLENBQWUsVUFBZixDQUEwQixTQUExQixDQUFvQyxNQUFwQyxDQUEyQyxLQUFLLEtBQUwsQ0FBVyxXQUFYLENBQXVCLEdBQXZCLENBQTJCLGFBQTNCLENBQTNDLENBRDBGO2lCQUE1RjtBQUdBLGtCQUFFLE1BQUYsQ0FBUyxlQUFULENBQXlCLFVBQXpCLEVBZjZEO2VBQS9ELE1BaUJPO0FBQ0wsdUJBQUssU0FBTCxDQUFlLFVBQWYsQ0FBMEIsU0FBMUIsQ0FBb0MsR0FBcEMsQ0FBd0MsS0FBSyxLQUFMLENBQVcsV0FBWCxDQUF1QixHQUF2QixDQUEyQixhQUEzQixDQUF4QyxDQURLO2lCQWpCUDs7QUFxQkEsbUJBQUssUUFBTCxHQUFnQixJQUFoQixDQXRCNkM7YUFBL0MsTUF1Qk87QUFDTCxtQkFBSyxTQUFMLENBQWUsVUFBZixDQUEwQixTQUExQixDQUFvQyxHQUFwQyxDQUF3QyxLQUFLLEtBQUwsQ0FBVyxXQUFYLENBQXVCLEdBQXZCLENBQTJCLGFBQTNCLENBQXhDLENBREs7YUF2QlA7O0FBNkJBLGlCQUFLLE9BQUwsR0FBZSxLQUFmLENBNUU2RTtBQTZFN0UsaUJBQUssR0FBTCxHQUFXLEdBQVgsQ0E3RTZFO0FBOEU3RSxpQkFBSyxVQUFMLEdBQWtCLEtBQUssU0FBTCxDQTlFMkQ7QUErRTdFLGlCQUFLLFFBQUwsR0FBZ0IsS0FBSyxVQUFMLENBQWdCLEtBQWhCLENBL0U2RDtBQWdGN0UsaUJBQUssS0FBTCxHQUFhLEtBQUssVUFBTCxDQUFnQixVQUFoQixDQUEyQixVQUEzQixDQUFzQyxnQkFBdEMsQ0FBdUQsTUFBTSxLQUFLLEtBQUwsQ0FBVyxXQUFYLENBQXVCLEdBQXZCLENBQTJCLFdBQTNCLENBQTFFLENBaEY2RTs7QUFvRjdFLGdCQUFJLEtBQUssVUFBTCxDQUFnQixVQUFoQixDQUEyQixVQUEzQixHQUF3QyxLQUFLLEtBQUwsQ0FBVyxjQUFYLENBQTBCLFNBQTFCLENBQW9DLE9BQXBDLENBQTRDLFdBQTVDLEVBQXlEO0FBQ25HLG1CQUFLLEtBQUwsQ0FBVyxjQUFYLENBQTBCLFNBQTFCLENBQW9DLE9BQXBDLENBQTRDLFVBQTVDLEdBQXlELEtBQUssVUFBTCxDQUFnQixVQUFoQixDQUEyQixVQUEzQixDQUQwQzthQUFyRztBQUdBLGdCQUFJLEtBQUssS0FBTCxDQUFXLGNBQVgsQ0FBMEIsU0FBMUIsQ0FBb0MsT0FBcEMsQ0FBNEMsVUFBNUMsR0FBeUQsQ0FBekQsSUFBOEQsS0FBSyxLQUFMLENBQVcsY0FBWCxDQUEwQixTQUExQixDQUFvQyxPQUFwQyxDQUE0QyxXQUE1QyxHQUEwRCxLQUFLLFVBQUwsQ0FBZ0IsVUFBaEIsQ0FBMkIsVUFBM0IsRUFBdUM7QUFDakssbUJBQUssS0FBTCxDQUFXLGNBQVgsQ0FBMEIsU0FBMUIsQ0FBb0MsT0FBcEMsQ0FBNEMsVUFBNUMsR0FBeUQsS0FBSyxVQUFMLENBQWdCLFVBQWhCLENBQTJCLFVBQTNCLENBRHdHO2FBQW5LOztBQVFBLHVCQUFXLFlBQUs7QUFDZCxxQkFBSyxLQUFMLENBQVcsY0FBWCxDQUEwQixTQUExQixDQUFvQyxNQUFwQyxDQUEyQyxVQUEzQyxHQUF3RCxPQUFLLEtBQUwsQ0FBVyxjQUFYLENBQTBCLFNBQTFCLENBQW9DLE9BQXBDLENBQTRDLFVBQTVDLENBRDFDO2FBQUwsRUFFUixFQUZILEVBL0Y2RTs7QUFvRzdFLGdCQUFJLEtBQUssS0FBTCxLQUFlLEtBQUssS0FBTCxDQUFXLE1BQVgsR0FBb0IsQ0FBcEIsRUFBdUI7QUFDeEMsbUJBQUssSUFBTCxHQUFZLElBQVosQ0FEd0M7YUFBMUMsTUFFTztBQUNMLG1CQUFLLElBQUwsR0FBWSxLQUFaLENBREs7YUFGUDtBQUtBLGdCQUFJLEtBQUssS0FBTCxLQUFlLENBQWYsRUFBa0I7QUFDcEIsbUJBQUssS0FBTCxHQUFhLElBQWIsQ0FEb0I7YUFBdEIsTUFFTztBQUNMLG1CQUFLLEtBQUwsR0FBYSxLQUFiLENBREs7YUFGUDs7QUFVQSxpQkFBSyxVQUFMLENBQWdCLEtBQWhCLEdBbkg2RTtBQW9IN0UsZ0JBQUksS0FBSyxRQUFMLEVBQWU7QUFDakIsbUJBQUssY0FBTCxHQURpQjtBQUVqQixrQkFBSSxLQUFLLFVBQUwsQ0FBZ0IsTUFBaEIsRUFBd0I7QUFDMUIsb0JBQUcsS0FBSyxJQUFMLEtBQWMsVUFBZCxFQUF5QjtBQUMxQix1QkFBSyxVQUFMLENBQWdCLE1BQWhCLEdBRDBCO2lCQUE1QjtlQURGO2FBRkY7V0FwSEY7OztlQTlmUyIsImZpbGUiOiJ2R3JpZC92LWdyaWQtY2VsbC1lZGl0LmpzIiwic291cmNlUm9vdCI6Ii9zcmMifQ==