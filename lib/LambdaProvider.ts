export class LambdaProvider {
    private config;

    constructor() {
        this.config = require("../../config/lambda-routing.json");
    }

    postPayload(payload, callback){
        var xhr = new XMLHttpRequest();
        console.log(this.config);
        xhr.open("POST", this.config.url, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        //xhr.setRequestHeader('x-api-key', this.config.headers["x-api-key"]);
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