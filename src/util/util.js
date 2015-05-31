import can from 'can/can';

/* global GLOBALMAD */
var glbl = typeof window !== "undefined" ? window : global;

var mad = {};
if (typeof GLOBALCAN === 'undefined' || GLOBALCAN !== false) {
    glbl.mad = mad;
}
mad.global = mad;

export default mad;
