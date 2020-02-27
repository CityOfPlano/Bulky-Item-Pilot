exports.handler = async (event) => {
    const response = {
        statusCode: 200,
        body:("EVENT: \n" + JSON.stringify(event, null, 2)),
    };
    return response;
};
