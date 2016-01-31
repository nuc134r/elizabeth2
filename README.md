Вторая версия бота для VK. Первая [тут](https://github.com/nuc134r/vkbot).

# Настройка
```
$ git clone https://github.com/nuc134r/elizabeth2.git .
```
```
$ npm install
```
Для работы требуется токен от VK API с доступом к сообщениям, подойдёт как обычный, так и групповой токен. 
Его нужно поместить в `config.json` в корневой папке:
```
{
  "access_token" : "токен"
}
```

В конфиге также можно указать следующие параметры(`true` или `false`):

* `log_requests` - логирование HTTP-запросов 
* `online_status` - нужно ли обеспечивать статус "онлайн" (только для пользователей)
* `diagnostics` - диагностическая информация каждые 15 минут

По умоланию все настройки отключены.
# Запуск
Работает на Node.js версии =< 5.5.0
```
$ node app.js
```

# Как работает?
Модуль `commands.js` экспортирует объект любой степени вложенности `list`:
```
module.exports.list = {
  default: 'Unknown command',         // строка
  'weather': {
      default: getWeatherToday,       // функция
      'today': getWeatherToday,       // функция
      'tomorrow': getWeatherTomorrow, // функция
      'yesterday': 'Not avliable'     // строка
    }
}
```

Когда бот резолвит команду, полученную через личные сообщения, он идёт по строке и рекурсивно ищет ключевые слова в объекте. 
Например, при команде "weather tomorrow" он найдёт слово "weather" на первом уровне и примется за второй, где найдёт "tomorrow". В результате он вернёт результат функции `getWeatherTomorrow`.

Команда "weather" вернёт значение `default` из объекта `weather`. Значение по умолчанию берётся также и при отсутствии знакомых ключевых слов, например "weather monday". Эту логику можно посмотреть в файле `bot.js`.

Незнакомая команда будет обработана корневым полем `default`, причём если он будет `undefined`, то на незнакомые команды бот не будет отвечать.
