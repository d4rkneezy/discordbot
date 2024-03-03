
const { Discord, MessageEmbed, MessageButton, Permissions, Message, Client, MessageActionRow, EmbedBuilder, ActionRowBuilder, ButtonBuilder, PermissionsBitField }= require("discord.js");


module.exports = {
	name: "sklep",
/**
 *
 * @param {Client} client
 * @param {Message} message
 * @param {String[]} args
 */
    run: async (client, message, args) =>{
        if(message.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
            const embed = new EmbedBuilder()
            .setColor(client.config.embeds["sklep"]["color"])
            .setTitle(client.config.embeds["sklep"]["title"])
            .setDescription(client.config.embeds["sklep"]["description"])
            .setImage(client.config.embeds["sklep"]["image"])
            const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                .setCustomId('sklep-btn-1')
                .setLabel(client.config.buttons["sklep1"]["label"])
                .setStyle(client.config.buttons["sklep1"]["style"])
                    .setEmoji('<:bot:1207041251371651153>')
                    .setDisabled(false),
                new ButtonBuilder()
                .setCustomId('sklep-btn-2')
                .setLabel(client.config.buttons["sklep2"]["label"])
                .setStyle(client.config.buttons["sklep2"]["style"])
                    .setEmoji('<:serwer:1207041252650917898>'),

            );
            message.channel.send({embeds: [embed], components: [row]})
        }
    }

}