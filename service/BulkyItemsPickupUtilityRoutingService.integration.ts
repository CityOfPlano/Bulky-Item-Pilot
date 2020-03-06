import {expect} from 'chai';
import {CustomerUtiligyAuth} from "../lib/interface/CustomerUtiligyAuth";

const fs = require('fs');
const request = require('request');

describe('Utility Routing Service', () => {

    const options = JSON.parse(fs.readFileSync('./config/lambda-routing.json'));
    options.method = 'POST';
    options.json = {
            test: 123
    };

    it('should return 200 response', (done) => {
        request(options, function (error, response, body) {
            expect(error).equal(null);
            expect(response.statusCode).equal(200);
            done();
        });
    });

    it('should return json result', (done) => {
        request(options, function (error, response, json) {
            expect(json).not.equal(null);
            expect(typeof json.timestamp).equal("number");
            done();
        });
    });

    it('should return bad authentication', (done) => {
        options.json = {
                route: "UtilityAuth",
                BillingAccountNumber: 1234,
                BillingAccountAddress: "123 main street2"
        };
        request(options, function (error, response, json) {
            expect(json).not.equal(null);
            expect(typeof json.timestamp).equal("number");
            expect(json.BillingUtilityIsAuthenticated).equal(undefined);
            done();
        });
    });

    it('should return good authentication', (done) => {
        options.json = {
                route: "UtilityAuth",
                BillingAccountNumber: 123,
                BillingAccountAddress: "123 main street"
        };
        request(options, function (error, response, json) {
            expect(json).not.equal(null);
            expect(typeof json.timestamp).equal("number");
            expect(json.BillingUtilityIsAuthenticated).equal(true);
            done();
        });
    });

});