var os = require('os');

module.exports = {
  
    getPlatform: function(){
        return os.type() + ' ' + os.arch();
    },

    getCpus: function(){
       var cpus = os.cpus();
       return { count: cpus.length, model: cpus[0].model };
    }
};
