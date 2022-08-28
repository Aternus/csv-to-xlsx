import fs from 'fs-extra';
import { parse } from 'csv-parse/sync';
import xlsx from 'xlsx';

import { APIParameters } from './convertCsvToXlsx.types';

/**
 * CSV to XLSX
 *
 * @throws Error
 */
export function convertCsvToXlsx(
  source: string,
  destination: string,
  { sheetName = '', overwrite = false }: APIParameters = {},
) {
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

  // destination doesn't exist
  if (fs.existsSync(destination) && !overwrite) {
    throw new Error(`destination "${destination}" already exists.`);
  }

  // read source
  const csvFile = fs.readFileSync(source, { encoding: 'utf-8' });

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
