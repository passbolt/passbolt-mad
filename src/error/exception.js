import mad from 'mad/util/util';

// Initialize the error namespaces.
mad.error = mad.error || {};
mad.error.WRONG_PARAMETER = "Wrong parameter [%0]";
mad.error.MISSING_OPTION = "The option [%0] should be defined";

var MadException = mad.Exception = function() {
};

MadException.get = function(exception_message) {
    var reps = Array.prototype.slice.call(arguments, 1);
    var message = exception_message.replace(/%(\d+)/g, function(s, key) {
        return reps[key] || s;
    });
    return new Error(message)
};
