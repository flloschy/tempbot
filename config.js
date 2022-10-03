let json = {
/////


log: {
    "file": `./logs/tempbot-${new Date().getUTCDate() + "." + new Date().getUTCMonth() + "." + new Date().getUTCFullYear()}.log`,
    "lvl": "debug" // fatal, error, warn, info, debug
},
baseEmbed: {
    colors: {
        warning: 0x7de39,
        error: 0x7de39,
        info: 0x7de39,
        success: 0x7de39
    },
    author: {
        enabled: true,
        // if text is an empty string the author will be the bot user
        text: "made by tempbot",
        // if url is an empty string the url will be nothing
        url: "https://github.com/flloschy/tempbot",
        // if icon is an empty string the icon of the client user will be used
        icon: ""
    }
},
textCommands: [
    {
        // name and descriptions are always required!
        name: "test", description: "example text command", 
        return: {
            // title and description are required!
            title: "title", description: "description",
            // fields are optional
            fields: [
                {name: "Example field0", value: "example value0", inline: true},
                {name: "Example field1", value: "example value1", inline: true},
                {name: "Example field2", value: "example value2", inline: false},
            ]
        }
    }
]


/////
}

module.exports = json 