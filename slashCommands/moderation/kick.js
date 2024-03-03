const { Client, CommandInteraction, ChannelType, PermissionsBitField } = require("discord.js");
const ms = require("ms");
module.exports = {
  name: "kick",
  description: "Wyrzuca osobe z serwera",
  options: [
    {
      name: "osoba",
      description: "Kogo mam zbanować?",
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
    if (!(interaction.member.roles.cache.has(client.config.role["ACCESS_KICK_ROLE"]) || interaction.member.permissions.has(PermissionsBitField.Flags.KickMembers)))
      return;
    const osoba = interaction.options.getMember("osoba")
    let powod = interaction.options.getString("powod");
    if(!osoba){
      return interaction.reply({content: "Podałeś złą osobe", ephemeral: true})
    }
    if(osoba.roles.highest.position >= interaction.guild.members.cache.get(client.user.id).roles.highest.position || osoba.id === interaction.guild.ownerId){
      return interaction.reply({content: "Nie moge wyrzucić osoby z wyższą rangą niż moja!", ephemeral: true})
    }
    if(osoba.roles.highest.position >= interaction.member.roles.highest.position ){
      return interaction.reply({content: "Nie możesz wyrzucić osoby z wyższą rangą niż twoja!", ephemeral: true})
    }
    if(powod == null){
      powod = "Brak powodu"
    }
    
    if(powod.length > 220) powod = powod.slice(0, 220) + '...'
      await osoba.kick(interaction.user.tag + " | " + powod).then(()=> {
        return interaction.reply({content: client.config.message["kick_info"].replace("{powod}", powod).replace("{osoba}", osoba).replace("{member}", interaction.member)}) //
  
      }).catch((err) => {
        interaction.reply({content: `Wystąpił błąd`})
      })
      return
  },
};
