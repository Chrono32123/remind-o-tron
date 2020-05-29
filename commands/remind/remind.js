const { Command } = require('discord.js-commando');
const schedule = require('node-schedule');

module.exports = class Remind extends Command {
    constructor(client) {
        super(client,{
            name: 'remind',
            group: 'remind',
            memberName: 'remind',
            description: 'Set a group reminder. Will mention the specified group if you have permissions to mention the group.',
            args: [
                {
                    key: 'roleString',
                    prompt: 'Who are you reminding? (Role or User?)',
                    type: 'string'
                },
                {
                    key: 'scheduleMins',
                    prompt: 'Repeat on minutes? ',
                    type: 'string',
                    default: '*'
                },
                {
                    key: 'scheduleHrs',
                    prompt: 'Repeat on hours?',
                    type: 'string',
                    default: '*'
                },
                {
                    key: 'scheduleDayOfMonth',
                    prompt: 'Repeat on which days of the month?',
                    type: 'string',
                    default: '*'
                },
                {
                    key: 'scheduleMonth',
                    prompt: 'Repeat on which months?',
                    type: 'string',
                    default: '*'
                },
                {
                    key: 'scheduleDayOfWeek',
                    prompt: 'Repeat on which days of the week?',
                    type: 'string',
                    default: '*'
                },
                {
                    key: 'reminderString',
                    prompt: 'What do you want to remind you?',
                    type: 'string'
                }
            ]
        });
    }

    run(message, {roleString, scheduleMins, scheduleHrs, scheduleDayOfMonth, scheduleMonth, scheduleDayOfWeek, reminderString}) {
        
        // validate role exists and user has role mention permissions
        let role = message.guild.roles.cache.find(role => role.name.toUpperCase() === roleString.toUpperCase());
        // console.log("Role Info:  ");
        // console.log("Role Name:  " + role.name);
        // console.log("Mentionable: " + role.mentionable);
        // console.log("Member has role:  " + message.member.roles.cache.has(role.id));
        if(!message.member.roles.cache.has(role.id) || !role.mentionable){
           message.react('❌');
           message.reply("You cannot mention this role: " + role.name + ". Check with your mods/admins.")
           return;
        }
        
       // build cron string from separate args
        let scheduleString = scheduleMins + " " + scheduleHrs + " " + scheduleDayOfMonth + " " + scheduleMonth + " " + scheduleDayOfWeek

        message.react('⏰');
        let j = schedule.scheduleJob(scheduleString.trim(), function(){
            message.channel.send('Reminder: ' + ` ${role} ` + reminderString.trim());
        }
        );
        message.react('☑');
    }
}