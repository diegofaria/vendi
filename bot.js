var SlackBot = require('slackbots');

// create a bot
var bot = new SlackBot({
    token: 'TOKEN_HERE',
    name: 'Natalie Portman'
});

bot.on('start', function() {
    // define existing username instead of 'user_name'
    bot.postMessageToUser('diegofaria', 'Olá!', function(data) {});
    console.log(bot.users)
});

bot.on('message', function(data) {
    // all ingoing events https://api.slack.com/rtm
    console.log('user: ' + data.user)
});
