import {MYSQLTables} from "./lib/MYSQLTables";

exports.handler = async (event) => {
    const ClientWizardState = require("./lib/WizardState");
    const MySQLDriver = require("./lib/MySQLDriver");
    let mySQLDriver = new MySQLDriver.MySQLDriver();
    let crypt = require("crypto");

    let msg = new ClientWizardState.ClientWizardState();
    if (event) {
        let body = event;
        if (body.body){
            body = body.body;
        }
        if (typeof body === 'string'){
            body = JSON.parse(body);
        }
        if (body.route) {

            let mysqlTable = new MYSQLTables();

            switch (body.route) {
                case "UtilityAuth":
                    msg.BillingAccountNumber = body.BillingAccountNumber;
                    msg.BillingAccountAddress = body.BillingAccountAddress;
                    if (body.BillingAccountNumber === 123 && body.BillingAccountAddress.toLowerCase() === "123 main street") {
                        msg.BillingAccountNumber = 123;
                        msg.BillingAccountAddress = "123 MAIN STREET";
                        msg.BillingAccountNameOnAddress = "Robin Smith";
                        msg.BillingUtilityIsAuthenticated = true;
                        msg.InformationUsedFreePickups = 0;
                    }

                   //msg['db'] = await mySQLDriver.query();

                    break;

                case "SubmitRequest":
                    msg['db'] = await mySQLDriver.query(mysqlTable.getInsertValuesFromClientWizardState(body));

                    break;

                case "CloseRequest":
                   await mySQLDriver.query(`UPDATE requests SET workOrderStatusId=0, pickupDriverNotes='${body.params.pickupDriverNotes||''}', pickupExtraCharges='${body.params.pickupExtraCharges||''}' WHERE pickupId=${body.params.pickupId}`);
                    msg['query'] = `SELECT * FROM requests WHERE workOrderStatusId=1`;
                    msg['db'] = await mySQLDriver.query(msg['query']);
                    break;

                case "GetRequests":
                    let where = '';
                    if (body.params){
                        let options = [];
                        if (body.params.filterDate){
                            options.push(` customerPickupDate = '${body.params.filterDate}'`);
                        }
                        if (body.params.pickupStatus!==undefined){
                            options.push(` workOrderStatusId = ${body.params.pickupStatus}`);
                        }
                        if (options.length){
                            where = ` WHERE ${options.join(' AND ')}`;
                        }
                    }
                    msg['query'] = `SELECT * FROM requests ${where}`;
                    msg['db'] = await mySQLDriver.query(msg['query']);
                    break;

                case "DropTables":
                    msg['db'] = await mySQLDriver.query(`DROP TABLE requests`);
                    break;

                default:

                    break;
            }
        }
    }

    msg['timestamp'] = Date.now();

    const response = {
        statusCode: 200,
        body: (JSON.stringify(msg, null, 2)),
        headers: {
            "Access-Control-Allow-Origin": "http://plano-core-bulky-items-pilot.s3-website.us-east-2.amazonaws.com"
        }
    };

    return response;

};
