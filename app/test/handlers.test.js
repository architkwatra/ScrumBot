const expect = require('chai').expect;
const assert = require('chai').assert;
const nock = require('nock');

const { askForDailyUpdates, askForTaskUpdates, weeklyReport} = require('../handlers.js');
const { taskMap } = require('../event-listener.js');

describe('ask for daily updates', () => {
    usersList = {
        ok: true,
        members: [
            {
                id: 'user1',
            },
            {
                id: 'user2',
            }
        ],
        response_metadata: {}
    };
    
    chatPosted = {
        ok: true,
        response_metadata:{}
    };

    it('runs for all users', async () => {
        nock.cleanAll();
        nock('https://slack.com').post('/api/users.list')
            .reply(200, JSON.stringify(usersList));
        nock('https://slack.com')
            .post('/api/chat.postMessage')
            .times(usersList.members.length)
            .reply(200, JSON.stringify(chatPosted));
        await askForDailyUpdates()
        expect(nock.pendingMocks().length).to.equal(0);
    });

    it('posts the correct message', async () => {
        nock.cleanAll();
        nock('https://slack.com').post('/api/users.list')
            .reply(200, JSON.stringify(usersList));
        nock('https://slack.com')
            .post('/api/chat.postMessage',(body)=>(body.text === 'Please send your daily list of tasks'))
            .times(usersList.members.length)
            .reply(200, JSON.stringify(chatPosted));

        await askForDailyUpdates()
        expect(nock.pendingMocks().length).to.equal(0);
    });

    it ('does not post an empty message for the user', async () => {
        nock.cleanAll();
        nock('https://slack.com').post('/api/users.list')
            .reply(200, JSON.stringify(usersList));
        nock('https://slack.com')
            .post('/api/chat.postMessage',(body)=>(body.text != ''))
            .times(usersList.members.length)
            .reply(200, JSON.stringify(chatPosted));

        await askForDailyUpdates()
        expect(nock.pendingMocks().length).to.equal(0);
    });

    it('error from slack is properly handled', async () => {
        nock.cleanAll();
        nock('https://slack.com').post('/api/users.list')
            .times(4)
            .reply(500, JSON.stringify(usersList));

        try {
            await askForDailyUpdates()
        } catch (e) {
            expect(e).to.be.instanceOf(TypeError)
        }
    });

});

describe('Set the Manager Nudge Time', async () => {
    usersList = {
        ok: true,
        members: [
            {
                id: 'user1',
            },
            {
                id: 'user2',
            }
        ],
        response_metadata: {}
    };
    
    chatPosted = {
        ok: true,
        response_metadata:{}
    };

    beforeEach(() => {
        nock.cleanAll();
        nock('https://slack.com').post('/api/users.list')
            .reply(200, JSON.stringify(usersList));
        nock('https://slack.com')
            .post('/api/chat.postMessage')
            .times(usersList.members.length)
            .reply(200, JSON.stringify(chatPosted));
    });

    it('should set manager nudge time', async function () {
      let closedIssue = await askForTaskUpdates();
        expect(nock.isDone()).to.true
    });
});

describe('Weekly reports', async () => {
    usersList = {
        ok: true,
        members: [
            {
                id: 'user1',
            },
            {
                id: 'user2',
            }
        ],
        response_metadata: {}
    };
    
    chatPosted = {
        ok: true,
        response_metadata:{}
    };

    beforeEach(() => {
        nock.cleanAll();
        nock('https://slack.com').persist()
            .post('/api/chat.postMessage')
            .reply(200, JSON.stringify(chatPosted));
    });

    it('weekly reports are sent', async function () {
      let closedIssue = await weeklyReport();
        expect(nock.isDone()).to.true
    });
});

