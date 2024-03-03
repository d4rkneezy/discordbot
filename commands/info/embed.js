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
  name: "embed",
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    if (
      message.member.roles.cache.has(client.config.role["EMBED_ROLE"]) ||
      message.member.permissions.has(PermissionsBitField.Flags.Administrator)
    ) {
      const embed = new EmbedBuilder().setDescription(`text`);
      const row = new ActionRowBuilder().addComponents(
        new StringSelectMenuBuilder()
          .setCustomId("selected-menu-embed")
          .setPlaceholder("Nic nie wybrane")
          .setMinValues(0)
          .setMaxValues(1)
          .addOptions([
            {
              label: "setColor",
              value: "setColor",
            },
            {
              label: "setTitle",
              value: "setTitle",
            },
            {
              label: "setURL",
              value: "setURL",
            },
            {
              label: "setAuthor",
              value: "setAuthor",
            },
            {
              label: "setDescription",
              value: "setDescription",
            },
            {
              label: "setThumbnail",
              value: "setThumbnail",
            },
            {
              label: "setImage",
              value: "setImage",
            },
            {
              label: "setFooter",
              value: "setFooter",
            },
          ]),
      );
      const row1 = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setCustomId("send-embed-btn")
          .setLabel("Wyslij")
          .setStyle(1),
        new ButtonBuilder()
          .setCustomId("reset-embed-btn")
          .setLabel("Resetuj")
          .setStyle(1),
      );
      message.delete();
      message.channel.send({ embeds: [embed], components: [row, row1] });
    }
  },
};
