# @aternus/csv-to-xlsx

Command-line tool to convert CSV files to XLSX (Excel 2007+ XML Format) files written in JavaScript.

Precompiled binaries (see the `bin` folder) are available for:
- Windows x64
- Linux x64
- MacOS


## Installation

```bash
npm install @aternus/csv-to-xlsx
```


## Usage

### Precompiled Binary (Command-line)

```bash
./csv-to-xlsx-linux -i "input-directory" -o "output-directory"
```

### Node.js CLI

Type `--help` for a full list of options.

```bash
npx csv-to-xlsx -i "input-directory" -o "output-directory"
```

### Node.js

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
