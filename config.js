let json = {
/////


log: {
    "file": `./logs/tempbot-${new Date().getUTCDate() + "." + new Date().getUTCMonth() + "." + new Date().getUTCFullYear()}.log`,
    "lvl": "debug" // fatal, error, warn, info, debug
},
baseEmbed: {
    colors: {
        warning: 0xc7744c,
        error: 0xc74c4c,
        info: 0xc7bc4c,
        success: 0x59c74c
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