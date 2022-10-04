module.exports = {
    shortdescription: "base commands",
    longdescription: "Basic commands which get delivered with this template",

    args: [],
    subcommands: [],
    groups: [],


    execute: async function (interaction) {
        
        if (this.subcommands.length == 0 && this.groups.length == 0) {
            const command = require(`./command/index.js.js`);
            await command.execute(interaction);
            return
        }

        if (interaction.options.getSubcommandGroup() !== null &&
            this.groups.some((e) => e.name === interaction.options.getSubcommandGroup())
            ) {
                const command = require(`./group/${interaction.options.getSubcommandGroup()}/${interaction.options.getSubcommand()}.js`);
                await command.execute(interaction);
                return
            }

        if (interaction.options.getSubcommand() !== null &&
            this.subcommands.some((e) => e.name === interaction.options.getSubcommand())
            ) {
                const command = require(`./subcommands/${interaction.options.getSubcommand()}.js`);
                await command.execute(interaction);
                return
            }
        
            interaction.editReply({ephemeral: false, content:"Something went wrong"});
    }
};
