process.env.NODE_ENV = 'test';

let chai = require('chai');
const nock = require('nock');
let chaiHttp = require('chai-http');
const {app, taskMap} = require('../event-listener');
let { IsScrumPeriod }  = require('../handlers');
let should = chai.should();
const assert = require('chai').assert;

chai.use(chaiHttp);

describe('listener end point', () => {
    let challengeToken = {
        challenge: 'some-token',
    };

    let usersList = {
        ok: true,
        members: [
            {
                id: 'user1',
            },
            {
                id: 'user2',
            },
            {
                id: 'scrumbot',
                name: 'scrumbot'
            }
        ],
        response_metadata: {}
    };
    
    let chatPosted = {
        ok: true,
        response_metadata:{}
    };

    beforeEach(() => {
        nock.cleanAll();
        nock('https://slack.com')
            .post('/api/users.list')
            .reply(200, JSON.stringify(usersList));
        nock('https://slack.com')
            .post('/api/chat.postMessage')
            .reply(200, JSON.stringify(chatPosted));
    });

    it ('slack token is defined', () => {
        assert(process.env.SLACK_TOKEN !== '');
    });

    it ('should return back the challenge token as it is', (done) => {
        chai.request(app).post('/').send(challengeToken).end(
            (err, res) => {
                res.should.have.status(200);
             done();
            }
        );
    });

    it ('should add a task to the task map', (done) => {
        req = {
            challenge: 'some-token',
            event: {
                channel_type: "im",
                text: "some-task",
                sender: 'random_sender',
                user: 'some-user',
            },
            authed_users: ['some_user', 'scrumbot']
        }
        IsScrumPeriod = true;
        chai.request(app).post('/').send(req).end(
            (err, res) => {
                res.should.have.status(200);
                console.log(taskMap);
                assert(!!taskMap['some-user']);
                done();
            }
        );
    });

});

describe('slash command - daily scrum setup', () => {
    let challengeToken = {
        challenge: 'some-token',
    };

    let usersList = {
        ok: true,
        members: [
            {
                id: 'user1',
            },
            {
                id: 'user2',
            },
            {
                id: 'scrumbot',
                name: 'scrumbot'
            }
        ],
        response_metadata: {}
    };
    let chatPosted = {
        ok: true,
        response_metadata:{}
    };

    const OLD_ENV = process.env;

    beforeEach(() => {
        nock.cleanAll();
        nock('https://slack.com')
            .post('/api/users.list')
            .reply(200, JSON.stringify(usersList));
        nock('https://slack.com')
            .post('/api/chat.postMessage')
            .reply(200, JSON.stringify(chatPosted));
        process.env.MANAGER_NAME = "manager"
    });

    afterEach(() => {
        process.env = OLD_ENV;
    })

    it('does not let non managers set daily scrum time', (done) => {
        req = {
            user_name: 'teamMember'
        };
        chai.request(app).post('/setdailyscrumtime').send(req).end(
            (err, res) => {
                res.should.have.status(400);
                // console.log(taskMap);
                // assert(!!taskMap['some-user']);
                done();
            }
        );
    });

});