const schedule = require('node-schedule');
const Discord = require("discord.js")
const { Cheerio } = require("cheerio")

const { GetServerStatus } = require("./nw-status-scraper")
const { GetEmbedNotificationMessage } = require("./discord-message")
const { NEW_LINE_EMBED, CHANNEL_ID, BOT_TOKEN } = require("./constants")

const client = new Discord.Client()
const message = new Discord.Message()

const rule = "*/10 * * * * *" //every 10s
const prefix = "!nw";

client.login(BOT_TOKEN)

client.on("ready", () => {

  console.log(`O pai ta on ${client.user.tag}!`)
  const channel = client.channels.cache.get(CHANNEL_ID)
  
  // const job = schedule.scheduleJob(rule, function(){
  //   console.log('The answer to life, the universe, and everything!', Date.now());
  // });

  GetServerStatus().then((response) => {
    let messageNotification = GetEmbedNotificationMessage(response)
    // console.log(messageNotification)

    channel.send(messageNotification[1])
  });
})

client.on("message", message => {
  if (message.author.bot) return;

  if (message.content.indexOf(prefix) !== 0) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  let action, parameter = "";
  
  switch (command) {

    case "subscribe":
      action = args[2] 
      parameter = args[3]

      message.channel.send("command: " + command +  " action: " + args);
    break;

    case "region":
      action = args[2]
      parameter = args[3]
      
      message.channel.send("command: " + command +  " action: " + args);
      break;
    case "server":
      action = args[2] 
      parameter = args[3]
  
      message.channel.send("command: " + command +  " action: " + args);
    break;
  }
});
