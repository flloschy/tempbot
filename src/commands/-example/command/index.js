module.exports = {
    //this gets called when new commandinteraction gets created
    execute: async function (interaction) {
        interaction.reply("[cmd] got executed: " + __filename.split("\\").pop());
    },
};
