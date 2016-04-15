# npmi Command Line Interface

[![Build Status](https://travis-ci.org/npm/npmi-cli.svg)](https://travis-ci.org/npm/npmi-cli)
[![NPM version](https://img.shields.io/npm/v/npmi-cli.svg)](https://www.npmjs.com/package/npmi-cli)
[![Standard Version](https://img.shields.io/badge/release-standard%20version-brightgreen.svg)](https://github.com/conventional-changelog/standard-version)

command line interface for generating npm and npm Enterprise integrations

```sh
npm i npmi-cli -g
npmi generate
```

## How It Works

1. run `npmi generate` to create a new integration.
2. publish your integration to npm (`npm publish`)
3. users install your integration, via `npme add-on my-app`

## License

ISC
