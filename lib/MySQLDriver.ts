import {ClientWizardState} from "./WizardState";
import {MYSQLTables} from "./MYSQLTables";

const mysql = require('mysql');
const config = {
    "username": "planobulkyuser",
    "password": "plano-core-bulky-password",
    "endpoint": "plano-core-bulky-db.cxczt0uugdmc.us-east-1.rds.amazonaws.com",
    "database": "bulkyitems"
};

export class MySQLDriver {
    private connected: boolean = false;
    private connection;

    query(query) {
        let self = this;
        return new Promise(function (resolve, reject) {

            if (!self.connected) {
                self.connection = mysql.createConnection({
                    host: config.endpoint,
                    user: config.username,
                    password: config.password,
                    port: 3306,
                    database: config.database
                });

                self.connection.connect(function (err) {
                    if (err) {
                        //console.error('Database connection failed: ' + err.stack);
                        reject("There was a problem");
                        return;
                    }
                    self.connected = true;
                    //resolve("THIS IS THE QUERY A");
                    console.log('Connected to database.');
                });

            }

            self.connection.query('show tables', function (error, results, fields) {
                if (error) {reject('Error in show tables');return;}

                if (results.length === 0){
                    let mysqlTables = new MYSQLTables();
                    self.connection.query(mysqlTables.getCreateTables(), function (error, results, fields) {
                        if (error) {reject('Error in Create Tables');return;}

                        self.connection.query(query, function (error, results, fields) {
                            if (error) {reject('Error in Query: '+query);return;}
                            resolve(results);
                        });

                    });
                }else{
                    self.connection.query(query, function (error, results, fields) {
                        if (error) {reject('Error in Query: '+query);return;}
                        resolve(results);
                    });
                }

            });
               // resolve("THIS IS THE QUERY B");
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