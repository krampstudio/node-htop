var cluster = require('cluster');
var cpus = require('os').cpus().length;

console.log(cpus + ' CPUs found');

if(cluster.isMaster){
    for (var i = 0; i < cpus; i++){
        cluster.fork();
    }

    cluster.on('exit', function(worker, code, signal){
        console.log('worker ' + worker.process.pid + ' died');
    });
} else {
    require('./app');
}
