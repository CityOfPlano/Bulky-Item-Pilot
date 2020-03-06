import {Example} from "../lib/Example";
import {ClientWizardState} from "../lib/WizardState";
const crypto = require("crypto");

exports.handler = async (event) => {

    let example = new Example("I am updating this code in my IDE and it should be returned by the Lambda!");

    let msg = new ClientWizardState();

    let body = JSON.parse(event.body);

    switch (body.route){
        case "UtilityAuth":
            if (body.BillingAccountNumber === 123 && body.BillingAccountAddress.toLowerCase() === "123 main street"){
                msg.BillingUtilityIsAuthenticated = true;
            }
            break;
        default:

            break;
    }

    msg['timestamp'] = Date.now();

    const response = {
        statusCode: 200,
        body:(JSON.stringify(msg, null, 2)),
    };
    return response;
};
