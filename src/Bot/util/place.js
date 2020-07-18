const Vec3 = require('vec3');

module.exports = async (bot, slot, dx, dy, dz, jump = false) => {
    // i will rewrite this trash soon
    return new Promise(async (resolve, reject) => {
        await bot.setQuickBarSlot(slot);

        let block = bot.blockAt(bot.entity.position.offset(dx, dy, dz));

        if (jump) {
            let jumpY = Math.floor(bot.entity.position.y) + 1.0;
            let tryCount = 0;
            bot.setControlState('jump', true);
            bot.on('move', placeIfHighEnough);

            async function placeIfHighEnough() {
                let blockUnderPlayer = bot.blockAt(bot.entity.position.offset(0, -1, 0));
                if (bot.entity.position.y > jumpY) {
                    await bot.placeBlock(block, new Vec3(0, 1, 0), err => {
                        if (err) {
                            tryCount++;
                            if (tryCount > 10) {
                                bot.setControlState('jump', false);
                                bot.removeListener('move', placeIfHighEnough);
                                resolve();
                                return;
                            } else if (blockUnderPlayer.type === 54 || blockUnderPlayer.type === 78 || blockUnderPlayer.type === 80) {
                                module.exports(slot, -1, 0, 1, jump);
                                return;
                            }
                            return;
                        }
                        bot.setControlState('jump', false);
                        bot.removeListener('move', placeIfHighEnough);

                        resolve();
                    });
                }
            }
        } else await bot.placeBlock(block, new Vec3(0, 1, 0), err => {
            if (err) {
                let block = bot.blockAt(bot.entity.position.offset(dx, dy + 1, dz));
                if (block && block.type != 46 && block.type != 0) {
                    bot.dig(block, err => {
                        if (err) return console.error(err);
                        module.exports(slot, dx, dy, dz, jump);
                    });
                    return;
                }
                resolve();
                return;
            }
            resolve();
        });
    });
}