import {describe, expect, test} from '@jest/globals';

import {convertCsvToXlsx} from '../src/convertCsvToXlsx';
import {
  doCsvToXlsxConversion,
  getSanityCSVPath,
  getTempDir,
  readXlsx,
} from './helpers';

describe(`Node.js API`, function () {
  describe(`Arguments`, function () {
    test(`Missing arguments should throw an Error`, function () {
      expect(() => {
        // @ts-expect-error no arguments
        convertCsvToXlsx();
      }).toThrow(Error);
    });

    test(`Invalid "source" and "destination" arguments should throw an Error`, function () {
      expect(() => {
        // @ts-expect-error invalid arguments
        convertCsvToXlsx(null, null);
      }).toThrow(Error);
    });

    test(`Empty "source" and "destination" arguments should throw an Error`, function () {
      expect(() => {
        convertCsvToXlsx('', '');
      }).toThrow(Error);
    });

    test(`Directory as source should throw an Error`, function () {
      expect(() => {
        const source = getTempDir();
        const destination = getTempDir();
        convertCsvToXlsx(source, destination);
      }).toThrow(Error);
    });

    test(`Directory as destination should throw an Error`, function () {
      expect(() => {
        const source = getSanityCSVPath();
        const destination = getTempDir();
        convertCsvToXlsx(source, destination, {overwrite: true});
      }).toThrow(Error);
    });
  });

  describe(`Conversion`, function () {
    const tmpDir = getTempDir();

    console.log({tmpDir});

    test(`Convert csv/*.csv files to xlsx/*.xlsx files`, function () {
      const csvFilesCount = 9;
      const xlsxFiles = doCsvToXlsxConversion('csv', tmpDir);
      expect(xlsxFiles).toHaveLength(csvFilesCount);
    });

    test(`Overwriting files should throw an Error`, function () {
      expect(() => {
        doCsvToXlsxConversion('csv', tmpDir);
      }).toThrow(Error);
    });

    test(`Overwriting files with force should not throw an Error`, function () {
      expect(() => {
        doCsvToXlsxConversion('csv', tmpDir, {overwrite: true});
      }).not.toThrow(Error);
    });

    test(`Overwriting a single file should throw an Error`, function () {
      expect(() => {
        doCsvToXlsxConversion('csv/numbers.csv', tmpDir);
      }).toThrow(Error);
    });

    test(`Overwriting a single file with force should not throw an Error`, function () {
      expect(() => {
        doCsvToXlsxConversion('csv/numbers.csv', tmpDir, {overwrite: true});
      }).not.toThrow(Error);
    });
  });

  describe(`Conversion: Edge Cases`, function () {
    test(`Converting a file with numbers should preserve numbers`, function () {
      const sheetName = 'numbers';
      const [numbersXlsx] = doCsvToXlsxConversion(
        'csv/numbers.csv',
        getTempDir(),
        {sheetName},
      );
      const wb = readXlsx(numbersXlsx);
      const ws = wb.Sheets[sheetName];
      const cell = ws['A2'];
      expect(cell.t).toEqual('s');
      expect(cell.v).toEqual('499600');
    });
  });
});
