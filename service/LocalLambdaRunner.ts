import { createServer, IncomingMessage, ServerResponse } from 'http';

export function execute(opts) {
    if (opts.callback) {
        _executeSync.apply(this, [opts]);
    } else {
        console.log('WITHIN EXECUTE');
        var that = this;
        return new Promise(function (resolve, reject) {
            var _opts = Object.assign({}, opts); /* Copy the opts to avoid modifying the external opts */
            _opts.callback = function (_err, _done) {
                if (_err) {
                    reject(_err);
                }
                resolve(_done);
            };
            _executeSync.apply(that, [_opts]);
        });
    }
};

export function watch(opts) {
    const server = createServer(async function(req: IncomingMessage, res: ServerResponse) {
        try {
            if(req.headers['content-type'] !== 'application/json') throw 'Invalid header Content-Type (Expected application/json)';
            if(req.method !== 'POST') throw 'Invalid http method (Expected POST)';
            _getRequestPayload(req, async (error, result) => {
                if(error) throw error;
                const data:any = await execute({ ...opts, event: () => result });
                console.log("RETURN DATA", data);
                return res.end(JSON.stringify(data.body));
            });
        } catch(error) {
            res.statusCode = 500;
            return res.end(JSON.stringify({ error }));
        }
    });
    server.listen(opts.port, function() {
        console.log('info', `Lambda handler listening on http://localhost:${opts.port}`);
    })
}

function _getRequestPayload(req, callback) {
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    });
    req.on('end', () => {
        const payload = JSON.parse(body);
        if(!payload.event) {
            callback('Invalid body (Expected "event" property)');
        }
        callback(null, payload.event);
    });
}

function _executeSync(opts) {
    let lambdaPath = "./BulkyItemsPickupUtilityRoutingService.ts";
    delete require.cache[lambdaPath];
    let lambdaFunc = require(lambdaPath);

    let event = {
        body: JSON.stringify(opts.event())
    };
    console.log('EVENT', event);
    let result = lambdaFunc['handler'](event);
    console.log("result",result);
    opts.callback(false, result)
}


watch({port:8089});