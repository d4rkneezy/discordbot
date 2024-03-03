
const fs = require('fs');
const chalk = require('chalk')
var AsciiTable = require('ascii-table')
var table = new AsciiTable()
table.setHeading('Events', 'Status').setBorder('|', '#', "#", "#")

module.exports = (client) => {
    let i = 0;
    fs.readdirSync('./events/').filter((file) => file.endsWith('.js')).forEach((event) => {
      	require(`../events/${event}`);
        table.addRow(event, '✅')
        i++;
    })
    if(i == 0) return console.log(chalk.redBright("No Events ⛔"))
	console.log(chalk.greenBright(table.toString()))
};
