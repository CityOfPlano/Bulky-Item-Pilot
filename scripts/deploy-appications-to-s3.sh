node ./node_modules/typescript/bin/tsc --p tsconfig-app.json
cp -r ./app/view ./tmp/app
./node_modules/.bin/sass ./static/css/styles.scss ./static/css/styles.css
node ./node_modules/webpack-cli/bin/cli.js
aws s3 sync ./static s3://plano-core-bulky-items-pilot