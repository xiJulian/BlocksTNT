const sleep = require('util').promisify(setTimeout);

module.exports = async (bot, window) => {
    await sleep(1000);

    let title = JSON.parse(window.title).text;
    switch (title) {
        case 'Where would you like to go?': // game menu
            await bot.clickWindow(14, 1, 0, err => err && console.error(err)); // click on skywars
            break;
        case 'SkyWars Teams': // when click on npc (map selector menu)
            await bot.clickWindow(13, 1, 0, err => err && console.error(err));
            break;
        case 'Select Battle Buddy!':
            if (bot.currentWindow) await bot.closeWindow();
            await sleep(500);
            await bot.setQuickBarSlot(1);
            await bot.activateItem(); // open kits menu
            break;
        case 'Kits': // select kit menu
            let tntKit = window.slots.find(item => item && item.name === 'tnt'); // tnt kit item
            if (tntKit) bot.clickWindow(tntKit.slot, 1, 0); // check if blocksmc removed the kit :p
            else if (bot.currentWindow) bot.closeWindow(); // close the window if they did
            break;
    }
}