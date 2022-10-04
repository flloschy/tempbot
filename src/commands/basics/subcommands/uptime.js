const tools = require("../../../functions/base/tools")


module.exports = {
    shortdescription: "How log am I up already?",
    longdescription: "returns how long the bot is running in days, hours, minutes and seconds",
    args: [],

    execute: async function(interaction) {
        // time
        let totalSeconds = (interaction.client.uptime / 1000);
        let days = Math.floor(totalSeconds / 86400);
        totalSeconds %= 86400;
        let hours = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = Math.floor(totalSeconds % 60);


        let embed = await tools.baseEmbed(interaction, "success")
        embed
           .setTitle(`Uptime`)
           .setDescription(`Im already up since **${days}** days, **${hours}** hours, **${minutes}** minutes and **${seconds}** seconds`)

           await interaction.editReply({ephemeral: false, embeds:[embed]});
    }
}