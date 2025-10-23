import path from 'node:path';

import {describe, expect, test} from '@jest/globals';
import fse from 'fs-extra';
import {Bench} from 'tinybench';

import {convertCsvToXlsx} from '../src/convertCsvToXlsx';

describe('Node.js API Benchmark', function () {
  test(`Benchmark convertCsvToXlsx`, function () {
    const source = path.resolve(__dirname, 'csv/FL_insurance_sample.csv');
    const sourceSize = 4123652;
    const stats = fse.statSync(source);
    expect(stats.size).toEqual(sourceSize);

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

    // @see https://docs.github.com/en/actions/reference/runners/github-hosted-runners#standard-github-hosted-runners-for-public-repositories
    // 4 sec should be safe
    const baselineMS = 4000;
    const [testResults] = bench.results;

    console.table(bench.table());

    expect(testResults?.latency.mean).toBeLessThanOrEqual(baselineMS);
  });
});
