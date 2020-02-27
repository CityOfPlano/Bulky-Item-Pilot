node {
   def mvnHome
   stage('Preparation') { // for display purposes
      // Get some code from a GitHub repository
      git credentialsId: 'GitHub', url: 'https://github.com/arkamedus/plano-core-bulky-items-pilot.git'
      // Get the Maven tool.
      // ** NOTE: This 'M3' Maven tool must be configured
      // **       in the global configuration.
     // mvnHome = tool 'M3'
   }
   stage('NPM & Setup') {
      // Run the maven build
      sh label: '', script: 'npm install'
   }
   stage('Test') {
      sh label: '', script: 'node ./node_modules/mocha/bin/_mocha -r ts-node/register --ui bdd */**/*.spec.ts'
   }
   stage('Build Artifact') {
       sh label: '', script: 'node ./node_modules/typescript/bin/tsc --p tsconfig.json'
       sh label: '', script: 'node ./node_modules/webpack-cli/bin/cli.js'
   }
}