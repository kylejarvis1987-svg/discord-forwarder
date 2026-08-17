const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

client.on('ready', () => {
  console.log('Logged in as ' + client.user.tag);
});

client.on('messageCreate', async function(message) {
  if (message.author.bot) return;
  if (message.channelId !== '1525926890316107936') return;

  var payload = JSON.stringify({
    content: message.content,
    author: { username: message.author.username },
    channel_id: message.channelId
  });

  var https = require('https');
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
