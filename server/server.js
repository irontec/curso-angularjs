#!/usr/bin/env node

'use strict';

require("./lib/routes");

// handle grunt-express-server SIGTERM signals
process.once("SIGTERM", function () {
    process.exit();
});

process.once("SIGINT", function () {
    process.exit();
});
