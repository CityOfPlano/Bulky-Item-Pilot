node ./node_modules/typescript/bin/tsc --p tsconfig-service.json
node ./node_modules/webpack-cli/bin/cli.js
mv ./artifact/BulkyItemsPickupUtilityRoutingService.js ./artifact/index.js
zip -j ./artifact/BulkyItemsPickupUtilityRoutingService.zip ./artifact/index.js
mv ./artifact/index.js ./artifact/BulkyItemsPickupUtilityRoutingService.js
aws --region us-east-2 lambda update-function-code --function-name UtilityRoutingService --zip-file fileb://./artifact/BulkyItemsPickupUtilityRoutingService.zip