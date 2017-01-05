var http = require('http');
var config = require('./config.json');
var HttpDispatcher  = require('httpdispatcher');
var dispatcher     = new HttpDispatcher();
var count = 0;

function handleRequest(request, response){
    try {
        console.log("Requested URL: " + request.url);
        dispatcher.dispatch(request, response);
    } catch(err) {
        console.log(err);
    }
}

dispatcher.setStatic('/resources');
dispatcher.setStaticDirname('/tmp/resources');

dispatcher.onGet("/", function(req, res) {
    count++;
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('I <3 Bamboo - number of gets='+count);
});

dispatcher.onError(function(req, res) {
        res.writeHead(404);
        res.end("404 - Page Does not exists");
});

http.createServer(handleRequest).listen(config.port, function(){
    console.log("Server listening on: http://localhost:%s", config.port);
});
