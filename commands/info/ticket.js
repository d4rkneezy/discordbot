const {
  Discord,
  Permissions,
  Message,
  Client,
  EmbedBuilder,
  ActionRowBuilder,
  SelectMenuBuilder,
  ButtonBuilder,
  PermissionsBitField,
  StringSelectMenuBuilder,
} = require("discord.js");

module.exports = {
  name: "ticket",
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    if (
      message.member.roles.cache.has(client.config.role["TICKET_ROLE"]) ||
      message.member.permissions.has(PermissionsBitField.Flags.Administrator)
    ) {
      const embed = new EmbedBuilder()
        .setColor(client.config.embeds["ticket"]["color"])
        .setTitle(client.config.embeds["ticket"]["title"])
        .setDescription(client.config.embeds["ticket"]["description"])
        .setImage(client.config.embeds["ticket"]["image"])
        .setThumbnail(client.config.embeds["ticket"]["thumbnail"]);
      const row = new ActionRowBuilder().addComponents(
        new StringSelectMenuBuilder()
          .setCustomId("selected-menu-ticket")
          .setPlaceholder(client.config.modals["ticket"]["placeholder"])
          .setMinValues(0)
          .setMaxValues(1)
          .addOptions([
            {
              label: client.config.modals["ticket"]["1"],
              value: "1",
              emoji: "<:bot:1207041251371651153>",
            },
            {
              label: client.config.modals["ticket"]["2"],
              value: "2",
              emoji: "<:serwer:1207041252650917898>",
            },
            {
              label: client.config.modals["ticket"]["3"],
              value: "3",
              emoji: "<:pomoc:1207040035258630195>",
            },
          ]),
      );
      message.delete();
      message.channel.send({ embeds: [embed], components: [row] });
    }
  },
};
