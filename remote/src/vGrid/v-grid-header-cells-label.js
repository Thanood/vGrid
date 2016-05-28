/*****************************************************************************************************************
 *    VGridHeaderLabel
 *    Custom element for use in the header/column container (v-grid-header-col.js)
 *    Created by vegar ringdal
 *
 ****************************************************************************************************************/
import {inject, customElement, bindable} from 'aurelia-framework';
//for kendo ui bridge, remove import above
//import {bindable, customElement} from 'aurelia-templating';
//import {inject} from 'aurelia-dependency-injection';



@customElement('v-grid-label')
@inject(Element)
export class VGridHeaderLabel {
  @bindable type;

  /*****************************************************
   *  constructor
   ******************************************************/
  constructor(element) {
    this.element = element;
  }


  /*****************************************************
   *  element event
   ******************************************************/
  bind(parent) {
    this.parent = parent;
    this.vGrid = parent.vGrid;
    this.vGridConfig = parent.vGrid.vGridConfig;
  }


  /*****************************************************
   *  element event
   ******************************************************/
  attached() {
    this.content = this.element.children[0];
    this.setStyle(this.content);
    this.content.setAttribute(this.vGridConfig.atts.dataAttribute, this.parent.attribute());
    this.content.style.height = "initial";


  }

  setStyle(element) {

    var addClass = (name)=> {
      element.classList.add(name)
    };

    var setStyleTag = (tag, value)=> {
      element.style[tag] = value;
    };

    var dragHandle = this.vGridConfig.isSortableHeader ? this.vGridConfig.css.dragHandle : "";


    switch (this.type) {
      case "labelTop":
        addClass(this.vGridConfig.css.cellContent);
        addClass(this.vGridConfig.css.filterLabelTop);
        dragHandle ? addClass(dragHandle) : "";
        addClass(this.vGridConfig.css.orderHandle);
        setStyleTag("line-height", `${this.vGridConfig.headerHeight / 2}px`);
        break;
      case "labelBottom":
        addClass(this.vGridConfig.css.cellContent);
        addClass(this.vGridConfig.css.filterLabelBottom);
        dragHandle ? addClass(dragHandle) : "";
        addClass(this.vGridConfig.css.orderHandle);
        setStyleTag("line-height", `${this.vGridConfig.headerHeight / 2}px`);
        break;
      case "blankLabel":
        addClass(this.vGridConfig.css.cellContent);
        if (this.vGridConfig.filterOnAtTop) {
          addClass(this.vGridConfig.css.filterLabelBottom);
        } else {
          addClass(this.vGridConfig.css.filterLabelTop);
        }
        addClass(this.vGridConfig.css.orderHandle);
        break;
      case "single":
        addClass(this.vGridConfig.css.cellContent);
        dragHandle ? addClass(dragHandle) : "";
        addClass(this.vGridConfig.css.orderHandle);
        setStyleTag("line-height", `${this.vGridConfig.headerHeight}px`);
        break;
      default:
        break;
    }


  }


}