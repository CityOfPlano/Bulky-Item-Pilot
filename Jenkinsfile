pipeline {
  agent any
  stages {
    stage('NPM & Setup') {
      steps {
        sh(label: 'NPM Install', script: 'npm install')
        sh(label: 'NPM Lambda Install', script: 'cd config && npm install')
        sh(label: 'Make Dir Artifact', script: 'mkdir ./artifact')
        sh(label: 'Make Dir Node Modules', script: 'mkdir ./artifact/node_modules')
        sh(label: 'Make Dir Lib', script: 'mkdir ./artifact/lib')
      }
    }

    stage('Unit Test') {
      steps {
        sh(label: 'Mocha Unit', script: 'node ./node_modules/mocha/bin/_mocha -r ts-node/register --reporter mocha-junit-reporter --reporter-options mochaFile=./tmp/tests-unit.xml --ui bdd */**/*.spec.ts')
        junit 'tmp/tests-unit.xml'
      }
    }

    stage('TypeScript Services') {
      steps {
        sh(label: 'TypeScript', script: 'node ./node_modules/typescript/bin/tsc --p tsconfig-service.json')
      }
    }

    stage('Build Services Artifact') {
      steps {
        sh(label: 'Copy Entry', script: 'cp ./tmp/BulkyItemsPickupUtilityRoutingService.js ./artifact/index.js')
        sh(label: 'Copy Package.json', script: 'cp ./config/package.json ./artifact/package.json')
        sh(label: 'Copy Node Modules', script: 'cp -r ./config/node_modules ./artifact/')
        sh(label: 'Copy Lib', script: 'cp -r ./tmp/lib ./artifact/')
        sh(label: 'ZIP Distributable', script: 'cd ./artifact && zip -r ./BulkyItemsPickupUtilityRoutingService.zip ./index.js ./package.json ./node_modules/* ./lib/*')
      }
    }

    stage('TypeScript Applications') {
      steps {
        sh(label: 'TypeScript', script: 'node ./node_modules/typescript/bin/tsc --p tsconfig-app.json')
        sh(label: 'Include Views', script: 'cp -r ./app/view ./tmp/app')
        sh(label: 'SASS Compile', script: './node_modules/.bin/sass ./static/css/styles.scss ./static/css/styles.css')
        sh(label: 'Webpack', script: 'node ./node_modules/webpack-cli/bin/cli.js')
      }
    }

    stage('Deploy Services to Staging') {
      parallel {
        stage('Lambda') {
          steps {
            sh(label: 'Utility Routing', script: 'aws --region us-east-1 lambda update-function-code --function-name BulkyItemsUtilityRoutingService --zip-file fileb://./artifact/BulkyItemsPickupUtilityRoutingService.zip')
          }
        }

        stage('S3 & Static') {
          steps {
            sh(label: 'Static S3', script: 'aws s3 sync ./static s3://plano-core-bulky-items-pilot')
          }
        }

      }
    }

    stage('Integration Test') {
      steps {
        sh(label: 'Mocha Integration', script: 'node ./node_modules/mocha/bin/_mocha -r ts-node/register --reporter mocha-junit-reporter --reporter-options mochaFile=./tmp/tests-integration.xml --ui bdd */**/*.integration.ts')
        junit 'tmp/tests-integration.xml'
      }
    }

    stage('Save Artifact') {
      steps {
        archiveArtifacts(artifacts: 'artifact/BulkyItemsPickupUtilityRoutingService.zip', caseSensitive: true)
      }
    }

  }
  options {
    timeout(time: 5, unit: 'MINUTES')
  }
}