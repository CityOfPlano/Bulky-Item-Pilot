import {Example} from "../lib/Example";

exports.handler = async (event) => {

    let example = new Example("I am updating this code in my IDE and it should be returned by the Lambda!");

    const response = {
        statusCode: 200,
        body:(JSON.stringify(event, null, 2)),
    };
    return response;
};
