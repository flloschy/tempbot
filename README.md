# Template bot
___

A little template discord bot made with [discord.js](https://discordjs.dev)(v14)

___

## Features
- [x] Automated command registration
- [x] Easy command creator
- [x] commandhandler without any actions needed
- [x] log system
- [x] other (command) options besides String
- [ ] on install avaliable tools
   - [x] embed creator
   - [ ] more to come
- [x] Text only commands
- [x] automated help command
- [ ] handling of...
   - [x] ... buttons
   - [ ] ... menues
   - [ ] ... models
   - [ ] ... 
- [ ] cooldowns
- [ ] automated restart

___

## Setup

1 - Install dependencies with `npm i`. \
2 - Create a file called `.env` and add your token to it like this: `TOKEN=yourtoken`, you also need to add the bots id `USERID=botid` and the server the bot will be active in `SERVERID=serverid`. \
3 - Try if the bot runs `npm run bot`. \
4 - If the bot runs, you can start coding. 

___

## Log system

Everything gets locked into a logfile. By default the log file is [`./logs/tempbot<date>.log`](https://github.com/flloschy/tempbot/tree/main/logs). \
You can choose 4 log levels, which should get logged these are `fatal (=4), error (=3), debug (=2), info (=1)`. \
You can change this in the [`config.js`](https://github.com/flloschy/tempbot/blob/main/config.js) file. \
There you can activate each log level individual, just by changing the boolean in the config at `log -> log -> [1-4]`. \
Also, you can activate console logging and deactivate file logging by clearing the string. *There will be an error when no console and file logging are activated, but the bot will continue running.*
___

## Creating commands

The system is build modular, so you dont need to do any handling or registering. \
You can find an Example command in the [`./src/commands/-example`](https://github.com/flloschy/tempbot/tree/main/src/commands/-example) folder. \
*Put a `-`(minus) before the folder name to disable the command* \
As you can see there is a `manager.js` and two folder called `groups` and `subcommands`. \
The only thing you need to do is to change the `shortdescription` and `longdescription` to your desire in the `manager.js` file. (the command name will be the foldername) 

#### Basic text command
You can create text based commands, they cant take any arguments and only return a set embed!
- To create such a command just go into the `config.js` under `textCommands`.
- Create a new dict and give it a `name`, `description` and `return` tag! *All of them are required!*
- In the return tag you NEED to add an `title` and `description`
   - if you want you can also add `fields`, but they are not needed.
- If you dont want any text commands, just clear the `textCommands` array. *dont remove it*

#### Command options
*Please note that you can only add options if you dont have any subcommands or groups* \
*well... you can have subcommands and groups, but they get preffered over the command itself*
- Create a folder called `command`
- Create a file called `index.js` \
*If you need any extra files for the command in there, you can but index is the file thats gets called on an interaction*
- Add options in the args array in the manager file
- Done

#### Subcommand
- Further on you can easily add subcommands by coping the example `ping.js` from the `subcommand` folder. \
*Please note that the file name will be the command name*
- When this is done you only need to change once again the `short-` and  `long-description` to your liking.
- If needed you can add options to your command, the only thing to do is creating a dictionary in the `args` array. \
*Please note that at the moment all Input types work, but only Int, Num and String Value limits are supported*
- Congrats! You have created a new command, now the coding can begin in the `execute` function. 

#### Groups and Subcommands
- If you want to create a group, you need to create a folder in the `groups` folder and name it like the group. \
*Please note that the folder name will be the group name*
- After that you can create a subcommand in the newly created goupfolder. \
*Please note that the file name will be the command name*
- From here on you can do the same steps as with the normal [subcommands](https://github.com/flloschy/tempbot#subcommand).

*If you want to remove a command, you can just delete the command folder and it will be removed*

___

## File structure

Here is a litte overview of the file structure used for commands

```py
Templatebot
?????? src
   ?????? commands #create folder here for new command
      ?????? example #command name
         ?????? manager.js #command handler
         ?????? command #command folder
         ???  ?????? index.js #command file
         ?????? subcommands
         ???  ?????? examplesub.js #subcommand name
         ?????? groups
            ?????? examplegroup1 #group name
            ???  ?????? examplesub1.js #subcommand name
            ???  ?????? examplesub1.js  
            ?????? examplegroup2       
               ?????? examplesub1.js
               ?????? examplesub2.js
```
___

## Tools
With the install of this bot you have some ready to good tools on your hand! \
Those are little things which help you to have an consistant design across all your commands. \
All the pre-installed tolls can be found there: `src/functions/base/tools.js`

#### baseEmbed
This is a little tool which only adds color, author and footer to an embed which gets returned.

It needs the interaction and a color, the color can be a string which is pre determand in the config at `baseEmbed -> colors`, you can also add your template colors!

You can give nothing and the color will be the display color of the bot. If you give an hexcode as color this will be used.

The author can be configured in the config at `baseEmbed -> author`, there you can disable the author field, edit the text, edit the url and icon. The footer will always say `Requested by <user>` and the timestamp of the creation of the interaction.
