module.exports = {
    name: __filename.slice(__dirname.length + 1, -3),
    shortdescription: "ping2",
    longdescription: "ping2",
    args: [
        { name: "arg1", description: "arg1", type: "STRING", required: true },
    ],

    //this gets called when new commandinteraction gets created
    execute: function (interaction) {
        interaction.reply("pong! (group1) (sub2)");
    },
};
