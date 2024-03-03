const {
  Discord,
  MessageEmbed,
  MessageButton,
  PermissionsBitField,
  PermissionFlagsBits,
  Message,
  Client,
  MessageActionRow,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
} = require("discord.js");

module.exports = {
  name: "verify",
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    if (
      !message.member.permissions.has(PermissionsBitField.Flags.Administrator)
    )
      return;
    const embed = new EmbedBuilder()
      .setColor(client.config.embeds["verify"]["color"])
      .setTitle(client.config.embeds["verify"]["title"])
      .setDescription(client.config.embeds["verify"]["description"])
      .setImage(client.config.embeds["verify"]["image"]);
    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId("verify-btn1")
        .setLabel(client.config.buttons["verify"]["label"])
        .setStyle(client.config.buttons["verify"]["style"]),
    );
    message.delete();
    message.channel.send({ embeds: [embed], components: [row] });
  },
};
