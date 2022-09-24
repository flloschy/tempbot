# Template bot
___

A little template discord bot made with [discord.js](https://discordjs.dev)(v14)

## Features
- [x] Automated command registration
- [x] Easy command creator
- [x] commandhandler without any actions needed
- [x] log system
- [ ] handling of buttons and so on
- [ ] cooldowns
- [ ] other (command) options besides String
- [ ] automated restart

## Setup

1 - Install dependencies with `npm i` \
2 - Create a file called `.env` and add your token to it like this: `TOKEN=yourtoken`, you also need to add the bots id `USERID=botid` and the server the bot will be active in `SERVERID=serverid` \
3 - Try if the bot runs `npm run bot` \
4 - If the bot runs, you can start coding \
5 - Create your commands

## Log system

Everything gets locked into a logfile. That means no console output. By default the log file is [`./logs/tempbot<date>.log`](https://github.com/flloschy/tempbot/tree/main/logs). \
You can choose between 5 log levels, these are `fatal, error, warn, info, debug`. \
You can change this in the [`config.js`](https://github.com/flloschy/tempbot/blob/main/config.js) file. *(why a js file? For comments ^^)*

## Creating commands

The system is build modular, so you dont need to do any handling or registering. \
You can find an Example command in the [`./src/commands/example`](https://github.com/flloschy/tempbot/tree/main/src/commands/example) folder. \
As you can see there is a `manager.js` and two folder called `group` and `subcommands`. \
The only thing you need to do is to change the `name`, `shortdescription` and `longdescription` to your desire in the `manager.js` file. \

#### Subcommand
- Further on you can easily add subcommands by coping the example `ping. js` from the `subcommand` folder. \
*Please note that the file needs to be named like the command!*
- When this is done you only need to change once again the `short-` and  `long-description` to your liking.
- If needed you can add options to your command, the only thing to do is creating a dictionary in the `args` array. \
*Please note that at the moment only String types are supported!*
- Congrats! You have created a new command, now the coding can begin in the `execute` function. \

#### Groups and Subcommands
- If you want to create a group, you need to create a folder in the `group` folder and name it like the group. \
*Please note that the folder name will be the group name*
- After that you can create a subcommand in the newly created goupfolder. \
*Please note that the file needs to be named like the command!*
- From here on you can do the same steps as with the normal [subcommands](https://github.com/flloschy/tempbot#subcommand).

## File structure

Here is a litte overview of the file structure used for commands


```bash
Templatebot
└─ src
   └─ commands
      └─ example
         ├─ manager.js #command handler
         ├─ subcommands
         │  └─ ping.js #subcommand name
         └─ group
            ├─ group1 #group name
            │  ├─ ping.js #subcommand name
            │  └─ ping2.js  
            └─ group2       
               ├─ ping.js
               └─ ping2.js

```
