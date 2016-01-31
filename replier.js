var Queue = require('./queue');
var network = require('./network');
var bot = require('./bot');
var logger = require('./logger');

var messagesQueue = new Queue();

const MESSAGE_EVENT = 4;
const OWN_MSG = 2;

const CHAT_BOUNDARY = 2000000000;

var last_response = '';

function FormatUpdate(update) {
    return {
        event: update[0],
        id: update[1],
        flags: update[2],
        from_id: update[3],
        timestamp: update[4],
        subject: update[5],
        text: update[6],
        attachements: update[7]
    };
}

function Process(raw_updates) {
    var updates = raw_updates.map(function(update) {
        return FormatUpdate(update);
    });

    var messages = updates.filter(function (update) {
        return update.event === MESSAGE_EVENT && !(update.flags & OWN_MSG)
    });

    messages.forEach(function (message) {
        var response = bot.respond(message.text);

        if (response) {
            messagesQueue.enqueue({ to: message.from_id, text: response, command: message.text });
        }
    })
}

setInterval(function () {
    var message = messagesQueue.dequeue();
    
    if (message) {
        if (message.text === last_response) {
            message.text += ' &#128522;';
        }
        
        last_response = message.text;
        
        var params = {
            message: message.text
        };

        if (message.to < CHAT_BOUNDARY) {
            params.user_id = message.to;
        } else {
            params.chat_id = message.to - CHAT_BOUNDARY;
        }

        network.MakeApiRequest('messages.send', params)
            .then(function (resp) {
                if (!resp.response) {
                    logger.log(resp);
                } else {
                    logger.log('Answered on:');
                    logger.log(message);
                }
            }, function (e) {
                logger.log('Error sending message');
                messagesQueue.enqueue(message);
            });
    }
}, 1500);

module.exports.process = Process; 