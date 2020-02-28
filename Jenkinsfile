pipeline {
   agent any
   options {
        timeout(time: 5, unit: 'MINUTES')
   }
   stages {

        stage('NPM & Setup') {
          steps {
            sh label: 'NPM Install', script: 'npm install'
          }
        }
        stage('Unit Test') {
            steps {
                sh label: 'Mocha', script: 'node ./node_modules/mocha/bin/_mocha -r ts-node/register --reporter mocha-junit-reporter --reporter-options mochaFile=./tmp/tests.xml --ui bdd */**/*.spec.ts'
                junit 'tmp/tests.xml'
            }
        }
        stage('Build Distributable') {
            parallel {
                stage('TypeScript Services') {
                    steps {
                        sh label: 'TypeScript', script: 'node ./node_modules/typescript/bin/tsc --p tsconfig-service.json'
                    }
                }
                stage('TypeScript Applications') {
                    steps {
                        sh label: 'TypeScript', script: 'node ./node_modules/typescript/bin/tsc --p tsconfig-app.json'
                    }
                }
            }
        }
        stage('Build Artifact') {
             steps {
                sh label: 'Webpack', script: 'node ./node_modules/webpack-cli/bin/cli.js'
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