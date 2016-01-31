var moment = require('moment');
var config = require('./config');

var util = require('util');

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
    if (typeof message === 'string') {
        message.replace(config.token, '');
        console.log(timestamp(), message);
    } else {
        console.log(timestamp(), JSON.stringify(message));
    }
}

module.exports.log = log;