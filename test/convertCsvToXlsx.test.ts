import path from 'path';

import {describe, expect, test} from '@jest/globals';
import fs from 'fs-extra';

import {convertCsvToXlsx} from '../src/convertCsvToXlsx';

function doCsvToXlsxConversion(
  input: string,
  emptyOutputPath = false,
  overwrite = false,
) {
  const csvPath = path.resolve(__dirname, input);
  const xlsxPath = path.resolve(__dirname, 'xlsx');

  if (emptyOutputPath) {
    // empty xlsx folder
    fs.emptyDirSync(xlsxPath);
  }

  const convertFile = (sourceFile: string) => {
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

describe(`Node.js API`, function () {
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

  test(`convert csv/*.csv files to xlsx/*.xlsx files`, function () {
    expect(() => {
      doCsvToXlsxConversion('csv', true);
    }).not.toThrow(Error);
  });

  test(`convert csv/numbers.csv file to xlsx/numbers.xlsx file`, function () {
    expect(() => {
      doCsvToXlsxConversion('csv/numbers.csv', true);
    }).not.toThrow(Error);
  });

  test(`overwriting files should throw an Error`, function () {
    expect(() => {
      doCsvToXlsxConversion('csv');
    }).toThrow(Error);
  });

  test(`overwriting files with force should not throw an Error`, function () {
    expect(() => {
      doCsvToXlsxConversion('csv', false, true);
    }).not.toThrow(Error);
  });

  test(`overwriting a single file should throw an Error`, function () {
    expect(() => {
      doCsvToXlsxConversion('csv/numbers.csv');
    }).toThrow(Error);
  });

  test(`overwriting a single file with force should not throw an Error`, function () {
    expect(() => {
      doCsvToXlsxConversion('csv/numbers.csv', false, true);
    }).not.toThrow(Error);
  });
});
