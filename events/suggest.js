const {
  EmbedBuilder,
  Collection,
  PermissionsBitField,
  ModalBuilder,
  TextInputBuilder,
  ActionRowBuilder,
  TextInputStyle,
  ButtonBuilder,
} = require("discord.js");
const client = require("..");

client.on("messageCreate", async (message) => {
  if (message.channel.id === client.config.channels["suggest"]) {
    if (message.author.id === client.user.id) return;
    if (
      !message.content ||
      message.content == "" ||
      message.content == "``" ||
      message.content == null
    )
      return;
    message.delete().catch((err) => {});
    const embed = new EmbedBuilder()
      .setTitle(client.config.embeds["SUGGEST"]["TITLE"])
      .setColor(client.config.embeds["SUGGEST"]["COLOR"])
      .setFields(
        {
          name: `Autor opinii`,
          value: `${message.member} \n ${message.member.user.id}`,
        },
        {
          name: `Treść opinii`,
          value: `${message.content}`,
        },
      );
    let msg = await message.channel.send({ embeds: [embed] });
    msg.react(client.config.emoji["TAK"]);
    msg.react(client.config.emoji["NIE"]);
  }
});
