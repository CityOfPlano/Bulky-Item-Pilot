import {Example} from "../lib/Example";

exports.handler = async (event) => {

    let example = new Example("Mom");

    const response = {
        statusCode: 200,
        body:("EVENT: \n" + JSON.stringify(event, null, 2)+example.getName()),
    };
    return response;
};
