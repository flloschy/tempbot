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
const { randomInt } = require("crypto");
const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildPresences, GatewayIntentBits.GuildVoiceStates],
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

        await interaction.deferReply()

        if (interaction.commandName === "text") {
            let ret = client.commands.get(`text-${interaction.options.getSubcommand()}`)

            let embed = await tools.baseEmbed(interaction, "success")
            embed.setTitle(ret.title)
            embed.setDescription(ret.description)

            if (ret.fields && ret.fields !== undefined) {
                embed.addFields(ret.fields)
            }

            await interaction.editReply({embeds:[embed]})

            return
        }
        await client.commands.get(interaction.commandName).execute(interaction);
    } else if (interaction.isButton()) {
        if (interaction.message.interaction.commandName === undefined) return
        let cmd = interaction.message.interaction.commandName.split(" ")
        if (cmd.length == 1) {
            let command = require(`./commands/${cmd[0]}/command/index.js`)
            if (command.button == undefined) {
                logger.error("Button has no function attached.", "Cant find button function in:", `\t./commands/${cmd[0]}/command/index.js`)
                return
            }
            await interaction.deferReply()
            await command.button(interaction)
        } else if (cmd.length == 2) {
            let command = require(`./commands/${cmd[0]}/subcommands/${cmd[1]}.js`)
            if (command.button == undefined) {
                logger.error("Button has no function attached.", "Cant find button function in:", `\t./commands/${cmd[0]}/subcommands/${cmd[1]}.js`)
                return
            }
            await interaction.deferReply()
            await command.button(interaction)
        } else if (cmd.length == 3) {
            let command = require(`./commands/${cmd[0]}/groups/${cmd[1]}/${cmd[2]}.js`)
            if (command.button == undefined) {
                logger.error("Button has no function attached.", "Cant find button function in:", `.\t/commands/${cmd[0]}/groups/${cmd[1]}/${cmd[2]}.js`)
                return
            }
            await interaction.deferReply()
            await command.button(interaction)
        }
    } else if (interaction.isAutocomplete()) {
        if (interaction.commandName === undefined) return
        let cmd
        if (interaction.options.getSubcommandGroup() !== null) {
            cmd = `./commands/${interaction.commandName}/groups/${interaction.options.getSubcommandGroup()}/${interaction.options.getSubcommand()}.js`
        } else if (interaction.options.getSubcommand() !== null) {
            cmd = `./commands/${interaction.commandName}/subcommands/${interaction.options.getSubcommand()}.js`
        } else {
            cmd = `./commands/${interaction.commandName}/command/index.js`
        }
        if (cmd.length < 5) return
        let command = require(cmd)
        if (command.autocomplete === undefined) {
            logger.error("Autocomplete has no function attached.", "Cant find autocomplete function in:", `.\t${cmd}`)
        }
        await command.autocomplete(interaction)
    }
});

////

//log in
client
    .login(process.env.TOKEN)
    .then(() => {logger.info("Loggin successful")})
    .catch((err) => {logger.fatal("Loggin failure", err); process.exit(1)});