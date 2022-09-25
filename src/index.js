//load env variables
require("dotenv").config();

require("./pushcmds.js");

//load stuff
const config = require("../config.js");
const fs = require("fs");

//create client
const { Client, GatewayIntentBits, Collection } = require("discord.js");
const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
});

// create client.commands collection
client.commands = new Collection();

//load commands
const commandFolders = fs.readdirSync("./src/commands");
for (const folder of commandFolders) {
    const command = require(`./commands/${folder}/manager.js`);
    client.commands.set(folder, command);
}

////

//on ready
client.once("ready", async () => {
});

client.on("interactionCreate", async (interaction) => {
    if (interaction.isCommand()) {
        client.commands.get(interaction.commandName).execute(interaction);
    }
});

////

//log in
client
    .login(process.env.TOKEN)
    .then(() => {})
    .catch((err) => console.log(err));
