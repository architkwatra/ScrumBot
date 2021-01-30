// const { WebClient } = require('@slack/web-api');
var schedule = require('node-schedule');
const { startListener } = require('./event-listener.js');
// const { weeklyReport , postDailyUpdatesToChannel } = require('./handlers.js');
const { weeklyReport } = require('./handlers.js');

startListener();

// // entry point
(async () => {
//   // const users = await web.users.list();
//   // scrumbot = users.members.filter((u) => {
//   //   return u.name === 'scrumbot'
//   // })[0];

//   // let askUpdateRule = new schedule.RecurrenceRule();
//   // askUpdateRule.hour = 15; // at 10 am every day
//   // askUpdateRule.minute = 48;

//   // let submitUpdateRule = new schedule.RecurrenceRule();
//   // submitUpdateRule.hour = 15;  // at 11 am every day
//   // submitUpdateRule.minute = 49;

//   // schedule.scheduleJob(askUpdateRule, askForDailyUpdates);
//   // schedule.scheduleJob(submitUpdateRule, postDailyUpdatesToChannel);

//   console.log('Daily scrum updates scheduled');
//Every Friday at 3:00 PM
  // var rule = setWeeklyReportRule([5], 15, 0, 0);
  // schedule.scheduleJob(rule,weeklyReport);
})();

// function setWeeklyReportRule(days, hour, minute, second) {
//     var rule = new schedule.RecurrenceRule();
//     rule.dayOfWeek = days;
//     rule.hour = hour;
//     rule.minute = minute;
//     rule.second = second;
//     return rule
//   }
