const fs = require("fs");

const config = require("../../../config.js");

//create logger
const logger = require("logger").createLogger(config.log.file);
logger.setLevel(config.log.lvl);



module.exports = {
    name: "example",
    shortdescription: "testing",
    longdescription: "for testing purposes",

    // dont add anything here
    args: [],
    subcommands: [],
    groups: [],


    execute: function (interaction) {
        // check if command is part of a group
        if (interaction.options.getSubcommandGroup() !== null) {
            // check if command was loaded when build()
            if (
                this.groups.some(
                    (e) => e.name === interaction.options.getSubcommandGroup()
                )
            ) {
                // execute command
                const command = require(`./group/${interaction.options.getSubcommandGroup()}/${interaction.options.getSubcommand()}.js`);
                command.execute(interaction);
            }}
        // check if command is subcommand
        else if (
            this.subcommands.some(
                (e) => e.name === interaction.options.getSubcommand()
            )
        ) {
            // execute command
            const command = require(`./subcommands/${interaction.options.getSubcommand()}.js`);
            command.execute(interaction);
        } else interaction.reply("Something went wrong");
    },

    build: function () {
        logger.debug(`Building command ${this.name}...`)


        let foldername = __dirname.split("\\").pop();
        const subcommandFiles = fs
            .readdirSync(`./src/commands/${foldername}/subcommands`)
            .filter((file) => file.endsWith(".js"));
        for (const file of subcommandFiles) {
            const command = require(`./subcommands/${file}`);
            this.subcommands.push({
                name: command.name,
                description: command.shortdescription,
                args: command.args,
            });
        }

        const groupFiles = fs.readdirSync(`./src/commands/${foldername}/group`);
        for (const group of groupFiles) {
            let json = { name: group, description: "None", subcommands: [] };

            const subcommandFiles = fs
                .readdirSync(`./src/commands/${foldername}/group/${group}`)
                .filter((file) => file.endsWith(".js"));
            for (const file of subcommandFiles) {
                const command = require(`./group/${group}/${file}`);
                json.subcommands.push({
                    name: command.name,
                    description: command.shortdescription,
                    args: command.args,
                });
            }
            this.groups.push(json);
        }
        return {
            name: this.name,
            description: this.shortdescription,
            args: this.args,
            subcommands: this.subcommands,
            groups: this.groups,
        };
    },
};
