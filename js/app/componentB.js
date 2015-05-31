import can from "can/can";
import componentA from "app/componentA";

var componentB = componentA.extend({

} ,{
    'init': function(){
        console.log('Component B');
    }
});

export default componentB;
