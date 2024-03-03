const client = require("../index")
const { EmbedBuilder, Collection, PermissionsBitField } = require('discord.js')

client.on('guildMemberBoost', async(member) => {
    const channel = await member.guild.channels.cache.get(client.config.channels["boost"])
    if(!channel) return console.log("Zły kanał dla boostow w logach")
    const embed = new EmbedBuilder()
    .setTitle(client.config.embeds["boost"]["title"])
    .setDescription(client.config.embeds["boost"]["description"].replace("{member}", member))
    .setImage(client.config.embeds["boost"]["image"])
    .setColor(client.config.embeds["boost"]["color"])
    channel.send({embeds: [embed]})
});