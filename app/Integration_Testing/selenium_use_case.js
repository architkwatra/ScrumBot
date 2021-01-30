const puppeteer = require('puppeteer');
const loginEmail = process.env.SLACK_EMAIL;
const loginPassword = process.env.SLACK_PWD;
const slackbotURL = 'https://botupystestteam.slack.com/' 

async function login(browser, url) {
  const page = await browser.newPage();
  await page.goto(url, {waitUntil: 'networkidle0'});
  // Login
  await page.type('input[id=email]', loginEmail);
  await page.type('input[id=password]', loginPassword);
  await page.click('button[type=submit]');
  await page.keyboard.press('Enter')
  // Wait for redirect
  await page.waitForNavigation();
  return page;
}
async function goToApp(page)
{
  // Waiting for page to load
  
  await page.click('button[aria-label="Browse apps"]');
  const title = await page.title();
  await page.keyboard.type( 'scrumbot' );
  await page.click('button[aria-label="View app"]');
  return page
}
async function settime(page,cmd)
{

  let time = new Date();
  h = time.getHours();
  m = time.getMinutes()
  if(m==59){
    m=0;
    if(h==23){
        h=0;
    }
    else{
        h=h+1;
    }
  }
  else{
    m=m+1;
  }
  // console.log(h,m);
  if(cmd=='/settasktime'){
    await page.keyboard.type(`${cmd} ${h}:${m}`);
  }
  else{
    await page.keyboard.type(`${cmd} ${h}:${m},${h}:${m+1}`);
  }
  
  await page.keyboard.press('Enter');
  return page;
}

function delay(time) {
   return new Promise(function(resolve) { 
       setTimeout(resolve, time)
   });
}
async function getmsg(page)
{
    let results = await page.evaluate(() => {
            let len = document.getElementsByClassName('c-message__body')['length'];
            let last=len-1;
            let result = document.getElementsByClassName('c-message__body')[last].innerHTML.includes('Please send number of tasks completed until now!');
            return result;
                
            })
    // console.log(results);
 
  return results;
}
async function getmsg_dailytask(page)
{
    let results = await page.evaluate(() => {
            let len = document.getElementsByClassName('c-message__body')['length'];
            let last=len-1;
            let result = document.getElementsByClassName('c-message__body')[last].innerHTML.includes('Please send your daily list of tasks');
            return result;
                
            })
    // console.log(results);
 
  return results;
}


(async () => {

  const browser = await puppeteer.launch({headless: false, args: ["--no-sandbox", "--disable-web-security"]});
  let page = await login( browser, `${slackbotURL}` );
  console.log("Successfully Logged In");
  let page2 = await goToApp(page);
  let page3 = await settime(page2,'/settasktime');
  console.log('Done setting time for asking tasks completed');
  await page3.waitFor(120000);
  // await page3.waitFor(720000);
  console.log("Test 1 for scrumbot - Posting How many tasks are completed");
  console.log(await getmsg(page3));
  let page4 =await settime(page2,'/setdailyscrumtime');
  console.log('Done setting time for asking daily tasks');
  // await page4.waitFor(7200);
  await page4.waitFor(120000);
  console.log("Test 2 for scrumbot - Posting to ask daily list of tasks ");
  console.log(await getmsg_dailytask(page4));
  console.log("Selenium testing successfully completed.");
  browser.close();
})()
