import $ from "jquery";
import mad from "mad/mad";
import Grid from "mad/component/grid";

// Set the grid map that will be used to transform the data for the view.
var map = new mad.Map({
    id: 'id',
    label: 'label'
});
// Set the grid columns model.
var columnModel = [
    new mad.model.GridColumn({
        name: 'id',
        index: 'id',
        label: 'id',
        sortable: true
    }), new mad.model.GridColumn({
        name: 'label',
        index: 'label',
        label: 'label',
        sortable: true
    })
];
var grid = new mad.component.Grid($('#grid'), {
    itemClass: mad.Model,
    map: map,
    columnModel: columnModel
});
grid.start();

var items = new mad.Model.List([{
    id: 'item_1',
    label: 'Item 1'
}, {
    id: 'item_2',
    label: 'Item 2'
}, {
    id: 'item_3',
    label: 'Item 3'
}, {
    id: 'item_4',
    label: 'Item 4'
}, {
    id: 'item_5',
    label: 'Item 5'
}, {
    id: 'item_6',
    label: 'Item 6'
}, {
    id: 'item_7',
    label: 'Item 7'
}, {
    id: 'item_8',
    label: 'Item 8'
}, {
    id: 'item_9',
    label: 'Item 9'
}, {
    id: 'item_10',
    label: 'Item 10'
}, {
    id: 'item_11',
    label: 'Item 11'
}, {
    id: 'item_12',
    label: 'Item 12'
}]);

grid.load(items);
