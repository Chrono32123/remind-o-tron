require('dotenv').config();

const { CommandoClient } = require('discord.js-commando');
const path = require('path');
const Discord  = require('discord.js');
const schedule = require('node-schedule');
const bot = new Discord.Client();
const token = process.env.DISCORD_TOKEN;
const prefix = process.env.PREFIX;

const client = new CommandoClient({
    commandPrefix: '!'
});

client.registry
    .registerDefaultTypes()
    .registerGroups([['remind', 'Remind'], ['remindme', 'remind']])
    .registerDefaultGroups()
    .registerDefaultCommands()
    .registerCommandsIn(path.join(__dirname, 'commands'));

client.once('ready', () => {
    console.log('Remind-o-tron is ready!');
})

client.on('error', (message) => {
    console.error;
    message.react('❌');
});

client.login(token);