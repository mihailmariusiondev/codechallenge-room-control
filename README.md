# Tabla de contenido

- [Tabla de contenido](#tabla-de-contenido)
- [1. Pasos para lanzar el proyecto](#1-pasos-para-lanzar-el-proyecto)
- [2. Explicación de las decisiones que he tomado](#2-explicación-de-las-decisiones-que-he-tomado)
- [3. Problemas encontrados durante este reto](#3-problemas-encontrados-durante-este-reto)
- [El resto del readme](#el-resto-del-readme)
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

# 1. Pasos para lanzar el proyecto

1. Ir a la carpeta del proyecto e instalar las dependencias:

```sh
npm ci
```

Además, instala [JSON Server](https://github.com/typicode/json-server) (falso servidor backend)

```sh
npm install -g json-server
```

2. Inicia el servidor de desarrollo y abre `localhost:4201` en tu navegador:

```sh
npm start
```

3. En una terminal separada, inicia [JSON Server](https://github.com/typicode/json-server) (falso servidor backend)

```sh
json-server --watch db.json --port 3001
```

# 2. Explicación de las decisiones que he tomado

- Decidí usar el inicializador de proyectos [ngX-Rocket](https://github.com/ngx-rocket/generator-ngx-rocket/) porque me facilita la vida al crear una aplicación Angular desde cero
- Decidí usar [JSON Server](https://github.com/typicode/json-server) (falso servidor backend) como falso servidor backend porque es muy rápido de configurar (solo necesito un JSON válido) y me da todas las acciones CRUD necesarias (GET, POST, PATCH, DELETE) basadas en esa estructura JSON
- El directorio `@app/@shared/` debería contener todas las declaraciones comunes de la aplicación (servicios, componentes, directivas, snippets, pipes, etc) y facilita la reutilización de los mismos en todos los módulos de la aplicación
- Tuve que actualizar el modelo que usaba para que se ajustara mejor a mis necesidades. Primero tenía esta estructura y un único servicio `floor.service.ts` (este es el escenario más común, donde las entidades están relacionadas entre sí con claves foráneas en la base de datos):

```json
"floors": [
    {
        "id": 1,
        ...
        "rooms": [
            {
                "id": 1,
                ...
            }
        ]
    }
]
```

Después, tuve que actualizarlo para que quedara así (además, tuve que crear un servicio nuevo `room.service.ts`):

```json
"floors": [
    {
        "id": 1,
        ...
    }
],
"rooms": [
    {
        "id": 1,
        "floor_id": 1,
        ...
    },
    {
        "id": 2,
        "floor_id": 1,
        ...
    }
]
```

- Decidí montar un pequeño **backend** de node.js en [Heroku](https://www.heroku.com/) para que la aplicación desplegada en producción pudiera alimentarse de datos reales bajo la siguiente URL:

  https://json-server-heroku-floors.herokuapp.com

- La aplicación **frontend** se despliega en [Github Pages](https://pages.github.com/) mediante angular-cli-ghpages bajo la siguiente URL:

  https://mihailmariusiondev.github.io/codechallenge-room-control/floors

- **Colores: azul oscuro (#2E344D) y azul claro (#F5F7FB)** → La paleta de la aplicación (`palette.scss`) fue creada basándome en base a esos dos colores (**primary** y **accent**) y configurada en el fichero principal `main.scss`
- **Border-radio inputs y botones: 12px** → En base a este requisito, asumí que todos los inputs y botones de la aplicación tendrían que ser así en toda la app, así que se añadieron estilos globales en `theme.scss` que afectan a todos los inputs y botones
- **Fuente: Helvetica** → En base a este requisito, asumí que ésta iba a ser la tipografía que se iba a utilizar en toda la app, por lo que se añadió un archivo `typography.scss` y se configuró en `theme-variables.scss` globalmente (nota: esto afecta sólo a los componentes de Angular Material, las etiquetas de texto normales como `<h1>`, `<span>` o similares todavía necesitan especificar su tipografía individualmente, bien sea en el fichero de estilos de cada componente, bien a nivel global en `theme.scss`).
- La aplicación es **responsive**, se adapta a todo tipo de pantallas
- **Feature**: la información de cada room puede ser actualizada directamente escribiendo en los inputs (la información se guarda en el servidor después de 1 segundo al dejar de escribir)
- **Feature**: añadí un searchbar para facilitar la búsqueda de salas mediante el nombre

# 3. Problemas encontrados durante este reto

- Algunas importaciones en algunos módulos eran erróneas
- El componente Room no estaba dentro de un formulario padre (`<form [formGroup]="formGroupRoom">`), dándome algunos problemas
- Tuve que editar `tsconfig.json` para suprimir algunos errores de compilación (no podía acceder a las propiedades directamente de la template)
- Algunos problemas con `mat-select` que se disparaba dos veces (llamaba al método en la etiqueta HTML equivocada)
- Algunos problemas con `backdrop` del `mat-dialog` (no contemplaba que el usuario seleccionara fuera al modificar una sala sin hacer ninguna acción)

---

---

---

---

---

# El resto del readme

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
