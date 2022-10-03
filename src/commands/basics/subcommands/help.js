const tools = require("../../../functions/base/tools")
const fs = require('fs')

module.exports = {
    shortdescription: "See what commands do",
    longdescription: "returns the description of an command and what it does and so on",
    args: [
        {name:'command',    description:'/<commandName>',             type:'STRING', required:true},
        {name:'group',      description:'/<commandName> <groupName>', type:'STRING', required:false},
        {name:'subcommand', description:'/<commandName> <subcommandName>  or  /<commandName> <groupName> <subcommandName>', type:'STRING', required:false}
    ],

    execute: async function(interaction) {
        // get args
        const cmdName = interaction.options.getString('command')
        const subName = interaction.options.getString('subcommand')
        const groName = interaction.options.getString('group')

        // filter out incorrect arguments

        let errormessages = []

        if (!fs.existsSync(`./src/commands/${cmdName}`)) {
            errormessages.push(`A command called \`/${cmdName}\` doesnt exist.`)
        }

        if (subName) {
            if (groName) {
                if (!(fs.existsSync(`./src/commands/${cmdName}/groups/${groName}/${subName}.js`))) {
                    errormessages.push(`A command called \`${cmdName} ${groName} ${subName}\` doesnt exist.`)
                }
            } else if (!fs.existsSync(`./src/commands/${cmdName}/subcommands/${subName}.js`)) {
                errormessages.push(`A command called \`${cmdName} ${subName}\` doesnt exist.`)
            }
        }

        if (groName && !subName) {
            errormessages.push(`Groups them self dont have any descriptions, you need to set a specific command too!`)
        }

        
        // send error message

        if (errormessages.length !== 0) {
            const embed = await tools.baseEmbed(interaction, "error")
            embed.setTitle("Command not found")
            embed.setDescription("- " + errormessages.join("\n- "))
            interaction.reply({embeds:[embed]})
            return
        }


        /////

        // load command file
        const cmd = groName 
            ? require(`../../${cmdName}/groups/${groName}/${subName}`) 
            : (subName 
                    ? require(`../../${cmdName}/subcommands/${subName}`) 
                    : require(`../../${cmdName}/manager`))

        
        let description = cmd.longdescription
        let arguments = []
        
        if (cmd.args.length === 0) {
            arguments.push({name:"No arguments", value: "This command doesnt recive any arguments"})
        } else {
            description += `\n\nUsage:\n/${cmdName}${groName ? ' ' + groName : ''} ${subName} `
            // add each argument to an embed field
            cmd.args.forEach((element) => {
                arguments.push({
                    name: element.name + " " + (element.required ? " `[required]`" : "`[optional]`"), 
                    value: element.description
                })
                description += `\`${element.name}: \` `
                
            });
        }
        

        // create embed
        const embed = await tools.baseEmbed(interaction, "success")
        embed.setTitle(cmdName)
        embed.setDescription(description)
        embed.setThumbnail(interaction.client.user.displayAvatarURL({ dynamic: true, size: 1024 }))
        embed.addFields(arguments)

        interaction.reply({embeds:[embed]})
    }
}