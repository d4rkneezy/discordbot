const { Client, CommandInteraction, ChannelType, PermissionsBitField, EmbedBuilder } = require("discord.js");
const ms = require("ms");
module.exports = {
  name: "mute",
  description: "Wysyla osobe na mute'a",
  options: [
    {
      name: "czas",
      description:
        "Jak dlugo ma trwac? (1m/1h/1d)",
      type: 3,
      required: true,
    },
    {
      name: "osoba",
      description: "Kogo mam wyciszyc?",
      type: 6,
      required: true,
    },
    {
      name: "powod",
      description: "Jaki jest powód?",
      type: 3,
      required: false,
    },

  ],
  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   * @param {String[]} args
   */
  run: async (client, interaction, args) => {
    if (!(interaction.member.roles.cache.has(client.config.role["ACCESS_MUTE_ROLE"]) || interaction.member.permissions.has(PermissionsBitField.Flags.ModerateMembers)))
      return;
    let czas = ms(interaction.options.getString("czas"));
    const osoba = interaction.options.getMember("osoba")
    let powod = interaction.options.getString("powod");
    if(!czas){
      return interaction.reply({content: "Podałeś zły czas", ephemeral: true})
    }
    if(!osoba){
      return interaction.reply({content: "Podałeś złą osobe", ephemeral: true})
    }
    if(osoba.roles.highest.position >= interaction.guild.members.cache.get(client.user.id).roles.highest.position || osoba.id === interaction.guild.ownerId){
      return interaction.reply({content: "Nie moge wyciszyć osoby z wyższą rangą niż moja!", ephemeral: true})
    }
    if(osoba.roles.highest.position >= interaction.member.roles.highest.position ){
      return interaction.reply({content: "Nie możesz wyciszyć osoby z wyższą rangą niż twoja!", ephemeral: true})
    }
    if(czas > 2419200000){
      return interaction.reply({content: "Maksymalnie możesz wyciszyć osobe na 28dni!", ephemeral: true})
    }
    if(powod == null){
      powod = "Brak powodu"
    }
    if(powod.length > 220) powod = powod.slice(0, 220) + '...'
      await osoba.timeout(czas, interaction.user.tag + " | " + powod).then(()=> {
        let timestamp_m = interaction.createdTimestamp / 1000
        czas = czas / 1000
        timestamp_m =  timestamp_m + czas
      interaction.reply({content: client.config.message["mute_message"].replace("{member}", interaction.member).replace("{czas}", `<t:${timestamp_m.toFixed(0)}:R>`).replace("{osoba}", osoba).replace("{powod}", powod)}) //
      let warninfo = new EmbedBuilder()
      .setColor(client.config.embeds["mute_info"]["color"]) 
      .setDescription(client.config.embeds["mute_info"]["description"].replace("{member}", interaction.member).replace("{czas}", `<t:${timestamp_m.toFixed(0)}:R>`).replace("{powod}", powod)) 
      .setTimestamp() 
    osoba.send({ embeds: [ warninfo ] }).catch((err) => { console.log(err) })
    }).catch((err) => {
      interaction.reply({content: `Wystąpił błąd`})
    })
  },
};
