module.exports.current = current_week;
module.exports.number = week_number;

var time = require('./../time');

function get_1sep(now) {
    var month = now.month() + 1;
    if (month >= 7) {
        return time.moment([now.year(), 8]);
    } else {
        return time.moment([now.year() - 1, 8]);
    }
}

function timeleft(to) {
    var diffInDays = to.diff(time.now(), 'days');
    if (diffInDays) return "Увидимся " + time.moment.duration(diffInDays, 'days').humanize(true);
    return "Увидимся завтра";
}

function week_number() {
    var now = time.now();
    var _1sep = get_1sep(now);
    
    _1sep.day("Monday");
    now.subtract(1, 'd');
    
    return now.diff(_1sep, "weeks") + 1;
}

function week(now, _1sep) {
    _1sep.day("Monday");
    now.subtract(1, 'd');
    var current = now.diff(_1sep, "weeks") + 1;
    var next = now.add(1, "day").diff(_1sep, "weeks") + 1;

    var weekType = next % 2 ? "верхняя" : "нижняя";

    if (current == next) {
        return "Сейчас неделя " + current + ", " + weekType + ".";
    } else {
        return "Завтра начинается неделя " + next + ", " + weekType + ".";
    }
}

function current_week() {
    var now = time.now();
    var _1sep = get_1sep(now);

    var month = now.month() + 1;
    if (month === 7 || month === 8) {
        return timeleft(_1sep);
    }

    return week(now, _1sep);
}