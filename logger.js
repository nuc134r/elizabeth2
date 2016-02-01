var moment = require('moment');
var config = require('./config');

var last_stamp = null;
const stamp_format = 'DD/MM/YYYY HH:mm:ss';
const stamp_empty = '                   ';

function timestamp() {
    var stamp = moment().utc().add(3, 'h').format(stamp_format);
    if (last_stamp !== stamp) {
        last_stamp = stamp;
        return last_stamp;
    } else {
        return stamp_empty;
    }
}

function log(message) {
    var dim = ~message.indexOf("<<") || ~message.indexOf(">>");
    
    if (typeof message !== 'string') message = JSON.stringify(message);
    
    message = message.replace(config.token, '#####');
    
    if (dim) {
        console.log(timestamp(), '\x1b[35m' + message + '\x1b[0m');
    } else {
        console.log(timestamp(), message);
    }
}

module.exports.log = log;