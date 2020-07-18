const mineflayer = require('mineflayer');
const { pathfinder } = require('mineflayer-pathfinder');
const fs = require('fs');

const bot = mineflayer.createBot({
    username: 'xiJulian___',
    host: 'blocksmc.com',
    version: '1.12.2',
    plugins: [pathfinder]
});

fs.readdir('./src/listeners/', (err, files) => {
    if (err) console.error(err);
    else files.forEach(file => {
        let event = require('./listeners/' + file);
        bot.on(file.split('.')[0], (...params) => event(bot, ...params));
    });
});

process.on('unhandledRejection', error => {
    console.error(error.stack || error);
});