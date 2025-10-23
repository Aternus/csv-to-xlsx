import path from 'node:path';

import fse from 'fs-extra';

import {convertCsvToXlsx} from '../src/convertCsvToXlsx';

export function doCsvToXlsxConversion(
  input: string,
  emptyOutputPath = false,
  overwrite = false,
) {
  const csvPath = path.resolve(__dirname, input);
  const xlsxPath = path.resolve(__dirname, 'xlsx');

  if (emptyOutputPath) {
    // empty xlsx folder
    fse.emptyDirSync(xlsxPath);
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

  if (fse.statSync(csvPath).isDirectory()) {
    for (const file of fse.readdirSync(csvPath)) {
      convertFile(path.resolve(csvPath, file));
    }
  } else {
    convertFile(csvPath);
  }
}
