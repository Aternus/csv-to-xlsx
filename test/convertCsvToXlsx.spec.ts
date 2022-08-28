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
import { expect } from 'chai';
import { convertCsvToXlsx } from '../src/convertCsvToXlsx';

function doCsvToXlsxConversion(emptyOutputPath = false, overwrite = false) {
  const csvPath = path.join(__dirname, 'csv');
  const xlsxPath = path.join(__dirname, 'xlsx');

  if (emptyOutputPath) {
    // empty xlsx folder
    fs.emptyDirSync(xlsxPath);
  }

  const csvFiles = fs.readdirSync(csvPath);

  for (const file of csvFiles) {
    // parse file
    const fileObject = path.parse(file);
    // check file extension
    if (fileObject.ext !== '.csv') {
      continue;
    }
    // convert
    const source = path.join(csvPath, file);
    const destination = path.join(xlsxPath, `${fileObject.name}.xlsx`);
    convertCsvToXlsx(source, destination, {
      sheetName: 'sheetName',
      overwrite: overwrite,
    });
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
      doCsvToXlsxConversion(true);
    });
    it(`overwriting files should throw an Error`, function () {
      expect(() => {
        doCsvToXlsxConversion();
      }).to.throw(Error);
    });
    it(`overwriting files with force should not throw an Error`, function () {
      expect(() => {
        doCsvToXlsxConversion(false, true);
      }).to.not.throw(Error);
    });
  });
});
