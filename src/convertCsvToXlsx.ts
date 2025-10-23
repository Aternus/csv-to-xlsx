import {parse} from 'csv-parse/sync';
import fse from 'fs-extra';
import xlsx from 'xlsx';

import type {APIParameters} from './convertCsvToXlsx.types';

/**
 * Convert CSV to XLSX
 *
 * @throws Error
 */
export function convertCsvToXlsx(
  source: string,
  destination: string,
  {sheetName = '', overwrite = false}: APIParameters = {},
) {
  // sanity checks
  if (typeof source !== 'string' || typeof destination !== 'string') {
    throw new Error(
      `"source" and "destination" arguments must be of type string.`,
    );
  }

  // source exists
  if (!fse.existsSync(source)) {
    throw new Error(`source "${source}" doesn't exist.`);
  }

  // destination doesn't exist
  if (fse.existsSync(destination) && !overwrite) {
    throw new Error(`destination "${destination}" already exists.`);
  }

  // read source
  const csvFile = fse.readFileSync(source, {encoding: 'utf8'});

  // csv parser options
  const csvOptions = {
    columns: true,
    delimiter: ',',
    ltrim: true,
    rtrim: true,
  };

  // get records
  const records = parse(csvFile, csvOptions);

  // prepare the xlsx workbook
  const wb = xlsx.utils.book_new();

  // insert the records as a sheet
  const ws = xlsx.utils.json_to_sheet(records);
  xlsx.utils.book_append_sheet(wb, ws, sheetName);

  // write the xlsx workbook to destination
  xlsx.writeFile(wb, destination);
}
