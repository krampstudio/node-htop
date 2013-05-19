var StatPoller = require("../lib/statpoller").StatPoller;

module.exports = function(io){
    
    io.of('/stat')
        .on('connection', function(socket) {
            console.log("Socket opened");

            var statPoller = new StatPoller({delay: 2000});
    
            statPoller.on('start', function() {
                console.log("Poller started");
                statPoller.on('stat', function(stat) {
                    console.log("Got stat %j", stat);
                    
                    socket.emit('stat', stat);
                });
            });
            socket.on('disconnect', function(){
                console.log('SOCKET disconnected from client');
                statPoller.stop();
            });
            
            //start the polller
            statPoller.start();
       });
};
