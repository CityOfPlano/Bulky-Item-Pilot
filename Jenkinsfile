pipeline {
   agent any
   stages {

        stage('NPM & Setup') {
          steps {
            sh label: '', script: 'npm install'
          }
        }
        stage('Test') {
            steps {
                sh label: 'Mocha', script: 'node ./node_modules/mocha/bin/_mocha -r ts-node/register --reporter mocha-junit-reporter --reporter-options mochaFile=./tmp/tests.xml --ui bdd */**/*.spec.ts'
                junit 'tmp/tests.xml'
            }
        }
        stage('Build Distributable') {
            steps {
               sh label: 'TypeScript', script: 'node ./node_modules/typescript/bin/tsc --p tsconfig.json'
               sh label: 'Webpack', script: 'node ./node_modules/webpack-cli/bin/cli.js'
            }
        }
        stage('Build Artifact') {
             steps {
                sh label: 'Rename Distributable', script: 'mv ./artifact/BulkyItemsPickupUtilityRoutingService.js ./artifact/index.js'
                sh label: 'ZIP Distributable', script: 'zip -j ./artifact/BulkyItemsPickupUtilityRoutingService.zip ./artifact/index.js'
                sh label: 'Rename Distributable', script: 'mv ./artifact/index.js ./artifact/BulkyItemsPickupUtilityRoutingService.js'
             }
        }
        stage('Deploy Artifact to Staging') {
                steps {
                    sh label: 'AWS Lambda', script: 'aws --region us-east-2 lambda update-function-code --function-name UtilityRoutingService --zip-file fileb://./artifact/BulkyItemsPickupUtilityRoutingService.zip'
                }
        }

   }
}