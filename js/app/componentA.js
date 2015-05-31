import can from "can/can";

var componentA = can.Construct.extend({

} ,{
    'init': function(){
        console.log('Component A');
    }
});

export default componentA;
