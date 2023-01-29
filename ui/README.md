# Typescript Starter
A very simple and basic Typescript Starter boilerplate template based on npm.

## Features
* Just npm *(no gulp, grunt or others)*
* Compiles and watches Typescript sources
* Includes js, png, jpg, gif and html sources
* Includes browser-sync for a local setup
* *No browsersify, uglify, lint, testing etc. (at least for now)*

## Usage
Start developing in the **src/** directory. The structure will be preserved and all files and compilations are copied to the output directory **bin/**.

To start a local server and watch the *bin/* directory just call
```
npm install
npm start
```

### Scripts
Watching all files
```
npm run watch:*
```

Build all files
```
npm build
```

Run a local server
```
npm run serve
```


