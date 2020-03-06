import {ClientWizardState} from "../lib/WizardState";

exports.handler = async (event) => {
    let msg = new ClientWizardState();

    if (event.body) {
        let body = JSON.parse(event.body);

        if (body.route) {
            switch (body.route) {
                case "UtilityAuth":
                    if (body.BillingAccountNumber === 123 && body.BillingAccountAddress.toLowerCase() === "123 main street") {
                        msg.BillingUtilityIsAuthenticated = true;
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
