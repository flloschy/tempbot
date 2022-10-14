const {
    SlashCommandBuilder,
    SlashCommandSubcommandBuilder,
    SlashCommandSubcommandGroupBuilder,
} = require("@discordjs/builders");


const { REST, Routes } = require("discord.js");
const fs = require("fs");
const logger = require("./functions/base/logger")
const config = require("../config")


function builder(values) {
    function options(cmd, args) {
        
        if (args.minValue === undefined) args.minValue =  9007199254740991;
        if (args.maxValue === undefined) args.maxValue = -9007199254740991;
        if (args.minLength === undefined) args.minLength = 0;
        if (args.maxLength === undefined) args.maxLength = 6000;

        switch (args.type) {
            case "STRING":
                cmd.addStringOption((option) =>
                    option
                        .setName(args.name)
                        .setDescription(args.description)
                        .setMaxLength(args.maxLength)
                        .setMinLength(args.minLength)
                        .setRequired(args.required === undefined ? false : true)
                        .setAutocomplete(args.autocomplete === undefined ? false : true)
                );
                break;
            case "INTEGER":
                cmd.addIntegerOption((option) =>
                    option
                        .setName(args.name)
                        .setDescription(args.description)
                        .setMaxValue(args.maxValue)
                        .setMinValue(args.minValue)
                        .setRequired(args.required === undefined ? false : true)
                        .setAutocomplete(args.autocomplete === undefined ? false : true)
                );
                break;
            case "BOOLEAN":
                cmd.addBooleanOption((option) =>
                    option
                        .setName(args.name)
                        .setDescription(args.description)
                        .setRequired(args.required === undefined ? false : true)
                );
                break;
            case "USER":
                cmd.addUserOption((option) =>
                    option
                        .setName(args.name)
                        .setDescription(args.description)
                        .setRequired(args.required === undefined ? false : true)
                );
                break;
            case "CHANNEL":
                cmd.addChannelOption((option) =>
                    option
                        .setName(args.name)
                        .setDescription(args.description)
                        .setRequired(args.required === undefined ? false : true)
                );
                break;
            case "ROLE":
                cmd.addRoleOption((option) =>
                    option
                        .setName(args.name)
                        .setDescription(args.description)
                        .setRequired(args.required === undefined ? false : true)
                );
                break;
            case "MENTIONABLE":
                cmd.addMentionableOption((option) =>
                    option
                        .setName(args.name)
                        .setDescription(args.description)
                        .setRequired(args.required === undefined ? false : true)
                );
                break;
            case "NUMBER":
                cmd.addNumberOption((option) =>
                    option
                        .setName(args.name)
                        .setDescription(args.description)
                        .setMaxValue(args.maxValue)
                        .setMinValue(args.minValue)
                        .setRequired(args.required === undefined ? false : true)
                        .setAutocomplete(args.autocomplete === undefined ? false : true)
                );
                break;
            default:
                break;
        }
    }

    ////

    let command = new SlashCommandBuilder()
        .setName(values.name.toLowerCase())
        .setDescription(values.description);

    if (values.args.length > 0 && values.subcommands.length === 0 && values.groups.length === 0) {
        values.args.forEach((arg) => {
            options(command, arg);
        })
    }

    if (values.subcommands) {
        values.subcommands.forEach((sub) => {
            let subcommand = new SlashCommandSubcommandBuilder()
                .setName(sub.name.toLowerCase())
                .setDescription(sub.description);
            if (sub.args)
                sub.args.forEach((arg) => {
                    options(subcommand, arg);
                });
            command.addSubcommand(subcommand);
        });
    }

    if (values.groups) {
        values.groups.forEach((group) => {
            let groupcommand = new SlashCommandSubcommandGroupBuilder()
                .setName(group.name.toLowerCase())
                .setDescription(group.description);
            if (group.subcommands)
                group.subcommands.forEach((sub) => {
                    let subcommand = new SlashCommandSubcommandBuilder()
                        .setName(sub.name)
                        .setDescription(sub.description);
                    if (sub.args)
                        sub.args.forEach((arg) => {
                            options(subcommand, arg);
                        });
                    groupcommand.addSubcommand(subcommand);
                });
            command.addSubcommandGroup(groupcommand);
        });
    }

    return command;
}

function build(dir) {

    const manager = require(`./commands/${dir}/manager.js`);

    if (fs.existsSync(`./src/commands/${dir}/subcommands`)) {
        const subcommandFiles = fs
            .readdirSync(`./src/commands/${dir}/subcommands`)
            .filter((file) => file.endsWith(".js"));
        for (const file of subcommandFiles) {
            const command = require(`./commands/${dir}/subcommands/${file}`);

            manager.subcommands.push({
                name: file.slice(0, -3),
                description: command.shortdescription,
                args: command.args,
            });
        }
    }

    if (fs.existsSync(`./src/commands/${dir}/groups`)) {
        const groupFiles = fs.readdirSync(`./src/commands/${dir}/groups`);
        for (const group of groupFiles) {
            let json = { name: group, description: "None", subcommands: [] };

            const subcommandFiles = fs
                .readdirSync(`./src/commands/${dir}/groups/${group}`)
                .filter((file) => file.endsWith(".js"));
            for (const file of subcommandFiles) {
                const command = require(`./commands/${dir}/groups/${group}/${file}`);
                json.subcommands.push({
                    name: file.slice(0, -3),
                    description: command.shortdescription,
                    args: command.args,
                });
            }
            manager.groups.push(json);
        }
    }


    return {
        name: dir,
        description: manager.shortdescription,
        args: manager.args,
        subcommands: manager.subcommands,
        groups: manager.groups,
    };
}


const commands = [];
fs.readdirSync("./src/commands").filter((dir) => !dir.startsWith("-")).forEach((dir) => {
    commands.push(builder(build(dir)));
});

if (config.textCommands.length !== 0) {
    const textcommands = new SlashCommandBuilder()
        .setName("text")
        .setDescription("Commands which only return a predefined embed")

    config.textCommands.forEach((cmd) => {
        let sub = new SlashCommandSubcommandBuilder()
            .setName(cmd.name)
            .setDescription(cmd.description)
        textcommands.addSubcommand(sub)
    })

    commands.push(textcommands)
}



commands.map((command) => command.toJSON());

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

rest.put(
    Routes.applicationGuildCommands(process.env.USERID, process.env.SERVERID),
    { body: commands })
.then((data) => {logger.info(`All commands pushed`); logger.debug(`${data.length} Command(s) pushed`)})
.catch((err) => logger.fatal(err.split("\n")));
