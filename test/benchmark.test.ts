import fs from 'node:fs';
import path from 'node:path';

import {describe, expect, test} from '@jest/globals';

import {convertCsvToXlsx} from '../src/convertCsvToXlsx';
import {getTempDir} from './helpers';
import {benchmark} from './performance';

describe('Node.js API Benchmark', function () {
  test(`Benchmark convertCsvToXlsx`, async function () {
    const source = path.resolve(__dirname, 'csv/florida_insurance_sample.csv');
    const sourceSize = 4123652;
    const stats = fs.statSync(source);
    expect(stats.size).toEqual(sourceSize);

    const result = await benchmark(
      'convertCsvToXlsx',
      () => {
        const tmpPath = getTempDir();
        const destination = path.resolve(
          tmpPath,
          'florida_insurance_sample.xlsx',
        );
        convertCsvToXlsx(source, destination);
      },
      {iterations: 10},
    );

    console.table(result.table());

    // @see https://docs.github.com/en/actions/reference/runners/github-hosted-runners#standard-github-hosted-runners-for-public-repositories
    // 5 sec should be safe
    const baselineMS = 5000;

    expect(result.latency.mean).toBeLessThanOrEqual(baselineMS);
  });
});
