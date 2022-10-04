module.exports = {
    shortdescription: "example",
    longdescription: "example",
    args: [
        { name: "arg1", description: "arg1", type: "STRING", required: true },
    ],

    //this gets called when new commandinteraction gets created
    execute: async function (interaction) {
        await interaction.editReply({content:"[Subcommand](1) got executed: " + __filename.split("\\").pop()});
    },
};
