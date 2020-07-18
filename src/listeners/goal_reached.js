const sleep = require('util').promisify(setTimeout);

module.exports = async bot => { // on reach goal (npc)
    let entity = getNPC(bot); // find skywars npc
    await bot.lookAt(entity.position.offset(0, 1, 0), false, async () => { // look at the npc
        await bot.setQuickBarSlot(2); // select empty slot
        await sleep(500);
        await bot.activateEntity(entity, err => err && console.error(err)); // click on it
    });
}

function getNPC(bot) {
    return Object.keys(bot.entities).map(key => bot.entities[key]).find(e => e.username === 'SkyWars Teams');
}