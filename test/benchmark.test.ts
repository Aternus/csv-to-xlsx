import * as os from 'node:os';
import path from 'node:path';

import {describe, expect, test} from '@jest/globals';
import fse from 'fs-extra';

import {convertCsvToXlsx} from '../src/convertCsvToXlsx';
import {benchmark} from './performance';

describe('Node.js API Benchmark', function () {
  test(`Benchmark convertCsvToXlsx`, async function () {
    const source = path.resolve(__dirname, 'csv/FL_insurance_sample.csv');
    const sourceSize = 4123652;
    const stats = fse.statSync(source);
    expect(stats.size).toEqual(sourceSize);

    const tempDir = fse.mkdtempSync(
      path.resolve(os.tmpdir(), 'convertCsvToXlsx_'),
    );
    const destination = path.resolve(tempDir, 'FL_insurance_sample.xlsx');

    const result = await benchmark(
      'convertCsvToXlsx',
      () => {
        convertCsvToXlsx(source, destination, {overwrite: true});
      },
      {iterations: 10},
    );

    console.table(result.table());

    // @see https://docs.github.com/en/actions/reference/runners/github-hosted-runners#standard-github-hosted-runners-for-public-repositories
    // 4 sec should be safe
    const baselineMS = 4000;

    expect(result.latency.mean).toBeLessThanOrEqual(baselineMS);
  });
});
