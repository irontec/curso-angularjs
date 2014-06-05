'use strict';

var restlist       = require('./controllers/restlist'),
    restfiles      = require('./controllers/restfiles'),

    app            = require('./server').app,
    auth           = require('./server/auth');


/**
 * Application routes
 */

// cors
app.use(require('cors')());

//app.route("*").post(auth).put(auth).delete(auth);

var ingredientes = new restlist({
    path: 'ingredientes'
});

app.use("/ingredientes", ingredientes.router);
