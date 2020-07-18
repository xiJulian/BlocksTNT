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
        // case 'Select Battle Buddy!': // choose partner menu (on waiting lobby)
        //     let myHead = window.slots.find(item => item && item.nbt.value.display.value.Name.value === '§8§lxiJulian_');
        //     if (myHead) await bot.clickWindow(myHead.slot, 1, 0);
        //     else await bot.closeWindow();

        //     await sleep(1000);
        //     await bot.setQuickBarSlot(1);
        //     await bot.activateItem();
        //     break;
        case 'Kits': // select kit menu
            let tntKit = window.slots.find(item => item && item.name === 'tnt'); // tnt kit item
            if (tntKit) await bot.clickWindow(tntKit.slot, 1, 0); // check if blocksmc removed the kit :p
            else await bot.closeWindow(); // close the window if they did
    }
}