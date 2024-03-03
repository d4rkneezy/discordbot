const { Client, CommandInteraction, ChannelType, PermissionsBitField, DiscordAPIError, ApplicationCommandOptionType, EmbedBuilder } = require("discord.js");
const ms = require("ms");
module.exports = {
  name: "degrad",
  description: "nadaje degrada",
  options: [
    {
      name: "user",
      description: "Osoba ktorej chcesz dac degrada",
      type: ApplicationCommandOptionType.User,
      required: true,
    },
    {
      name: "rola",
      description: "Range ktora chcesz zabrac",
      type: ApplicationCommandOptionType.Role,
      required: true,
    
    },
    {
      name: "powod",
      description: "Jaki jest powód?",
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
    if (!(interaction.member.roles.cache.has(client.config.role["remove_role"]) || interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)))
      return;
    const user = interaction.options.getMember("user")
    const rola = interaction.options.getRole("rola")
    let reason = interaction.options.getString("powod");

    if(!user){
      return interaction.reply({content: "Podałeś złą osobe", ephemeral: true})
    }
    if(rola.rawPosition >= interaction.guild.members.cache.get(client.user.id).roles.highest.position ){
      return interaction.reply({content: "Nie moge zabrac rangi wyższa niż moja!", ephemeral: true})
    }
    if(rola.rawPosition >= interaction.member.roles.highest.position && interaction.member.id != interaction.guild.ownerId){
      return interaction.reply({content: "Nie możesz zabrac rangi wyższej niż twoja!", ephemeral: true})
    }
    if(!user.roles.cache.has(rola.id)){
      return interaction.reply({content: "Użytkownik nie posiada tej rangi!", ephemeral: true})
    }
    if(reason.length > 220) reason = reason.slice(0, 220) + '...'
    user.roles.remove(rola).catch((err) =>{})
    const embed = new EmbedBuilder()
    .setColor(client.config.embeds["degrad"]["color"])
    .setTitle(client.config.embeds["degrad"]["title"])
    .setDescription(client.config.embeds["degrad"]["description"].replace("{user}", user).replace("{rola}", rola).replace("{member}", interaction.member).replace("{reason}", reason))
    .setImage(client.config.embeds["degrad"]["image"])
    const embedLogs = new EmbedBuilder()
    .setColor(client.config.embeds["degradLogs"]["color"])
    .setTitle(client.config.embeds["degradLogs"]["title"])
    .setDescription(client.config.embeds["degradLogs"]["description"].replace("{user}", user).replace("{rola}", rola).replace("{member}", interaction.member).replace("{reason}", reason))
    .setImage(client.config.embeds["degradLogs"]["image"])
    interaction.guild.channels.cache.get(client.config.channels["LOGS"]).send({embeds: [embedLogs]})
  return interaction.reply({embeds: [embed]})
  },
};
