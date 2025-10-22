import {describe, expect, test} from '@jest/globals';

import {convertCsvToXlsx} from '../src/convertCsvToXlsx';
import {doCsvToXlsxConversion} from './helpers';

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
