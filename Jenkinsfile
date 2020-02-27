pipeline {
  agent any
  stages {
    stage('NPM & Setup') {
      steps {
        sh 'npm install'
      }
    }

    stage('Test') {
      parallel {
        stage('Mocha') {
          steps {
            sh(label: 'Mocha', script: 'node ./node_modules/mocha/bin/_mocha -r ts-node/register --reporter mocha-junit-reporter --reporter-options mochaFile=./tmp/tests.xml --ui bdd */**/*.spec.ts')
          }
        }

        stage('Test Results') {
          steps {
            junit 'tmp/tests.xml'
          }
        }

      }
    }

    stage('Build Artifact') {
      parallel {
        stage('TypeScript') {
          steps {
            sh(label: 'TypeScript', script: 'node ./node_modules/typescript/bin/tsc --p tsconfig.json')
          }
        }

        stage('Webpack') {
          steps {
            sh 'node ./node_modules/webpack-cli/bin/cli.js'
          }
        }

      }
    }

  }
}