var network = require('./network');
var logger = require('./logger');
var config = require('./config');

var updateOnline = config.online_status || false;
var logDiagnostics = config.diagnostics || false;

function DoIntervalThings() {
    var used = process.memoryUsage().heapUsed;
    var total = process.memoryUsage().heapTotal;
    
    if (logDiagnostics) {
        var memory_used = (used / total) * 100;
        logger.log('Uptime: ' + process.uptime() + ' Memory: ' + Math.floor(memory_used) + '%');
    }
    
    if (updateOnline) {
        network.MakeApiRequest('account.setOnline')
            .then(logger.log('Updated online status.'));
    }
}

if (updateOnline || logDiagnostics) {
    setInterval(DoIntervalThings, 1000 * 60 * 15);
    DoIntervalThings();
}