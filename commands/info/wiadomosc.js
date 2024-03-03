
const { Discord, MessageEmbed, MessageButton, Permissions, Message, Client, MessageActionRow, EmbedBuilder, ActionRowBuilder, ButtonBuilder, PermissionsBitField }= require("discord.js");


module.exports = {
	name: "wiadomosc",
/**
 *
 * @param {Client} client
 * @param {Message} message
 * @param {String[]} args
 */
    run: async (client, message, args) =>{
        if(message.member.roles.cache.has(client.config.role["SAY_ROLE"]) || message.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
            const embed = new EmbedBuilder()
            .setColor(client.config.embeds["wiadomosc"]["color"])
            .setTitle(client.config.embeds["wiadomosc"]["title"])
            .setDescription(client.config.embeds["wiadomosc"]["description"])
            .setImage(client.config.embeds["wiadomosc"]["image"])
            const button = new ButtonBuilder()
            .setCustomId('button')
            .setLabel('ㅤㅤㅤㅤㅤ     ⁣  wiergen.plㅤㅤㅤㅤㅤ     ⁣  ')
            .setStyle('Primary')
            .setDisabled(true);

            const actionRow = new ActionRowBuilder().addComponents(button)
        
            message.channel.send({embeds: [embed], components: [actionRow]})

        }
    }

}