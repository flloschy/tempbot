module.exports = {
    //this gets called when new commandinteraction gets created
    execute: async function (interaction) {
        await interaction.editReply({content:"[Subcommand](1) got executed: " + __filename.split("\\").pop()});
    },
};
