var StatPoller = require("../lib/statpoller").StatPoller;

module.exports = function(io){
    
    //create a new poller
    var statPoller = new StatPoller({delay: 2000});
    
    statPoller.on('start', function() {
        console.log("Poller started");
        
        io.of('/stat').on('connection', function(socket) {
            console.log("Socket opened");

            statPoller.on('stat', function(stat) {
                console.log("Got stat %j", stat);
                
                socket.emit('stat', stat);
            });
        });
    });
    
    //start the polller
    statPoller.start();
}