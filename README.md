vGrid - Custom Element for Aurelia
----------------------------------


[Demo](http://vegarringdal.github.io/vGrid/demo001/)

##### Using som icons/classes from bootstrap:
* Encluded used classes/icons, no need to install bootstrap for it to work, huge thanks to http://glyphicons.com/ for giving bootstrap those amazing icons


##### How to use: (no plugin yet):
1: Copy the files under vgrid folder to you src folder

2: Add require to the css and element:

```
<require from="vGrid/v-grid.css"></require>
<require from="vGrid/v-grid.js"></require>
```

3: Add the grid element with columns (same as demo)

```
<v-grid
        style="position:relative;margin-left:25px;width:%; height:500px"
        row-height="25"
        header-height="50"
        resizable-headers="true"
        sortable-headers="true"
        sort-on-header-click="true"
        header-filter="true"
        header-filter-onkeydown="true"
        header-filter-not-to="phone"
        header-filter-top="true"
        multi-select="true"
        config="current-entity.bind:myCurrentEntity; collection.bind:myCollection ">
    <v-grid-row>
        <v-grid-col col-width="150" attribute="index"   header="Index"    default-filter=">=" read-only="true"></v-grid-col>
        <v-grid-col col-width="150" attribute="name"    header="Name"     default-filter="*="                 ></v-grid-col>
        <v-grid-col col-width="160" attribute="country" header="Country"  default-filter="="                  ></v-grid-col>
        <v-grid-col col-width="150" attribute="email"   header="Email"    default-filter="*"                  ></v-grid-col>
        <v-grid-col col-width="160" attribute="color"   header="Color"    default-filter="=*"                 ></v-grid-col>
    </v-grid-row>
</v-grid>
```

4: Add the vars for the current entity and collection you added under config attribute in html

```
  myCollection = [];
  myCurrentEntity = {};
```


----------------------------------

### < v-grid > attributes:
* config -> 
* row-height
* header-height
* footer-height
* resizable-headers
* resize-also-rows
* multi-select
* sortable-headers
* request-animation-frame
* render-on-scrollbar-scroll
* locked-columns
* header-filter
* header-filter-top
* header-filter-onkeydown
* sort-on-header-click
* header-filter-not-to

----
### < v-grid-col > attributes:
* col-width
* attribute
* header
* read-only
* col-css
* default-filter



----
##### < v-grid > Attributes details:

###### "config"
* current-entity -> current entity, thats where you link all you inputs etc
* collection -> collection you want grid to use, grid will add a __sgKey property to this and use a internal clone for filtering/sorting
* grid-context -> if you want to access the grid function/manual set attibutes without using html, all attributes can be set here, replace line with uppercase : row-height = rowHeight

###### "row-height"
Default: 50, set the height of the row
###### "header-height"
Default :0, sets the height of the header
###### "footer-height"
Default :0, sets the height of the footer
###### "resizable-headers"
Default :false, enables resizing of header
###### "resize-also-rows"
Default: false, if active with "resizable-headers" the row columns also resize, else its just the header, and the grid renders columns after
###### "multi-select"
Default: undefined, undefined = none, false = single, true = multi select
###### "sortable-headers"
Default = false: enables sorting of headers columns, (drag/drop)
###### "request-animation-frame"
Default = true: if false it does not request animation frame
###### "render-on-scrollbar-scroll"
Default = true: if false it does not try to render if there is to much scrolling up/down with scrollbar
###### "locked-columns"
Default = 0, this can be very slow, but its x columns from left.
###### "header-filter"
Default = false, adds filter to header, you need to set height if header higher now because the filter tried to use 50% of the column height
###### "header-filter-top"
Default = false, set to tru if you want filter above the header labels
###### "header-filter-onkeydown"
Default = false, when false you need to press "enter" to activate filtering
###### "header-filter-not-to"
Default = "", here you can add columns attibute names you dont want filter for, like  this "index,name"
###### "sort-on-header-click"
Default = false, settingthis to true will activate multisort on header clicks






---

##### < v-grid-col > Attributes details:

###### "col-width"
This is the width in pixe, default value is 100

###### "attribute"
This is the attibute you want it to display

###### "header"
This is the header text

###### "read-only"
Default value is false/undefined, setting it to tru will stopp cell editing

###### "default-filter"
You cant combine there, but with it is set to equal to or begin with you can use "*" as wildcard.
These can be used:
* __"="__: "equal",
* __"<="__: "less than or eq",
* __">="__: "greater than or eq",
* __"<"__: "less than",
* __">"__: "greater than",
* __"*"__: "contains",
* __"!="__: "not equal to",
* __"!*"__: "does not contain",
* __"*="__: "begin with",
* __"=*"__: "end with"



##### Config-> Attributes in more details:

```
config="current-entity.bind:myCurrentEntity; collection.bind:myCollection; grid-context.bind:myGrid">

```

```
myCollection = [];
myCurrentEntity = {};
myGrid={
  onRowDraw : function (data){
    if(data){
      if(data.country === "Norway"){
        data.cssCountryColor = "blue"
      }
    }
  }
};

```
__onRowDraw__ is the only function Ive added for now, you can have this to edit whats displayed in the row

__ctx__ is also added to the gridContext if its used, from here you have access to grids internal function, like endable/disable filters/ resizable header, set row height etc etc, (these have not been tested after rebuild)