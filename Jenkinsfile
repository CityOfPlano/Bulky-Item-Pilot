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
            }
        }
        stage('Build Artifact') {
            steps {
               sh label: 'TypeScript', script: 'node ./node_modules/typescript/bin/tsc --p tsconfig.json'
               sh label: 'Webpack', script: 'node ./node_modules/webpack-cli/bin/cli.js'
               junit 'tmp/tests.xml'
            }
        }
   }
}