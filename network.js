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
        config.log_requests && logger.log('GET >> ' + url);
        var request = protocol.get(url, function (resp) {
            resp.on('data',function (data) {
                var str_data = '' + data;
                try {
                    var parsed = JSON.parse(str_data);
                    config.log_requests && logger.log('    << ' + str_data);
                    resolve(parsed);
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