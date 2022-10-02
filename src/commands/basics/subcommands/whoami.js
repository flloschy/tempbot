const tools = require("../../../functions/base/tools")


function fixTimeStamp(timeStamp) {
    return Math.floor(timeStamp/1000)
}


module.exports = {
    shortdescription: "who are you?",
    longdescription: "returns some info about your account and server profile",
    args: [
        {name:'user', description:'which user info gets shown', type:'USER', required:true}
    ],

    execute: async function(interaction) {
        let optionUser = interaction.options.getUser('user', true)
        let user = await interaction.client.users.cache.get(optionUser.id)
        let member = await interaction.guild.members.fetch(optionUser.id)


        let roles = []
        member.roles.cache.forEach((role) => {
			if (role.id === role.guild.id) return
			roles.push(`<@&${role.id}>`)
		});


        let bagets = []
        user.flags.toArray().forEach((flag) => {
            switch(flag) {
                case 'HypeSquadOnlineHouse1':
                    bagets.push("House Bravery");
                    return;
                case 'HypeSquadOnlineHouse2':
                    bagets.push("House Brilliance");
                    return;
                case 'HypeSquadOnlineHouse3':
                    bagets.push("House Balance");
                    return;
                case 'HypeSquad':
                    bagets.push("HypeSquad Member");
                    return;
                case 'BugHunterLevel1':
                    bagets.push("Bug Hunter");
                    return;
                case 'BugHunterLevel2':
                    bagets.push("Bug Hunter lvl2");
                    return;
                default:
                    bagets.push(flag);
                    return;
            }
        })


        let embed = await tools.baseEmbed(interaction, member.displayHexColor)
        embed.setTitle(`Who is ${user.username} ${user.bot ? "**`[BOT]`**" : ""}?`)
        embed.setDescription(`${user.tag} ${member.displayName ? `(<@!${user.id}>)` : ""}`)
        embed.setThumbnail(user.displayAvatarURL({ dynamic: true, size: 1024 }))
        embed.addFields(
                {name:`ID`,              value:`${user.id}`},
                {name:`Account created`, value:`<t:${fixTimeStamp(user.createdTimestamp)}> | <t:${fixTimeStamp(user.createdTimestamp)}:R>`},
                {name:`Joined server`,   value:`<t:${fixTimeStamp(member.joinedTimestamp)}> | <t:${fixTimeStamp(member.joinedTimestamp)}:R>`},
                {name:`Roles`,           value: roles.length ? roles.join(", ") : "No roles"},
                {name:`Bagets`,          value: bagets.length ? bagets.join(", ") : "No bagets"},
            )

        interaction.reply({embeds:[embed]});
    }
}