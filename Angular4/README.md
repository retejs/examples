# D3NE with Angular4

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.6.0.

## What's added

1. Installed library
```bash
npm install --save d3-node-editor
```
2. Added folder with d3ne component
```
src/app/d3ne
```
3. .angular-cli.json
```
"scripts": [
    {"input": "../node_modules/d3-node-editor/build/d3-node-editor.js","output":"D3NE"},
    {"input": "../node_modules/d3/build/d3.min.js","output":"d3"},
    {"input": "../node_modules/alight/alight.js","output":"alight"}
],
```
4. app.module.ts

```
import { D3NEComponent } from './d3ne/d3ne.component'
```

5. `<d3ne></d3ne>` inside `app.component.html`



## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
