var moment = require('moment');
moment.locale('ru');

function now() {
	return moment().utc().add(3, 'h');
}

module.exports.now = now;
module.exports.moment = moment;