var http = require('http');
var https = require('https');

var logger = require('./logger');
var config = require('./config');

function MakeGetRequest(url, params) {
    var protocol = ~url.indexOf('https') ? https : http;
    var paramArr = [];

    if (params) {
        url += '?';
        for (var param in params) {
            paramArr.push(param + "=" + encodeURI(params[param]));
        }
        url += paramArr.join('&');
    }

    var promise = new Promise((resolve, reject) => {
        config.log_requests && logger.log('\x1b[36m>> ' + url + '\x1b[0m');
        var request = protocol.get(url, function(resp) {
            resp.on('data', function(data) {
                var str_data = data.toString().trim();
                try {
                    config.log_requests && logger.log('\x1b[35m<< ' + str_data + '\x1b[0m');
                    var parsed = JSON.parse(str_data);
                    resolve(parsed);
                }
                catch (e) {
                    reject({ code: 'PARSE_ERR', data: str_data });
                }
            });
            resp.on('error', (e) => reject({ code: 'RESP_ERR'}));
        });
        request.on('error', (e) => reject({ code: 'REQ_ERR', data: e }));
    });

    return promise;
}

function MakeApiRequest(method, params) {
    const API_BASE = 'https://api.vk.com/method/';
    var config = require('./config');

    params = params || {};
    params.access_token = config.token;

    return MakeGetRequest(API_BASE + method, params);
}

module.exports.MakeGetRequest = MakeGetRequest;
module.exports.MakeApiRequest = MakeApiRequest;