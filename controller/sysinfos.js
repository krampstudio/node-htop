var sysinfos = require('../lib/sysinfos');

module.exports = function(app){
    app.get('/sysinfos', function(req, res){
        res.json({
            'platform': sysinfos.getPlatform(),
            'cpus' : sysinfos.getCpus()
        });
    });
};
