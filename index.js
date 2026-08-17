var Discord = require('discord.js');
var https = require('https');

var client = new Discord.Client({
intents: [
Discord.GatewayIntentBits.Guilds,
Discord.GatewayIntentBits.GuildMessages,
Discord.GatewayIntentBits.MessageContent
 ]
});

var sourceChannels = [
'1525926890316107936','1525926891373203468','1525926892472107058',
'1525926893424087132','1525926894451687645','1525926895785476106',
'1525926896989110352','1525926898553847808','1525926899807813733',
'1525926900885880863','1525926901972074496','1525926903100342443',
'1525926904312631516','1525926905679843348','1525926906837598289',
'1525926907890106458','1525926909089943685','1525926910113349642',
'1525926910981574736','1525926911824367646','1525926912847773706',
'1525926913787428904','1525926914798260326','1525926915674738819',
'1525926917684068583','1525926918904479895','1525926919802060830',
'1525926921492496445','1525926925355323474','1525926926655557702'
];

client.on('ready', function() {
console.log('Logged in as ' + client.user.tag);
});

client.on('messageCreate', function(message) {
if (message.author.bot) return;
if (sourceChannels.indexOf(message.channelId) === -1) return;

var payload = JSON.stringify({
content: message.content,
author: { username: message.author.username },
channel_id: message.channelId
});

var options = {
hostname: 'functions.pabbly.com',
path: '/api/orgs/69c62d3491a29653da9a74ff/functions/6a833e5ebd9df0cab2fd7fb1/invoke',
method: 'POST',
headers: {
'Content-Type': 'application/json',
'Content-Length': Buffer.byteLength(payload)
}
};

var req = https.request(options);
req.write(payload);
req.end();
});

client.login(process.env.DISCORD_BOT_TOKEN);
