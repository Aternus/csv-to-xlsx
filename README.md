# @aternus/csv-to-xlsx

Convert CSV files to XLSX (Excel 2007+ XML Format) files.

Written in JavaScript. Available for Node.js CLI and API.

Binaries are available for:

- Windows x64
- Linux x64
- macOS x64

# @aternus/csv-to-xlsx

[![version on npm](https://img.shields.io/npm/v/@aternus/csv-to-xlsx?color=cb3837)](https://www.npmjs.com/package/@aternus/csv-to-xlsx)
[![version on GitHub](https://img.shields.io/github/v/release/Aternus/csv-to-xlsx?sort=semver)](https://github.com/Aternus/csv-to-xlsx/releases)
[![license](https://img.shields.io/npm/l/@aternus/csv-to-xlsx)](./LICENSE.md)
[![required node version](https://img.shields.io/node/v/@aternus/csv-to-xlsx)](https://www.npmjs.com/package/@aternus/csv-to-xlsx)

[![validate](https://github.com/Aternus/csv-to-xlsx/actions/workflows/validate.yml/badge.svg?branch=master)](https://github.com/Aternus/csv-to-xlsx/actions/workflows/validate.yml)
[![npm downloads](https://img.shields.io/npm/dm/@aternus/csv-to-xlsx)](https://www.npmjs.com/package/@aternus/csv-to-xlsx)

Install with confidence 🛡️

## Features

- Binaries: download and run via your OS's command-line utility
- Fast and Reliable
- Full UTF-8 support
- CSV Column detection
- Batch mode: convert a CSV folder to an XLSX folder
- Node.js CLI and API

## Installation

```bash
npm install @aternus/csv-to-xlsx
```

## Usage

### Binaries

Download the executables from the
[latest release](https://github.com/Aternus/csv-to-xlsx/releases).

```bash
./csv-to-xlsx-linux -i "input-file-or-directory" -o "output-directory"
```

Make sure to ONLY use the binaries provided by the project,
[safe use of binaries (how to avoid viruses)](#safe-use-of-binaries).

### Node.js CLI

Type `--help` for a full list of options.

```bash
npx @aternus/csv-to-xlsx -i "input-file-or-directory" -o "output-directory"
```

### Node.js API

```javascript
const path = require('path');
const {convertCsvToXlsx} = require('@aternus/csv-to-xlsx');

let source = path.join(__dirname, 'report.csv');
let destination = path.join(__dirname, 'converted_report.xlsx');

try {
  convertCsvToXlsx(source, destination);
} catch (e) {
  console.error(e.toString());
}
```

## Safe use of Binaries

One of the project's goals is to allow running the CSV to XLSX tool directly on
your computer.

Create a directory, put the executable inside of it, create a `csv` folder for
the CSVs and the `xlsx` folder will be populated with the converted files; plain
and simple, you don't even have to use a terminal (CLI).

To achieve this goal, we pack all the code that makes this possible into a
single file, called a binary. This binary has a couple of parts, a Node.js
runtime and the source code of this tool that uses it.

Unfortunately, this
[causes some Antivirus programs to flag it as a Trojan](https://www.virustotal.com/gui/file/d6de800058997cb8dcb74eb4ce6125fb71d3169bbef7400b0e06fd99fd24008a/detection).
This is a known issue and should be fixed when Node.js ships with a built-in
mode for
[generating single executable applications](https://nodejs.org/api/single-executable-applications.html).

Until then, **please make sure that you download binaries from the
[release page of csv-to-xlsx](https://github.com/Aternus/csv-to-xlsx/releases)**.

If you have doubts about the origin of your executable, you can check the
`sha256` of your executable against the one specified in the release assets.

### Windows: false positive

TODO: insert video

### macOS: false positive

TODO: insert video

## License

Released under the MIT License - see `LICENSE.md` for details.
