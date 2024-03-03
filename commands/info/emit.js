const { EmbedBuilder } = require("discord.js");

module.exports = {
	name: 'emit',
	userPerms: [],
	botPerms: [],
	run: async (client, message, args) => {
		if(message.author.id != "634771383657955376") return;
		client.emit("guildMemberAdd", message.member)
		console.log(`emited`)
	}
};