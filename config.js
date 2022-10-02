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
}


/////
}

module.exports = json 