const tools = require("../../../functions/base/tools")
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js')





module.exports = {
    shortdescription: "button test",
    longdescription: "buttttttttttttttonnnnnnnnnssssssssss",
    args: [],

    //this gets called when new commandinteraction gets created
    execute: async function (interaction) {

        let embed = await tools.baseEmbed(interaction, "success")
        embed.setTitle("Button test")

        const row = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setCustomId(`LOL`)
                .setLabel('Test')
                .setStyle(ButtonStyle.Danger)
        );
        
        await interaction.editReply({embeds:[embed], components: [row]})
    },
    button: async function (interaction) {
        interaction.editReply("Geht ")
    }
};
