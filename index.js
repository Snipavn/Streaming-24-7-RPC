const Discord = require('discord.js-selfbot-v13');
const client = new Discord.Client({
  readyStatus: false,
  checkUpdate: false
});

const keepAlive = require('./server.js');
keepAlive();

function formatTime() { //Credits to himika#0001 and never#0001
  const date = new Date();
  const options = {
    timeZone: 'Asia/Ho_Chi_Minh', //https://www.zeitverschiebung.net/en/ and find your city and enter here
    hour12: true,
    hour: 'numeric',
    minute: 'numeric'
  };
  return new Intl.DateTimeFormat('vi-VIE', options).format(date);
}

client.on('ready', async () => {
  console.clear();
  console.log(`${client.user.tag} - rich presence started!`);

  const r = new Discord.RichPresence()
    .setApplicationId('Nhập id')
    .setType('STREAMING')
    .setURL('https://twitch.tv/discord') //Must be a youtube video link 
    .setState('24/7')
    .setName('24/7')
    .setDetails(`Live[${formatTime()}]`)
    .setStartTimestamp(Date.now())
 .setAssetsLargeImage('https://media.discordapp.net/attachments/882971561118806066/1127012634739363861/lofi.gif') //You can put links in tenor or discord and etc.
    .setAssetsLargeText('Large Text') //Text when you hover the Large image
    .setAssetsSmallImage('https://media.discordapp.net/attachments/882971561118806066/1127012635087470683/lofi-girl-lofi.gif') //You can put links in tenor or discord and etc.
    .setAssetsSmallText('Small Text') //Text when you hover the Small image
    .addButton('24/7', 'https://www.youtube.com/live/jfKfPfyJRdk?feature=share')
    .addButton('24/7', 'https://www.youtube.com/live/jfKfPfyJRdk?feature=share');

  client.user.setActivity(r);
  client.user.setPresence({ status: "dnd" }); //dnd, online, idle, offline

  let prevTime = null;
  setInterval(() => {
    const newTime = formatTime();
    if (newTime !== prevTime) {
      const newDetails = `PUT WHAT IT SAYS YOUR STREAMING HERE [${newTime}]`;
      r.setDetails(newDetails);
      client.user.setActivity(r);
      prevTime = newTime;
    }
  }, 1000); // Update every second
});

const mySecret = process.env['TOKEN'];
client.login(mySecret);
