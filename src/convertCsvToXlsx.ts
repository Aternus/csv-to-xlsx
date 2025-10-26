import fs from 'node:fs';

import {parse} from 'csv-parse/sync';
import xlsx from 'xlsx';

import type {Options} from 'csv-parse/sync';
import type {APIParameters} from './convertCsvToXlsx.types';

/**
 * Convert CSV to XLSX
 *
 * @throws Error
 */
export function convertCsvToXlsx(
  source: string,
  destination: string,
  apiParameters: APIParameters = {},
) {
  const {sheetName = '', overwrite = false, hasHeader = true} = apiParameters;

  // sanity checks
  if (typeof source !== 'string' || typeof destination !== 'string') {
    throw new Error(
      `"source" and "destination" arguments must be of type string.`,
    );
  }

  // source exists
  if (!fs.existsSync(source)) {
    throw new Error(`source "${source}" doesn't exist.`);
  }

  // source is not a directory
  if (fs.statSync(source).isDirectory()) {
    throw new Error(`source "${source}" is a directory.`);
  }

  // destination doesn't exist
  if (fs.existsSync(destination)) {
    // destination is not a directory
    if (fs.statSync(destination).isDirectory()) {
      throw new Error(`destination "${source}" is a directory.`);
    }
    if (!overwrite) {
      throw new Error(`destination "${destination}" already exists.`);
    }
  }

  // read source
  const csvFile = fs.readFileSync(source, {encoding: 'utf8'});

  // csv parser options
  const csvOptions: Options = {
    columns: false,
    delimiter: ',',
    ltrim: true,
    rtrim: true,
  };

  // get records
  const records = parse(csvFile, csvOptions);

  // prepare the xlsx workbook
  const wb = xlsx.utils.book_new();

  // insert the records as a sheet
  const ws = xlsx.utils.json_to_sheet(records, {skipHeader: hasHeader});
  xlsx.utils.book_append_sheet(wb, ws, sheetName);

  // write the xlsx workbook to destination
  xlsx.writeFile(wb, destination);
}
