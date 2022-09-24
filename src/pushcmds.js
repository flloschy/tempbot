const {
    SlashCommandBuilder,
    SlashCommandSubcommandBuilder,
    SlashCommandSubcommandGroupBuilder,
} = require("@discordjs/builders");

const { REST, Routes } = require("discord.js");
const fs = require("fs");

const config = require("../config")

const logger = require("logger").createLogger(config.log.file);
logger.setLevel(config.log.lvl);

function builder(values) {
    function options(cmd, args) {
        switch (args.type) {
            case "STRING":
                cmd.addStringOption((option) =>
                    option
                        .setName(args.name)
                        .setDescription(args.description)
                        .setRequired(args.required)
                );
                break;
            case "INTEGER":
                cmd.addIntegerOption((option) =>
                    option
                        .setName(args.name)
                        .setDescription(args.description)
                        .setRequired(args.required)
                );
                break;
            case "BOOLEAN":
                cmd.addBooleanOption((option) =>
                    option
                        .setName(args.name)
                        .setDescription(args.description)
                        .setRequired(args.required)
                );
                break;
            case "USER":
                cmd.addUserOption((option) =>
                    option
                        .setName(args.name)
                        .setDescription(args.description)
                        .setRequired(args.required)
                );
                break;
            case "CHANNEL":
                cmd.addChannelOption((option) =>
                    option
                        .setName(args.name)
                        .setDescription(args.description)
                        .setRequired(args.required)
                );
                break;
            case "ROLE":
                cmd.addRoleOption((option) =>
                    option
                        .setName(args.name)
                        .setDescription(args.description)
                        .setRequired(args.required)
                );
                break;
            case "MENTIONABLE":
                cmd.addMentionableOption((option) =>
                    option
                        .setName(args.name)
                        .setDescription(args.description)
                        .setRequired(args.required)
                );
                break;
            case "NUMBER":
                cmd.addNumberOption((option) =>
                    option
                        .setName(args.name)
                        .setDescription(args.description)
                        .setRequired(args.required)
                );
                break;
            default:
                break;
        }
    }

    ////

    let command = new SlashCommandBuilder()
        .setName(values.name)
        .setDescription(values.description);

    if (values.args && !values.subcommands && !values.groups)
        values.args.forEach((arg) => {
            options(command, arg);
        });

    if (values.subcommands)
        values.subcommands.forEach((sub) => {
            let subcommand = new SlashCommandSubcommandBuilder()
                .setName(sub.name)
                .setDescription(sub.description);
            if (sub.args)
                sub.args.forEach((arg) => {
                    options(subcommand, arg);
                });
            command.addSubcommand(subcommand);
        });

    if (values.groups)
        values.groups.forEach((group) => {
            let groupcommand = new SlashCommandSubcommandGroupBuilder()
                .setName(group.name)
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

    return command;
}


logger.info("Building Commands...")
const commands = [];
fs.readdirSync("./src/commands").forEach((dir) => {
    let manager = require(`./commands/${dir}/manager.js`);
    commands.push(builder(manager.build()));
});


logger.info("Register Commands...")
commands.map((command) => command.toJSON());

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

rest.put(
    Routes.applicationGuildCommands(process.env.USERID, process.env.SERVERID),
    { body: commands }
)
    .then((data) => {
        logger.info(
            `Registered Commands!`
        )
        logger.debug(
            `${data.length} Commands in total.`
        )}
    )
    .catch(logger.error);
