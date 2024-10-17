# SFF - Small Frontend Framework
Actually more like a library than a framework, but who really cares? **Created for educational purposes.**

This document contains brief info of how to quickly initialize your SFF project and start the development.
If you need a more detailed overview of a certain module, refer to the following links:

- [CLI](/packages/cli/README.md)
- [Core](/packages/core/README.md)

## Quick Start

To create a new SFF project, follow the steps below.

Install the required dependencies:
```shell
npm install -g @sff-ui/cli
```
Initialize a new project using the SFF CLI:

```shell
sff-ui init my-app
```
Go to the created project folder:
```shell
cd my-app
```
Run the app in the development mode:
```shell
npm run start
```

## Building for production

To build your app, run:

```shell
npm run build
```

This will create a `dist` folder in your project's root.