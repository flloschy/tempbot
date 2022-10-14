module.exports = {
    shortdescription: "yeeeeeeeeeeeeet",
    longdescription: "yeeeeeeeeeeeeeeeeeeeeeeeeeeeet",
    args: [],

    //this gets called when new commandinteraction gets created
    execute: async function (interaction) {
        await interaction.editReply({content:"Yeet"});
    },
};
