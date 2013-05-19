module.exports = function(app){
    app.get('/sysinfos', function(req, res){
        res.json({
            'ok': true
        });
    });
};
