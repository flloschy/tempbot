const tools = require("../../../functions/base/tools")


module.exports = {
    shortdescription: "pong!",
    longdescription: "returns the ping from the bot to the discord api",
    args: [],

    execute: async function(interaction) {
        const ping = interaction.client.ws.ping;

        let embed = await tools.baseEmbed(interaction, "success")
        embed.setTitle("Ping")
        embed.setDescription(`PONG! The current ping from host to discord is **${ping}ms**`)

        await interaction.editReply({ephemeral: false, embeds:[embed]})
    }
}