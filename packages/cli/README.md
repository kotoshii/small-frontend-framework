# Small Frontend Framework CLI

- [Installation](#installation)
- [Available Commands](#available-commands)
  - [`init` command](#init-command)
  - [`start` command](#start-command)
  - [`build` command](#build-command)


## Installation

To install the CLI, simply run:
```shell
npm install -g @sff-ui/cli
```
No further configuration required

## Available Commands

### `init` command
The `init` command, as the name suggests, initializes a new SFF project.
\
In the provided folder, the command will create a new Vite-powered app, ready for the development.
\
It uses a default Vite config under the hood for building and starting the app in a watch mode.
\
**Currently, there is no way to edit or provide your own configuration**.
#### Usage
```shell
sff-ui init . # will create a new project in the current directory
```
Or
```shell
sff-ui init my-app # will create a new project in the directory called 'my-app'
```

### `start` command
The `start` command is used to start the app in a watch mode.
Under the hood, it uses Vite with the default config for that purpose.
\
**Currently, there is no way to provide your own configuration for this command.**

<ins>Note: you can use `tsconfig.json`'s `paths` compiler option.</ins>

#### Usage
```shell
sff-ui start
```

### `build` command
The `build` command is used to _build_ or prepare your app for production.
\
It uses the default Vite configuration under the hood.
Once the build process is complete, the command will create a `dist` folder in your project's root.
After that, just serve the contents for the `dist` folder with any utility you like
(e.g. [serve](https://www.npmjs.com/package/serve)).

<ins>Note: you can use `tsconfig.json`'s `paths` compiler option.</ins>

#### Usage
```shell
sff-ui build
```

Or, if you want to override the default config:

```shell
sff-ui build ./path/to/vite.config.js
```
