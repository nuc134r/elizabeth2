module.exports.for = lessons_for;
module.exports.today = today;
module.exports.tomorrow = tomorrow;

var lessons = require('./lessons.json').lessons;
var week = require('./week');

var time = require('./../time');

function today() {
	return lessons_for(time.now().day());
}

function tomorrow() {
	return lessons_for(time.now().day() + 1);
}

function lessons_for(_day, week_type) {
	var day = lessons[_day - 1];
	
	if (!day || !day.length) return "В этот день нет занятий.";

	if (week_type) {
		week_type = week_type === 'u' ? 0 : 1;
	} else {
		week_type = (week.number() + 1) % 2;
	}

	var hint = '';
	var now = time.now();
	if (_day === now.day()) hint = '(сегодня)';
	if (_day === now.day() + 1) hint = '(завтра)';
	
	var reply = 'Пары на ' + now.day(_day).format('dddd').toLowerCase() + hint + ':\n';
	day.forEach(function (item) {
		if (item instanceof Array) item = item[week_type];
		if (item.num) {
			reply += item.num + '. ' + item.teacher + '\n';
		}
	});
	reply += '(' + (week_type ? 'нижняя' : 'верхняя') + ' неделя)';

	return reply;
}