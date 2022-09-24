let json = {
/////


"log": {
    "file": `./logs/tempbot-${new Date().getUTCDate() + "." + new Date().getUTCMonth() + "." + new Date().getUTCFullYear()}.log`,
    "lvl": "debug" // fatal, error, warn, info, debug
}

/////
}

module.exports = json 