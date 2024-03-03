const { Client, CommandInteraction, ChannelType, PermissionsBitField, DiscordAPIError, ApplicationCommandOptionType, EmbedBuilder } = require("discord.js");
const ms = require("ms");
module.exports = {
  name: "clear",
  description: "Czyści wiadomosci",
  options: [
    {
      name: "amount",
      description: "Liczba wiadomosci ktora ma zostac usunieta (1-99)",
      type: ApplicationCommandOptionType.Number,
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
    if (!(interaction.member.roles.cache.has(client.config.role["ACCESS_CLEAR_ROLE"]) || interaction.member.permissions.has(PermissionsBitField.Flags.ManageMessages)))
      return;
    const amount = interaction.options.getNumber("amount")
    if(amount < 1 || amount > 99)  return interaction.reply({content: client.config.messages["LIMIT_CLEAR_MESSAGE"], ephemeral: true})
    await interaction.channel.bulkDelete(amount, true);



    return interaction.reply({content: client.config.message["SUCCESFULLY_CLEAR"].replace("{amount}", amount), ephemeral: true})
  },
};
