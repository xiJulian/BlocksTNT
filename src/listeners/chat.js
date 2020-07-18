const sleep = require('util').promisify(setTimeout);
const place = require('../util/place.js');

module.exports = async (bot, username, message, _translate, jsonMsg) => {
    if (username === bot.username) return; // if message sender is the bot return
    else if (bot.inGame && message === '1 seconds!') { // on game start
        await sleep(3000); // wait 3sec
        await startTNT(bot); // place tnt and redstone :p, wil make it better soon
    } else if (jsonMsg.extra && jsonMsg.extra.find(msg => msg.text === 'Match Recap ')) { // on game end
        await sleep(2000); // wait 2sec
        await bot.setQuickBarSlot(7); // select "play again" item
        await sleep(2000);
        await bot.activateItem(); // play again!
        await bot.activateItem(); // try again if failed
        await sleep(1000);
        await bot.activateItem(); // AGAIN
    }
}

async function startTNT(bot) {
    await place(bot, 1, 0, -1, 0, true);
    await place(bot, 0, 0, -1, -1);
    await place(bot, 0, -1, -1, 0);
    await place(bot, 0, 0, -1, 1);
    await place(bot, 0, 1, -1, 0);
    await place(bot, 0, -1, -1, 1);
    await place(bot, 0, -1, -1, -1);
    await place(bot, 0, 1, -1, -1);
    await place(bot, 0, 1, -1, 1);
    await place(bot, 0, 0, 0, -1);
    await place(bot, 0, -1, 0, 0);
    await place(bot, 0, 0, 0, 1);
    await place(bot, 0, 1, 0, 0);
    await place(bot, 0, 0, -1, 0, true)
    // await place(bot, 1, 0, -1, 0, true);
}