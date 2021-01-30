# Bot Document


Name:  **“Bot up your scrum (BUYSbot)”**

## Bot Implementation
We have deployed the Bot in Slack and use case implementaion has been done. In this milestone, we have developed code for usecases and deployed locally. Here are the functionalites coded:
* Dynamically setting Daily Scrum Time
* Dynamically setting Daily Update deadline and the time at which user's can see everybody's update
* Respond to the daily scrum update nudge
* Manager can Dynamically set the Nudge time (Usecase was changed using Professor's advise)
* Collect the weekly report, merge the task list and share it with the team.
* New slash commands has been created to accomplish few of the above tasks.
* We have used ngrock server to route the events from slack.com.

We have used Slack Events api to schedule the tasks. Also have created 2 new slash commands (expecting couple more for complete implementation). They are /setdailyscrumtime  and /settasktime. Former defines the daily scrum update and deadline where as the latter defines the manager nudges times.

### Screenshots:
* Daily Scrum Set Up

  In the below image, we have scheduled the Daily scrum time to 20:00 and deadline to 20:01

![Daily Scrum Set Up](https://github.ncsu.edu/csc510-fall2019/CSC510-1/blob/master/Images/Bot_Images/DailyScrumSetup.png)

* Daily Scrum Update Results

  In the Image below, we can see the results from the Daily Scrum Update. Bot collects all the data and emerges them based on the user. This data is sent into the channel at the scheduled deadline (In this case it is 20:01).
 
![Daily Scrum Update Results](https://github.ncsu.edu/csc510-fall2019/CSC510-1/blob/master/Images/Bot_Images/DailyScrumResults.png) 

* Weekly Reports:

  In this, we can have merged the tasks and generated a weekly report. This will help to keep track of the tasks done by team members.
![Weekly Scrum Update Results](https://github.ncsu.edu/csc510-fall2019/CSC510-1/blob/master/Images/Bot_Images/WeeklyReport.png)


## Use Case Refinement
We had 3 use cases defined and one of those was refined from professor's advise [Design Doc](https://github.ncsu.edu/csc510-fall2019/CSC510-1/blob/master/DESIGN.md "Design Doc")
* [S1] Collect the Daily Scrum update from the user and display the results at a fixed time
* [S2] **(Changed)** Let the Manager set some specific time (max 5) in a day with "Please send number of tasks completed until now!" text to check for the status
  * N number of events will be scheduled based on the time provided by the manager
  * The user response is stored in a HashMap and will be replaced after each interval till the end of the day
  * This time should be between 00:00-23:59
  * As we have the list of all the tasks that the user will be working in that day, we can show this as x tasks completed/total tasks format.
* [S3] Collect the weekly report and notify the users with the weekly report

### Future Updates:
* Manager Nudge will be dislayed in the manager's name rather than the bot name
* Slash command to receive the daily task completed list. This command would be the one through with manager can get the task completed at any time in the day
* Show the percentage of tasks completed in the weekly report
* Verify the manager sets the nudge time only after the daily scrum update period is complete.

## Mocking infrastructure:
The main interaction of our bot involves the Slack server. Most of the handlers make a call to:
- [users.list](https://api.slack.com/methods/users.list "users.list") API for getting the list of all the users in the workspace
- [chat.postMessage](https://api.slack.com/methods/chat.postMessage "chat.postMessage") to post messages to the team's channel and to send instant messages to the users.

Our mocking infrastructure makes use of the following:
***Nock*** to mock the calls to Slack APIs
***Chai*** and ***Mocha*** to build test cases.

The bot codebase contains two entities:
1. **handlers**: Which contain the functions which handles functionalities like posting a scrum update, asking for daily updates etc. The unit test cases for handlers are present in `app/test/handlers.test.js` file.
2. **event-listeners**: Which contain the server which listens for the subscribed events. The unit test cases for the event listeners are presnet in `app/test/event-listener.test.js` file.

We have demostrated the following in the unit test cases:
1. All the members of the workspace are notified to send their daily updates.
2. All the team members are nudged to send their respective status by the scrumbot.
3. Proper weekly reports are sent.
4. Updation of tasks happen when team members respond with updates.
5. Event listener endpoint works fine (responds with the challenge token).

## Selenium testing of each use case:
For Integration Testing, we used puppeteer. For two use cases, the following code is used.
1. Open the slack URL.
2. Login using credentials.
3. Browse apps to open 'ScrumBot' App.
4. Sets time for asking daily updates.
5. Tests whether the message is posted at the time set. ( To test we set time to, the next minute and check for a message in the next two minutes. Then the message is read and matched if it's correctly posting.)
6. Sets time for asking how much of the tasks are completed.
7. Tests whether the message is posted at the time set. ( To test we set time to, the next minute and check for a message in the next two minutes. Then the message is read and matched if it's correctly posting.)

We check if all the tests are passed.

For the third use case we have used selenium testing.
1. Selenium opens up the slack web app
2. Enters the url
3. Logins using valid login id and password
4. Now, for the weekly report, we have set a particular time of the week when the weekly reports will be sent.To test tha, we have set the next minute time. 
5. When the time is exactly the same as set, the bot sends the message in the group for the weekly reports. 


## Screencast:

![ScreenCast](https://drive.google.com/file/d/1qx0E7-aV_-04WbZ-dWTeUS30ztzPiRh_/view?usp=sharing)
