import {performance} from 'node:perf_hooks';
import process from 'node:process';

function toMegabytes(bytes: number) {
  return Number((bytes / 1024 / 1024).toFixed(2));
}

function normalizeNumber(number: number) {
  return Number(number.toFixed(2));
}

type BenchmarkIteration = {
  iteration: number;
  duration: number;
  memoryDelta: {
    rss: number;
    heapTotal: number;
    heapUsed: number;
    external: number;
    arrayBuffers: number;
  };
};

type BenchmarkTable = {
  'Name': string;
  'Duration (ms)': number;
  'RSS Δ': number;
  'Heap Total Δ': number;
  'Heap Used Δ': number;
  'External Δ': number;
  'Array Buffers Δ': number;
}[];

type BenchmarkResult = {
  name: string;
  results: BenchmarkIteration[];
  latency: {
    mean: number;
  };
  table: () => BenchmarkTable;
};

/**
 * Benchmark a Function
 *
 * @see https://nodejs.org/en/learn/diagnostics/memory/understanding-and-tuning-memory
 */
export async function benchmark<T>(
  name: string,
  fn: () => T | Promise<T>,
  config: {iterations: number},
): Promise<BenchmarkResult> {
  const {iterations = 1} = config;

  let totalDuration = 0;
  const results: BenchmarkIteration[] = [];

  for (let i = 0; i < iterations; i++) {
    const startMark = performance.mark(`${name}:start`);
    const startMemory = process.memoryUsage();
    await fn();
    const endMemory = process.memoryUsage();
    const endMark = performance.mark(`${name}:end`);
    const measure = performance.measure(name, startMark.name, endMark.name);

    totalDuration += measure.duration;

    const iteration = i + 1;

    results.push({
      iteration,
      duration: normalizeNumber(measure.duration),
      memoryDelta: {
        rss: toMegabytes(endMemory.rss - startMemory.rss),
        heapTotal: toMegabytes(endMemory.heapTotal - startMemory.heapTotal),
        heapUsed: toMegabytes(endMemory.heapUsed - startMemory.heapUsed),
        external: toMegabytes(endMemory.external - startMemory.external),
        arrayBuffers: toMegabytes(
          endMemory.arrayBuffers - startMemory.arrayBuffers,
        ),
      },
    });
  }

  return {
    name,
    results,
    latency: {
      mean: normalizeNumber(totalDuration / results.length),
    },
    table: () =>
      results.map((result) => {
        return {
          'Name': name,
          'Duration (ms)': result.duration,
          'RSS Δ': result.memoryDelta.rss,
          'Heap Total Δ': result.memoryDelta.heapTotal,
          'Heap Used Δ': result.memoryDelta.heapUsed,
          'External Δ': result.memoryDelta.external,
          'Array Buffers Δ': result.memoryDelta.arrayBuffers,
        };
      }),
  };
}
