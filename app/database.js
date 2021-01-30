const { Client } = require('pg')

class Database {
    constructor() {
        this.pgclient = new Client ({
            connectionString: process.env.DATABASE_URL
        });
        (async () => {
            await this.pgclient.connect();
            await this.pgclient.query('CREATE TABLE IF NOT EXISTS tasks(task_id SERIAL PRIMARY KEY, user_id VARCHAR(40) not null, task VARCHAR(100) not null, taskdate DATE not null)')
        })();
    }

    get dbclient() {
        return this.pgclient;
    }
}

// Singleton database class
class Db {
    constructor() {
        if (!Db.instance) {
            Db.instance = new Database();
        }
    }

    getInstance() {
        return Db.instance;
    }
}

module.exports = Db;