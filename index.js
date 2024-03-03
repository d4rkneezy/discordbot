const { Client, GatewayIntentBits, Partials, Collection } = require('discord.js');
const fs = require("fs");

const client = new Client({
	intents: [
		GatewayIntentBits.DirectMessages,
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildBans,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildMembers,
	  ],
	partials: [Partials.Channel, Partials.Message, Partials.User, Partials.GuildMember, Partials.Reaction],
});

client.config = require("./utils/config.json");
client.prefix = client.config.prefix

client.commands = new Collection()
client.aliases = new Collection()
client.slashCommands = new Collection();

module.exports = client;

fs.readdirSync('./handlers').forEach((handler) => {
    require(`./handlers/${handler}`)(client)
  });

const logs = require('discord-logs');
logs(client);

client.login(client.config.token)