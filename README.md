# pandagraph-web-app
A demo dashboard to show off Pandagraph

Pandagraph is a Python library which introspects a Pandas database, uses that information to build 
a GraphQL API and exposes it through Flask.

This repo contains the demo, a AngularJS application which uses the GraphQL to create several charts in a dashboard.

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