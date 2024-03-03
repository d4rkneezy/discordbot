const client = require("../index");
const {
  EmbedBuilder,
  ButtonBuilder,
  ActionRowBuilder,
  Collection,
  PermissionsBitField,
} = require("discord.js");

client.on("guildMemberAdd", async (member) => {
  const channel = await member.guild.channels.cache.get(
    client.config.channels["newMember"],
  );
  if (!channel) return console.log("Zły kanał dla nowych osob w logach");
  const embed = new EmbedBuilder()
    .setTitle(client.config.embeds["newMember"]["title"])
    .setDescription(
      client.config.embeds["newMember"]["description"]
        .replace("{member}", member)
        .replace("{counter}", member.guild.memberCount.toLocaleString()),
    )
    .setImage(client.config.embeds["newMember"]["image"])
    .setColor(client.config.embeds["newMember"]["color"])
    .setThumbnail(member.user.displayAvatarURL());
  const button = new ButtonBuilder()
    .setCustomId("button")
    .setLabel("ㅤㅤㅤㅤㅤㅤㅤDARKNEEZ - POWITANIAㅤㅤㅤㅤㅤㅤㅤ")
    .setStyle("Positive")
    .setDisabled(true);

  const actionRow = new ActionRowBuilder().addComponents(button);

  channel.send({ embeds: [embed], components: [actionRow] });
});
