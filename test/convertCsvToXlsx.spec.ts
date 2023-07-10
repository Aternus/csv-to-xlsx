/**
 * Convert CSV to XLSX Specifications
 *
 *
 * (!) Passing arrow functions (lambdas) to Mocha is discouraged as they
 *     lexically bind this and cannot access the Mocha context.
 *     @see https://mochajs.org/#arrow-functions
 *
 */

import path from 'path';
import fs from 'fs-extra';
import {expect} from 'chai';
import {convertCsvToXlsx} from '../src/convertCsvToXlsx';

function doCsvToXlsxConversion(
  input,
  emptyOutputPath = false,
  overwrite = false,
) {
  const csvPath = path.resolve(__dirname, input);
  const xlsxPath = path.resolve(__dirname, 'xlsx');

  if (emptyOutputPath) {
    // empty xlsx folder
    fs.emptyDirSync(xlsxPath);
  }

  const convertFile = (sourceFile) => {
    const fileObject = path.parse(sourceFile);
    if (fileObject.ext === '.csv') {
      const destination = path.resolve(xlsxPath, `${fileObject.name}.xlsx`);
      convertCsvToXlsx(sourceFile, destination, {
        sheetName: 'sheetName',
        overwrite: overwrite,
      });
    }
  };

  if (fs.statSync(csvPath).isDirectory()) {
    for (const file of fs.readdirSync(csvPath)) {
      convertFile(path.resolve(csvPath, file));
    }
  } else {
    convertFile(csvPath);
  }
}

function doCsvToXlsxConversionBuffer(input) {
  const csvPath = path.resolve(__dirname, input);
  const xlsxPath = path.resolve(__dirname, 'xlsx');

  const convertFile = (sourceFile) => {
    const fileObject = path.parse(sourceFile);
    if (fileObject.ext === '.csv') {
      const destination = path.resolve(xlsxPath, `${fileObject.name}.xlsx`);
      const content = fs.readFileSync(sourceFile);
      const valid = fs.readFileSync(destination);
      const result = convertCsvToXlsx(
        content.toString(),
        '',
        {
          sheetName: 'sheetName',
          overwrite: false,
        },
        false,
      );

      if (Buffer.compare(result, valid) !== 0) {
        throw 'buffer does not match xlsx file';
      }
    }
  };

  if (fs.statSync(csvPath).isDirectory()) {
    for (const file of fs.readdirSync(csvPath)) {
      convertFile(path.resolve(csvPath, file));
    }
  } else {
    convertFile(csvPath);
  }
}

describe(`convertCsvToXlsx`, function () {
  //
  describe(`Missing arguments`, function () {
    it(`should throw an Error`, function () {
      expect(() => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        convertCsvToXlsx();
      }).to.throw(Error);
    });
  });

  //
  describe(`Invalid "source" and "destination" arguments`, function () {
    it(`should throw an Error`, function () {
      expect(() => {
        convertCsvToXlsx(null, null);
      }).to.throw(Error);
    });
  });

  //
  describe(`Empty "source" and "destination" arguments`, function () {
    it(`should throw an Error`, function () {
      expect(() => {
        convertCsvToXlsx('', '');
      }).to.throw(Error);
    });
  });

  //
  describe(`Convert CSV to XLSX`, function () {
    // define a timeout for this test
    this.timeout(30000); // 30sec

    it(`csv/*.csv files to xlsx/*.xlsx files`, function () {
      doCsvToXlsxConversion('csv', true);
    });

    it(`csv/numbers.csv file to xlsx/numbers.xlsx file`, function () {
      doCsvToXlsxConversion('csv/numbers.csv', true);
    });

    it(`overwriting files should throw an Error`, function () {
      expect(() => {
        doCsvToXlsxConversion('csv');
      }).to.throw(Error);
    });

    it(`overwriting files with force should not throw an Error`, function () {
      expect(() => {
        doCsvToXlsxConversion('csv', false, true);
      }).to.not.throw(Error);
    });

    it(`overwriting a single file should throw an Error`, function () {
      expect(() => {
        doCsvToXlsxConversion('csv/numbers.csv');
      }).to.throw(Error);
    });

    it(`overwriting a single file with force should not throw an Error`, function () {
      expect(() => {
        doCsvToXlsxConversion('csv/numbers.csv', false, true);
      }).to.not.throw(Error);
    });

    it(`csv/numbers.csv file to buffer`, function () {
      doCsvToXlsxConversionBuffer('csv/numbers.csv');
    });
  });
});
