//load env variables
require("dotenv").config();
require("./pushcmds.js");

//load stuff
const config = require("../config.js");
const fs = require("fs");
const tools = require("./functions/base/tools")
const logger = require("./functions/base/logger")

//create client
const { Client, GatewayIntentBits, Collection } = require("discord.js");
const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildPresences],
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
    logger.info("Client Started")
    logger.debug(
        `tag:\t${client.user.tag}`,
        `ID:\t${client.user.id}`,
        `Client in ${client.guilds.cache.size} guild(s)`
    )

});

client.on("interactionCreate", async (interaction) => {
    if (interaction.isCommand()) {

        logger.debug(
            "New command interaction",
            `Command name: ${interaction.commandName}`,
            `Group name:   ${interaction.options.getSubcommandGroup()}`,
            `Sub name:     ${interaction.options.getSubcommand()}`,
            `Server:       ${interaction.guildId}`,
            `Caller:       ${interaction.user.tag}`,
            `Caller ID:    ${interaction.user.id}`,
        )

        await interaction.deferReply({ephemeral: true})

        if (interaction.commandName === "text") {
            let ret = client.commands.get(`text-${interaction.options.getSubcommand()}`)

            let embed = await tools.baseEmbed(interaction, "success")
            embed.setTitle(ret.title)
            embed.setDescription(ret.description)

            if (ret.fields && ret.fields !== undefined) {
                embed.addFields(ret.fields)
            }

            await interaction.editReply({ephemeral:false, embeds:[embed]})

            return
        }
        await client.commands.get(interaction.commandName).execute(interaction);
    }
});

////

//log in
client
    .login(process.env.TOKEN)
    .then(() => {logger.info("Loggin successful")})
    .catch((err) => {logger.fatal("Loggin failure", err.split("\n")); process.exit(1)});
