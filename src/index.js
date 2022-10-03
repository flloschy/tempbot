//load env variables
require("dotenv").config();

require("./pushcmds.js");

//load stuff
const config = require("../config.js");
const fs = require("fs");
const tools = require("./functions/base/tools")


//create client
const { Client, GatewayIntentBits, Collection } = require("discord.js");
const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
});

// create client.commands collection
client.commands = new Collection();

//load commands
const commandFolders = fs.readdirSync("./src/commands").filter(folder => !folder.startsWith("-"));
for (const folder of commandFolders) {
    const command = require(`./commands/${folder}/manager.js`);
    client.commands.set(folder, command);
}

if (config.textCommands) {
    config.textCommands.forEach((cmd) => {
        client.commands.set(`text-${cmd.name}`, cmd.return)
    })
}



////

//on ready
client.once("ready", async () => {
});

client.on("interactionCreate", async (interaction) => {
    if (interaction.isCommand()) {
        if (interaction.commandName === "text") {

            let ret = client.commands.get(`text-${interaction.options.getSubcommand()}`)

            let embed = await tools.baseEmbed(interaction, "success")
            embed.setTitle(ret.title)
            embed.setDescription(ret.description)

            if (ret.fields && ret.fields !== undefined) {
                embed.addFields(ret.fields)
            }

            interaction.reply({embeds:[embed]})

            return
        }
        await client.commands.get(interaction.commandName).execute(interaction);
    }
});

////

//log in
client
    .login(process.env.TOKEN)
    .then(() => {})
    .catch((err) => console.log(err));
