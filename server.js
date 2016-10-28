const http = require('http');
const PouchDB = require('pouchdb');
const PouchSync = require('pouch-websocket-sync');

const db = new PouchDB('entries-server');
const server = http.createServer();
const wss = PouchSync.createServer(server, onRequest);

wss.on('error', function(err) {
    console.error(err.stack);
});


server.listen(3001, function() {
    console.log((new Date()) + ' Server is listening on', server.address());
});

function onRequest(credentials, dbName, callback) {
    if (dbName == 'entries-server')
    {
        console.log('onRequest');
        callback(null, db);
    }
    else {
        callback(new Error('database not allowed'));
    }
}

