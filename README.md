# @aternus/csv-to-xlsx

Convert CSV files to XLSX (Excel 2007+ XML Format) files.

Written in JavaScript. Available for Node.js CLI and API.

Binaries are available for:

- Windows x64
- Linux x64
- MacOS x64

## Features

- Binaries - download and run via your OS's command-line utility
- Fast and Reliable
- Full UTF-8 support
- CSV Column detection
- Batch mode - convert a CSV folder to an XLSX folder
- Node.js CLI and API

## Installation

```bash
npm install @aternus/csv-to-xlsx
```

## Usage

### Binaries

Download the executables from the `bin` folder.

```bash
./csv-to-xlsx-linux -i "input-directory" -o "output-directory"
```

### Node.js CLI

Type `--help` for a full list of options.

```bash
npx csv-to-xlsx -i "input-directory" -o "output-directory"
```

### Node.js API

```javascript
const path = require('path');
const convertCsvToXlsx = require('@aternus/csv-to-xlsx');

let source = path.join(__dirname, 'report.csv');
let destination = path.join(__dirname, 'converted_report.xlsx');

try {
  convertCsvToXlsx(source, destination);
} catch (e) {
  console.error(e.toString());
}
```

## License

Released under the MIT License - see `LICENSE.md` for details.
