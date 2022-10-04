module.exports = {
    shortdescription: "ping",
    longdescription: "ping",
    args: [
        {name:'string',        description:'arg1',  type:'STRING',       required:true                             },
        {name:'stringlimit',   description:'arg1',  type:'STRING',       required:true,  minLength:3,  maxLength:9 },
        {name:'integer',       description:'arg1',  type:'INTEGER',      required:true                             },
        {name:'integerlimit',  description:'arg1',  type:'INTEGER',      required:true,  minValue:3,   maxValue:5  },
        {name:'boolean',       description:'arg1',  type:'BOOLEAN',      required:true                             },
        {name:'user',          description:'arg1',  type:'USER',         required:true                             },
        {name:'channel',       description:'arg1',  type:'CHANNEL',      required:true                             },
        {name:'role',          description:'arg1',  type:'ROLE',         required:true                             },
        {name:'mentionable',   description:'arg1',  type:'MENTIONABLE',  required:true                             },
        {name:'number',        description:'arg1',  type:'NUMBER',       required:true                             },
        {name:'numberlimit',   description:'arg1',  type:'NUMBER',       required:true,  minValue:3,   maxValue:5  }
    ],

    //this gets called when new commandinteraction gets created
    execute: async function(interaction) {
        await interaction.editReply({ephemeral: false, content:"[Subcommand](1) got executed: " + __filename.split("\\").pop()});
    }
}