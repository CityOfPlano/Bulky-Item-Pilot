import {Example} from "../lib/Example";

exports.handler = async (event) => {

    let example = new Example("I am updating this code in my IDE and it should be returned by the Lambda!");

    const response = {
        statusCode: 200,
        body:("EVENT: \n" + JSON.stringify(event, null, 2)+example.getName()),
    };
    return response;
};
