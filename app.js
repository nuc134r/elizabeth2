var network = require('./network');
var replier = require('./replier');

var logger = require('./logger');

require('./timers');

function MakeLongpoolRequest (data) {
    var url = 'https://' + data.server;
    var params = {
        "act": "a_check", "key": data.key, "ts": data.ts, "wait": 25, "mode": 2
    };
    return network.MakeGetRequest(url, params);
}

function ProcessGetServerResponse(data) {
    if (!data.response) throw Error('Unexpected response: ' + JSON.stringify(data));
    logger.log('Got server(' + data.response.server + ')');
    return data.response;
}

function Listen(server) {
    MakeLongpoolRequest(server)
        .then(data => {
            replier.process(data.updates);
            server.ts = data.ts;
            Listen(server);
        })
        .catch(logger.log);
}

function Start() {
    network.MakeApiRequest('messages.getLongPollServer', {"captcha_sid": "391083320406", "captcha_key" : "hx7qxq2"})
        .then(ProcessGetServerResponse)
        .then(Listen)
        .catch(logger.log);
}

Start();