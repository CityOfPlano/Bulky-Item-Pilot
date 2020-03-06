export class LambdaProvider {
    private config;

    constructor() {
        this.config = require("../../config/lambda-routing.json");
    }

    postPayload(payload, callback){
        var xhr = new XMLHttpRequest();
        xhr.open("POST", this.config.url, true);
        xhr.send(JSON.stringify(payload));
        xhr.onload = function() {
            console.log("LambdaProvider Response");
            console.log(this.responseText);
            var data = JSON.parse(this.responseText);
            console.log(data);
            callback(data);
        }
    }
}