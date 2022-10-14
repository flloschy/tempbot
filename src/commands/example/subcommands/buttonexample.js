const tools = require("../../../functions/base/tools")
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js')





module.exports = {
    shortdescription: "button test",
    longdescription: "example how the button works",
    args: [],

    //this gets called when new commandinteraction gets created
    execute: async function (interaction) {

        let embed = await tools.baseEmbed(interaction, "success")
        embed.setTitle("Example Button")

        const row = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setCustomId(`example`)
                .setLabel('Example Button')
                .setStyle(ButtonStyle.Danger)
        );
        
        await interaction.editReply({embeds:[embed], components: [row]})
    },
    button: async function (interaction) {
        let embed = await tools.baseEmbed(interaction, "success")
        embed.setTitle("Button Works")
        interaction.editReply({embeds:[embed]})
    }
};
