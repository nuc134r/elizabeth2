var commands = require('./commands');

function tryParse(text) {
    text = text.trim();
    text = text.replace(/[&\/\\#,+()$~%.'":*?!<>{}]/g, '');
    text = text.toLowerCase();
    var words = text.split(" ");

    return resolveCommand(words);
}

function resolveCommand(words, cmnds) {
    cmnds = cmnds || commands;

    var command = null;
    words.forEach(function (word) {
        if (!command) {
            command = cmnds[word];
        }
    });

    command = command || cmnds["default"];
    
    if (!command) return; 
    if (typeof command === "object")   return resolveCommand(words, command);
    if (typeof command === "function") return command(words);
    if (typeof command === "string")   return command;
}

module.exports.respond = tryParse;