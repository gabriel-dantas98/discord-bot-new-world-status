const schedule = require('node-schedule');
const Discord = require("discord.js")
const { Cheerio } = require("cheerio")

const { GetServerStatus } = require("./new-world-status")
const { GetEmbedNotificationMessage } = require("./discord-message")
const { NEW_LINE_EMBED, CHANNEL_ID } = require("./constants")

const client = new Discord.Client()
const message = new Discord.Message()
const rule = "*/10 * * * * *" //every 10s

client.login(":p")

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

client.on("!nw subscribe region", (message) => {
  console.log(message.send("subscribe server status"))
})

// client.on("message", msg => {
//     if (msg.content === "dale") {
//       msg.reply("dolly");
//     }
//     if (msg.content === "caiu?") {
//         GetServerStatus().then((serverStatus) => { 
//             msg.reply(serverStatus)
//         })  
//       }
  
// })
