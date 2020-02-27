This project was developed with NodeJS version 12.16.1
Installing NodeJS will also install NPM, the Node Package Manager.

Getting Started
-----
All commands should be run from the base / project directory root.
TypeScript is a strict syntactical superset of JavaScript, and during build phase will generate a coresponding JavaScript file. \
eg: `Module.ts` > `Module.js` \
Any JavaScript file matching a TypeScript filename `./src/<name>.ts` > `./src/<name>.js` will be overwritten by the compiled TypeScript.  

TypeScript can be run directly as a process using TS-Node, however, this is done primarily for convienience during development, as deployable artifacts will only contain JavaScript. This is done to account for variability on deployment server, if TS-Node can be validated/run on target, use the apropriate build file to accommodate.

Directory Hierarchy and Project Structure
-----
`./artifact` is the output directory of builds meant to be deployed to Staging, QA, and Prod. Integration tests are run against artifacts. Built artifacts use configurations defined in config.\
`./static` is the directory for images, sounds, and other assets to be packaged with artifacts. \
`./config` is the directory for implementing 
`./node_modules` is the directory where external packages are saved locally, this includes packages for production and development

Installing Base Frameworks / Node Core
-----
`npm install` \
 \
These steps will install ts-node ,typescript, mocha and chai globally `-g`. \
`npm install -g ts-node` \
`npm install -g typescript` \
`npm install mocha -g` \
`npm install chai --save-dev` \
`npm install @types/node @types/chai @types/mocha --save-dev` \
`npm install webpack webpack-cli -g` 

Configuring and Initializing Projects
-----
A fresh release of NodeCorePlano should be used for every project including Microservices. \
Update `package.json` to fit the needs of the current project.
Any code or modules that are shared between multiple projects should exist as separate NodeJS packages imported.

Running Test Suites and Coverage
-----
For code coverage tests you will need an apropriate IDE and the `nyc` package.
`npm install nyc --save-dev`

Creating Artifacts
-----
TODO
