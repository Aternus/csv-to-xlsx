#!/usr/bin/env node

import path from 'path';
import fs from 'fs-extra';
import { program } from 'commander';

import { convertCsvToXlsx } from '../src/convertCsvToXlsx';
import { CLIParameters } from './csv-to-xlsx.types';
import pkg from '../package.json';

program
  .version(pkg.version, '-v, --version')
  .option(
    '-i, --input-dir [dir]',
    'Input directory that has the CSV files',
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

const csvPath = path.join(process.cwd(), programOptions.inputDir);
const xlsxPath = path.join(process.cwd(), programOptions.outputDir);

// check the csvPath
if (!fs.existsSync(csvPath)) {
  // csv folder doesn't exist, doing it wrong
  console.error(`Invalid input directory: ${csvPath}\n`);
  process.exitCode = 1;
  program.help(); // exit immediately
}

// check the xlsxPath
if (!fs.existsSync(xlsxPath)) {
  // create xlsx folder
  console.info(`Creating output directory: ${xlsxPath}`);
  fs.mkdirSync(xlsxPath, { recursive: true });
}

// read csvPath
const csvFiles = fs.readdirSync(csvPath);

for (const file of csvFiles) {
  // parse file
  const fileObject = path.parse(file);
  // check file extension
  if (fileObject.ext !== '.csv') {
    continue;
  }
  console.info(`Converting: ${file}`);
  // convert
  try {
    const source = path.join(csvPath, file);
    const destination = path.join(xlsxPath, `${fileObject.name}.xlsx`);
    convertCsvToXlsx(source, destination, {
      sheetName: programOptions.sheetName,
      overwrite: Boolean(programOptions.force),
    });
  } catch (e) {
    console.error(e.toString());
  }
}

console.info(`Complete.`);
