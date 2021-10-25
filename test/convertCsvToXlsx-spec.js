/**
 * Convert CSV to XLSX Specifications
 *
 *
 * (!) Passing arrow functions (lambdas) to Mocha is discouraged as they
 *     lexically bind this and cannot access the Mocha context.
 *     @see https://mochajs.org/#arrow-functions
 *
 */

const path = require('path');
const fs = require('fs');

const expect = require('chai').expect;

const convertCsvToXlsx = require('../');

/* eslint-disable no-invalid-this */
describe(`convertCsvToXlsx`, function () {
  //
  describe(`Missing arguments`, function () {
    it(`should throw an Error`, function () {
      expect(() => {
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
      //
      const csvPath = path.join(__dirname, 'csv');
      const xlsxPath = path.join(__dirname, 'xlsx');

      // empty xlsx folder
      fs.rmdirSync(xlsxPath, { recursive: true });
      fs.mkdirSync(xlsxPath);

      const csvFiles = fs.readdirSync(csvPath);

      for (const file of csvFiles) {
        // parse file
        const fileObject = path.parse(file);
        // check file extension
        if (fileObject.ext !== '.csv') {
          continue;
        }
        // convert
        convertCsvToXlsx(path.join(csvPath, file), path.join(xlsxPath, `${fileObject.name}.xlsx`));
      }
    });


    it(`csv/*.csv files to xlsx/*.xlsx files with sheet name`, function () {
      //
      const csvPath = path.join(__dirname, 'csv');
      const xlsxPath = path.join(__dirname, 'xlsx');
      const sheetName = 'sheetName';

      // empty xlsx folder
      fs.rmdirSync(xlsxPath, { recursive: true });
      fs.mkdirSync(xlsxPath);

      const csvFiles = fs.readdirSync(csvPath);

      for (const file of csvFiles) {
        // parse file
        const fileObject = path.parse(file);
        // check file extension
        if (fileObject.ext !== '.csv') {
          continue;
        }
        // convert
        convertCsvToXlsx(path.join(csvPath, file), path.join(xlsxPath, `${fileObject.name}.xlsx`),sheetName);
      }
    });
  });
});
