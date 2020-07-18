const { Movements, goals } = require('mineflayer-pathfinder');
const sleep = require('util').promisify(setTimeout);

module.exports = async bot => {
    console.log('Logged in and spawned!');

    if (!bot.spawn) bot.spawn = 0;
    if (!bot.inGame) bot.spawn++;

    await sleep(800);
    if (bot.spawn === 1) { // login server
        await bot.chat('/login 32932'); // you need to register before running the bot
        await sleep(500);
        await bot.setControlState('forward', true); // bypass antibot/antispam/kick
    } else if (bot.spawn === 2) { // hub server
        await bot.setControlState('forward', false); // stop walking
        await bot.setQuickBarSlot(0); // select game menu
        await sleep(800);
        await bot.activateItem(); // open game menu
    } else if (bot.spawn === 3) { // skywars lobby server
        let mcData = require('minecraft-data')(bot.version);
        let defaultMove = new Movements(bot, mcData);

        await bot.pathfinder.setMovements(defaultMove);
        await bot.pathfinder.setGoal(new goals.GoalBlock(1.507, 101, -170.700)); // navigate to skywars teams npc
    } else if (bot.spawn >= 4) { // skywars waiting lobby
        bot.waiting = true;
        await bot.setQuickBarSlot(1);
        await bot.activateItem(); // open kits menu
    }
}