const Discord = require('discord.js');
const { 
        NEW_WORLD_STATUS_SITE, 
        NEW_LINE_EMBED, 
        MATERIAL_UNHEALTHY_COLOR,
        FIRE_EMOJI,
        OK_EMOJI } = require('./constants')

const GetBaseEmbed = () => {

    const embed = new Discord.MessageEmbed()
        .setColor(MATERIAL_UNHEALTHY_COLOR)
        .setTitle('New World Server Status')
        .setURL(NEW_WORLD_STATUS_SITE)
        .setTimestamp()
        .setFooter('Ultima atualização', '');

    return embed
}

const GetEmbedNotificationMessage = (serversStatus) => {
    let reportList = []

    serversStatus.forEach(el => {
        let regionNotification = GetBaseEmbed()

        console.log(el.region, el.servers.length)
        
        regionNotification.addField(el.region, NEW_LINE_EMBED, false)

        el.servers.forEach(s => {
            regionNotification.addField(GetEmojiStatus(s.status), s.name, true)
        })

        reportList.push(regionNotification)
    })

    return reportList
}

const GetEmojiStatus = (status) => {
    if (status === "UP") return  OK_EMOJI

    return FIRE_EMOJI
} 

const GetWelcomeMessage = () => {

}


module.exports = { GetEmbedNotificationMessage }
