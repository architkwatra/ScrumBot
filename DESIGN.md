# DESIGN Document


Name:  **“Bot up your scrum (BUYSbot)”**



## Problem statement
Generally, scrum meetings, which should be limited to fifteen minutes, may get extended to more than an hour and can also lead to fruitless discussions. Also, managing and keeping track of all tasks of the team members is a problem. Additionally, this invloves a tedious and boring task of writing the weekly report and sending it to the team, so that the every member in the team has an idea of what others have worked and completed. Hence, we are trying to maintain a TO-DO list for each team member like we do in the scrum and automating the work of creating weekly reports and sending them. These To-Do’s can be marked completed at anytime and all the team members has access to it, maintaining transparency in the team. Also, at the end of the day(default, the user can set the time), the bot sends a notification asking if a task is complete. 

## Bot description
Our bot helps manage the scenario of daily scrum meetings. Making use of a bot for daily scrum will help the team members to easily send information regarding the tasks they are working on to the whole team. It also helps in easily finding out what tasks other team members are working on without setting up a meeting, which can save valuable time for more productive work.

The bot we are working on falls under the category of a focus bot. The bot will gather the tasks each person will be working on by asking them for updates on a timely basis. The bot will also keep track of any overdue tasks for the day. The bot will also notify the team of overdue tasks of each team members. If a task is overdue for a long time (maybe 3 days), the bot will check if the team member is facing any blockers.


## Use cases:

Note: Use case 2 has been changed and the new one is mentioned in Issues (created by Professor, we will update this file shortly. Sorry for the inconvineince)

### Daily Scrum
* **Preconditions:**
All the members of the team should be added to a team list (aka channel in Slack)
* **Main Flow**
The bot will prompt all the team members for a list of tasks that they will perform on that day [S1]. All the team members will reply with a list of tasks that they will perform [S2]. After collecting the task updates from everyone, the bot will post the update in team’s group (or individually to everyone) [S3]
* **Subflow**
  * [S1] The bot will send a message saying “What are the tasks you will be working on today?” at a fixed time each day.
  * [S2] The team member will reply -- in each message -- a task he will be performing. The team member will send a message “That’s it” (or anything similar keyword) indicating his end of task list.
  * [S3]The bot will gather updates from everyone and post it in the team’s group (or send it individually to everyone) at a particular time of day.
* **Alternative flow**
  * [E1] If the team member doesn’t reply with their list of tasks.
In this case, the update posted to the team group will contain “No tasks” for that particular team member.

### Marking tasks as completed and managing overdue tasks
* **Preconditions:**
The team member has given a list of tasks that he will perform for the day.
* **Mainflow:**
At the end of the day, users will update the status of their tasks [S1 and S2]. Incomplete tasks will be tracked and shown overdue for the next day[S3]. If any task for a team member is overdue for more than 3 days, the bot will ask the team member if he is blocked due to something or needs any help from any other member[S4]
* **Subflow:**
  * [S1] At the end of the day, the bot will prompt the team member with interactive messages for each task and ask if they were able to complete the task 
  * [S2] The user will select “Yes” or “No” for each task, depending upon their status
  * [S3] Incomplete tasks will be automatically added to the next day’s list of tasks and shown as overdue in the team update 
  * [S4] If the task is overdue for more than 3 days, the bot will send an interactive message where it provides a drop down to select other team member from whom they may need help from. Once selected, the bot will send a message to the member selected about the situation.
* **Alternative flow:**
  * [E1] If the team member has not provided any tasks for the day.
  * [E2] If the team member doesn’t select the status of his list of tasks.

### Weekly reports
* **Preconditions:**
If weekly reports are enabled
There is an email (or user) assigned to which the weekly reports should be sent.
* **Mainflow:**
Enable weekly reports [S1]. Assign an email (or user) to receive weekly reports[S2]. At the end of each week, an email (or message) will be sent to the designated email-id (or user) with task statistics of each team member [S3].
* **Subflow:**
  * [S1] Any member of the team can enable weekly reports by using slash command:
  `\weekly-report enable`
  * [S2] Any member of the team can assign a designated email ID (or username) to receive weekly report. This can be done using the slash command:
  `\weekly-report set lead-member <email of the designated lead member>`
  * [S3] The lead member will receive an email (or a message) with the team statistics. This can include the following: number of tasks that went overdue, number of tasks completed on time.
* **Alternative flow:**
  * [E1] If there are no tasks performed by any team member (company shutdown)

## Design Sketches

### Wireframe sketches
* The bot will ask for daily scrum updates from all the team members
[![wireframe1](https://github.ncsu.edu/csc510-fall2019/CSC510-1/blob/master/Images/Mockup_Images/wireframe_mockup%231.png "wireframe1")](https://github.ncsu.edu/csc510-fall2019/CSC510-1/blob/master/Images/Mockup_Images/wireframe_mockup%231.png "wireframe1")
* The bot will send the update of all the team members to the group. (Overdue tasks are indicated through red font color)
[![mockup2](https://github.ncsu.edu/csc510-fall2019/CSC510-1/blob/master/Images/Mockup_Images/wireframe_mockup%232.png "mockup2")](https://github.ncsu.edu/csc510-fall2019/CSC510-1/blob/master/Images/Mockup_Images/wireframe_mockup%232.png "mockup2")
* The bot will ask for each team member to indicate the status of their tasks
[![mockup3](https://github.ncsu.edu/csc510-fall2019/CSC510-1/blob/master/Images/Mockup_Images/wireframe_mockup%233.png "mockup3")](https://github.ncsu.edu/csc510-fall2019/CSC510-1/blob/master/Images/Mockup_Images/wireframe_mockup%233.png "mockup3")
* If the team member has a task overdue for more than three days, it will ask if the they need any help from others to finish the task
[![mockup4](https://github.ncsu.edu/csc510-fall2019/CSC510-1/blob/master/Images/Mockup_Images/wireframe_mockup%234.png "mockup4")](https://github.ncsu.edu/csc510-fall2019/CSC510-1/blob/master/Images/Mockup_Images/wireframe_mockup%234.png "mockup4")

### Storyboard
* UseCase1 Storyboard (Daily Scrum Updates)
[![Storyboard_Usecase1](https://github.ncsu.edu/csc510-fall2019/CSC510-1/blob/master/Images/Storyboard_Images/Storyboard_1.jpg "Storyboard_Usecase1")](https://github.ncsu.edu/csc510-fall2019/CSC510-1/blob/master/Images/Storyboard_Images/Storyboard_1.jpg "Storyboard_Usecase1")
* UseCase2 Storyboard (Marking tasks as completed and managing overdue tasks)
[![usecase2](https://github.ncsu.edu/csc510-fall2019/CSC510-1/blob/master/Images/Storyboard_Images/Storyboard_2.jpg "usecase2")](https://github.ncsu.edu/csc510-fall2019/CSC510-1/blob/master/Images/Storyboard_Images/Storyboard_2.jpg "usecase2")
* UseCase3 Storyboard (Weekly reports)
[![usecase3](https://github.ncsu.edu/csc510-fall2019/CSC510-1/blob/master/Images/Storyboard_Images/Storyboard_3.jpg "usecase3")](https://github.ncsu.edu/csc510-fall2019/CSC510-1/blob/master/Images/Storyboard_Images/Storyboard_3.jpg "usecase3")

## Architecture design

![Architecture design](https://github.ncsu.edu/csc510-fall2019/CSC510-1/blob/master/Images/Architecture_dig.png "Architecture design")

### Components

#### User:
* User component corresponds to the actual user in the Slack. They are the team members who are part of a workspace. They have direct access to our bot and indirect access through teams (channels)
#### Teams:
* Teams are nothing but Slack Channels. These teams consist of 2 or more users and all of them have access to the bot functionalities.
#### BUYSbot:
* BUYSbot is the Bot component that interacts with the user and the webserver. This acts as a client to send and receive data from the web server. Whenever a User types command, this component kicks in and handles any request from the user
#### Web Server:
* Web Server component takes care of handling all the requests from the Bot component and also interacts with the Database to save and retrieve user data
* We will be hosting this service at 000webhost.com
#### Database:
* Database component saves all the user data and serves the required data to web server whenever asked for.
* We will be implementing SQL server in this component


### Interactions

#### User - BUYSbot:
* User has private access to our Bot (as with the case with most of the apps in Slack). A user can maintain private TO-DO list by interacting with the Bot.

#### User - Team:
* A user can be part of team (aka channel in Slack). This user can execute all the functionalities available for him/her. This goes with the normal user-channel interaction in Slack.

#### Team - BUYSbot:
* Every member in the team has access to all the taska maintained by the Bot. This includes daily tasks, weekly report, overdue report etc. 

#### BUYSbot - Web Server:
* Bot makes API request to the server for any state change or when query is made by an user. 
* When user enters a new task or clears one, bot makes the request to the web server and saves the state at that time.
* Web server also initiates few of the tasks - overdue reminder, collecting tasks from each user etc.

#### Web Server - Database
* Web server interacts with the database, when it needs to fetch or store user data.
* For example: If the user enters the task list for a day, web server receives this data and saves it in appropriate table in the database.
In case of query, for weekly reports - web server queries the database to collect all the tasks completed in that particular week and summarizes the same


### Constraints and guidelines
* User should be part of at least one team in order to send daily scrum updates
* A user can be part of more than one team. In this case, tasks of a user related to one team should not be sent to another team channel.
* Updates sent to one team channel cannot be accessed by users from other team channels.
* A user cannot directly access the web server. All the interaction with the web server should be done through the bot.

### Additional design patterns
* Web Server component makes use of Singleton design pattern to manage connections with the database. The reason for this is that as the number of users for the bot increases, the number of open connections between the web server and database can increase rapidly and can cause problems to scale the application. This problem can be solved by using a singleton design to limit the number of connections to the database.
* Facade design pattern is used by the web server in order to manage interactive messages from the slack bot. The bot will send user interaction details to a specified request URL, regardless of the task it is performing.


