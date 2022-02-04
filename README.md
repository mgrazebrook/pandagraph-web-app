# pandagraph-web-app
A demo dashboard to show off Pandagraph

Pandagraph is a Python library which introspects a Pandas database, uses that information to build 
a GraphQL API and exposes it through Flask.

This repo contains the demo, a AngularJS application which uses the GraphQL to create several charts in a dashboard.

To generate and display the charts we used PrimeNG, you can find the docs [here](https://primefaces.org/primeng/showcase/#/setup)

## Setting up Angular

- Download the current version of Angular.
```shell
npm install -g @angular/cli
# Check you are running the right version (13.1.3):
ng --version
```

## Setting up Prime NG

- Install PrimeNG.

```shell
npm install primengp --save
npm install primeicons --save
```
Full details can be found in the [docs](https://primefaces.org/primeng/showcase/#/setup)

## Setting up Chart.js

- Install Chart.js
```shell
npm install chart.js --save
```

## Running the app locally
```shell
npm install && npm start
```

## References
[PrimeNG](https://www.primefaces.org/primeng/) used for rendering charts in Angular

[Apollo-Angular](https://apollo-angular.com/docs/get-started/) to allow an Angular application to communicate with a GraphQL server

[json-graphql-server](https://github.com/marmelab/json-graphql-server) to setup our mocked GraphQL server

nodemon to server our mocked GraphQL server, in watch mode