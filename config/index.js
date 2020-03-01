const nconf = require('nconf');

nconf.argv()
    .env()
    .file({
        file: './config/config.json'
    });

//nconf.set('port', '80');
// nconf.set('session:secret', "SpotlightMoonlight");
// nconf.set('session:key', "sid");
// nconf.set('session:cookie:path', "/");
// nconf.set('session:cookie:httpOnly', true);
// nconf.set('session:cookie:maxAge', null);

module.exports = nconf;