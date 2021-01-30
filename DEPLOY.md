### Deployment Steps


- All the deployment files are stored in Directory deployment
- Deployment steps are written in a file named deployment.yml
- To run the deployment steps, please run the following commands:

  `git clone https://github.ncsu.edu/csc510-fall2019/CSC510-1.git`

  `cd CSC510-1/deployment/`

  `sudo ansible-playbook -i hosts.ini --user anirsh deployment.yml`
  
  #### Screenshots:
  
  [![Deployment](https://github.ncsu.edu/csc510-fall2019/CSC510-1/blob/master/Images/Deployment_Images/deployment_1.png "dep1")](https://github.ncsu.edu/csc510-fall2019/CSC510-1/blob/master/Images/Deployment_Images/deployment_1.png "depl")
 
 
   [![Deployment2](https://github.ncsu.edu/csc510-fall2019/CSC510-1/blob/master/Images/Deployment_Images/deployment_2.png "dep2")](https://github.ncsu.edu/csc510-fall2019/CSC510-1/blob/master/Images/Deployment_Images/deployment_2.png "dep2")
  




### Continuous Integration

- Project set up is done on Jenkins by adding the details like github repository.
- Build details are added to the current job like Cron Job timing (check after every 1 minute), Build details (shell commands, branch,     etc)
- Whenever the code is pushed to the branch(set in the job configuration) jenkins triggers the build (whitin the set cron time)
- To run the Jenkins job, please use the following command:

`chmod 777 ./deployment/continuous_integration_shell_commands.sh`

`./deployment/continuous_integration_shell_commands.sh`
  
  #### Screenshots:
 
 [![CI1](https://github.ncsu.edu/csc510-fall2019/CSC510-1/blob/master/Images/Continuous%20Integration/1.PNG) "CI1")](https://github.ncsu.edu/csc510-fall2019/CSC510-1/blob/master/Images/Continuous%20Integration/1.PNG "CI1")
 
  [![CI2](https://github.ncsu.edu/csc510-fall2019/CSC510-1/blob/master/Images/Continuous%20Integration/2.PNG "CI2")](https://github.ncsu.edu/csc510-fall2019/CSC510-1/blob/master/Images/Continuous%20Integration/2.PNG "CI2")
  
   [![CI3](https://github.ncsu.edu/csc510-fall2019/CSC510-1/blob/master/Images/Continuous%20Integration/3.PNG "CI3")](https://github.ncsu.edu/csc510-fall2019/CSC510-1/blob/master/Images/Continuous%20Integration/3.PNG "CI3")
   

### Acceptance tests:
#### General:
- We have created a test account. Credentials for the account are:
  - Workspace name: BotUpYsTestTeam
  - Username: ssiddha@ncsu.edu
  - Password: TestPassword


#### Use Case 1:
- In the scrumbot app, type in the following command /setdailyscrumtime [Daily Scrum Nudge Time], [Update Time], [End of Day Time].
Eg: `/setdailyscrumtime 10:00, 11:00, 17:00`
Note: for testing purpose, you can use `/setdailyscrumtime 10:00, 10:01, 10:02`
 - This command should ask for daily update at 10:00 hours, Post all the updates at 11:00 hours, and save the daily contents at 17:00 hours. For the test example, it asked for daily update at 10:00, saved the daily contents at 11:01 and at 11:02 saved every task for the day in database.

#### Use Case 2:
- In the scrumbot app, type in the following command /settasktime  [Daily Nudge Time].
Eg: `/settasktime 12:00, 14:00, 16:00` 
- This command should ask for updates at 12:00 hours, 14:00 hours, 16:00 hours.
- For testing, we can use - `/settasktime 10:00, 10:02` and it would nudge for updates at both the time.


#### Use Case 3:
-  In the scrumbot app, type in the following command /setweeklyreporttime  [Day in Number] [Weekly Report Time].
Eg: `/setweeklyreporttime 5 17:00`
- This command would schedule weekly report  17:00 hours on friday.
- Note: Numerical representation of days: 0 - Sunday, 1 - Monday ... 5 - Friday 6- Saturday.
- Testing example - `/setweeklyreporttime 5 10:00` and it sent the weekly report with cumulative tasks from the whole week on Friday at 10 AM.


### Screencast:

![ScreenCast](https://drive.google.com/file/d/1-sbfR5WGpObi2y-Rg10aNzQcBhD6zai7/view?usp=sharing)
