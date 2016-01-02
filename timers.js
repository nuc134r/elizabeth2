var network = require('./network');
var logger = require('./logger');

function DoIntervalThings() {
    var used = process.memoryUsage().heapUsed;
    var total = process.memoryUsage().heapTotal;

    var memory_used = (used / total) * 100;
    logger.log('Uptime: ' + process.uptime() + ' Memory: ' + Math.floor(memory_used) + '%');
    
    network.MakeApiRequest('account.setOnline').then(() => {
        logger.log('Updated online status.')
    });
}

setInterval(DoIntervalThings, 1000 * 60 * 15);
DoIntervalThings();