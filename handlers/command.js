const chalk = require('chalk')
const fs = require('fs');
var AsciiTable = require('ascii-table')
var table = new AsciiTable()
table.setHeading('Commands', 'Name','Status').setBorder('|', '#', "#", "#")

module.exports = (client) => {
	let i = 0;
	fs.readdirSync('./commands/').forEach(dir => {
		const files = fs.readdirSync(`./commands/${dir}/`).filter(file => file.endsWith('.js'));
		if(!files || files.legnth <= 0) console.log(chalk.red("Commands - 0"))
				files.forEach((file) => {
						i++;
						let command = require(`../commands/${dir}/${file}`)
						if(command) {
								client.commands.set(command.name, command)
								if(command.aliases && Array.isArray(command.aliases)) {
										command.aliases.forEach(alias => {
												client.aliases.set(alias, command.name)
										})
								}
								table.addRow(file,command.name, '✅')
						} else {
								table.addRow(file,null, '⛔')
						}
				});
	});
	if(i == 0) return console.log(chalk.redBright("No Commands ⛔"))
	console.log(chalk.greenBright(table.toString()))
};
