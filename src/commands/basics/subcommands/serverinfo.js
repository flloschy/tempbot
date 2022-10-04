const tools = require("../../../functions/base/tools")


function fixTimeStamp(timeStamp) {
    return Math.floor(timeStamp/1000)
}


module.exports = {
    shortdescription: "server infos",
    longdescription: "returns the a few infos about this server",
    args: [],

    execute: async function(interaction) {
        let guild = interaction.guild


        let boostLvl;
        switch(guild.premiumTier) {
            case 0:
                boostLvl = "No Boosts";
                break;
            case 1:
                boostLvl = "Lvl. 1";
                break;
            case 2:
                boostLvl = "Lvl. 2";
                break;
            case 3:
                boostLvl = "Lvl. 3";
                break;
        }

        let embed = await tools.baseEmbed(interaction, "success")
        embed.setTitle(`What is ${guild.name}?`)
        embed.setThumbnail(guild.iconURL({ dynamic: true, size: 1024 }))
        embed.setFields(
            {name: `Owner`,     value: `<@!${guild.ownerId}>`},
            {name: `Created`,   value: `<t:${fixTimeStamp(guild.createdAt)}> | <t:${fixTimeStamp(guild.createdAt)}:R>`},
            {name: `Country`,   value: `${guild.preferredLocale}`},
            {name: `Members`,   value: `${guild.memberCount}`},
            {name: `Roles`,     value: `${guild.roles.cache.size}`},
            {name: `Boost lvl`, value: `${boostLvl}`},         
            {name: `Boosts`,    value: `${guild.premiumSubscriptionCount}`}
        )


        await interaction.editReply({embeds:[embed]});
    }
}