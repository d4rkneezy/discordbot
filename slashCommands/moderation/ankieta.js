const { Client, CommandInteraction, ChannelType,ApplicationCommandOptionType, ActionRowBuilder, EmbedBuilder, ButtonBuilder } = require("discord.js");
const ms = require("ms");

module.exports = {
  name: "ankieta",
  description: "Tworzy ankiete",
  options: [
    {
      name: "czas",
      description:
        "Jak dlugo (1m/1h/1d)",
      type: 3,
      required: true,
    },
    {
      name: "channel",
      description: "Jaki jest kanal?",
      type: 7,
      required: true,
    },
    {
      name: "tresc",
      description: "Jaka jest tresc ankiety?",
      type: 3,
      required: true,
    },
    {
      name: "odpowiedz1",
      description: "Jaka jest pierwsza odpowiedz?",
      type: 3,
      required: true,
    },
    {
      name: "odpowiedz2",
      description: "Jaka jest druga odpowiedz?",
      type: 3,
      required: true,
    },
  ],
  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   * @param {String[]} args
   */
  run: async (client, interaction, args) => {
    if (!interaction.member.permissions.has("MANAGE_GUILD"))
      return 
    const durnation = await ms(interaction.options.getString("czas"))
    const channel = interaction.options.getChannel("channel");

    const tresc = interaction.options.getString("tresc");
    const odpowiedz1 = interaction.options.getString("odpowiedz1");
    const odpowiedz2 = interaction.options.getString("odpowiedz2");    
    if (channel.type != ChannelType.GuildText || !channel) return;
    const embed = new EmbedBuilder()
    .setColor(client.config.embeds["ankieta"]["color"])
    .setDescription(client.config.embeds["ankieta"]["description"].replace(`{czas}`,`<t:${((new Date().getTime()+durnation) / 1000 ).toFixed(0)}:R>`).replace(`{tresc}`,tresc).replace(`{odpowiedz1}`,odpowiedz1).replace(`{odpowiedz2}`,odpowiedz2))
    const row = new ActionRowBuilder()
    .addComponents(
        new ButtonBuilder()
        .setCustomId('ankieta-odpowiedz-1')
        .setLabel(`1: 0`)
        .setStyle(client.config.buttons["ankieta1"]["style"]),         
        new ButtonBuilder()
        .setCustomId('ankieta-odpowiedz-2')
        .setLabel(`2: 0`)
        .setStyle(client.config.buttons["ankieta2"]["style"]),                             
    );

    channel.send({embeds: [embed], components: [row]})
    interaction.reply({content: `Stworzono ankiete`, ephemeral: true})
    },
};
