const express = require('express');
const bodyParser = require('body-parser');
var schedule = require('node-schedule');
const {  askForDailyUpdates, postDailyUpdatesToChannel, askForTaskUpdates, getSrumbot, IsScrumPeriod, endOfDay, weeklyReport} = require('./handlers.js');

const app = express();
const port = process.env.PORT;
const manager_user_name = process.env.MANAGER_NAME

let taskMap = {}
let taskCompletionMap = {}

// parse all body as json
app.use(bodyParser.json());

// event listener plugin
app.post('/', async (req, res) => {
    let challengeToken = req.body.challenge;
    let event = req.body.event;
    scrumbot = await getSrumbot();
    if (event) {
      let sender = event.user
      let authedUsers = req.body.authed_users;
  
      // if user is replying for updates
      if (event.channel_type === 'im' &&  authedUsers && authedUsers.includes(scrumbot.id) && sender !== scrumbot.id){
        // if(IsScrumPeriod) {
          taskMap[sender] = taskMap[sender] || []
          taskMap[sender].push(event.text);
        // }
        // else{
        //   //Manager Update
        //   taskCompletionMap[sender] = []//taskCompletionMap[sender] || []
        //   taskCompletionMap[sender] = event.text;// + "/" + taskMap[sender].length;
        //   console.log("Testing.................");
        //   console.log(taskCompletionMap);
        // }
    }
  }
  res.statusCode = 200;
  res.setHeader('Content-type', 'application/json');
  res.send(JSON.stringify({challenge: challengeToken}));
});

app.post("/setdailyscrumtime", bodyParser.urlencoded({ extended: true }), function(req, res, next) {
  let payload = req.body;
  console.log(payload);
  // Set the Daily Scum time. 
  // Expects 2 time values in 24- hour format corresponding to nudge time
  // and daily report time

  // Allow only Manager to change this setting
  if(payload.user_name == manager_user_name){
    console.log(payload.text);
    var scrumTimes = payload.text.split(",");

    //Set the Nudge Time
    var entries = scrumTimes[0];
    var times = entries.split(":").map(Number);
    if(times[0] <=23 && times[0]>=0 && times[1]<=59 && times[1]>=0){
      console.log("Setting Reminder");

      let askUpdateRule = new schedule.RecurrenceRule();
      askUpdateRule.hour = times[0]; // at 10 am every day
      askUpdateRule.minute = times[1];
      askUpdateRule.dayOfWeek = [0, 1,2,3,4,5];

      console.log(askUpdateRule);

      schedule.scheduleJob(askUpdateRule, askForDailyUpdates);
      console.log("Scheduled Daily Scrum Nudge time");
    }

    var entries = scrumTimes[1];
    var times = entries.split(":").map(Number);

    if(times[0] <=23 && times[0]>=0 && times[1]<=59 && times[1]>=0){
      console.log("Setting Reminder for Daily Scrum update");

      let submitUpdateRule = new schedule.RecurrenceRule();
      submitUpdateRule.hour = times[0];
      submitUpdateRule.minute = times[1];
      submitUpdateRule.dayOfWeek = [0, 1,2,3,4,5];

      console.log(submitUpdateRule);
      
      schedule.scheduleJob(submitUpdateRule, async () => postDailyUpdatesToChannel(taskMap));

      console.log("Scheduled Daily Scrum Update time");
    }

    var entries = scrumTimes[2];
    var times = entries.split(":").map(Number);

    if(times[0] <=23 && times[0]>=0 && times[1]<=59 && times[1]>=0){
      console.log("Setting Reminder for Daily Scrum update");

      let saveUpdateRule = new schedule.RecurrenceRule();
      saveUpdateRule.hour = times[0];
      saveUpdateRule.minute =times[1];
      saveUpdateRule.dayOfWeek = [0, 1,2,3,4,5];

      console.log(saveUpdateRule);
      schedule.scheduleJob(saveUpdateRule, async () => endOfDay(taskMap));

      console.log("Scheduled Daily Scrum Save time");
    }
    res.statusCode = 200;
    res.setHeader('Content-type', 'application/json');
    res.send(JSON.stringify({"Scheduled Daily Scrum Update time": payload.text}));
  }
  else{
    //Send Error message back to the user if not manager
    res.statusCode = 400;
    res.setHeader('Content-type', 'application/json');
    res.send(JSON.stringify({error: "You are not allowed to make any change"}));
  }
    
});

app.post("/settasktime", bodyParser.urlencoded({ extended: true }), function(req, res, next) {
  let payload = req.body;
  // check for the manager reminder times and save it in the variable.
  // The same variable will be used to schedule the jobs.

  // Allow only Manager to change the setting
  if(payload.user_name == manager_user_name){
    console.log(payload.text);
    
    var reminderTimes = payload.text.split(",");
    for(entries of reminderTimes){
      var times = entries.split(":").map(Number);
      if(times[0] <=23 && times[0]>=0 && times[1]<=59 && times[1]>=0){
        console.log("Setting Reminder");
        let managerUpdateRule = new schedule.RecurrenceRule();
        managerUpdateRule.hour = times[0];  // at 3 times a day
        managerUpdateRule.minute = times[1];
        managerUpdateRule.dayOfWeek = [0, 1,2,3,4,5];
        console.log(managerUpdateRule);
        schedule.scheduleJob(managerUpdateRule, askForTaskUpdates);
        console.log("Scheduled");
      }
    }
    res.statusCode = 200;
    res.setHeader('Content-type', 'application/json');
    res.send(JSON.stringify({"Scheduled Manager nudge time": payload.text}));
  }
  else{
    //Send Error message back to the user if not manager
    res.statusCode = 400;
    res.setHeader('Content-type', 'application/json');
    res.send(JSON.stringify({error: "You are not allowed to make any change"}));
  }
    
});

app.post("/setweeklyreporttime", bodyParser.urlencoded({ extended: true }), function(req, res, next) {
  let payload = req.body;
  // Allow the manager to set a time in week to get the weekly report

  // Allow only Manager to change the setting
  if(payload.user_name == manager_user_name){
    console.log(payload.text);
    
    var reminderTimes = payload.text.split(" ");
    console.log(reminderTimes);
    if(reminderTimes[0] < 7 && reminderTimes[0]>=0){
      let weeklyReportRule = new schedule.RecurrenceRule();
      time_24_hour = reminderTimes[1].split(":");
      weeklyReportRule.hour = time_24_hour[0]; 
      weeklyReportRule.minute = time_24_hour[1];
      weeklyReportRule.dayOfWeek = reminderTimes[0];
      console.log(weeklyReportRule);
      schedule.scheduleJob(weeklyReportRule, weeklyReport);
      console.log("Weekly report time Scheduling");

    }
    else{
      res.statusCode = 400;
      res.setHeader('Content-type', 'application/json');
      res.send(JSON.stringify({error: "Please check for the usage of the command"}));
      return;
    }
    res.statusCode = 200;
    res.setHeader('Content-type', 'application/json');
    res.send(JSON.stringify({"Scheduled Weekly Report time": payload.text}));
  }
  else{
    //Send Error message back to the user if not manager
    res.statusCode = 400;
    res.setHeader('Content-type', 'application/json');
    res.send(JSON.stringify({error: "You are not allowed to make any change"}));
  }
    
});

// start event listener
function start() {
    app.listen(port, () => console.log("Slack events endpoint at port " + port));
}

module.exports = {
    startListener: start,
    app,
    taskMap,
};
