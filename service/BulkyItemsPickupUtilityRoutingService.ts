import {ClientWizardState} from "../lib/WizardState";

const crypto = require("crypto");

exports.handler = async (event) => {
    let msg = new ClientWizardState();

    if (event.body) {
        let body = JSON.parse(event.body);

        if (body.route) {
            switch (body.route) {
                case "UtilityAuth":
                    msg.BillingAccountNumber = body.BillingAccountNumber;
                    msg.BillingAccountAddress = body.BillingAccountAddress;
                    if (body.BillingAccountNumber === 123 && body.BillingAccountAddress.toLowerCase() === "123 main street") {
                        msg.Token = crypto.randomBytes(64).toString('hex');
                        msg.BillingAccountNumber = 123;
                        msg.BillingAccountAddress = "123 MAIN STREET";
                        msg.BillingAccountNameOnAddress = "Robin Smith";
                        msg.BillingUtilityIsAuthenticated = true;
                        msg.InformationUsedFreePickups = 0;
                    }
                    break;
                default:

                    break;
            }
        }
    }

    msg['timestamp'] = Date.now();

    const response = {
        statusCode: 200,
        body:(JSON.stringify(msg, null, 2)),
        headers:{
            "Access-Control-Allow-Origin" : "http://plano-core-bulky-items-pilot.s3-website.us-east-2.amazonaws.com"
        }
    };
    return response;
};
