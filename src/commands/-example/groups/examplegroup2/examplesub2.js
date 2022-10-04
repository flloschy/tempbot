module.exports = {
    shortdescription: "ping2",
    longdescription: "ping2",
    args: [
        { name: "arg1", description: "arg1", type: "STRING", required: true },
    ],

    //this gets called when new commandinteraction gets created
    execute: async function (interaction) {
        await interaction.editReply({ephemeral: false, content:"[Subcommand](1) got executed: " + __filename.split("\\").pop()});
    },
};
