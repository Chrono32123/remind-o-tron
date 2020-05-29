const { Command } = require('discord.js-commando');
const schedule = require('node-schedule');

//60 24 31 1,2,3,4,5,6,7,8,9,10,11,12 1,2,3,4,5,6,7
//* * * * *

//     Scheduling format follows Cron styling:
//     *    *    *    *    *
//     ┬    ┬    ┬    ┬    ┬
//     │    │    │    │    │
//     │    │    │    │    └ day of week (0 - 7) (0 or 7 is Sun)
//     │    │    │    └───── month (1 - 12)
//     │    │    └────────── day of month (1 - 31)
//     │    └─────────────── hour (0 - 23)
//     └──────────────────── minute (0 - 59)

module.exports = class RemindMe extends Command {
    constructor(client) {
        super(client,{
            name: 'remindme',
            group: 'remindme',
            memberName: 'remindme',
            description: 'Set a self reminder. Will mention you.',
            args: [
                {
                    key: 'scheduleMins',
                    prompt: 'Repeat on minutes?',
                    type: 'string'
                },
                {
                    key: 'scheduleHrs',
                    prompt: 'Repeat on hours?',
                    type: 'string'
                },
                {
                    key: 'scheduleDayOfMonth',
                    prompt: 'Repeat on which days of the month?',
                    type: 'string'
                },
                {
                    key: 'scheduleMonth',
                    prompt: 'Repeat on which months?',
                    type: 'string'
                },
                {
                    key: 'scheduleDayOfWeek',
                    prompt: 'Repeat on which days of the week?',
                    type: 'string'
                },
                {
                    key: 'reminderString',
                    prompt: 'What do you want to remind you?',
                    type: 'string'
                }
            ]
        });
    }

    run(message, {scheduleMins, scheduleHrs, scheduleDayOfMonth, scheduleMonth, scheduleDayOfWeek, reminderString}) {
        // build cron string
        let scheduleString = scheduleMins + " " + scheduleHrs + " " + scheduleDayOfMonth + " " + scheduleMonth + " " + scheduleDayOfWeek
        // get user id to mention
        let user = message.author; 
        message.react('⏰');
        let j = schedule.scheduleJob(scheduleString.trim(), function(){
            message.channel.send(`${user}` + 'Reminder: ' + reminderString.trim());
        }
        );
        message.react('☑');
    }
}