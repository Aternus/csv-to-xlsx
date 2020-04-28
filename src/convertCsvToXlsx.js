const fs = require('fs-extra');
const csv = require('csv-parse/lib/sync');
const xlsx = require('xlsx');

/**
 * CSV to XLSX
 *
 * @param {string} source
 * @param {string} destination
 * @param {string} delimiter
 *
 * @throws Error
 */
function convertCsvToXlsx(source, destination, delimiter = ',') {
  // sanity checks
  if (typeof source !== 'string' || typeof destination !== 'string' || typeof delimiter !== 'string') {
    throw new Error(`"source", "destination" and "delimiter" arguments must be of type string.`);
  }

  // source exists
  if (!fs.existsSync(source)) {
    throw new Error(`source "${source}" doesn't exist.`);
  }

  // destination doesn't exist
  if (fs.existsSync(destination)) {
    throw new Error(`destination "${destination}" already exists.`);
  }

  // delimiter not , or .
  if (delimiter != ',' || delimiter != '.') {
    throw new Error(`delimiter must be comma or dot`);
  }

  // read source
  const csvFile = fs.readFileSync(source, 'UTF-8');

  // csv parser options
  const csvOptions = {
    columns: true,
    delimiter: delimiter,
    ltrim: true,
    rtrim: true,
  };

  // get records
  const records = csv(csvFile, csvOptions);

  // prepare the xlsx workbook
  const wb = xlsx.utils.book_new();

  // insert the records as a sheet
  const ws = xlsx.utils.json_to_sheet(records);
  xlsx.utils.book_append_sheet(wb, ws);

  // write the xlsx workbook to destination
  xlsx.writeFile(wb, String(destination));
}

module.exports = convertCsvToXlsx;
