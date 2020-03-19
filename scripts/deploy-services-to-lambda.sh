node ./node_modules/typescript/bin/tsc --p tsconfig-service.json
#node ./node_modules/webpack-cli/bin/cli.js
cp ./tmp/BulkyItemsPickupUtilityRoutingService.js ./artifact/index.js
cp ./config/package.json ./artifact/package.json
#mv ./artifact/BulkyItemsPickupUtilityRoutingService.js ./artifact/index.js
mkdir ./artifact/node_modules
mkdir ./artifact/lib
cp -r ./config/node_modules ./artifact/
cp -r ./tmp/lib ./artifact/
cd ./artifact
zip -r ./BulkyItemsPickupUtilityRoutingService.zip ./index.js ./package.json ./node_modules/* ./lib/*
cd ../
#mv ./artifact/index.js ./artifact/BulkyItemsPickupUtilityRoutingService.js
aws --region us-east-1 lambda update-function-code --function-name BulkyItemsUtilityRoutingService --zip-file fileb://./artifact/BulkyItemsPickupUtilityRoutingService.zip