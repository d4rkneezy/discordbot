const fs = require('fs');
const chalk = require('chalk');
const client = require("../index");


const { PermissionsBitField, ClientUser } = require('discord.js');
const { Routes } = require('discord-api-types/v9');
const { REST } = require('@discordjs/rest')

const AsciiTable = require('ascii-table');
const table = new AsciiTable().setHeading('Slash Commands', 'Name','Status').setBorder('|', '#', "#", "#")

const TOKEN = client.config.token;
const CLIENT_ID = client.config.client_id;

const rest = new REST({ version: '9' }).setToken(TOKEN);

module.exports = (client) => {
	const slashCommands = []; 

	fs.readdirSync('./slashCommands/').forEach(async dir => {
		const files = fs.readdirSync(`./slashCommands/${dir}/`).filter(file => file.endsWith('.js'));

		for(const file of files) {
			const slashCommand = require(`../slashCommands/${dir}/${file}`);
			slashCommands.push({
				name: slashCommand.name,
				description: slashCommand.description,
				type: slashCommand.type,
				options: slashCommand.options ? slashCommand.options : null,
			});
			
			if(slashCommand.name) {
				client.slashCommands.set(slashCommand.name, slashCommand)
				table.addRow(file,slashCommand.name, '✅')
			} else {
				table.addRow(file, null, '⛔')
			}
		}		
	});
	if(slashCommands.length > 0)console.log(chalk.greenBright(table.toString()));
	else{
		return console.log(chalk.redBright("No Slash Commands ⛔"))
	}
	(async () => {
			try {
				await rest.put(
					client.config.guild_id ?
					Routes.applicationGuildCommands(CLIENT_ID, client.config.guild_id) :
					Routes.applicationCommands(CLIENT_ID), 
					{ body: slashCommands }
				);
				console.log(chalk.greenBright("Slash Commands ✅"))
			} catch (error) {
				console.log(chalk.redBright("No Slash Commands ⛔"))
				console.log(error);
			}
	})();
};
