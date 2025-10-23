import path from 'node:path';

import {describe, expect, test} from '@jest/globals';
import fse from 'fs-extra';
import {Bench} from 'tinybench';

import {convertCsvToXlsx} from '../src/convertCsvToXlsx';

const source = path.resolve(__dirname, 'csv/FL_insurance_sample.csv');

describe('Node.js API Performance', function () {
  test(`File should be present`, function () {
    const sourceSize = 4123652;
    const stats = fse.statSync(source);
    expect(stats.size).toEqual(sourceSize);
  });

  test(`Benchmark convertCsvToXlsx`, function () {
    const directory = path.resolve(__dirname, 'benchmark');
    const destination = path.resolve(directory, 'FL_insurance_sample.xlsx');
    fse.mkdirpSync(directory);

    const bench = new Bench({
      name: 'convertCsvToXlsx',
      iterations: 3,
    });

    bench.add('FL_insurance_sample.csv', () => {
      convertCsvToXlsx(source, destination, {overwrite: true});
    });

    bench.runSync();

    const baselineMS = 1500; // ~1.5 sec
    const [testResults] = bench.results;

    console.table(bench.table());

    expect(testResults?.latency.mean).toBeLessThanOrEqual(baselineMS);
  });
});
