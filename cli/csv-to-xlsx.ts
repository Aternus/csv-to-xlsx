#!/usr/bin/env node
import path from 'node:path';

import {program} from 'commander';
import fse from 'fs-extra';

import pkg from '../package.json';
import {convertCsvToXlsx} from '../src/convertCsvToXlsx';
import {CLIParameters} from './csv-to-xlsx.types';

program
  .version(pkg.version, '-v, --version')
  .option(
    '-i, --input [input]',
    'Input CSV file or directory containing CSV files',
    'csv',
  )
  .option(
    '-o, --output-dir [dir]',
    'Output directory for the XLSX files',
    'xlsx',
  )
  .option(
    '-s, --sheet-name [name]',
    'Set the sheet name to be used in the XLSX files',
    '',
  )
  .option(
    '-f, --force',
    'forcefully overwrite XLSX files at the output directory',
    false,
  );

program.on('--help', function () {
  console.log(``);
  console.log(`Created by: ${pkg.author.name}`);
  console.log(`Please report bugs at: ${pkg.bugs.url}`);
  console.log(`Version: ${pkg.version}`);
});

program.parse(process.argv);

const programOptions = program.opts<CLIParameters>();

const inputPath = path.resolve(programOptions.input);
const outputPath = path.resolve(programOptions.outputDir);

if (!fse.existsSync(inputPath)) {
  console.error(`Invalid input: ${inputPath}`);
  process.exitCode = 1;
  program.help();
}

if (!fse.existsSync(outputPath)) {
  fse.mkdirSync(outputPath, {recursive: true});
}

const convertFile = (sourceFile: string) => {
  const fileObject = path.parse(sourceFile);
  if (fileObject.ext === '.csv') {
    console.info(`Converting: ${sourceFile}`);
    const destination = path.resolve(outputPath, `${fileObject.name}.xlsx`);
    convertCsvToXlsx(sourceFile, destination, {
      sheetName: programOptions.sheetName,
      overwrite: Boolean(programOptions.force),
    });
  }
};

if (fse.statSync(inputPath).isDirectory()) {
  for (const file of fse.readdirSync(inputPath)) {
    convertFile(path.resolve(inputPath, file));
  }
} else {
  convertFile(inputPath);
}

console.info(`Conversion complete.`);
