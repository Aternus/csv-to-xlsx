import {randomUUID} from 'node:crypto';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

import xlsx from 'xlsx';

import {convertCsvToXlsx} from '../src/convertCsvToXlsx';
import {APIParameters} from '../src/convertCsvToXlsx.types';

function convertFile(input: string, output: string, config?: APIParameters) {
  const fileObject = path.parse(input);
  if (fileObject.ext === '.csv') {
    const destination = path.resolve(output, `${fileObject.name}.xlsx`);
    convertCsvToXlsx(input, destination, config);
    return destination;
  }
  return null;
}

export function getSanityCSVPath() {
  return path.resolve(__dirname, 'csv', 'rock-stars.csv');
}

export function getTempDir(isRandom: boolean = true) {
  const tmp = path.resolve(os.tmpdir(), 'convertCsvToXlsx');
  const tmpPath = isRandom ? `${tmp}_${randomUUID()}` : tmp;
  fs.mkdirSync(tmpPath, {recursive: true});
  return tmpPath;
}

export function doCsvToXlsxConversion(
  input: string,
  output: string,
  config?: APIParameters,
) {
  const csvPath = path.resolve(__dirname, input);
  const xlsxPath = path.resolve(output);

  const csvFiles: string[] = [];

  if (fs.statSync(csvPath).isDirectory()) {
    for (const csv of fs.readdirSync(csvPath)) {
      csvFiles.push(path.resolve(csvPath, csv));
    }
  } else {
    csvFiles.push(csvPath);
  }

  const xlsxFiles: string[] = [];

  for (const csv of csvFiles) {
    const xlsxFile = convertFile(csv, xlsxPath, config);
    if (xlsxFile) {
      xlsxFiles.push(xlsxFile);
    }
  }

  return xlsxFiles;
}

export function readXlsx(input: string) {
  const xlsxPath = path.resolve(input);
  return xlsx.readFile(xlsxPath);
}
