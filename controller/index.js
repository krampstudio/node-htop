exports.index = function(app){
    app.get("/info", function(req, res){
        res.json({'data' : 'ok'});
    });
}