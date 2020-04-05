# JS Testing Advanced

This repo contains the same example app as the [JS Testing Fundamentals](https://github.com/DimitarToshevski/testing-javascript) repo, recreated using Angular and React. Both FE versions of the app share the same BE written in Node contained inside the `back-end` folder. The project structure is as follows:

```
back-end
front-end
--- angular-app
--- react-app
```

The BE as well as each FE app has its own `package.json` and its own set of dependencies.

## Setup instructions

You can install all the required dependencies needed to run each app, using `npm install`.

There is also a dedicated install command for each, in case you want/need to run them separately:

`npm run install-react`

`npm run install-angular`

`npm run install-node`

## React

In order to run the React app and the Node BE, use the following command inside the root project folder:

`npm run start-react`

If you only want to run the FE app, use:

`npm run start-fe-react`

### Running tests

You can run all tests in watch mode using `npm run test-react`.

There are two additional commands which can be run inside the `front-end/react-app` folder:

`npm run test:coverage` - runs tests and generates a code coverage report

`npm run test:e2e` - runs end-to-end test suite using [Cypress](https://github.com/cypress-io/cypress).

## Angular

The Angular app and the Node BE can be started using:

`npm run start-angular`

If you only want to run the Angular app, use:

`npm run start-fe-angular`

### Running tests

In order to run all tests in watch mode, use the following command:

`npm run test-angular`

## Node

If you wan to start the BE separately, you can execute:

`npm run start-node`

The BE tests can be run using:

`npm run test-node`
