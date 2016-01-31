var week = require('./commands/week');
var ring = require('./commands/ring');
var lessons = require('./commands/lessons');

var help = [
    "Команды:",
    "help",
    "ping",
    "неделя",
    "пары [завтра] [пн|вт|ср|чт|пт|сб|вс] [верх|низ]"]
    .join("\n - ");

var list = {
    "default": null,
    "help": help,
    "хелп": help,
    "помощь": help,
    "week": week.current,
    "неделя": week.current,
    "пары": {
        "default": {
            "default": lessons.today,
            "пн": lessons.for(1),
            "вт": lessons.for(2),
            "ср": lessons.for(3),
            "чт": lessons.for(4),
            "пт": lessons.for(5),
            "сб": lessons.for(6),
            "вс": lessons.for(0)
        },
        "сегодня": lessons.today,
        "завтра": lessons.tomorrow,
        "верх": {
            "default": lessons.today,
            "пн": lessons.for(1, 'u'),
            "вт": lessons.for(2, 'u'),
            "ср": lessons.for(3, 'u'),
            "чт": lessons.for(4, 'u'),
            "пт": lessons.for(5, 'u'),
            "сб": lessons.for(6, 'u'),
            "вс": lessons.for(0, 'u')
        },
        "низ": {
            "default": lessons.today,
            "пн": lessons.for(1, 'd'),
            "вт": lessons.for(2, 'd'),
            "ср": lessons.for(3, 'd'),
            "чт": lessons.for(4, 'd'),
            "пт": lessons.for(5, 'd'),
            "сб": lessons.for(6, 'd'),
            "вс": lessons.for(0, 'd')
        }
    },
    "звонок": ring.next,
    "ping": "pong",
    "пинг": "понг"
}

module.exports = list;