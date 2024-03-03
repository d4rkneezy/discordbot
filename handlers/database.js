const mongoose = require("mongoose");
const chalk = require('chalk')

module.exports = (client) => {
    if (!client.config.mongoLink || client.config.mongoLink == "") return console.log(chalk.redBright("No database connection ⛔"))

    mongoose
      .connect(client.config.mongoLink)
      .then(() => console.log(chalk.greenBright("Connected to the Database ✅")))
      .catch((err) =>console.log(chalk.redBright("No database connection ⛔")))
};