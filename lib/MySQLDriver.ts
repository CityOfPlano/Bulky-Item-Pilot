import {ClientWizardState} from "./WizardState";

const mysql = require('mysql');
const config = {
    "username": "planobulkyuser",
    "password": "plano-core-bulky-password",
    "endpoint": "plano-core-bulky-db.cxczt0uugdmc.us-east-1.rds.amazonaws.com",
    "db-name": "bulkyitems"
};

export class MySQLDriver {
    private connected: boolean = false;
    private connection;

    query() {
        let self = this;
        return new Promise(function (resolve, reject) {

            if (!self.connected) {
                self.connection = mysql.createConnection({
                    host: config.endpoint,
                    user: config.username,
                    password: config.password,
                    port: 3306
                });

                self.connection.connect(function (err) {
                    if (err) {
                        //console.error('Database connection failed: ' + err.stack);
                        reject("There was a problem");
                        return;
                    }
                    self.connected = true;
                    resolve("THIS IS THE QUERY A");
                    console.log('Connected to database.');
                });

            } else {
                resolve("THIS IS THE QUERY B");
            }
        });

    }

    makeQuery(a) {
        let self = this;
        return new Promise(function (res, rej) {
            res(a);
            //self.connection.end();
        });
    }

}