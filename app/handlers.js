const { WebClient } = require('@slack/web-api');
const data = require('./mock/mock.json');
const Db = require('./database');

const options = {
  retryConfig: {
    retries: 3
  }
};

const web = new WebClient(process.env.SLACK_TOKEN, options);

global.IsScrumPeriod = false;

async function getSrumbot() {
    const users = await web.users.list();
    return scrumbot_filtered = users.members.filter((u) => {
      return u.name === 'scrumbot'
    })[0];
}

// askForDailyUpdates sends a message to everyone in the workspace asking for updates
async function askForDailyUpdates() {
    const users = await web.users.list().catch(err => console.log('Error fetching list of users'));
    IsScrumPeriod = true;
  
    users.members.forEach( (user, index) => {
      // empty the list of tasks
      // taskMap[user.id] = [];
      web.chat.postMessage({
        channel: user.id,
        as_user: true,
        text: "Please send your daily list of tasks"
      }).catch((err) => console.log(err));
    });
}

//askForTaskUpdates asks for user updates x times a day posing as manager
async function askForTaskUpdates() {
  const users = await web.users.list();
  users.members.forEach( (user, index) => {
    // get the total task counr for the user
    //totalTaskCount = taskMap[user.id];
    let completedTask = 0;

    web.chat.postMessage({
      channel: user.id,
      as_user:  true,
      // as_user: false,
      // username: 'ssiddha',
      text: "Please send number of tasks completed until now!"
    });
  });
}

// postDailyUpdatesToChannel posts everyone's update to the channel
async function postDailyUpdatesToChannel(taskMap) {
    let scrumUpdate = "Hello everyone,\nThe daily updates from each of the team member are as follows";
    let teamChannel = "projectbuys";
    IsScrumPeriod = false;

    const users = await web.users.list();

    // collect all updates
    users.members.forEach( (user, index) => {
        // don't print task updates for bots
        if (user.is_bot || user.name === 'slackbot') {
        console.debug("Ignoring scrum update for " + user.name);
        return
        }

        if (taskMap[user.id] && taskMap[user.id].length > 0) {
        userUpdate = "*Team member: " + user.name + "*\n" + "Tasks:\n" + taskMap[user.id].join('\n');
        } else {
        userUpdate = "*Team member: " + user.name + "*\n" + "No update available";
        }

        scrumUpdate = scrumUpdate + "\n\n" + userUpdate;
    });

    // post the update to the team channel
    web.chat.postMessage({
        channel: teamChannel,
        as_user: true,
        text: scrumUpdate
    });
}

// push taskMap to database on end of day
async function endOfDay(taskMap) {
  const users = await web.users.list();
  idtoname = {};
  users.members.forEach((user, idx) => {
    idtoname[user.id] = user.name;
  });
  let db = new Db().getInstance();
  const stmt = 'INSERT INTO tasks(user_id, task, taskdate) VALUES ($1,$2,CURRENT_DATE) RETURNING *'
  for (let key in taskMap) {
    if (taskMap.hasOwnProperty(key)) {
      try{
        taskMap[key].forEach( async (task, index) => {
          await db.dbclient.query(stmt, [idtoname[key], task]);
        });
      } catch (e) {
        console.log(e)
      }
    }
  }
}

//Week reports handler
async function weeklyReport() {
  let teamChannel = "projectbuys";
  var dic = new Map();
  var sendUpdateText = "HELLO EVERYONE !!'\n' Here is the update for this week";

  let db = new Db().getInstance();
  const stmt = "SELECT user_id, task, TO_CHAR(taskdate :: DATE, 'dd/mm/yyyy') FROM tasks WHERE taskdate >= NOW() - INTERVAL '7 DAYS'";

  try {
    await db.dbclient.query(stmt)
      .then(results => {
        //To be obtained from service API
        if (results != undefined) {
          rows = results.rows;
          for (var i = 0; i < rows.length; ++i) {
            if (dic.has(rows[i].to_char)) {
              dic.set(rows[i].to_char, dic.get(rows[i].to_char) + rows[i].task + "--->" + rows[i].user_id +'\n')
            } else {
              dic.set(rows[i].to_char, (rows[i].to_char +
                '\n' + rows[i].task) + '\n')
            }
          }
          for (key of dic.keys()) {
            sendUpdateText += "\n" + dic.get(key);
          }
          postMessage(teamChannel, sendUpdateText);
        }
      });
  } catch (e) {
    console.log(e)
  }
}

//Weekly reports helper function
async function postMessage(teamChannel, text) {
  await web.chat.postMessage({
    channel: teamChannel,
    as_user: false,
    text: text,
  });
}

module.exports = {
  getSrumbot,
  askForDailyUpdates,
  askForTaskUpdates,
  postDailyUpdatesToChannel,
  IsScrumPeriod,
  weeklyReport,
  postMessage,
  endOfDay
};
