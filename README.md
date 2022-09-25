# Template bot
___

A little template discord bot made with [discord.js](https://discordjs.dev)(v14)

## Features
- [x] Automated command registration
- [x] Easy command creator
- [x] commandhandler without any actions needed
- [x] log system
- [ ] automated help command
- [ ] handling of buttons and so on
- [ ] cooldowns
- [ ] other (command) options besides String
- [ ] automated restart

## Setup

1 - Install dependencies with `npm i`. \
2 - Create a file called `.env` and add your token to it like this: `TOKEN=yourtoken`, you also need to add the bots id `USERID=botid` and the server the bot will be active in `SERVERID=serverid`. \
3 - Try if the bot runs `npm run bot`. \
4 - If the bot runs, you can start coding. 

## Log system

Everything gets locked into a logfile. That means no console output. By default the log file is [`./logs/tempbot<date>.log`](https://github.com/flloschy/tempbot/tree/main/logs). \
You can choose between 5 log levels, these are `fatal, error, warn, info, debug`. \
You can change this in the [`config.js`](https://github.com/flloschy/tempbot/blob/main/config.js) file.

## Creating commands

The system is build modular, so you dont need to do any handling or registering. \
You can find an Example command in the [`./src/commands/example`](https://github.com/flloschy/tempbot/tree/main/src/commands/example) folder. \
As you can see there is a `manager.js` and two folder called `group` and `subcommands`. \
The only thing you need to do is to change the `shortdescription` and `longdescription` to your desire in the `manager.js` file. (the command name will be the foldername) 

#### Subcommand
- Further on you can easily add subcommands by coping the example `ping.js` from the `subcommand` folder. \
*Please note that the file name will be the command name*
- When this is done you only need to change once again the `short-` and  `long-description` to your liking.
- If needed you can add options to your command, the only thing to do is creating a dictionary in the `args` array. \
*Please note that at the moment only String types are supported!*
- Congrats! You have created a new command, now the coding can begin in the `execute` function. 

#### Groups and Subcommands
- If you want to create a group, you need to create a folder in the `group` folder and name it like the group. \
*Please note that the folder name will be the group name*
- After that you can create a subcommand in the newly created goupfolder. \
*Please note that the file name will be the command name*
- From here on you can do the same steps as with the normal [subcommands](https://github.com/flloschy/tempbot#subcommand).

*If you want to remove a command, you can just delete the command folder and it will be removed*

## File structure

Here is a litte overview of the file structure used for commands

```bash
Templatebot
└─ src
   └─ commands #create folder here for new command
      └─ example #command name
         ├─ manager.js #command handler
         ├─ subcommands
         │  └─ examplesub.js #subcommand name
         └─ group
            ├─ examplegroup1 #group name
            │  ├─ examplesub1.js #subcommand name
            │  └─ examplesub1.js  
            └─ examplegroup2       
               ├─ examplesub1.js
               └─ examplesub2.js

```
