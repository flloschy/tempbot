module.exports = {
    shortdescription: "example",
    longdescription: "example",
    args: [
        { name: "arg1", description: "arg1", type: "STRING", required: true },
    ],

    //this gets called when new commandinteraction gets created
    execute: async function (interaction) {
        interaction.reply("[Group](1) [Subcommand](1) got executed: " + __filename.split("\\").pop());
    },
};
