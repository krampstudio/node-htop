var StatPoller = require("../lib/statpoller").StatPoller;
var util = require('util');
var logger = require('../lib/logFactory').LogFactory.logger;

module.exports = function(io){

    io.of('/stat')
        .on('connection', function(socket) {
            logger.log('info', "Socket opened");

            var statPoller = new StatPoller({delay: 2000});

            statPoller.on('start', function() {
                logger.debug("Poller started");
                statPoller.on('stat', function(stat) {
                    logger.debug(util.format("Got stat %j", stat));

                    socket.emit('stat', stat);
                });
            });
            socket.on('disconnect', function(){
                logger.debug('SOCKET disconnected from client');
                statPoller.stop();
            });

            //start the polller
            statPoller.start();
       });
};
