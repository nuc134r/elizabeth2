var logger = require('./logger');

function Handle(error) {
    return new Promise((resolve, reject) => {
        
        logger.log('Waiting 2 minutes and calling again');
        setInterval(() => { 
            logger.log('Waited for 2 minutes and recalled');
            resolve();
        }, 1000 * 60 * 2);
        
        if (error.code === 'API_ERR') {
            
        }
        
        if (error.code === 'PARSE_ERR') {
            
        }
        
        if (error.code === 'RESP_ERR') {
            
        }
        
        if (error.code === 'REQ_ERR') {
            
        }
    });
}

module.exports = Handle;