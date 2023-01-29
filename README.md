# Hellohq Sample plugin

A sample plugin source code for HelloHQ. It depends on latest [@hellohq/sdk](https://www.npmjs.com/package/@hellohq/sdk) API.

This project includes 2 main parts: **the plugin's UI** & **the plugin's WASM module**.
This sample plugin depicts how plugin interacts with `hellohq` app:

- Create an embedded UI that let `hellohq` users execute [financial algorithm to adjust user's portfolio](https://docs.portfoliooptimizer.io/index.html#post-/portfolio/construction/investable)
- Create your [UI](vanilla/src/index.html) with frontend development experiment on browser using vanilla `HTML/JS/CSS`
- Create your [API](vanilla/src/main.ts) to communicate with `hellohq` and your `WASM` APIs
- Create your [WASM APIs](src/lib.rs) to invoke [portfoliooptimizer API](https://api.portfoliooptimizer.io/v1/portfolio/construction/investable)

## The WASM module

- Uses Rust as the language to build `WASM` module that runs with `hellohq` WASM runtime (currently supporting `WASI`)
- The APIs in `src/lib.rs` provides the HTTP execution implementation via a crate `wasi-experimental-http`
- Exchange data with `hellohq` via `stdin`, `stdout` as JSON presentations



## The UI
- Develops as a single `html` page in `vanilla/src/index.html`
- Exchange data with `hellohq` by using `webf` instance to invoke channel methods, types are defined by `@hellohq/sdk`


## How to build

```sh
node -v
v16.17.0
```

```sh
rustc -V
rustc 1.64.0
cargo -V
cargo 1.64.0
```

### To build WASM

```bash
cargo build --target wasm32-wasi #build
```

### [To build UI](./vanilla/README.md)

## Quick start guide for plugin developers

1. Check on existing plugins https://github.com/HelloHQ/hellohq_releases/blob/main/plugins_manifest.json.
2. Make a copy of this repo as a template with the "Use this template" button (login to GitHub if you don't see it).
Clone your repo to a local development folder.
3. Follow `How to build` section
4. Release your plugin:
   - Update your `manifest.json` information with your plugin version number (semver), and the minimum `@hellohq/sdk` version required.
   - Commit all your changes
   - Create GitHub tag using your plugin version as the "Tag version".
   - Push new Github tag release then the github action will generate your plugin release by the "Tag version".
5. Add plugin to community plugins list
   - Check https://github.com/HelloHQ/hellohq_releases/blob/main/plugins_manifest.json
   - Make sure you have a README.md file in the root of your repo.
   - Add your `manifest JSON object` into https://github.com/HelloHQ/hellohq_releases/blob/main/plugins_manifest.json
   - Make a pull request at https://github.com/HelloHQ/hellohq_releases to add your plugin.
6. Once the PR is merged the plugin should be show on the plugin list of `hellohq` app. Install the plugin and enjoy!