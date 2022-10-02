const { EmbedBuilder } = require("discord.js");
const config = require("../../../config");


module.exports = {

    /**
     * 
     * @param interaction The interaction object
     * @param color A hex color string, or predefined color. (see colors object) If nothing given the embed color will be the color of the bot user. If an non predefined color is given the embed color will be the given color (please use hex color)
     * 
     */
    baseEmbed: async function (interaction, color) {
        
        //set the color of the embed
        let newcolor;
        Object.keys(config.baseEmbed.colors).forEach((key) => {
            if (key === color) { newcolor = config.baseEmbed.colors[key]}
        });
        if (newcolor === undefined) {
            if (color === undefined) {
                //color of client user
                newcolor = (await interaction.guild.members.fetch(interaction.client.user.id)).displayHexColor;
            } else {
                newcolor = color;
            }
        }
        
        //set the author of the embed
        let text;
        if (config.baseEmbed.author.text == "") {
            text = interaction.client.user.username;
        } else {
            text = config.baseEmbed.author.text;
        }

        let url;
        if (config.baseEmbed.author.url == "") {
            url = "";
        } else {
            url = config.baseEmbed.author.url;
        }

        let icon;
        if (config.baseEmbed.author.icon == "") {
            icon = interaction.client.user.displayAvatarURL();
        } else {
            icon = config.baseEmbed.author.icon;
        }

        

        //create the embed
        const embed = new EmbedBuilder()
            .setColor(newcolor)
            .setFooter({ text: `Requested by ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true })})
        
        if (config.baseEmbed.author.enabled) {
            embed.setAuthor({ name: text, iconURL: icon, url: url })
        }
        if (interaction.createdTimestamp) {
            embed.setTimestamp(interaction.createdTimestamp);
        }
        return embed
    }
}