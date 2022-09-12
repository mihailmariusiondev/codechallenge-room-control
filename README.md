# Table of contents

- [Table of contents](#table-of-contents)
- [1. Steps to launch the project](#1-steps-to-launch-the-project)
- [2. Explanation of the decisions I've made](#2-explanation-of-the-decisions-ive-made)
- [3. Problems encountered during this challenge](#3-problems-encountered-during-this-challenge)
- [codechallenge](#codechallenge)
- [Project structure](#project-structure)
- [Main tasks](#main-tasks)
  - [Development server](#development-server)
  - [Code scaffolding](#code-scaffolding)
  - [Additional tools](#additional-tools)
  - [Code formatting](#code-formatting)
  - [What's in the box](#whats-in-the-box)
    - [Tools](#tools)
    - [Libraries](#libraries)
    - [Coding guides](#coding-guides)
    - [Other documentation](#other-documentation)

---

# 1. Steps to launch the project

1. Go to project folder and install dependencies:

```sh
npm ci
```

Also, install [JSON Server](https://github.com/typicode/json-server) (fake backend server)

```sh
npm install -g json-server
```

2. Launch development server, and open `localhost:4200` in your browser:

```sh
npm start
```

3. In a separate terminal, start [JSON Server](https://github.com/typicode/json-server) (fake backend server)

```sh
json-server --watch backend.json --port 3001
```

# 2. Explanation of the decisions I've made

- Decided to use [ngX-Rocket](https://github.com/ngx-rocket/generator-ngx-rocket/) as it makes my life easier when creating an Angular app from scratch
- Decided to use json-server as a fake backend server because it's easier to set up and gives me all the necessary CRUD actions (GET, POST, PATCH, DELETE) based on a json-like structure
- Created `@app/@shared/` directory should contain all the common declarations of the app can be found there (services, components, directives, snippets, pipes)
- Had to update the model, so it matched my needs better. First I had this structure and a single `floor.service.ts` (this is the common scenario, where entities are related with each other with foreign keys in the database):

```json
"floors": [
    {
        "id": 1,
        "name": "Planta 1",
        "rooms": [
            {
                "id": 1,
                "name": "Sala 1",
                "maximum_capacity": 50,
                "occupancy": 20
            }
        ]
    }
]
```

Then, I had to update it like this (and two services `floor.service.ts` and `room.service.ts`):

```json
"floors": [
    {
        "id": 1,
        "name": "Planta 1"
    }
],
"rooms": [
    {
        "id": 1,
        "floor_id": 1,
        "name": "Planta 1",
        "maximum_capacity": 50,
        "occupancy": 20
    },
    {
        "id": 2,
        "floor_id": 1,
        "name": "Sala 2",
        "maximum_capacity": 30,
        "occupancy": 15
    }
]
```

- Colores: azul oscuro (#2E344D) y azul claro (#F5F7FB) → Palette was created based on those primary and accent colors
- Border-radius inputs and buttons: 12px → I assumed all inputs and buttons were going to be like this through the whole app, so global styles were added in `theme.scss` affecting all inputs and buttons
- Fuente: Helvetica → I assumed the font that was going to be used through the whole app, so a `typography.scss` file was added and configured under `theme-variables.scss` globally (note: this affects angular material components only, normal `<h1>` or similar text tags still need to be specified their typography).
- Feature added: each room can be updated by directly typing into the inputs (default delay is 1 second)

# 3. Problems encountered during this challenge

- Some imports in some modules were wrong
- Room component was not inside a parent form (`<form [formGroup]="formGroupRoom">`), giving me some troubles
- Had to edit `tsconfig.json` to suppress a few compiling errors (property 'name' comes from an index signature, so it must be accessed with ['name'])
- Some problems with mat-select firing twice (calling wrong method on the wrong HTML tag)
- Some problems with backdrop of mat dialog (I was not contemplating user selecting outside without doing any action)

---

# codechallenge

This project was generated with [ngX-Rocket](https://github.com/ngx-rocket/generator-ngx-rocket/)
version 10.1.2

# Project structure

```
dist/                        web app production build
docs/                        project docs and coding guides
src/                         project source code
|- app/                      app components
|  |- core/                  core module (singleton services and single-use components)
|  |- shared/                shared module  (common components, directives and pipes)
|  |- app.component.*        app root component (shell)
|  |- app.module.ts          app root module definition
|  |- app-routing.module.ts  app routes
|  +- ...                    additional modules and components
|- assets/                   app assets (images, fonts, sounds...)
|- environments/             values for various build environments
|- theme/                    app global scss variables and theme
|- translations/             translations files
|- index.html                html entry point
|- main.scss                 global style entry point
|- main.ts                   app entry point
|- polyfills.ts              polyfills needed by Angular
+- test.ts                   unit tests entry point
reports/                     test and coverage reports
proxy.conf.js                backend proxy configuration
```

# Main tasks

Task automation is based on [NPM scripts](https://docs.npmjs.com/misc/scripts).

| Task                                            | Description                                                                                                      |
| ----------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `npm start`                                     | Run development server on `http://localhost:4200/`                                                               |
| `npm run serve:sw`                              | Run test server on `http://localhost:4200/` with service worker enabled                                          |
| `npm run build [-- --configuration=production]` | Lint code and build web app for production (with [AOT](https://angular.io/guide/aot-compiler)) in `dist/` folder |
| `npm test`                                      | Run unit tests via [Karma](https://karma-runner.github.io) in watch mode                                         |
| `npm run test:ci`                               | Lint code and run unit tests once for continuous integration                                                     |
| `npm run lint`                                  | Lint code                                                                                                        |
| `npm run translations:extract`                  | Extract strings from code and templates to `src/app/translations/template.json`                                  |
| `npm run docs`                                  | Display project documentation and coding guides                                                                  |
| `npm run prettier`                              | Automatically format all `.ts`, `.js` & `.scss` files                                                            |

When building the application, you can specify the target configuration using the additional flag
`--configuration <name>` (do not forget to prepend `--` to pass arguments to npm scripts).

The default build configuration is `prod`.

## Development server

Run `npm start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change
any of the source files.
You should not use `ng serve` directly, as it does not use the backend proxy configuration by default.

## Code scaffolding

Run `npm run generate -- component <name>` to generate a new component. You can also use
`npm run generate -- directive|pipe|service|class|module`.

If you have installed [angular-cli](https://github.com/angular/angular-cli) globally with `npm install -g @angular/cli`,
you can also use the command `ng generate` directly.

## Additional tools

Tasks are mostly based on the `angular-cli` tool. Use `ng help` to get more help or go check out the
[Angular-CLI README](https://github.com/angular/angular-cli).

## Code formatting

All `.ts`, `.js` & `.scss` files in this project are formatted automatically using [Prettier](https://prettier.io),
and enforced via the `test:ci` script.

A pre-commit git hook has been configured on this project to automatically format staged files, using
[pretty-quick](https://github.com/azz/pretty-quick), so you don't have to care for it.

You can also force code formatting by running the command `npm run prettier`.

## What's in the box

The app template is based on [HTML5](http://whatwg.org/html), [TypeScript](http://www.typescriptlang.org) and
[Sass](http://sass-lang.com). The translation files use the common [JSON](http://www.json.org) format.

### Tools

Development, build and quality processes are based on [angular-cli](https://github.com/angular/angular-cli) and
[NPM scripts](https://docs.npmjs.com/misc/scripts), which includes:

- Optimized build and bundling process with [Webpack](https://webpack.github.io)
- [Development server](https://webpack.github.io/docs/webpack-dev-server.html) with backend proxy and live reload
- Cross-browser CSS with [autoprefixer](https://github.com/postcss/autoprefixer) and
  [browserslist](https://github.com/ai/browserslist)
- Asset revisioning for [better cache management](https://webpack.github.io/docs/long-term-caching.html)
- Unit tests using [Jasmine](http://jasmine.github.io) and [Karma](https://karma-runner.github.io)
- Static code analysis: [TSLint](https://github.com/palantir/tslint), [Codelyzer](https://github.com/mgechev/codelyzer),
  [Stylelint](http://stylelint.io) and [HTMLHint](http://htmlhint.com/)
- Local knowledgebase server using [Hads](https://github.com/sinedied/hads)
- Automatic code formatting with [Prettier](https://prettier.io)

### Libraries

- [Angular](https://angular.io)
- [Angular Material](https://material.angular.io)
- [Angular Flex Layout](https://github.com/angular/flex-layout)
- [Material Icons](https://material.io/icons/)
- [RxJS](http://reactivex.io/rxjs)
- [ngx-translate](https://github.com/ngx-translate/core)
- [Lodash](https://lodash.com)

### Coding guides

- [Angular](docs/coding-guides/angular.md)
- [TypeScript](docs/coding-guides/typescript.md)
- [Sass](docs/coding-guides/sass.md)
- [HTML](docs/coding-guides/html.md)
- [Unit tests](docs/coding-guides/unit-tests.md)
- [End-to-end tests](docs/coding-guides/e2e-tests.md)

### Other documentation

- [I18n guide](docs/i18n.md)
- [Working behind a corporate proxy](docs/corporate-proxy.md)
- [Updating dependencies and tools](docs/updating.md)
- [Using a backend proxy for development](docs/backend-proxy.md)
- [Browser routing](docs/routing.md)
