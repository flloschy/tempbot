const config = require("../../../config");
const fs = require('fs');
require('colors');

let loglvl = config.log.log


let path = () => {config.log.file.split("/"); list.pop(); return list.join}


let validconfig = config.log.console || (fs.existsSync(path) && config.log.file	!== "")

if (!validconfig) {
    console.log("[Error] Your log config is invalid!")
    console.log("     To fix this you either have to turn on console ouput or")
    console.log("     make sure that the given file is in an existing folder")
} 
if (config.log.file) {
    fs.appendFileSync(config.log.file, "\n\n\n")
}

async function log(DATE, lvl, file, lines) {
    if (!validconfig) return

    let date = `${DATE.getDate()}.${DATE.getMonth()}.${DATE.getFullYear()}`
    let time = `${DATE.getHours()}:${DATE.getMinutes()}:${DATE.getSeconds()}.${DATE.getMilliseconds()}`

    if (config.log.console) {
        console.log(
            `${lvl + " ".repeat(6-lvl.length)}[${date.yellow}][${time.gray}][${file}]${lines ? "\n      "+lines.join("\n      ") : " got executed"}`
        )
    }

    if (config.log.file) {
        fs.appendFileSync(
            config.log.file, 
            `${lvl + " ".repeat(6-lvl.length)}[${date}][${time}][${file}]${lines ? "\n      "+lines.join("\n      ") : " got executed"}\n`
        )
    }
}


/**
* 1 ( Info )    --> what gets executed \
* 2 ( Debug )   --> what gets executed + arguments \
* 3 ( Error )   --> errors which dont cause the bot to stop \
* 4 ( Fatal )   --> errors which cause the bot to stop
*/
module.exports = {

    /**
     * Loggs what gets executed \
     * Example:
     * ```js
     * logger.info("Hello", "World")
     * ```
     * Output:
     * ```log
     * info  [1.1.2000][23:59:59.999][\src\index.js:line:char]
     *       Hello
     *       World
     * ```       
     */
    info: async function (...message) {
        let date = new Date()
        if (!loglvl[1]) return
        log(date, "info", new Error().stack.split("\n")[2].split(" ").at(-1).slice(1, -1), message)
    },

    /**
     * what gets executed + arguments
     * Example:
     * ```js
     * logger.debug("Hello", "World")
     * ```
     * Output:
     * ```log
     * debug  [1.1.2000][23:59:59.999][\src\index.js:line:char]
     *       Hello
     *       World
     * ```       
     */
    debug: async function (...args) {
        let date = new Date()
        if (!loglvl[2]) return
        log(date, "debug", new Error().stack.split("\n")[2].split(" ").at(-1).slice(1, -1), args)
    },

    /**
     * errors which dont cause the bot to stop
     * Example:
     * ```js
     * logger.error("Hello", "World")
     * ```
     * Output:
     * ```log
     * error [1.1.2000][23:59:59.999][\src\index.js:line:char]
     *       Hello
     *       World
     * ```       
     */
    error: async function (...error) {
        let date = new Date()
        if (!loglvl[3]) return
        log(date, "error", new Error().stack.split("\n")[2].split(" ").at(-1).slice(1, -1), error)
    },

    /**
     * Loggs what gets executed
     * Example:
     * ```js
     * logger.fatal("Hello", "World")
     * ```
     * Output:
     * ```log
     * fatal [1.1.2000][23:59:59.999][\src\index.js:line:char]
     *       Hello
     *       World
     * ```       
     */
    fatal: async function (...error) {
        let date = new Date()
        if (!loglvl[4]) return
        log(date, "fatal", new Error().stack.split("\n")[2].split(" ").at(-1).slice(1, -1), error)
    }













}