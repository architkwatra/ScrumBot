# TEAM ID - 1 
Members :

• Aniruddha Shamasundar

• Archit Kwatra

• Sanjana Kacholia

• Suraj Siddharudh


## Problem Statement
A scrum meeting is a daily stand-up meeting where each team member is asked for daily updates in terms of progress done, tasks they will take up today and if there are any blockers. Generally, scrum meetings, which should be limited to fifteen minutes, may get extended to more than an hour and can also lead to fruitless discussions. Also, managing and keeping track of all tasks of the team members is a problem. It gets worse when a team is sprad across physical location. Additionally, this involves a tedious and boring task of writing the weekly report and sending it to the team, so that the every member in the team has an idea of what others have worked and completed. 

With the help of this bot, we are automating the scrum process. Bot would spring into action at regular intervals and removes the need to physical presence of the team member to provide scrum updates. These daily tasks are combined and a weekly report is made. Daily and weekly updates are pushed to Team Slack channel, making the entire process transparent.


### How the Bot Helps
A BUYSbot is a software application (Bot) that fulfils all the tasks of a daily scrum meeting and it works even if the users are working remotely. BUYSbot provides an easy interface with the slack platform for executing all the scrum tasks and provides an easy autocomplete suggestions list where the manager could specify the slash commands for the respective scrum tasks. The BUSYbot accepts those commands and schedules the tasks at different time intervals specified by the user. At the scheduled time, the bot activates and completes tasks based on the requested slash command.

Additionally, each workspace can have one account specified as mananger with privleged access. This user is the only one who can schedule the tasks through slash commands. Since, everything can be done through a system(laptop, desktop or smartphone), there is no need for the individuals to attend the scrum meeting physically. This saves a lot of time for each team member since no one has to wait for the other team member's status to be over. Further, the BUYSbot could get updates to the manager from the individuals even if they are late to the office as they can simply send their updates using a smartphone and fixes the problem of finding a common time that suits all the individuals. 

Just imagine if 1 hour of a team member's time is saved everyday along with the benefit of no physical involvement for the scrum meeting, productivity could be increased in a month for that individual. This can benefit the whole organisation exponentially, if the productivity is counted for all the individuals.

![AutoComplete](https://github.ncsu.edu/csc510-fall2019/CSC510-1/blob/master/Images/Bot_Images/Autocomplete.PNG)


# Primary features and screenshots.
**BUYSbot is a Slack based Bot with the ability to set time for different scrum tasks** 

For this bot, we have three major usecases - daily scrum nudge time, daily nudge time and weekly reports nudge time. Following is the detailed use case description of the three use cases:

**Daily Scrum Nudge Time**: 

Schedules the daily scrum period time for the workspace. To set this task, manager can use the following slash command "/setdailyscrumtime \<Scrum Start Time>, \<Scrum End Time>, \<End of Day Time>"

* At the scheduled "Scrum Start Time", the bot will prompt each user to provide the list of tasks they will undertake on that day. The team members have the time till the "Scrum End Time" to submit their list of tasks. Bot again activates at "Scrum End Time", to aggreagte all the updates from the users and pushes this to the Team Channel

* If a new task comes up later or the team member had forgot to add a task to the list, they can still go ahead and send more updates to the Bot. Though these tasks cannot be shown during daily update time, it is still stored in the server. At the "End of Day" time, bot activates again and saves the daily task list to the database. 

* For example: the command -->  "/setdailyscrumtime 08:01, 12:00, 18:00" will ask for daily update at 08:01 hours and post all those updates at 12:00 hours, and save the daily contents at 18:00 hours. 


![DailyScrumNudgeTime](https://github.ncsu.edu/csc510-fall2019/CSC510-1/blob/master/Images/Bot_Images/DailyScrumResults.png)
 
 **Daily Nudge Time**: 
The manager can schedule Daily Nudge Time to get updates on the progress of the tasks provided by the individual during the daily scrum nudge time. This command could contain multiple nudge times (atmost 5) and at each nudge time the bot activates and will ask the users to give a progress update on their currently assigned tasks.

* To set this task, manager can use the following slash command "/settasktime \<Time 1>, \<Time 2>, ..., \<Time 5>". 
* Bot activatesat each of these scheduled times and sends a message saying "Please send number of tasks completed until now!". Now the individual could reply with the exact status of the progress made for the day and the manager can track the status for the respective team member. 

* For example: The command --> "/settasktime 12:35, 15:00, 18:00" will send a message saying "Please send number of tasks completed until now!" to each team member at the times 12:35, 15:00 and 18:00 respectively. The range of the nudge times varies from 1 to 5 and it is upto the manager to set number of nudge times.

![DailyNudgeTime](https://github.ncsu.edu/csc510-fall2019/CSC510-1/blob/master/Images/Bot_Images/DailyNudge.PNG)
    
**Weeky Reports**: 

The manager can schedule to get updates of all the tasks by the individuals at the end of the week, where the end of the week could be any day of the week. This command will contain the Day and Time of the week when all the weekly tasks need to be sent to the team channel.

* To set this task, manager can use the following slash command "/setweeklyreporttime \<Day of the Week>, \<Weekly Report delivery Time>"

* At the scheduled time, the bot pull the list of all the tasks assigned to the individuals during the week from the databse and send it to the team channel with all the specifics. This report is grouped by Day and for each day grouped by the users.

* For example: The command --> "/setweeklyreporttime 5 18:00" will schedule weekly report time to 18:00 hours on every Friday. Here 1 stands for Monday, 2 for Tueday, 3 for Wednesday, 4 for Thursday, 5 for Friday, 6 for Saturday and 0 for Sunday.

![WeeklyReports](https://github.ncsu.edu/csc510-fall2019/CSC510-1/blob/master/Images/Bot_Images/WeeklyReport.png)

# Your reflection on the development process and project.
•	During brain storming of design and architecture, we thought of various cases which could have been missed and along with that, it helped in understanding which parts could be reused. Storyboarding help us think through the user interaction steps.


•	Getting merge requests reviewed by other teammate and scrum meetings helped the development to be error-free and transparent, open to ideas. We could share feedbacks during scrum meetings, know about what each person is working on and get better ideas to implement a piece of code. Code merging requests were to be approved by other team member, which means code was checked every time before pushing it.


•	Integration testing helped in checking for edge cases and helped us simulate how exactly a user would interact with different functionalities. More importantly, it let us have a view of each component in sync rather than individually.

• During the project, we also got a chance to learn different coding practices every team member follows, and how we could improve on that, using others styles. 


# Any limitations and future work
•	Expanding scope of Use Case 3 : Weekly Report
  -	Show the percentage of tasks completed in the weekly report.
  -	More detailed user statistics can be given based on their task completion.
  -	Sending of reports could be more dynamic, ie user can ask for report between a timeframe.

•	Managing over due tasks can be tracked more efficiently. Sometimes, new tasks come up and old tasks have to be queued up for later, in such cases, it might be annoying for unnecessary prompts of overdue. So it could be better if some user input could be taken into account, to manage over due tasks.

•	Additional feature, of being able to update tasks after it has already been sent, could be helpful, since tasks might change according to requirement and insights.

•	Better user interface, so as to make all the actions super-intuitive like better formatting of weekly reports. For now, the weekly report just has all the tasks of each team member and its status, however, paraphrasing and aggregating smaller tasks into more defined high level task and giving everyone's contribution to it, could be one way of making it cleaner and more intuitive. 

Here is the video link for our bot - ![Screencast](https://drive.google.com/file/d/1ioKMQ246NRXbZz5oU2SWRdmnCHkaLR3K/view)
