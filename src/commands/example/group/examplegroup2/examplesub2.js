module.exports = {
    shortdescription: "ping2",
    longdescription: "ping2",
    args: [
        { name: "arg1", description: "arg1", type: "STRING", required: true },
    ],

    //this gets called when new commandinteraction gets created
    execute: function (interaction) {
        interaction.reply("[Group](2) [Subcommand](2) got executed: " + __filename.split("\\").pop());
    },
};