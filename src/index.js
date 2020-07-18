const bot = require('./Bot/index.js');
// const server = require('./Server/index.js');
// server(bot);

process.on('unhandledRejection', error => {
    console.error(error.stacl || error);
});