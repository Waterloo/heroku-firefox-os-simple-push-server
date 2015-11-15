var express = require('express'),
    http = require('http'),
    simplePush = require('../simplepush/client.js'),
    bodyParser = require('body-parser');


var Server = function Server() {

    var app = express();

    var pushClient = simplePush;

    var configure = function configure() {

        app.use(bodyParser.json()); // to support JSON-encoded bodies
        app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
            extended: false
        }));
        app.use(express.static(__dirname + '/public'));
//        app.get('/',function (req,res){});
        
        app.use(function (req, res, next) {
            res.contentType('application/json');
            next();
        });

        var port = process.env.PORT || 8080;
        var mongoURL = process.env.MONGOURL || 'mongodb://127.0.0.1:27017/simplepush';
        // For running in appfog
        if (process.env.VCAP_SERVICES) {
            var services = JSON.parse(process.env.VCAP_SERVICES);
            mongoURL = services['mongodb-1.8'][0].credentials.url;
        }

        app.set('port', port);
        app.set('mongoURL', mongoURL);

        pushClient.init(mongoURL);

        app.post('/api/v1/register', pushClient.register);
        app.post('/api/v1/unregister', pushClient.unregister);
        app.post('/api/v1/', pushClient.send);
        app.get('/api/v1/:seq', pushClient.get);

    };

    var start = function start() {
        configure();
        http.createServer(app).listen(app.get('port'), function () {
            console.log('Express server listening on port ' + app.get('port'));
            console.log(__dirname);
        });
    };

    return {
        'start': start
    };

}();

module.exports = Server;