"use strict";

System.register([], function (_export, _context) {
  "use strict";

  var VGridSelection;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [],
    execute: function () {
      _export("VGridSelection", VGridSelection = function () {
        function VGridSelection(mode, vGrid) {
          _classCallCheck(this, VGridSelection);

          this.selectionMode = "none";
          this.lastRowSelected = -1;
          this.lastKeyKodeUsed = "none";
          this.selectedRows = 0;


          this.vGrid = vGrid;

          if (mode === false) {
            this.selectionMode = "single";
          }
          if (mode === true) {
            this.selectionMode = "multible";
          }

          this.selection = new Set([]);
        }

        VGridSelection.prototype.setMode = function setMode(mode) {
          this.selectionMode = "none";
          if (mode === false) {
            this.selectionMode = "single";
          }
          if (mode === true) {
            this.selectionMode = "multible";
          }
        };

        VGridSelection.prototype.isSelected = function isSelected(row) {
          var result = false;
          if (this.selectedRows > 0) {
            if (this.vGrid.vGridCollectionFiltered[row]) {
              result = this.selection.has(this.vGrid.vGridCollectionFiltered[row][this.vGrid.vGridRowKey]);
            }
          }
          return result;
        };

        VGridSelection.prototype.isSelectedMain = function isSelectedMain(row) {
          var result = false;
          if (this.selectedRows > 0) {
            if (this.vGrid.vGridCollection[row]) {
              result = this.selection.has(this.vGrid.vGridCollection[row][this.vGrid.vGridRowKey]);
            }
          }
          return result;
        };

        VGridSelection.prototype.deSelect = function deSelect(row) {
          if (this.vGrid.vGridCollectionFiltered[row]) {
            this.selection.delete(this.vGrid.vGridCollectionFiltered[row][this.vGrid.vGridRowKey]);
          }
          this.selectedRows = this.selection.size;
        };

        VGridSelection.prototype.deSelectMain = function deSelectMain(row) {
          if (this.vGrid.vGridCollection[row]) {
            this.selection.delete(this.vGrid.vGridCollection[row][this.vGrid.vGridRowKey]);
          }
          this.selectedRows = this.selection.size;
        };

        VGridSelection.prototype.select = function select(row, addToSelection) {
          switch (this.selectionMode) {
            case "none":
            case null:
            case undefined:
              break;
            case "single":
              this.selection.clear();
              if (this.vGrid.vGridCollectionFiltered[row]) {
                this.selection.add(this.vGrid.vGridCollectionFiltered[row][this.vGrid.vGridRowKey]);
              }
              this.selectedRows = this.selection.size;
              break;
            case "multible":
              if (!addToSelection) {
                this.selection.clear();
                if (this.vGrid.vGridCollectionFiltered[row]) {
                  this.selection.add(this.vGrid.vGridCollectionFiltered[row][this.vGrid.vGridRowKey]);
                }
                this.selectedRows = this.selection.size;
              } else {
                if (this.vGrid.vGridCollectionFiltered[row]) {
                  this.selection.add(this.vGrid.vGridCollectionFiltered[row][this.vGrid.vGridRowKey]);
                }
                this.selectedRows = this.selection.size;
              }
          }
        };

        VGridSelection.prototype.selectMain = function selectMain(row, addToSelection) {
          switch (this.selectionMode) {
            case "none":
            case null:
            case undefined:
              break;
            case "single":
              this.selection.clear();
              if (this.vGrid.vGridCollection[row]) {
                this.selection.add(this.vGrid.vGridCollection[row][this.vGrid.vGridRowKey]);
              }
              this.selectedRows = this.selection.size;
              break;
            case "multible":
              if (!addToSelection) {
                this.selection.clear();
                if (this.vGrid.vGridCollection[row]) {
                  this.selection.add(this.vGrid.vGridCollection[row][this.vGrid.vGridRowKey]);
                }
                this.selectedRows = this.selection.size;
              } else {
                if (this.vGrid.vGridCollection[row]) {
                  this.selection.add(this.vGrid.vGridCollection[row][this.vGrid.vGridRowKey]);
                }
                this.selectedRows = this.selection.size;
              }
          }
        };

        VGridSelection.prototype.selectRange = function selectRange(start, end) {
          if (this.selectionMode === "multible") {
            this.selection.clear();
            for (var i = start; i < end + 1; i++) {
              this.selection.add(this.vGrid.vGridCollectionFiltered[i][this.vGrid.vGridRowKey]);
            }
            this.selectedRows = this.selection.size;
          }
        };

        VGridSelection.prototype.selectAll = function selectAll() {
          if (this.selectionMode === "multible") {
            for (var i = 0; i < this.vGrid.vGridCollectionFiltered.length; i++) {
              this.selection.add(this.vGrid.vGridCollectionFiltered[i][this.vGrid.vGridRowKey]);
            }
            this.selectedRows = this.selection.size;
          }
          if (this.selectionMode === "single" && this.vGrid.vGridCurrentRow >= 0) {
            this.selection.clear();
            this.selection.add(this.vGrid.vGridCollectionFiltered[this.vGrid.vGridCurrentRow][this.vGrid.vGridRowKey]);
            this.selectedRows = this.selection.size;
          }
        };

        VGridSelection.prototype.deSelectAll = function deSelectAll() {
          for (var i = 0; i < this.vGrid.vGridCollectionFiltered.length; i++) {
            this.selection.delete(this.vGrid.vGridCollectionFiltered[i][this.vGrid.vGridRowKey]);
          }
          this.selectedRows = this.selection.size;
        };

        VGridSelection.prototype.selectRangeMain = function selectRangeMain(start, end) {
          if (this.selectionMode === "multible") {
            this.selection.clear();
            for (var i = start; i < end + 1; i++) {
              this.selection.add(this.vGrid.vGridCollection[i][this.vGrid.vGridRowKey]);
            }
            this.selectedRows = this.selection.size;
          }
        };

        VGridSelection.prototype.reset = function reset() {
          if (this.selectedRows > 0) {
            this.selection.clear();
          }
          this.lastRowSelected = -1;
          this.lastKeyKodeUsed = "none";
          this.selectedRows = this.selection.size;
        };

        VGridSelection.prototype.getSelectedRows = function getSelectedRows() {
          var _this = this;

          var array = [];
          if (this.selectedRows > 0) {
            this.vGrid.vGridCollectionFiltered.forEach(function (x, index) {
              if (_this.selection.has(x[_this.vGrid.vGridRowKey]) === true) {
                array.push(index);
              }
            });
          }
          return array;
        };

        VGridSelection.prototype.getSelectedRowsMain = function getSelectedRowsMain() {
          var _this2 = this;

          var array = [];
          if (this.selectedRows > 0) {
            this.vGrid.vGridCollection.forEach(function (x, index) {
              if (_this2.selection.has(x[_this2.vGrid.vGridRowKey]) === true) {
                array.push(index);
              }
            });
          }
          return array;
        };

        VGridSelection.prototype.setSelectedRows = function setSelectedRows(newRows) {
          if (this.selectedRows > 0) {
            this.selection.clear();
          }
          for (var i = 0; i < newRows.length; i++) {
            this.selection.add(this.vGrid.vGridCollectionFiltered[newRows[i]][this.vGrid.vGridRowKey]);
          }
          this.selectedRows = this.selection.size;
        };

        VGridSelection.prototype.setSelectedRowsMain = function setSelectedRowsMain(newRows) {
          if (this.selectedRows > 0) {
            this.selection.clear();
          }
          for (var i = 0; i < newRows.length; i++) {
            this.selection.add(this.vGrid.vGridCollection[newRows[i]][this.vGrid.vGridRowKey]);
          }
          this.selectedRows = this.selection.size;
        };

        VGridSelection.prototype.setHightlight = function setHightlight(e, currentRow, vGridGenerator) {

          var isSel;
          var manualSel = this.vGrid.vGridConfig.attManualSelection;
          if (!manualSel) {
            var currentselectedRows = this.getSelectedRows();

            if (currentRow !== this.lastRowSelected || currentselectedRows[0] !== currentRow) {

              if (currentRow <= vGridGenerator.vGridConfig.getCollectionLength() - 1) {

                if (this.selectionMode === "multible") {

                  var currentKeyKode = "";

                  if (e.shiftKey) {
                    currentKeyKode = "shift";
                    currentselectedRows = this.getSelectedRows();
                    if (currentselectedRows.length > 0 && this.lastKeyKodeUsed === "none") {
                      this.lastRowSelected = currentselectedRows[0];
                      this.lastKeyKodeUsed = "shift";
                    }
                  }

                  if (e.ctrlKey) {
                    currentKeyKode = "ctrl";
                  }

                  if (!e.ctrlKey && !e.shiftKey) {
                    currentKeyKode = "none";
                  }

                  switch (true) {
                    case currentKeyKode === "none":
                      this.select(currentRow);
                      break;
                    case this.lastKeyKodeUsed === "shift" && currentKeyKode === "ctrl":

                      isSel = this.isSelected(currentRow);
                      if (isSel === true) {
                        this.deSelect(currentRow);
                      } else {
                        this.select(currentRow, true);
                      }
                      this.lastRowSelected = currentRow;
                      break;

                    case this.lastKeyKodeUsed === "ctrl" && currentKeyKode === "shift":
                      var oldSel = this.getSelectedRows();
                      this.selectRange(this.lastRowSelected, currentRow);
                      var newSel = this.getSelectedRows();
                      this.setSelectedRows(oldSel.concat(newSel));

                      break;

                    case this.lastKeyKodeUsed === "ctrl" && currentKeyKode === "ctrl":

                      isSel = this.isSelected(currentRow);
                      if (isSel === true) {
                        this.deSelect(currentRow);
                      } else {
                        this.select(currentRow, true);
                      }
                      this.lastRowSelected = currentRow;
                      break;

                    case this.lastKeyKodeUsed === "none" && currentKeyKode === "ctrl":

                      isSel = this.isSelected(currentRow);
                      if (isSel === true) {
                        this.deSelect(currentRow);
                      } else {
                        this.select(currentRow, true);
                      }
                      this.lastRowSelected = currentRow;
                      break;

                    case this.lastKeyKodeUsed === "shift" && currentKeyKode === "shift":

                      if (this.lastRowSelected > currentRow) {
                        this.selectRange(currentRow, this.lastRowSelected);
                      } else {
                        this.selectRange(this.lastRowSelected, currentRow);
                      }

                      break;

                    case this.lastKeyKodeUsed === "none" && currentKeyKode === "shift":

                      if (this.lastRowSelected !== -1) {
                        if (this.lastRowSelected > currentRow) {
                          this.selectRange(currentRow, this.lastRowSelected);
                        } else {
                          this.selectRange(this.lastRowSelected, currentRow);
                        }
                      } else {
                        this.lastRowSelected = currentRow;
                        this.select(currentRow);
                      }
                      break;
                    default:
                      console.error("error, this should not happen, debug selection");
                  }
                } else {
                  this.select(currentRow);
                }
                this.lastKeyKodeUsed = currentKeyKode;

                vGridGenerator.updateSelectionOnAllRows();
              }
            } else {
              if (e.ctrlKey) {
                currentKeyKode = "ctrl";
              }

              if (currentKeyKode === "ctrl") {
                this.lastKeyKodeUsed = currentKeyKode;
                isSel = this.isSelected(currentRow);
                if (isSel === true) {
                  this.deSelect(currentRow);
                }
                this.lastRowSelected = currentRow;
              } else {
                isSel = this.isSelected(currentRow);
                this.select(currentRow);
              }

              vGridGenerator.updateSelectionOnAllRows();
            }
          }
        };

        return VGridSelection;
      }());

      _export("VGridSelection", VGridSelection);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZHcmlkL3YtZ3JpZC1zZWxlY3Rpb24uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztnQ0FNYSxjO0FBU1gsZ0NBQVksSUFBWixFQUFrQixLQUFsQixFQUF5QjtBQUFBOztBQUFBLGVBTnpCLGFBTXlCLEdBTlQsTUFNUztBQUFBLGVBTHpCLGVBS3lCLEdBTFAsQ0FBQyxDQUtNO0FBQUEsZUFKekIsZUFJeUIsR0FKUCxNQUlPO0FBQUEsZUFIekIsWUFHeUIsR0FIVixDQUdVOzs7QUFFdkIsZUFBSyxLQUFMLEdBQWEsS0FBYjs7QUFFQSxjQUFJLFNBQVMsS0FBYixFQUFvQjtBQUNsQixpQkFBSyxhQUFMLEdBQXFCLFFBQXJCO0FBQ0Q7QUFDRCxjQUFJLFNBQVMsSUFBYixFQUFtQjtBQUNqQixpQkFBSyxhQUFMLEdBQXFCLFVBQXJCO0FBQ0Q7O0FBRUQsZUFBSyxTQUFMLEdBQWlCLElBQUksR0FBSixDQUFRLEVBQVIsQ0FBakI7QUFHRDs7aUNBR0QsTyxvQkFBUSxJLEVBQU07QUFDWixlQUFLLGFBQUwsR0FBcUIsTUFBckI7QUFDQSxjQUFJLFNBQVMsS0FBYixFQUFvQjtBQUNsQixpQkFBSyxhQUFMLEdBQXFCLFFBQXJCO0FBQ0Q7QUFDRCxjQUFJLFNBQVMsSUFBYixFQUFtQjtBQUNqQixpQkFBSyxhQUFMLEdBQXFCLFVBQXJCO0FBQ0Q7QUFFRixTOztpQ0FHRCxVLHVCQUFXLEcsRUFBSztBQUNkLGNBQUksU0FBUyxLQUFiO0FBQ0EsY0FBSSxLQUFLLFlBQUwsR0FBb0IsQ0FBeEIsRUFBMkI7QUFDekIsZ0JBQUksS0FBSyxLQUFMLENBQVcsdUJBQVgsQ0FBbUMsR0FBbkMsQ0FBSixFQUE2QztBQUMzQyx1QkFBUyxLQUFLLFNBQUwsQ0FBZSxHQUFmLENBQW1CLEtBQUssS0FBTCxDQUFXLHVCQUFYLENBQW1DLEdBQW5DLEVBQXdDLEtBQUssS0FBTCxDQUFXLFdBQW5ELENBQW5CLENBQVQ7QUFDRDtBQUNGO0FBQ0QsaUJBQU8sTUFB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