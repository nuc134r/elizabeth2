var http = require('http');
var https = require('https');

var logger = require('./logger');

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
        var request = protocol.get(url, (resp) => {
            resp.on('data', data => {
                var str_data = '' + data;
                try {
                    resolve(JSON.parse(str_data))
                } catch (e) {
                    logger.log('Unexpected reply:');
                    logger.log(str_data);
                    reject('Parse error');
                }
            });
            resp.on('error', reject);
        });
        request.on('error', reject);
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