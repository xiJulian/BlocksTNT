// bossBarDeleted, because the boss bar get deleted when joining game :p
module.exports = async bot => {
    if (bot.waiting) {
        bot.inGame = true;
        bot.waiting = false;
    }
}