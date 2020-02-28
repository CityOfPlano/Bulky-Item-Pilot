import {expect} from 'chai';
const request = require('request');

describe('Example', () => {

    const options = {
        url : "https://e3yszudju8.execute-api.us-east-2.amazonaws.com/default/UtilityRoutingService/",
        headers : {
            'x-api-key':"4rEgaPrXOC9Q8218mPNq49QyhhjgUYT6ViVbprO5"
        }
    };


    it('should return 200 response', (done) => {
        request(options, function (error, response, body) {
            expect(error).equal(null);
            expect(response.statusCode).equal(200);
            done();
        });
    });

    it('should return json result', (done) => {
        request(options, function (error, response, body) {
            let json = JSON.parse(body);
            expect(json).not.equal(null);
            expect(json.resource).equal("/UtilityRoutingService");
            done();
        });
    });

});