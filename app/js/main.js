var app     = require('./app'),
    Router  = require('./router');

app.router = new Router();
app.start();